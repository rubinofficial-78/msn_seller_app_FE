import React, { useState } from 'react';
import AddForm from '../components/AddForm';
import { ArrowLeft } from 'lucide-react';

interface PartnerFormData {
  companyName: string;
  branchName: string;
  partnerName: string;
  email: string;
  mobileNumber: string;
  website: string;
  aadhaarNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNo: string;
  panNo: string;
  bankAccountNumber: string;
  bankName: string;
  ifscNo: string;
  bankAccountHolderName: string;
  dynamicAffiliateUrl: string;
}

const CreatePartner: React.FC = () => {
  const [formData, setFormData] = useState<PartnerFormData>({} as PartnerFormData);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Form data:', formData);
    // Implement save logic
  };

  const formFields = [
    {
      title: 'Partner Basics',
      description: 'This information represents partner basic details which is useful for identification of a partner',
      fields: [
        {
          type: 'select',
          key: 'companyName',
          label: 'Company Name',
          required: true,
          value: formData.companyName,
          options: [
            { label: 'Company 1', value: 'company1' },
            { label: 'Company 2', value: 'company2' },
          ],
          placeholder: 'Select company'
        },
        {
          type: 'select',
          key: 'branchName',
          label: 'Branch Name',
          required: true,
          value: formData.branchName,
          options: [
            { label: 'Branch 1', value: 'branch1' },
            { label: 'Branch 2', value: 'branch2' },
          ],
          placeholder: 'Select branch'
        },
        {
          type: 'text',
          key: 'partnerName',
          label: 'Partner Name',
          required: true,
          value: formData.partnerName,
          placeholder: 'Enter partner name'
        },
        {
          type: 'email',
          key: 'email',
          label: 'Email',
          required: true,
          value: formData.email,
          placeholder: 'Enter email address'
        },
        {
          type: 'text',
          key: 'mobileNumber',
          label: 'Mobile Number',
          required: true,
          value: formData.mobileNumber,
          placeholder: 'Enter mobile number'
        },
        {
          type: 'text',
          key: 'website',
          label: 'Website',
          value: formData.website,
          placeholder: 'Enter website URL'
        },
        {
          type: 'text',
          key: 'aadhaarNumber',
          label: 'Aadhaar Number',
          required: true,
          value: formData.aadhaarNumber,
          placeholder: 'Enter Aadhaar number'
        },
        {
          type: 'textarea',
          key: 'address',
          label: 'Address',
          required: true,
          value: formData.address,
          placeholder: 'Enter complete address'
        },
        {
          type: 'text',
          key: 'city',
          label: 'City',
          required: true,
          value: formData.city,
          placeholder: 'Enter city'
        },
        {
          type: 'text',
          key: 'state',
          label: 'State',
          required: true,
          value: formData.state,
          placeholder: 'Enter state'
        },
        {
          type: 'text',
          key: 'pincode',
          label: 'Pincode',
          required: true,
          value: formData.pincode,
          placeholder: 'Enter pincode'
        }
      ]
    },
    {
      title: 'Partner Banking details',
      description: 'This information represents partner Banking details which is useful for payments of a partner',
      fields: [
        {
          type: 'text',
          key: 'gstNo',
          label: 'GST No',
          required: true,
          value: formData.gstNo,
          placeholder: 'Enter GST number'
        },
        {
          type: 'text',
          key: 'panNo',
          label: 'PAN No',
          required: true,
          value: formData.panNo,
          placeholder: 'Enter PAN number'
        },
        {
          type: 'text',
          key: 'bankAccountNumber',
          label: 'Bank Account Number',
          required: true,
          value: formData.bankAccountNumber,
          placeholder: 'Enter bank account number'
        },
        {
          type: 'text',
          key: 'bankName',
          label: 'Bank Name',
          required: true,
          value: formData.bankName,
          placeholder: 'Enter bank name'
        },
        {
          type: 'text',
          key: 'ifscNo',
          label: 'IFSC No',
          required: true,
          value: formData.ifscNo,
          placeholder: 'Enter IFSC code'
        },
        {
          type: 'text',
          key: 'bankAccountHolderName',
          label: 'Bank Account Holder Name',
          required: true,
          value: formData.bankAccountHolderName,
          placeholder: 'Enter account holder name'
        }
      ]
    },
    {
      title: 'Affiliate Settings and details',
      description: 'This information is important to grant affiliate URL and other important details for the partner.',
      fields: [
        {
          type: 'text',
          key: 'dynamicAffiliateUrl',
          label: 'Dynamic Affiliate Url',
          value: formData.dynamicAffiliateUrl,
          placeholder: 'Enter dynamic affiliate URL'
        }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => window.history.back()} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Create Partners</h1>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {formFields.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-2">{section.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{section.description}</p>
            <AddForm
              data={section.fields}
              handleInputonChange={handleInputChange}
              handleSelectonChange={handleSelectChange}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default CreatePartner;