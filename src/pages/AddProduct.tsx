import React, { useState, useEffect } from "react";
import AddForm from "../components/AddForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategories, getHsnCodes } from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";

interface FormData {
  [key: string]: any; // Allow any string key
  categoryName: number | null;
  subCategoryName: number | null;
  productTitle: string;
  skuId: string;
  hsnCode: string;
  hsnDescription?: string;
  shortDescription: string;
  productDescription: string;
  // ... add other fields as needed
}

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories, loading } = useSelector(
    (state: RootState) => state.data.productCategories
  );
  const { data: hsnCodes, loading: hsnLoading } = useSelector(
    (state: RootState) => state.data.hsnCodes
  );

  // Initialize form data with the new fields
  const [formData, setFormData] = useState<FormData>({
    categoryName: null,
    subCategoryName: null,
    productTitle: "",
    skuId: "",
    hsnCode: "",
    hsnDescription: "",
    shortDescription: "",
    productDescription: "",
    // ... initialize other fields
  });

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

  // Update basicInfoFields to handle loading state and type the options properly
  const basicInfoFields = [
    {
      type: "text",
      key: "productTitle",
      label: "Product Title",
      required: true,
      placeholder: "Product Title",
    },
    {
      type: "text",
      key: "skuId",
      label: "Sku Id",
      required: true,
      placeholder: "SKU ID",
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
        : categories?.map((cat) => ({
            label: cat.name,
            value: cat.id,
            child_categories: cat.child_categories,
          })) || [],
    },
    {
      type: "select",
      key: "subCategoryName",
      label: "Sub Category Name",
      required: true,
      placeholder: "Sub Category name",
      value: formData.subCategoryName,
      options:
        formData.categoryName && categories
          ? categories
              .find((cat) => cat.id === formData.categoryName)
              ?.child_categories?.map((sub) => ({
                label: sub.name,
                value: sub.id,
              })) || []
          : [],
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
    },
  ];

  const uomFields = [
    {
      type: "select",
      key: "uomType",
      label: "Uom Type",
      required: true,
      placeholder: "UOM Type",
      options: [], // Add your UOM types here
    },
    {
      type: "text",
      key: "uomValue",
      label: "Uom Value",
      required: true,
      placeholder: "UOM Value",
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
    },
    {
      type: "text",
      key: "salesPrice",
      label: "Sales Price",
      required: true,
      placeholder: "Sales Price",
      startIcon: "₹",
    },
    {
      type: "select",
      key: "paymentMode",
      label: "Payment Mode",
      required: true,
      options: [], // Add payment modes here
    },
  ];

  const ondcFields = [
    {
      type: "radio",
      key: "refundEligible",
      label: "Refund Eligible",
      options: [
        { label: "YES", value: "yes" },
        { label: "NO", value: "no" },
      ],
    },
    {
      type: "radio",
      key: "isCancellable",
      label: "Is Cancellable",
      options: [
        { label: "YES", value: "yes" },
        { label: "NO", value: "no" },
      ],
    },
    {
      type: "radio",
      key: "sellerReturnPickup",
      label: "Seller Return Pickup",
      options: [
        { label: "YES", value: "yes" },
        { label: "NO", value: "no" },
      ],
    },
    {
      type: "select",
      key: "returnWithin",
      label: "Return Within",
      options: [
        { label: "Within 2 Working Days", value: "Within 2 Working Days" },
      ],
    },
    {
      type: "select",
      key: "timeToShip",
      label: "Time To Ship",
      required: true,
      options: [
        { label: "Within 2 Working Days", value: "Within 2 Working Days" },
      ],
    },
    {
      type: "select",
      key: "expectedDeliveryTime",
      label: "Expected Delivery Time",
      required: true,
      options: [
        { label: "Within 2 Working Days", value: "Within 2 Working Days" },
      ],
    },
    {
      type: "number",
      key: "expectedDeliveryCharge",
      label: "Expected Delivery Charge",
      placeholder: "Expected Delivery Charge",
    },
    {
      type: "number",
      key: "packageLength",
      label: "Package Length(Cm)",
      placeholder: "Package Length",
    },
    {
      type: "number",
      key: "packageWidth",
      label: "Package Width(Cm)",
      placeholder: "Package Width",
    },
    {
      type: "number",
      key: "packageHeight",
      label: "Package Height(Cm)",
      placeholder: "Package Height",
    },
    {
      type: "number",
      key: "packageWeight",
      label: "Package Weight(Gm)",
      placeholder: "Package Weight",
    },
    {
      type: "number",
      key: "volumetricWeight",
      label: "Volumetric Weight(Gm)",
      required: true,
      placeholder: "Volumetric Weight",
    },
    {
      type: "number",
      key: "packageCost",
      label: "Package Cost",
      required: true,
      placeholder: "Package Cost",
    },
    {
      type: "text",
      key: "name",
      label: "Name",
      required: true,
      placeholder: "Name",
    },
    {
      type: "email",
      key: "email",
      label: "Email",
      required: true,
      placeholder: "Email",
    },
    {
      type: "text",
      key: "phoneNumber",
      label: "Phone Number",
      required: true,
      placeholder: "Phone Number",
    },
    {
      type: "text",
      key: "manufacturerName",
      label: "Manufacturer Name",
      required: true,
      placeholder: "Manufacturer Name",
    },
    {
      type: "text",
      key: "manufacturerAddress",
      label: "Manufacturer Address",
      required: true,
      placeholder: "Manufacturer Address",
    },
    {
      type: "text",
      key: "genericNameOfCommodity",
      label: "Generic Name Of Commodity",
      required: true,
      placeholder: "Generic Name Of Commodity",
    },
    {
      type: "text",
      key: "multipleProductsNameNumberOrQty",
      label: "Multiple Products Name Number Or Qty",
      placeholder: "Multiple Products Name Number Or Qty",
    },
    {
      type: "text",
      key: "netQuantityOrMeasureOfCommodityInPkg",
      label: "Net Quantity Or Measure Of Commodity In Pkg",
      placeholder: "Net Quantity Or Measure",
    },
    {
      type: "text",
      key: "monthYearOfManufacturePackingImport",
      label: "Month Year Of Manufacture Packing Import",
      required: true,
      placeholder: "YYYY-MM-DD",
    },
    {
      type: "text",
      key: "importedProductCountryOfOrigin",
      label: "Imported Product Country Of Origin",
      required: true,
      placeholder: "Country of Origin",
    },
  ];

  // Type-safe input handler
  const handleInputChange = (key: string, value: any) => {
    console.log("Input changed:", key, value);
    if (key === "categoryName") {
      setFormData((prev) => ({
        ...prev,
        [key]: Number(value),
        subCategoryName: null,
      }));
    } else if (key === "subCategoryName") {
      setFormData((prev) => ({
        ...prev,
        [key]: Number(value),
      }));
    } else if (key === "hsnCode") {
      const selectedHsn = hsnCodes?.find((hsn) => hsn.hsn_code === value);
      console.log("Selected HSN:", selectedHsn);

      if (selectedHsn) {
        setFormData((prev) => ({
          ...prev,
          [key]: value,
          hsnDescription: selectedHsn.description,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [key]: value,
          hsnDescription: "",
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleSave = (section: string) => {
    // Add your save logic here
    console.log(`Saving ${section}...`, formData);
  };

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
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("Basic Information")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Basic Information
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
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("Product Images")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Images
          </button>
        </div>
      </div>

      {/* Unit of Measurement */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Unit of Measurement</h2>
        <p className="text-gray-600 mb-4">
          This information will help us to make the Measurement of your product.
        </p>
        <AddForm data={uomFields} handleInputonChange={handleInputChange} />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("Unit of Measurement")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Measurements
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
        <AddForm data={pricingFields} handleInputonChange={handleInputChange} />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("Pricing Details")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Pricing
          </button>
        </div>
      </div>

      {/* ONDC Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">ONDC Details</h2>
        <p className="text-gray-600 mb-4">
          This information is product pricing which will be shown to your
          customers.
        </p>
        <AddForm data={ondcFields} handleInputonChange={handleInputChange} />
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleSave("ONDC Details")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save ONDC Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
