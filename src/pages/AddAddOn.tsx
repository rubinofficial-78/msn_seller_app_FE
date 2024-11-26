import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../components/AddForm';
import { ChevronLeft } from 'lucide-react';

interface AddOnFormData {
  name: string;
  code: string;
  parentGroupId: string;
  hsnCode: string;
  mrp: number;
  salesPrice: number;
  availableQuantity: number;
  maximumQuantity: number;
  addOnType: string;
  uomType: string;
  uomValue: string;
  images: string[];
  groupId: string;
}

const AddAddOn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AddOnFormData>({
    name: '',
    code: '',
    parentGroupId: '',
    hsnCode: '',
    mrp: 0,
    salesPrice: 0,
    availableQuantity: 0,
    maximumQuantity: 0,
    addOnType: '',
    uomType: '',
    uomValue: '',
    images: [],
    groupId: ''
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImageUpload = (files: FileList) => {
    // Handle image upload logic
    console.log('Uploading files:', files);
  };

  const handleSave = () => {
    console.log('Saving add-on:', formData);
    navigate('/dashboard/products');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/products')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create Add On</h1>
          <p className="text-sm text-gray-500">Add a new add-on to your products</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Basic Information</h3>
            <p className="text-sm text-gray-500 mb-4">
              This information is helpful for you to track your product. This information will be displayed publicly so be careful what you share.
            </p>

            <AddForm
              data={[
                {
                  type: "text",
                  key: "name",
                  label: "Add On Name",
                  required: true,
                  value: formData.name,
                  placeholder: "Add On Name"
                },
                {
                  type: "text",
                  key: "code",
                  label: "Add On Code",
                  required: true,
                  value: formData.code,
                  placeholder: "Add On Code"
                },
                {
                  type: "select",
                  key: "parentGroupId",
                  label: "Select Parent Group Id",
                  required: true,
                  value: formData.parentGroupId,
                  options: [
                    { value: "1", label: "Group 1" },
                    { value: "2", label: "Group 2" }
                  ],
                  placeholder: "Select Parent Group ID"
                },
                {
                  type: "text",
                  key: "hsnCode",
                  label: "Hsn Code",
                  required: true,
                  value: formData.hsnCode,
                  placeholder: "HSN Code"
                },
                {
                  type: "number",
                  key: "mrp",
                  label: "Mrp",
                  required: true,
                  value: formData.mrp,
                  placeholder: "MRP"
                },
                {
                  type: "number",
                  key: "salesPrice",
                  label: "Sales Price",
                  required: true,
                  value: formData.salesPrice,
                  placeholder: "Sales Price"
                },
                {
                  type: "number",
                  key: "availableQuantity",
                  label: "Add Available Quantity Allowed",
                  required: true,
                  value: formData.availableQuantity,
                  endIcon: <span className="text-gray-500">Units</span>
                },
                {
                  type: "number",
                  key: "maximumQuantity",
                  label: "Add Maximum Quantity Allowed",
                  required: true,
                  value: formData.maximumQuantity,
                  endIcon: <span className="text-gray-500">Units</span>
                },
                {
                  type: "select",
                  key: "addOnType",
                  label: "Select Add On Type",
                  required: true,
                  value: formData.addOnType,
                  options: [
                    { value: "veg", label: "Veg" },
                    { value: "non_veg", label: "Non-Veg" }
                  ],
                  placeholder: "Select Add On Type"
                },
                {
                  type: "select",
                  key: "uomType",
                  label: "Uom Type",
                  required: true,
                  value: formData.uomType,
                  options: [
                    { value: "kg", label: "Kilogram" },
                    { value: "g", label: "Gram" },
                    { value: "l", label: "Liter" }
                  ],
                  placeholder: "UOM Type"
                },
                {
                  type: "text",
                  key: "uomValue",
                  label: "Uom Value",
                  required: true,
                  value: formData.uomValue,
                  placeholder: "UOM value"
                }
              ]}
              handleInputonChange={handleInputChange}
              handleSelectonChange={handleInputChange}
            />
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">"Add on" item images</h3>
              <p className="text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <AddForm
              data={[
                {
                  type: "file",
                  key: "images",
                  label: "Images List",
                  accept: "image/*",
                  uploadBoxStyle: "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                  uploadText: "Upload a file",
                  uploadDescription: "PNG, JPG, GIF up to 10MB",
                  onChange: handleImageUpload
                }
              ]}
            />
          </div>

          {/* Custom Group Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Custom Group</h3>
              <p className="text-sm text-gray-500">
                This information will help us to map your inventory of the product.
              </p>
            </div>

            <AddForm
              data={[
                {
                  type: "select",
                  key: "groupId",
                  label: "Select Group",
                  required: true,
                  value: formData.groupId,
                  options: [
                    { value: "1", label: "Group 1" },
                    { value: "2", label: "Group 2" }
                  ],
                  placeholder: "Select Group"
                }
              ]}
              handleSelectonChange={handleInputChange}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <button
            onClick={() => navigate('/dashboard/products')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddOn; 