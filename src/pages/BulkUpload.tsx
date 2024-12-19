import React, { useState, useEffect } from "react";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getSubCategories,
  downloadTemplate,
  uploadTemplate
} from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import toast from "react-hot-toast";

const BulkUpload: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

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

  // Add console logs to debug the state
  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Selected Category:", selectedCategory);
    console.log("SubCategories:", subCategories);
    console.log("Selected SubCategory:", selectedSubCategory);
  }, [categories, selectedCategory, subCategories, selectedSubCategory]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(getCategories());
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [dispatch]);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategory) {
        try {
          await dispatch(getSubCategories(Number(selectedCategory)));
        } catch (error) {
          console.error("Failed to fetch subcategories:", error);
          toast.error("Failed to fetch subcategories");
        }
      }
    };

    fetchSubCategories();
  }, [selectedCategory, dispatch]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSelectedSubCategory(""); // Reset subcategory when category changes
  };

  const handleDownloadTemplate = async () => {
    try {
      if (!selectedCategory || !selectedSubCategory) {
        toast.error("Please select both category and sub-category");
        return;
      }

      await dispatch(
        downloadTemplate(Number(selectedCategory), Number(selectedSubCategory))
      );

      toast.success("Template downloaded successfully");
    } catch (error) {
      console.error("Failed to download template:", error);
      toast.error("Failed to download template");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Create a temporary URL for the file
        const fileUrl = URL.createObjectURL(file);
        
        // Prepare the data with the correct type
        const uploadData = {
          level1_category_id: Number(selectedCategory),
          level2_category_id: Number(selectedSubCategory),
          link: fileUrl
        };

        await dispatch(uploadTemplate(uploadData));
        
        // Clean up the temporary URL
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
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Note: Products created by admin will be treated as master catalogue and will be available in the master catalogue section.
          </p>
        </div>
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={selectedCategory}
              onChange={handleCategoryChange}
              disabled={categoriesLoading}
            >
              <option value="">Select Category</option>
              {categories?.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Category Name <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              disabled={!selectedCategory || subCategoriesLoading}
            >
              <option value="">Select Sub Category</option>
              {subCategories?.map((subCategory: any) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
            {subCategoriesLoading && (
              <p className="text-sm text-gray-500 mt-1">
                Loading subcategories...
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleDownloadTemplate}
          className={`flex items-center gap-2 text-blue-600 hover:text-blue-700 ${
            !selectedCategory || !selectedSubCategory || downloadLoading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={
            !selectedCategory || !selectedSubCategory || downloadLoading
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
