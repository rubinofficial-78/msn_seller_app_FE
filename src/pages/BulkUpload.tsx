import React, { useState } from 'react';
import { ArrowLeft, Download, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BulkUpload: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleDownloadTemplate = () => {
    // Add your download template logic here
    console.log('Downloading template...');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Add your file upload logic here
      console.log('Uploading file:', file);
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
          onClick={() => navigate('/dashboard/master-catalog')}
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
          <h2 className="text-lg font-medium mb-2">Select category and Sub category</h2>
          <p className="text-sm text-gray-600">
            Select category and sub categories that will help you download the correct .csv file with correct fields and make your work easy and flow smoother to upload your products.
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
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Category name</option>
              {/* Add your category options here */}
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
            >
              <option value="">Sub Category name</option>
              {/* Add your sub-category options here */}
            </select>
          </div>
        </div>

        <button
          onClick={handleDownloadTemplate}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <Download size={20} />
          Download Template
        </button>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Upload the file</h2>
          <p className="text-sm text-gray-600">Keep the file name as it is.</p>
          <p className="text-sm text-gray-600">
            Uploaded file will be verified and we will not accept the products that are not according to the standards of the .csv file, we can have a look at the upload history section and move forward.
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
            <p className="text-xs leading-5 text-gray-600">CSV file up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload; 