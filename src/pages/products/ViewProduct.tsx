import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  saveBasicDetails,
  bulkUpdateOndcDetails,
  getUomLookup,
  getPaymentModeLookup,
} from "../../redux/Action/action";
import { RootState } from "../../redux/types";
import { AppDispatch } from "../../redux/store";
import { ArrowLeft, Edit2 } from "lucide-react";
import AddForm from "../../components/AddForm";
import toast from "react-hot-toast";
import axios from "axios";
import GLOBAL_CONSTANTS from "../../GlobalConstants";

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: product, loading } = useSelector(
    (state: RootState) => state.data.selectedProduct
  );
  const { data: uomTypes, loading: uomLoading } = useSelector(
    (state: RootState) => state.data.uomLookup
  );
  const { data: paymentModes, loading: paymentModesLoading } = useSelector(
    (state: RootState) => state.data.paymentModeLookup
  );

  const [editMode, setEditMode] = useState({
    images: false,
    measurement: false,
    pricing: false,
    ondc: false,
  });

  const [formData, setFormData] = useState<{
    productImages?: string[];
    uomType?: string | number;
    uomValue?: string;
    mrp?: string | number;
    salesPrice?: string | number;
    paymentMode?: string | number;
    [key: string]: any;
  }>({});
  const [savingStates, setSavingStates] = useState({
    images: false,
    measurement: false,
    pricing: false,
    ondc: false,
  });

  const [timeOptions, setTimeOptions] = useState<
    Array<{
      label: string;
      value: string;
      id: number;
    }>
  >([]);

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev: typeof formData) => {
      if (typeof value === "boolean") {
        return {
          ...prev,
          [key]: value
        };
      }
      
      return {
        ...prev,
        [key]: value
      };
    });
  };

  const handleSelectChange = (key: string, value: any) => {
    setFormData((prev: typeof formData) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = (id: string, link: string | null) => {
    if (link) {
      setFormData((prev: typeof formData) => ({
        ...prev,
        productImages: [link]
      }));
    }
  };

  const handleSave = async (section: string) => {
    try {
      setSavingStates((prev) => ({
        ...prev,
        [section.toLowerCase()]: true,
      }));

      switch (section) {
        case "images":
          await dispatch(
            saveBasicDetails({
              section_key: "PRODUCT_IMAGE",
              sku_id: product.sku_id,
              image_arr: formData.productImages?.[0] ? [formData.productImages[0]] : []
            })
          );
          break;

        case "measurement":
          await dispatch(
            saveBasicDetails({
              section_key: "UOM",
              sku_id: product.sku_id,
              uom_id: Number(formData.uomType),
              uom_value: formData.uomValue,
            })
          );
          break;

        case "pricing":
          await dispatch(
            saveBasicDetails({
              section_key: "PRICING_DETAILS",
              sku_id: product.sku_id,
              mrp: Number(formData.mrp),
              sales_price: Number(formData.salesPrice),
              payment_type_id: Number(formData.paymentMode),
            })
          );
          break;

        case "ondc":
          if (product.category_attributes) {
            const bulkUpdatePayload = product.category_attributes.map((field: any) => {
              let value = formData[field.field_key];

              switch (field.type) {
                case "checkbox":
                  value = value !== undefined ? Boolean(value) : Boolean(field.value);
                  break;

                case "number":
                case "decimal":
                  value = value ? Number(value) : null;
                  break;

                case "dropdown":
                  if (isTimeRelatedField(field.field_name)) {
                    const selectedOption = timeOptions.find(
                      (opt) => opt.value === value
                    );
                    value = selectedOption
                      ? {
                          id: selectedOption.id,
                          label: selectedOption.label,
                          lookup_code: selectedOption.value,
                        }
                      : null;
                  } else if (field.data_source) {
                    value = value ? { id: Number(value) } : null;
                  }
                  break;

                case "date":
                  value = value || null;
                  break;

                default:
                  value = value || null;
              }

              return {
                id: field.id,
                value: value
              };
            });

            await dispatch(bulkUpdateOndcDetails(bulkUpdatePayload));
            
            setFormData(prev => ({
              ...prev,
              ...bulkUpdatePayload.reduce((acc: any, item: any) => {
                const field = product.category_attributes.find((f: any) => f.id === item.id);
                if (field) {
                  acc[field.field_key] = item.value;
                }
                return acc;
              }, {})
            }));
          }
          break;
      }

      setEditMode((prev) => ({
        ...prev,
        [section.toLowerCase()]: false,
      }));

      toast.success(`${section} updated successfully!`);
      dispatch(getProductById(Number(id))); // Refresh data
    } catch (error: any) {
      console.error(`Failed to save ${section}:`, error);
      const errorMessage =
        error.response?.data?.meta?.message ||
        error.message ||
        `Failed to save ${section}. Please try again.`;
      toast.error(errorMessage);
    } finally {
      setSavingStates((prev) => ({
        ...prev,
        [section.toLowerCase()]: false,
      }));
    }
  };

  const productImagesFields = [
    {
      type: "image",
      key: "productImages",
      label: "Images List",
      required: true,
      accept: "image/*",
      uploadText: "Upload product image",
      uploadDescription: "PNG, JPG, GIF up to 10MB",
      aspect_ratio: "free",
      value: formData.productImages?.[0] ? [formData.productImages[0]] : 
             product.image_arr?.[0] ? [product.image_arr[0]] : [],
      handleImageLink: handleImageUpload,
      maxFiles: 1,
    },
  ];

  const uomFields = [
    {
      type: "select",
      key: "uomType",
      label: "UOM Type",
      required: true,
      placeholder: "UOM Type",
      value: formData.uomType || product.uom?.id,
      options: uomLoading
        ? []
        : uomTypes?.map((uom) => ({
            label: uom.display_name,
            value: uom.id,
          })) || [],
    },
    {
      type: "text",
      key: "uomValue",
      label: "UOM Value",
      required: true,
      placeholder: "UOM Value",
      value: formData.uomValue || product.uom_value,
    },
  ];

  const pricingFields = [
    {
      type: "text",
      key: "mrp",
      label: "MRP",
      required: true,
      placeholder: "MRP",
      startIcon: <span>₹</span>,
      value: formData.mrp || product.mrp,
    },
    {
      type: "text",
      key: "salesPrice",
      label: "Sales Price",
      required: true,
      placeholder: "Sales Price",
      startIcon: <span>₹</span>,
      value: formData.salesPrice || product.sales_price,
    },
    {
      type: "select",
      key: "paymentMode",
      label: "Payment Mode",
      required: true,
      placeholder: "Select Payment Mode",
      value: formData.paymentMode || product.payment_type?.id,
      options: paymentModesLoading
        ? []
        : paymentModes?.map((mode) => ({
            label: mode.display_name,
            value: mode.id,
          })) || [],
    },
  ];

  const renderSection = (
    title: string,
    description: string,
    content: React.ReactNode,
    editableSection?: "images" | "measurement" | "pricing" | "ondc"
  ) => (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        {editableSection && (
          <button
            onClick={() =>
              setEditMode((prev) => ({
                ...prev,
                [editableSection]: !prev[editableSection],
              }))
            }
            className="p-2 text-gray-600 hover:text-blue-600"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        )}
      </div>
      {content}
      {editableSection && editMode[editableSection] && (
        <div className="mt-4">
          <AddForm
            data={
              editableSection === "images"
                ? productImagesFields
                : editableSection === "measurement"
                ? uomFields
                : editableSection === "pricing"
                ? pricingFields
                : []
            }
            handleInputonChange={handleInputChange}
            handleSelectonChange={handleSelectChange}
            handleImageLink={handleImageUpload}
          />
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() =>
                setEditMode((prev) => ({
                  ...prev,
                  [editableSection]: false,
                }))
              }
              className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(editableSection)}
              disabled={savingStates[editableSection]}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                ${
                  savingStates[editableSection]
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
            >
              {savingStates[editableSection] ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUomLookup());
    dispatch(getPaymentModeLookup());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      const ondcInitialValues = product.category_attributes?.reduce((acc: any, field: any) => {
        if (field.type === "dropdown") {
          if (isTimeRelatedField(field.field_name)) {
            acc[field.field_key] = field.value?.lookup_code || field.value || '';
          } else {
            acc[field.field_key] = field.value?.id || field.value || '';
          }
        } else if (field.type === "checkbox") {
          acc[field.field_key] = Boolean(field.value);
        } else {
          acc[field.field_key] = field.value || '';
        }
        return acc;
      }, {}) || {};

      setFormData({
        productImages: product.image_arr || [],
        uomType: product.uom?.id || "",
        uomValue: product.uom_value || "",
        mrp: product.mrp || "",
        salesPrice: product.sales_price || "",
        paymentMode: product.payment_type?.id || "",
        ...ondcInitialValues,
      });
    }
  }, [product]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const renderField = (label: string, value: any, required?: boolean) => {
    let displayValue = "--";

    if (value !== null && value !== undefined) {
      if (typeof value === "boolean") {
        displayValue = value ? "YES" : "NO";
      } else if (typeof value === "object") {
        displayValue = value.display_name || value.name || JSON.stringify(value);
      } else if (Array.isArray(value)) {
        displayValue = value.join(", ");
      } else {
        displayValue = String(value);
      }
    }

    return (
      <div className="space-y-1">
        <div className="text-sm text-gray-600">
          {label} {required && <span className="text-red-500">*</span>}
        </div>
        <div className="font-medium">{displayValue}</div>
      </div>
    );
  };

  const getOndcFieldValue = (fieldKey: string) => {
    const field = product.category_attributes?.find(
      (attr: any) => attr.field_key === fieldKey
    );

    if (!field) return null;

    if (field.type === "checkbox") {
      const checkboxValue = formData.hasOwnProperty(field.field_key) 
        ? formData[field.field_key] 
        : field.value;
      
      return Boolean(checkboxValue) ? "YES" : "NO";
    }

    if (typeof field.value === "object" && field.value !== null) {
      if (isTimeRelatedField(field.field_name)) {
        return field.value.label || field.value.display_name || null;
      }
      return field.value.display_name || field.value.name || field.value.label || null;
    }

    return formData.hasOwnProperty(field.field_key) 
      ? formData[field.field_key] 
      : field.value;
  };

  const getOndcFields = () => {
    if (!product.category_attributes) return [];

    const fields = product.category_attributes.map((field: any) => {
      const baseField = {
        key: field.field_key,
        label: field.field_name,
        required: field.category_id.is_mandatory,
        placeholder: field.placeholder || field.field_name,
      };

      // Special handling for known checkbox fields
      const checkboxFields = [
        "refund_eligible",
        "is_cancellable",
        "seller_pickup_return"
      ];

      if (checkboxFields.includes(field.field_key) || field.type === "checkbox") {
        const currentValue = formData[field.field_key] !== undefined 
          ? formData[field.field_key] 
          : field.value;
        
        return {
          ...baseField,
          type: "checkbox",
          value: Boolean(currentValue),
          checked: Boolean(currentValue),
        };
      }

      switch (field.type) {
        case "dropdown":
          if (isTimeRelatedField(field.field_name)) {
            const currentValue = formData[field.field_key] || field.value;
            return {
              ...baseField,
              type: "select",
              value: currentValue && typeof currentValue === 'object' ? currentValue.lookup_code : currentValue,
              options: timeOptions,
            };
          }

          // For other dropdowns
          const currentValue = formData[field.field_key] || field.value;
          return {
            ...baseField,
            type: "select",
            value: currentValue && typeof currentValue === 'object' ? currentValue.id : currentValue,
            options: field.data_source_values?.map((item: any) => ({
              label: item.display_name || item.name,
              value: item.id || item.value,
            })) || [],
          };

        case "decimal":
        case "number":
          return {
            ...baseField,
            type: "text",
            inputType: "number",
            value: formData[field.field_key] || field.value || '',
            endAdornment: field.field_name.toLowerCase().includes("weight")
              ? "gm"
              : field.field_name.toLowerCase().includes("length") ||
                field.field_name.toLowerCase().includes("width") ||
                field.field_name.toLowerCase().includes("height")
              ? "cm"
              : undefined,
          };

        case "date":
          return {
            ...baseField,
            type: "date",
            value: formData[field.field_key] || field.value || '',
          };

        case "textarea":
          return {
            ...baseField,
            type: "textarea",
            rows: 3,
            value: formData[field.field_key] || field.value || '',
          };

        default:
          return {
            ...baseField,
            type: "text",
            value: formData[field.field_key] || field.value || '',
          };
      }
    });

    return fields.sort((a: any, b: any) => {
      if (a.type === "checkbox" && b.type !== "checkbox") return -1;
      if (a.type !== "checkbox" && b.type === "checkbox") return 1;
      return 0;
    });
  };

  const isTimeRelatedField = (fieldName: string): boolean => {
    const timeFields = [
      "Return Within",
      "Time To Ship",
      "Time to Ship",
      "Expected Delivery_time",
    ];
    return timeFields.includes(fieldName);
  };

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
      {renderSection(
        "Basic Information",
        "Product basic details and identification information.",
        <div className="grid grid-cols-2 gap-6">
          {renderField("Product Title", product.name, true)}
          {renderField("SKU ID", product.sku_id, true)}
          {renderField("Category", product.level1_category?.name, true)}
          {renderField("Sub Category", product.level2_category?.name, true)}
          {renderField("HSN Code", product.hsn?.hsn_code, true)}
          {renderField("Short Description", product.short_desc, true)}
          {renderField("Product Description", product.long_desc, true)}
        </div>
      )}

      {/* Product Images */}
      {renderSection(
        "Product Images",
        "Product images and visual content.",
        <div className="grid grid-cols-4 gap-4">
          {product.image_arr?.[0] && (
            <img
              src={product.image_arr[0]}
              alt="Product"
              className="w-full h-32 object-cover rounded-lg"
            />
          )}
        </div>,
        "images"
      )}

      {/* Unit of Measurement */}
      {renderSection(
        "Unit of Measurement",
        "This information will help us to make the Measurement of your product.",
        <div className="grid grid-cols-2 gap-6">
          {renderField("UOM Type", product.uom?.display_name, true)}
          {renderField("UOM Value", product.uom_value, true)}
        </div>,
        "measurement"
      )}

      {/* Pricing Details */}
      {renderSection(
        "Pricing Details",
        "This information is product pricing which will be shown to your customers.",
        <div className="grid grid-cols-2 gap-6">
          {renderField("MRP", product.mrp ? `₹${product.mrp}` : null, true)}
          {renderField(
            "Sales Price",
            product.sales_price ? `₹${product.sales_price}` : null,
            true
          )}
          {renderField(
            "Payment Mode",
            product.payment_type?.display_name,
            true
          )}
        </div>,
        "pricing"
      )}

      {/* ONDC Details */}
      {renderSection(
        "ONDC Details",
        "This information will be shown to your customers.",
        <div className="grid grid-cols-2 gap-6">
          {editMode.ondc ? (
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-6">
                {/* Checkbox Fields */}
                <div className="col-span-2 space-y-4 mb-4">
                  {getOndcFields()
                    .filter((field: any) => field.type === "checkbox")
                    .map((field: any, index: number) => (
                      <div key={field.key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={field.key}
                          checked={field.checked}
                          onChange={(e) => handleInputChange(field.key, e.target.checked)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor={field.key} className="text-sm text-gray-700">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                      </div>
                    ))}
                </div>
                
                {/* Non-checkbox Fields */}
                {getOndcFields()
                  .filter((field: any) => field.type !== "checkbox")
                  .map((field: any) => (
                    <div key={field.key} className="space-y-2">
                      <AddForm
                        data={[field]}
                        handleInputonChange={handleInputChange}
                        handleSelectonChange={handleSelectChange}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <>
              {/* View mode - existing fields */}
              {renderField(
                "Refund Eligible",
                getOndcFieldValue("refund_eligible") ? "YES" : "NO"
              )}
              {renderField(
                "Is Cancellable",
                getOndcFieldValue("is_cancellable") ? "YES" : "NO"
              )}
              {renderField(
                "Seller Return Pickup",
                getOndcFieldValue("seller_pickup_return") ? "YES" : "NO"
              )}
              {renderField("Return Within", getOndcFieldValue("return_within"))}
              {renderField("Time To Ship", getOndcFieldValue("time_to_ship"))}
              {renderField(
                "Expected Delivery Time",
                getOndcFieldValue("expected_delivery_time")
              )}
              {renderField(
                "Expected Delivery Charge",
                getOndcFieldValue("delivery_charge")
              )}

              {/* Package Dimensions */}
              {renderField(
                "Package Length(Cm)",
                getOndcFieldValue("package_length")
              )}
              {renderField(
                "Package Width(Cm)",
                getOndcFieldValue("package_width")
              )}
              {renderField(
                "Package Height(Cm)",
                getOndcFieldValue("package_height")
              )}
              {renderField(
                "Package Weight(Gm)",
                getOndcFieldValue("package_weight")
              )}
              {renderField(
                "Volumetric Weight(Gm)",
                getOndcFieldValue("volumetric_weight"),
                true
              )}
              {renderField(
                "Package Cost",
                getOndcFieldValue("package_cost"),
                true
              )}

              {/* Contact Information */}
              {renderField("Name", getOndcFieldValue("name"), true)}
              {renderField("Email", getOndcFieldValue("email"), true)}
              {renderField("Phone Number", getOndcFieldValue("phone"), true)}

              {/* Manufacturing Details */}
              {renderField(
                "Manufacturer Name",
                getOndcFieldValue("manufacturer_or_packer_name"),
                true
              )}
              {renderField(
                "Manufacturer Address",
                getOndcFieldValue("manufacturer_or_packer_address"),
                true
              )}
              {renderField(
                "Generic Name Of Commodity",
                getOndcFieldValue("common_or_generic_name_of_commodity"),
                true
              )}
              {renderField(
                "Multiple Products Name Number Or Qty",
                getOndcFieldValue("multiple_products_name_number_or_qty")
              )}
              {renderField(
                "Net Quantity Or Measure Of Commodity In Pkg",
                getOndcFieldValue(
                  "net_quantity_or_measure_of_commodity_in_pkg"
                ),
                true
              )}
              {renderField(
                "Month Year Of Manufacture Packing Import",
                getOndcFieldValue("month_year_of_manufacture_packing_import"),
                true
              )}
              {renderField(
                "Imported Product Country Of Origin",
                getOndcFieldValue("imported_product_country_of_origin"),
                true
              )}
            </>
          )}
        </div>,
        "ondc"
      )}
    </div>
  );
};

export default ViewProduct;
