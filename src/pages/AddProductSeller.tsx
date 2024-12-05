import React, { useState, useEffect } from "react";
import AddForm from "../components/AddForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductCategories,
  getHsnCodes,
  saveBasicDetails,
  getUomLookup,
  getPaymentModeLookup,
  getOndcDetails,
  bulkUpdateOndcDetails,
  getLocations,
  upsertInventory,
} from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import toast from "react-hot-toast";
import axios from "axios";
import GLOBAL_CONSTANTS from "../GlobalConstants";

interface FormData {
  [key: string]: any;
  categoryName: number | null;
  subCategoryName: number | null;
  productTitle: string;
  skuId: string;
  hsnCode: string;
  hsnDescription?: string;
  hsnReferenceNumber?: string;
  shortDescription: string;
  productDescription: string;
  productImages: string[];
  uomType: string;
  uomValue: string;
  paymentMode: string;
  mrp: string;
  salesPrice: string;
  location: string;
  itemInventory: string;
  minimumItemCount: string;
}

const AddProductSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories, loading } = useSelector(
    (state: RootState) => state.data.productCategories
  );
  const { data: subCategories, loading: subCategoriesLoading } = useSelector(
    (state: RootState) => state.data.productCategories
  );
  const { data: hsnCodes, loading: hsnLoading } = useSelector(
    (state: RootState) => state.data.hsnCodes
  );
  const { data: uomTypes, loading: uomLoading } = useSelector(
    (state: RootState) => state.data.uomLookup
  );
  const { data: paymentModes, loading: paymentModesLoading } = useSelector(
    (state: RootState) => state.data.paymentModeLookup
  );
  const { data: ondcDetails, loading: ondcLoading } = useSelector(
    (state: RootState) => state.data.ondcDetails
  );
  const { data: locations, loading: locationsLoading } = useSelector(
    (state: RootState) => state.data.locations
  );

  // Initialize form data with the new fields
  const [formData, setFormData] = useState<FormData>({
    categoryName: null,
    subCategoryName: null,
    productTitle: "",
    skuId: "",
    hsnCode: "",
    hsnDescription: "",
    hsnReferenceNumber: "",
    shortDescription: "",
    productDescription: "",
    productImages: [],
    uomType: "",
    uomValue: "",
    paymentMode: "",
    mrp: "",
    salesPrice: "",
    location: "",
    itemInventory: "",
    minimumItemCount: "",
  });

  // Add state for showing ONDC section
  const [showOndcSection, setShowOndcSection] = useState(false);

  // Add these new state variables
  const [mainData, setMainData] = useState<Array<{ id: number; value: any }>>(
    []
  );
  const [dynamicFields, setDynamicFields] = useState<any>({});

  // Add state for time options
  const [timeOptions, setTimeOptions] = useState<
    Array<{
      label: string;
      value: string;
      id: number;
    }>
  >([]);

  // Add useEffect to fetch time options
  useEffect(() => {
    const fetchTimeOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${GLOBAL_CONSTANTS.BACKEND_API_URL}api/v1/backend_master/core/lookup_code/list/time_within`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data?.meta?.status) {
          const options = response.data.data.map((item: any) => ({
            label: item.display_name,
            value: item.lookup_code,
            id: item.id,
          }));
          setTimeOptions(options);
        }
      } catch (error) {
        console.error("Failed to fetch time options:", error);
      }
    };

    fetchTimeOptions();
  }, []);

  // Add helper function to load dynamic API data
  const loadDynamicApiData = async (
    apiPath: string,
    params: any = null,
    callback: (data: any) => void
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${GLOBAL_CONSTANTS.BACKEND_API_URL}/${apiPath}`,
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.meta?.status) {
        callback(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch dynamic data:", error);
    }
  };

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(getProductCategories(null));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  // Add useEffect to fetch HSN codes
  useEffect(() => {
    const fetchHsnCodes = async () => {
      try {
        await dispatch(getHsnCodes());
      } catch (error) {
        console.error("Failed to fetch HSN codes:", error);
      }
    };

    fetchHsnCodes();
  }, [dispatch]);

  // Add debug logging for HSN codes
  useEffect(() => {
    console.log("HSN Codes from state:", hsnCodes); // Debug log
  }, [hsnCodes]);

  // Fetch HSN codes when component mounts
  useEffect(() => {
    const fetchHsnCodes = async () => {
      try {
        console.log("Fetching HSN codes..."); // Debug log
        await dispatch(getHsnCodes());
      } catch (error) {
        console.error("Failed to fetch HSN codes:", error);
      }
    };

    fetchHsnCodes();
  }, [dispatch]);

  // Fetch UOM types when component mounts
  useEffect(() => {
    dispatch(getUomLookup());
  }, [dispatch]);

  // Fetch payment modes when component mounts
  useEffect(() => {
    dispatch(getPaymentModeLookup());
  }, [dispatch]);

  // Move function definitions before they're used
  const handleImageUpload = (
    id: string,
    link: string | null,
    index?: number
  ) => {
    if (link) {
      console.log("Before update - productImages:", formData.productImages);
      setFormData((prev) => {
        const newImages = prev.productImages
          ? [...prev.productImages, link]
          : [link];
        console.log("After update - productImages:", newImages);
        return {
          ...prev,
          productImages: newImages,
        };
      });
    }
  };
  const handleSelectChange = async (key: string, value: any) => {
    console.log("Select changed:", key, value);

    if (!ondcDetails) return;

    // Find the field details from ONDC details
    const fieldDetails = ondcDetails.find((o) => o.field_key === key);
    if (!fieldDetails) return;

    const dependentId = (fieldDetails as any).dependent_id;

    if (dependentId) {
      // Handle dependent dropdown
      const mainDataValue = mainData.find((o) => o.id === dependentId)?.value;
      if (!mainDataValue) return;

      // Construct API path with the correct prefix
      const apiPath = fieldDetails.data_source
        ? `api/v1/backend_master/${fieldDetails.data_source.replace(
            "$value",
            mainDataValue
          )}`
        : "";

      if (!apiPath) return;

      loadDynamicApiData(apiPath, null, (responseData) => {
        // Update dynamic fields
        const updatedDynamicFields = { ...dynamicFields };
        Object.keys(updatedDynamicFields).forEach((section) => {
          updatedDynamicFields[section] = updatedDynamicFields[section].map(
            (field: any) => {
              if (field.key === key) {
                return {
                  ...field,
                  value: value ?? null,
                  options: responseData?.map((item: any) => ({
                    id: item.id,
                    label: item[field.data_source_params.display_name],
                    value: item[field.data_source_params.field_to_send],
                  })),
                };
              }
              return field;
            }
          );
        });

        setDynamicFields(updatedDynamicFields);

        // Update main data
        const newValue = { id: Number(key), value };
        setMainData((prev) => [
          ...prev.filter((o) => o.id !== Number(key)),
          newValue,
        ]);

        // Update form data
        setFormData((prev) => ({
          ...prev,
          [key]: value,
        }));
      });
    } else {
      // Handle independent dropdown
      if (fieldDetails.data_source) {
        // Construct API path with the correct prefix
        const apiPath = `api/v1/backend_master/${fieldDetails.data_source}`;

        loadDynamicApiData(apiPath, null, (responseData) => {
          // Update dynamic fields
          const updatedDynamicFields = { ...dynamicFields };
          Object.keys(updatedDynamicFields).forEach((section) => {
            updatedDynamicFields[section] = updatedDynamicFields[section].map(
              (field: any) => {
                if (field.key === key) {
                  return {
                    ...field,
                    value: value ?? null,
                    options: responseData?.map((item: any) => ({
                      id: item.id,
                      label: item[field.data_source_params.display_name],
                      value: item[field.data_source_params.field_to_send],
                    })),
                  };
                }
                return field;
              }
            );
          });

          setDynamicFields(updatedDynamicFields);

          // Update main data
          const newValue = { id: Number(key), value };
          setMainData((prev) => [
            ...prev.filter((o) => o.id !== Number(key)),
            newValue,
          ]);

          // Update form data
          setFormData((prev) => ({
            ...prev,
            [key]: value,
          }));
        });
      }
    }

    // Update main data regardless of API call
    const newValue = { id: Number(key), value };
    setMainData((prev) => [
      ...prev.filter((o) => o.id !== Number(key)),
      newValue,
    ]);

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (key: string, value: any, index?: number) => {
    if (key === "hsnCode") {
      const selectedHsn = hsnCodes?.find((hsn) => hsn.hsn_code === value);
      setFormData((prev) => ({
        ...prev,
        [key]: value,
        hsnReferenceNumber: selectedHsn?.reference_number || "",
        hsnDescription: selectedHsn?.description || "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  // Add loading state
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (section: string) => {
    try {
      setIsSaving(true);

      if (section === "Basic Information") {
        // Find the selected HSN code to get its reference number
        const selectedHsn = hsnCodes?.find(
          (hsn) => hsn.hsn_code === formData.hsnCode
        );

        const basicDetails = {
          section_key: "BASIC_INFORMATION",
          name: formData.productTitle,
          sku_id: formData.skuId,
          level1_category_id: formData.categoryName!,
          level2_category_id: formData.subCategoryName!,
          short_desc: formData.shortDescription,
          long_desc: formData.productDescription,
          hsn_reference_number: selectedHsn?.reference_number || "",
        };

        const response = await dispatch(saveBasicDetails(basicDetails));
        if (response?.meta?.status) {
          localStorage.setItem("current_sku_id", formData.skuId);
          toast.success("Basic details saved successfully!");
        }

        // Fetch ONDC details after saving basic details
        await dispatch(getOndcDetails(formData.skuId));
        setShowOndcSection(true);
      } else if (section === "Product Images") {
        const imageDetails = {
          section_key: "PRODUCT_IMAGE",
          sku_id: formData.skuId,
          image_arr: formData.productImages || [],
        };

        await dispatch(saveBasicDetails(imageDetails));
        toast.success("Images saved successfully!");
      } else if (section === "Unit of Measurement") {
        const selectedUom = uomTypes?.find(
          (uom) => uom.lookup_code === formData.uomType
        );

        if (!selectedUom) {
          throw new Error("Please select a valid UOM type");
        }

        const measurementDetails = {
          section_key: "UOM",
          sku_id: formData.skuId,
          uom_id: selectedUom.id,
          uom_value: formData.uomValue,
        };

        await dispatch(saveBasicDetails(measurementDetails));
        toast.success("Measurements saved successfully!");
      } else if (section === "Pricing Details") {
        // Get the selected payment mode's ID
        const selectedPaymentMode = paymentModes?.find(
          (mode) => mode.lookup_code === formData.paymentMode
        );

        if (!selectedPaymentMode) {
          throw new Error("Please select a valid payment mode");
        }

        const pricingDetails = {
          section_key: "PRICING_DETAILS",
          sku_id: formData.skuId,
          mrp: Number(formData.mrp),
          sales_price: Number(formData.salesPrice),
          payment_type_id: selectedPaymentMode.id,
        };

        await dispatch(saveBasicDetails(pricingDetails));
        toast.success("Pricing details saved successfully!");
      } else if (section === "ONDC Details") {
        if (!ondcDetails) {
          throw new Error("ONDC details not loaded");
        }

        // Prepare the bulk update payload
        const bulkUpdatePayload = ondcDetails.map((field) => {
          const value = formData[field.field_key];
          let processedValue = value;

          // Process value based on field type
          switch (field.type) {
            case "checkbox":
              processedValue = Boolean(value);
              break;

            case "dropdown":
              if (
                field.field_name === "Return Within" ||
                field.field_name === "Time To Ship" ||
                field.field_name === "Time to Ship" ||
                field.field_name === "Expected Delivery_time"
              ) {
                const selectedOption = timeOptions.find(
                  (opt) => opt.value === value
                );
                if (selectedOption) {
                  processedValue = {
                    id: selectedOption.id,
                    label: selectedOption.label,
                    lookup_code: selectedOption.value,
                  };
                }
              }
              break;

            case "decimal":
              processedValue = value ? Number(value) : null;
              break;

            case "text":
            case "textarea":
              processedValue = value || null;
              break;

            case "date":
              processedValue = value || null;
              break;

            default:
              processedValue = value || null;
          }

          return {
            id: field.id,
            value: processedValue,
          };
        });

        // Call the bulk update API
        const response = await dispatch(
          bulkUpdateOndcDetails(bulkUpdatePayload)
        );
        if (response?.meta?.status) {
          toast.success("ONDC details saved successfully!");
        } else {
          throw new Error(
            response?.meta?.message || "Failed to save ONDC details"
          );
        }
      }
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error(`Failed to save ${section.toLowerCase()}. Please try again.`);
    } finally {
      setIsSaving(false);
    }
  };

  // Add useEffect to fetch dropdown options for fields with data_source
  useEffect(() => {
    const fetchDropdownOptions = async (field: any) => {
      if (field.data_source && field.data_type === "dynamic") {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${GLOBAL_CONSTANTS.BACKEND_API_URL}/${field.data_source}`,
            {
              params: field.data_source_params?.query_params?.reduce(
                (acc: any, param: any) => {
                  acc[param.key] = param.value;
                  return acc;
                },
                {}
              ),
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data?.meta?.status) {
            const options = response.data.data.map((item: any) => ({
              label: item[field.data_source_params.display_name],
              value: item[field.data_source_params.field_to_send],
            }));

            // Update formData with the new options
            setFormData((prev) => ({
              ...prev,
              [`${field.key}_options`]: options,
            }));
          }
        } catch (error) {
          console.error(
            `Failed to fetch options for ${field.field_name}:`,
            error
          );
        }
      }
    };

    // Fetch options for all dropdown fields when ONDC details are loaded
    if (ondcDetails) {
      ondcDetails.forEach((field: any) => {
        if (field.type === "dropdown") {
          fetchDropdownOptions(field);
        }
      });
    }
  }, [ondcDetails]);

  // Update the getOndcFieldsBySection function
  const getOndcFieldsBySection = () => {
    if (!ondcDetails) return {};

    return ondcDetails.reduce((acc: any, field: any) => {
      if (!acc[field.section_name]) {
        acc[field.section_name] = [];
      }

      let fieldObject: any = {
        type: field.type,
        key: field.field_key,
        label: field.field_name,
        required: field.category_id.is_mandatory,
        placeholder: field.placeholder || field.field_name,
        value: formData[field.field_key] || field.value || "", // Use formData value if exists
        data_type: field.data_type,
      };

      // Special handling for time-related fields
      if (
        field.field_name === "Return Within" ||
        field.field_name === "Time To Ship" ||
        field.field_name === "Time to Ship" ||
        field.field_name === "Expected Delivery_time"
      ) {
        fieldObject = {
          ...fieldObject,
          type: "select",
          options: timeOptions,
          data_source: null,
        };
      } else {
        // Handle other field types
        switch (field.type) {
          case "checkbox":
            fieldObject = {
              ...fieldObject,
              type: "checkbox",
              checked: Boolean(formData[field.field_key] || field.value),
            };
            break;

          case "dropdown":
            fieldObject = {
              ...fieldObject,
              type: "select",
              options: formData[`${field.key}_options`] || [],
              data_source: field.data_source,
              data_source_params: field.data_source_params,
            };
            break;

          case "decimal":
            fieldObject = {
              ...fieldObject,
              type: "number",
              step: "0.01",
              value: formData[field.field_key] || field.value || "",
            };
            break;

          case "textarea":
            fieldObject = {
              ...fieldObject,
              type: "textarea",
              rows: 3,
              value: formData[field.field_key] || field.value || "",
            };
            break;

          case "date":
            fieldObject = {
              ...fieldObject,
              type: "date",
              value: formData[field.field_key] || field.value || "",
            };
            break;

          case "text":
            fieldObject = {
              ...fieldObject,
              type: "text",
              value: formData[field.field_key] || field.value || "",
            };
            break;

          default:
            fieldObject = {
              ...fieldObject,
              type: "text",
              value: formData[field.field_key] || field.value || "",
            };
        }
      }

      acc[field.section_name].push(fieldObject);
      return acc;
    }, {});
  };

  // Then define the fields
  const basicInfoFields = [
    {
      type: "text",
      key: "productTitle",
      label: "Product Title",
      required: true,
      placeholder: "Product Title",
      value: formData.productTitle,
    },
    {
      type: "text",
      key: "skuId",
      label: "Sku Id",
      required: true,
      placeholder: "SKU ID",
      value: formData.skuId,
    },
    {
      type: "select",
      key: "categoryName",
      label: "Category Name",
      required: true,
      placeholder: "Category name",
      value: formData.categoryName,
      options: loading
        ? []
        : categories
            ?.filter((cat) => !cat.parent_category_id)
            .map((cat) => ({
              label: cat.name,
              value: cat.id,
            })) || [],
    },
    {
      type: "select",
      key: "subCategoryName",
      label: "Sub Category Name",
      required: true,
      placeholder: "Sub Category name",
      value: formData.subCategoryName,
      options: subCategoriesLoading
        ? []
        : subCategories
            ?.filter((cat) => cat.parent_category_id === formData.categoryName)
            .map((sub) => ({
              label: sub.name,
              value: sub.id,
            })) || [],
    },
    {
      type: "select",
      key: "hsnCode",
      label: "HSN Code",
      required: true,
      placeholder: "Select HSN Code",
      value: formData.hsnCode,
      options: hsnLoading
        ? []
        : (hsnCodes || []).slice(0, 100).map((hsn) => ({
            label: `${hsn.hsn_code}${
              hsn.description
                ? ` - ${hsn.description.substring(0, 50)}${
                    hsn.description.length > 50 ? "..." : ""
                  }`
                : ""
            }`,
            value: hsn.hsn_code,
            description: hsn.description || "",
          })),
    },
    {
      type: "textarea",
      key: "shortDescription",
      label: "Short Description",
      required: true,
      placeholder: "Short description",
    },
    {
      type: "textarea",
      key: "productDescription",
      label: "Product Description",
      required: true,
      placeholder: "Product Description",
    },
  ];

  const productImagesFields = [
    {
      type: "image",
      key: "productImages",
      label: "Images List",
      required: true,
      accept: "image/*",
      uploadText: "Upload product images",
      uploadDescription: "PNG, JPG, GIF up to 10MB",
      aspect_ratio: "free",
      value: formData.productImages || [],
      handleImageLink: handleImageUpload,
    },
  ];

  const uomFields = [
    {
      type: "select",
      key: "uomType",
      label: "Uom Type",
      required: true,
      placeholder: "UOM Type",
      value: formData.uomType,
      options: uomLoading
        ? []
        : (uomTypes || []).map((uom) => ({
            label: uom.display_name,
            value: uom.lookup_code,
            id: uom.id, // Store the ID for later use
          })),
    },
    {
      type: "text",
      key: "uomValue",
      label: "Uom Value",
      required: true,
      placeholder: "UOM Value",
      value: formData.uomValue,
    },
  ];

  const pricingFields = [
    {
      type: "text",
      key: "mrp",
      label: "Mrp",
      required: true,
      placeholder: "MRP",
      startIcon: "₹",
      value: formData.mrp,
    },
    {
      type: "text",
      key: "salesPrice",
      label: "Sales Price",
      required: true,
      placeholder: "Sales Price",
      startIcon: "₹",
      value: formData.salesPrice,
    },
    {
      type: "select",
      key: "paymentMode",
      label: "Payment Mode",
      required: true,
      placeholder: "Select Payment Mode",
      value: formData.paymentMode,
      options: paymentModesLoading
        ? []
        : (paymentModes || []).map((mode) => ({
            label: mode.display_name,
            value: mode.lookup_code,
            id: mode.id, // Store the ID for later use
          })),
    },
  ];

  // Update the inventoryFields configuration
  const inventoryFields = [
    {
      type: "select",
      key: "location",
      label: "Select Location",
      required: true,
      placeholder: "Select location",
      value: formData.location,
      options: locationsLoading
        ? []
        : (locations || []).map((location: any) => {
            console.log("Mapping Location:", location);
            return {
              label: location.name,
              value: location.id.toString(),
            };
          }),
    },
    {
      type: "text",
      key: "itemInventory",
      label: "Add Item Inventory",
      required: true,
      placeholder: "Add item inventory",
      value: formData.itemInventory,
      endAdornment: (
        <select
          className="border-0 bg-transparent text-gray-500 text-sm"
          onChange={(e) => handleInputChange("inventoryUnit", e.target.value)}
        >
          <option value="pieces">Pieces</option>
          <option value="kg">KG</option>
          <option value="units">Units</option>
        </select>
      ),
    },
    {
      type: "text",
      key: "minimumItemCount",
      label: "Add Minimum Item Count",
      required: true,
      placeholder: "Add minimum item count",
      value: formData.minimumItemCount,
      endAdornment: (
        <select
          className="border-0 bg-transparent text-gray-500 text-sm"
          onChange={(e) => handleInputChange("minimumUnit", e.target.value)}
        >
          <option value="pieces">Pieces</option>
          <option value="kg">KG</option>
          <option value="units">Units</option>
        </select>
      ),
    },
  ];

  // Update the inventory details payload
  const handleSaveInventory = async () => {
    try {
      setIsSaving(true);

      // Get the SKU ID from local storage
      const storedSkuId = localStorage.getItem("current_sku_id");

      if (!storedSkuId) {
        toast.error("Please save basic information first");
        return;
      }

      const inventoryPayload = [
        {
          section_key: "INVENTORY",
          product_sku_id: storedSkuId,
          location_id: Number(formData.location),
          on_hand_quantity: Number(formData.itemInventory),
          alert_quantity: Number(formData.minimumItemCount),
        },
      ];

      const response = await dispatch(upsertInventory(inventoryPayload));
      if (response?.meta?.status) {
        toast.success("Inventory details saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save inventory details:", error);
      toast.error("Failed to save inventory details. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Add a check to disable the inventory save button if basic details haven't been saved
  const isBasicDetailsSaved = Boolean(localStorage.getItem("current_sku_id"));

  // Add debug logging
  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Form Data:", formData);
  }, [categories, formData]);

  // Add this useEffect for debugging
  useEffect(() => {
    console.log("Form Data:", formData);
    console.log("HSN Codes:", hsnCodes);
    console.log("HSN Loading:", hsnLoading);
  }, [formData, hsnCodes, hsnLoading]);

  // Add debug logging to track HSN data
  useEffect(() => {
    if (hsnCodes) {
      console.log("HSN Codes count:", hsnCodes.length);
      console.log("First HSN Code:", hsnCodes[0]);
    }
  }, [hsnCodes]);

  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  // Add this useEffect to track image uploads
  useEffect(() => {
    console.log("Product Images:", formData.productImages);
    console.log("SKU ID:", formData.skuId);
    console.log(
      "Save button should be enabled:",
      !(!formData.skuId || !formData.productImages?.length)
    );
  }, [formData.productImages, formData.skuId]);

  // Add this useEffect to debug button state
  useEffect(() => {
    const isDisabled = Boolean(
      isSaving ||
        !formData.skuId ||
        !Array.isArray(formData.productImages) ||
        formData.productImages.length === 0
    );

    console.log("Button state debug:", {
      isSaving,
      skuId: formData.skuId,
      hasImages: Array.isArray(formData.productImages),
      imagesLength: formData.productImages?.length,
      isDisabled,
    });
  }, [isSaving, formData.skuId, formData.productImages]);

  // Add useEffect to fetch locations when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await dispatch(getLocations());
        console.log("Locations API Response:", response);
        console.log("Locations Data:", response?.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [dispatch]);

  // Also log when locations data changes in the selector
  useEffect(() => {
    console.log("Current Locations State:", locations);
    console.log("Locations Loading:", locationsLoading);
  }, [locations, locationsLoading]);

  useEffect(() => {
    // Cleanup function
    return () => {
      localStorage.removeItem("current_sku_id");
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <p className="text-gray-600 mb-4">
          This information is helpful for you to track your product. This
          information will be displayed publicly so be careful what you share.
        </p>
        <AddForm
          data={basicInfoFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("Basic Information")}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Basic Information"}
          </button>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Product Images</h2>
        <p className="text-gray-600 mb-4">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <AddForm
          data={productImagesFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
          handleImageLink={handleImageUpload}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("Product Images")}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={Boolean(
              isSaving ||
                !formData.skuId ||
                !Array.isArray(formData.productImages) ||
                formData.productImages.length === 0
            )}
          >
            {isSaving ? "Saving..." : "Save Images"}
          </button>
        </div>
      </div>

      {/* Add this section after the Product Images section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Available Inventory</h2>
        <p className="text-gray-600 mb-4">
          This information will help us to map your inventory of the product.
        </p>
        <AddForm
          data={inventoryFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveInventory}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
              isSaving ||
              !isBasicDetailsSaved ||
              !formData.location ||
              !formData.itemInventory ||
              !formData.minimumItemCount
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              isSaving ||
              !isBasicDetailsSaved ||
              !formData.location ||
              !formData.itemInventory ||
              !formData.minimumItemCount
            }
          >
            {isSaving ? "Saving..." : "Save Inventory"}
          </button>
        </div>
      </div>

      {/* Unit of Measurement */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Unit of Measurement</h2>
        <p className="text-gray-600 mb-4">
          This information will help us to make the Measurement of your product.
        </p>
        <AddForm
          data={uomFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("Unit of Measurement")}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
              isSaving ||
              !formData.skuId ||
              !formData.uomType ||
              !formData.uomValue
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              isSaving ||
              !formData.skuId ||
              !formData.uomType ||
              !formData.uomValue
            }
          >
            {isSaving ? "Saving..." : "Save Measurements"}
          </button>
        </div>
      </div>

      {/* Pricing Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Pricing Details</h2>
        <p className="text-gray-600 mb-4">
          This information is product pricing which will be shown to your
          customers.
        </p>
        <AddForm
          data={pricingFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("Pricing Details")}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
              isSaving ||
              !formData.skuId ||
              !formData.mrp ||
              !formData.salesPrice ||
              !formData.paymentMode
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              isSaving ||
              !formData.skuId ||
              !formData.mrp ||
              !formData.salesPrice ||
              !formData.paymentMode
            }
          >
            {isSaving ? "Saving..." : "Save Pricing"}
          </button>
        </div>
      </div>

      {/* ONDC Details - Only show after basic details are saved */}
      {showOndcSection && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">ONDC Details</h2>
          <p className="text-gray-600 mb-4">
            This information will be shown to your customers.
          </p>

          {ondcLoading ? (
            <div>Loading ONDC details...</div>
          ) : (
            Object.entries(getOndcFieldsBySection()).map(
              ([sectionName, fields]: [string, any]) => (
                <div key={sectionName} className="mb-6">
                  <h3 className="text-lg font-medium mb-4">{sectionName}</h3>
                  <div className="grid gap-4">
                    {fields.map((field: any) => (
                      <div key={field.key} className="space-y-2">
                        {field.type === "checkbox" ? (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={field.key}
                              checked={field.checked}
                              onChange={(e) =>
                                handleInputChange(field.key, e.target.checked)
                              }
                              className="h-4 w-4 text-blue-600 rounded"
                            />
                            <label
                              htmlFor={field.key}
                              className="ml-2 text-sm text-gray-700"
                            >
                              {field.label}
                              {field.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                          </div>
                        ) : (
                          <AddForm
                            data={[field]}
                            handleInputonChange={handleInputChange}
                            handleSelectonChange={handleSelectChange}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={() => handleSave("ONDC Details")}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                isSaving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save ONDC Details"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductSeller;
