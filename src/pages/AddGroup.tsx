import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../components/AddForm';
import { ChevronLeft } from 'lucide-react';

interface GroupFormData {
  groupName: string;
  groupCode: string;
  minCustomizations: number;
  maxCustomizations: number;
  levelId: string;
  description: string;
}

const AddGroup = () => {
  const navigate = useNavigate();
  const [groupFormData, setGroupFormData] = useState<GroupFormData>({
    groupName: '',
    groupCode: '',
    minCustomizations: 0,
    maxCustomizations: 1,
    levelId: '',
    description: ''
  });

  const handleGroupInputChange = (key: string, value: any) => {
    setGroupFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveGroup = () => {
    console.log('Saving group:', groupFormData);
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
          <h1 className="text-2xl font-semibold text-gray-900">Create My Groups</h1>
          <p className="text-sm text-gray-500">Create your custom groups for your customers</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Basic Information</h3>
            <p className="text-sm text-gray-500">
              This information is helpful for you to track your product. This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <AddForm
            data={[
              {
                type: "text",
                key: "groupName",
                label: "Custom Group Name",
                required: true,
                value: groupFormData.groupName,
                placeholder: "Custom Group Name"
              },
              {
                type: "text",
                key: "groupCode",
                label: "Custom Group Code",
                required: true,
                value: groupFormData.groupCode,
                placeholder: "Custom Group Code"
              },
              {
                type: "number",
                key: "minCustomizations",
                label: "Add Minimum Customisations Allowed",
                required: true,
                value: groupFormData.minCustomizations,
                endIcon: <span className="text-gray-500">Units</span>
              },
              {
                type: "number",
                key: "maxCustomizations",
                label: "Add Maximum Customisations Allowed",
                required: true,
                value: groupFormData.maxCustomizations,
                endIcon: <span className="text-gray-500">Units</span>
              },
              {
                type: "select",
                key: "levelId",
                label: "Select Level Id",
                required: true,
                value: groupFormData.levelId,
                options: [
                  { value: "1", label: "Level 1" },
                  { value: "2", label: "Level 2" },
                  { value: "3", label: "Level 3" }
                ],
                placeholder: "Select Level ID"
              },
              {
                type: "textarea",
                key: "description",
                label: "Group Description",
                value: groupFormData.description,
                placeholder: "Specific long description for your menu.",
                description: "Group description"
              }
            ]}
            handleInputonChange={handleGroupInputChange}
            handleSelectonChange={handleGroupInputChange}
          />
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
            onClick={handleSaveGroup}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroup; 