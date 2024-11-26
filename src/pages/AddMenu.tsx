import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../components/AddForm';
import { ChevronLeft } from 'lucide-react';

interface MenuFormData {
  menuName: string;
  menuCode: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  groupId: string;
}

const AddMenu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MenuFormData>({
    menuName: '',
    menuCode: '',
    category: '',
    shortDescription: '',
    longDescription: '',
    images: [],
    startDay: '',
    endDay: '',
    startTime: '',
    endTime: '',
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
    console.log('Saving menu:', formData);
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
          <h1 className="text-2xl font-semibold text-gray-900">Create Your Menu</h1>
          <p className="text-sm text-gray-500">Create your custom menu for your customers</p>
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
                  key: "menuName",
                  label: "Menu Name",
                  required: true,
                  value: formData.menuName,
                  placeholder: "Menu Name"
                },
                {
                  type: "text",
                  key: "menuCode",
                  label: "Menu Code",
                  required: true,
                  value: formData.menuCode,
                  placeholder: "Menu Code"
                },
                {
                  type: "select",
                  key: "category",
                  label: "Select Category",
                  required: true,
                  value: formData.category,
                  options: [
                    { value: "breakfast", label: "Breakfast" },
                    { value: "lunch", label: "Lunch" },
                    { value: "dinner", label: "Dinner" }
                  ],
                  placeholder: "Select Category"
                },
                {
                  type: "textarea",
                  key: "shortDescription",
                  label: "Menu Short Description",
                  required: true,
                  value: formData.shortDescription,
                  placeholder: "Brief description for your menu.",
                  description: "Menu Short description"
                },
                {
                  type: "textarea",
                  key: "longDescription",
                  label: "Menu Long Description",
                  required: true,
                  value: formData.longDescription,
                  placeholder: "Specific long description for your menu.",
                  description: "Menu Long description"
                }
              ]}
              handleInputonChange={handleInputChange}
              handleSelectonChange={handleInputChange}
            />
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Menu item images</h3>
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
                  required: true,
                  accept: "image/*",
                  uploadBoxStyle: "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                  uploadText: "Upload a file",
                  uploadDescription: "PNG, JPG, GIF up to 10MB",
                  onChange: handleImageUpload
                }
              ]}
            />
          </div>

          {/* Menu Hours Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Menu Hours</h3>
              <p className="text-sm text-gray-500">
                Tell us when you want to show your customers this menu.
              </p>
            </div>

            <AddForm
              data={[
                {
                  type: "select",
                  key: "startDay",
                  label: "Select Start Day",
                  required: true,
                  value: formData.startDay,
                  options: [
                    { value: "monday", label: "Monday" },
                    { value: "tuesday", label: "Tuesday" },
                    { value: "wednesday", label: "Wednesday" },
                    { value: "thursday", label: "Thursday" },
                    { value: "friday", label: "Friday" },
                    { value: "saturday", label: "Saturday" },
                    { value: "sunday", label: "Sunday" }
                  ],
                  placeholder: "Select Start Day"
                },
                {
                  type: "select",
                  key: "endDay",
                  label: "Select End Day",
                  required: true,
                  value: formData.endDay,
                  options: [
                    { value: "monday", label: "Monday" },
                    { value: "tuesday", label: "Tuesday" },
                    { value: "wednesday", label: "Wednesday" },
                    { value: "thursday", label: "Thursday" },
                    { value: "friday", label: "Friday" },
                    { value: "saturday", label: "Saturday" },
                    { value: "sunday", label: "Sunday" }
                  ],
                  placeholder: "Select End Day"
                },
                {
                  type: "text",
                  key: "startTime",
                  label: "Select Start Time",
                  required: true,
                  value: formData.startTime,
                  placeholder: "--:--"
                },
                {
                  type: "text",
                  key: "endTime",
                  label: "Select End Time",
                  required: true,
                  value: formData.endTime,
                  placeholder: "--:--"
                }
              ]}
              handleInputonChange={handleInputChange}
              handleSelectonChange={handleInputChange}
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

export default AddMenu; 