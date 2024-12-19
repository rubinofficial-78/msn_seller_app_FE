import React, { useState, useEffect } from "react";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  // getSubCategories,
  downloadTemplate,
  uploadTemplate,
} from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import toast from "react-hot-toast";
import AddForm from "../components/AddForm";

const BulkUpload: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Update state to use formData object
  const [formData, setFormData] = useState({
    categoryName: null,
    subCategoryName: null,
  });

  // Get categories and subcategories from Redux store
  const {
    data: categories,
    loading: categoriesLoading,
    subCategories,
  } = useSelector((state: RootState) => state.data.productCategories);

  const { loading: subCategoriesLoading } = useSelector(
    (state: RootState) => state.data.productCategories
  );

  const { loading: downloadLoading } = useSelector(
    (state: RootState) => state.data.templateDownload
  );

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.categoryName) {
      dispatch(getCategories(Number(formData.categoryName)));
    }
  }, [formData.categoryName, dispatch]);

  // Define form fields
  const bulkUploadFields = [
    {
      type: "select",
      key: "categoryName",
      label: "Category Name",
      required: true,
      placeholder: "Select Category",
      value: formData.categoryName || "",
      options: categoriesLoading
        ? []
        : categories
            ?.filter((cat: any) => !cat.parent_category_id)
            .map((cat: any) => ({
              label: cat.name,
              value: cat.id,
            })) || [],
      id: "select-category-name",
    },
    {
      type: "select",
      key: "subCategoryName",
      label: "Sub Category Name",
      required: true,
      searchable: true,
      placeholder: "Select Sub Category",
      value: formData.subCategoryName || "",
      options: subCategoriesLoading
        ? []
        : categories
            ?.filter(
              (cat: any) => cat.parent_category_id === formData.categoryName
            )
            .map((sub: any) => ({
              label: sub.name,
              value: sub.id,
            })) || [],
      id: "select-sub-category-name",
      disabled: !formData.categoryName,
    },
  ];

  // Handle form changes
  const handleSelectChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      // Reset subcategory when category changes
      ...(key === "categoryName" ? { subCategoryName: null } : {}),
    }));
  };

  const handleDownloadTemplate = async () => {
    try {
      if (!formData.categoryName || !formData.subCategoryName) {
        toast.error("Please select both category and sub-category");
        return;
      }

      await dispatch(
        downloadTemplate(
          Number(formData.categoryName),
          Number(formData.subCategoryName)
        )
      );
      toast.success("Template downloaded successfully");
    } catch (error) {
      console.error("Failed to download template:", error);
      toast.error("Failed to download template");
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileUrl = URL.createObjectURL(file);

        const uploadData = {
          level1_category_id: Number(formData.categoryName),
          level2_category_id: Number(formData.subCategoryName),
          link: fileUrl,
        };

        await dispatch(uploadTemplate(uploadData));
        URL.revokeObjectURL(fileUrl);

        toast.success("Template uploaded successfully");
        navigate("/dashboard/products");
      } catch (error) {
        console.error("Failed to upload template:", error);
        toast.error("Failed to upload template");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={() => navigate("/dashboard/master-catalog")}
          className="text-blue-600 hover:text-blue-700"
        >
          View upload History
        </button>
      </div>

      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-semibold">Bulk Upload via .csv</h1>
        <p className="text-gray-600 mt-2">Personal details and application.</p>
      </div>

      {/* Category Selection Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-2">
            Select category and Sub category
          </h2>
          <p className="text-sm text-gray-600">
            Select category and sub categories that will help you download the
            correct .csv file with correct fields and make your work easy and
            flow smoother to upload your products.
          </p>
        </div>

        <AddForm
          data={bulkUploadFields}
          handleSelectonChange={handleSelectChange}
        />

        <button
          onClick={handleDownloadTemplate}
          className={`flex items-center gap-2 text-blue-600 hover:text-blue-700 ${
            !formData.categoryName ||
            !formData.subCategoryName ||
            downloadLoading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={
            !formData.categoryName ||
            !formData.subCategoryName ||
            downloadLoading
          }
        >
          <Download size={20} />
          {downloadLoading ? "Downloading..." : "Download Template"}
        </button>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Upload the file</h2>
          <p className="text-sm text-gray-600">Keep the file name as it is.</p>
          <p className="text-sm text-gray-600">
            Uploaded file will be verified and we will not accept the products
            that are not according to the standards of the .csv file, we can
            have a look at the upload history section and move forward.
          </p>
        </div>

        <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                <span>Upload Template</span>
                <input
                  type="file"
                  className="sr-only"
                  accept=".csv"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              CSV file up to 10MB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
