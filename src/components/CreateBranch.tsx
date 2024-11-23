import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from './AddForm';
import { ArrowLeft } from 'lucide-react';

interface BranchFormData {
  companyName: string;
  branchName: string;
  mobileNumber: string;
  email: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
}

const CreateBranch: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BranchFormData>({} as BranchFormData);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Implement save logic
    console.log('Form data:', formData);
  };

  const formFields = [
    {
      title: 'Company Branch Basics Details',
      description: 'This information represents branch basic details which is useful for identification of a partner',
      fields: [
        {
          type: 'select',
          key: 'companyName',
          label: 'Company Name',
          required: true,
          value: formData.companyName,
          placeholder: 'Company Name',
          options: [] // Populate with company list
        },
        {
          type: 'text',
          key: 'branchName',
          label: 'Branch Name',
          required: true,
          value: formData.branchName,
          placeholder: 'Branch Name'
        },
        {
          type: 'text',
          key: 'mobileNumber',
          label: 'Mobile Number',
          required: true,
          value: formData.mobileNumber,
          placeholder: 'Mobile Number'
        },
        {
          type: 'email',
          key: 'email',
          label: 'Email',
          required: true,
          value: formData.email,
          placeholder: 'Email'
        },
        {
          type: 'textarea',
          key: 'address',
          label: 'Address',
          required: true,
          value: formData.address,
          placeholder: 'Address'
        },
        {
          type: 'text',
          key: 'state',
          label: 'State',
          required: true,
          value: formData.state,
          placeholder: 'State'
        },
        {
          type: 'text',
          key: 'city',
          label: 'City',
          required: true,
          value: formData.city,
          placeholder: 'City'
        },
        {
          type: 'text',
          key: 'pincode',
          label: 'Pincode',
          required: true,
          value: formData.pincode,
          placeholder: 'Pincode'
        }
      ]
    }
  ];

  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-medium">Create Branch</h1>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg p-6">
        <AddForm
          data={formFields[0].fields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#1a237e] text-white rounded-lg"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default CreateBranch; 