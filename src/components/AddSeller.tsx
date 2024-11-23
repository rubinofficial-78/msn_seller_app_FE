import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from './AddForm';
import { ArrowLeft } from 'lucide-react';

const AddSeller = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    branchName: '',
    partnerName: '',
    sellerName: '',
    email: '',
    mobileNumber: '',
    storeName: '',
    storeWebsite: '',
    address: '',
    state: '',
    city: '',
    pinCode: '',
    gstNumber: '',
    businessType: '',
    govtAuthorizedProof: '',
    signature: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    beneficiaryName: '',
    cancelledCheque: ''
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      // API call here
      navigate('/dashboard/sellers');
    } catch (error) {
      console.error('Error creating seller:', error);
    }
  };

  const formFields = [
    {
      title: 'Seller Basics Details',
      description: 'This information represents partner basic details which is useful for identification of a partner',
      fields: [
        {
          type: 'select',
          key: 'companyName',
          label: 'Company Name',
          required: true,
          value: formData.companyName,
          placeholder: 'Select company name',
          options: [] // Fetch from API
        },
        {
          type: 'select',
          key: 'branchName',
          label: 'Branch Name',
          required: true,
          value: formData.branchName,
          placeholder: 'Select branch name',
          options: [] // Based on selected company
        },
        {
          type: 'select',
          key: 'partnerName',
          label: 'Partner Name',
          required: true,
          value: formData.partnerName,
          placeholder: 'Select partner name',
          options: [] // Fetch from API
        },
        {
          type: 'text',
          key: 'sellerName',
          label: 'Seller Name',
          required: true,
          value: formData.sellerName,
          placeholder: 'Enter seller name'
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
          key: 'storeName',
          label: 'Store Name',
          required: true,
          value: formData.storeName,
          placeholder: 'Enter store name'
        },
        {
          type: 'text',
          key: 'storeWebsite',
          label: 'Store Website',
          value: formData.storeWebsite,
          placeholder: 'Enter store website'
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
          key: 'state',
          label: 'State',
          required: true,
          value: formData.state,
          placeholder: 'Enter state'
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
          key: 'pinCode',
          label: 'Pin Code',
          required: true,
          value: formData.pinCode,
          placeholder: 'Enter pin code'
        }
      ]
    },
    {
      title: 'GST PAN Details',
      description: 'This information represents Company Contact Person details which is useful for further communication',
      fields: [
        {
          type: 'text',
          key: 'gstNumber',
          label: 'GST Number',
          required: true,
          value: formData.gstNumber,
          placeholder: 'Enter GST Number'
        },
        {
          type: 'radio',
          key: 'businessType',
          label: 'Business Type',
          required: true,
          value: formData.businessType,
          options: [
            { label: 'Sole Proprietorship', value: 'sole_proprietorship' },
            { label: 'Private Limited Company', value: 'private_limited' },
            { label: 'Partnerships', value: 'partnerships' }
          ]
        },
        {
          type: 'image',
          key: 'govtAuthorizedProof',
          label: 'Upload Government Authorized Id Proof',
          value: formData.govtAuthorizedProof,
          required: true,
          description: 'For the ID proof image, please ensure image is not blur or shine or has any light glare on it. Any Government Authorized ID proof will work. Like Aadhar Card, PAN Card, Voter ID Card etc.'
        },
        {
          type: 'image',
          key: 'signature',
          label: 'Upload Your Signature',
          value: formData.signature,
          required: true,
          description: 'Upload your signature which is required for legal documentations.'
        }
      ]
    },
    {
      title: 'Banking Details',
      description: 'This information represents Company Banking details which is useful for payments of a Company',
      fields: [
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
          key: 'ifscCode',
          label: 'IFSC Code',
          required: true,
          value: formData.ifscCode,
          placeholder: 'Enter IFSC code'
        },
        {
          type: 'text',
          key: 'accountNumber',
          label: 'Account Number',
          required: true,
          value: formData.accountNumber,
          placeholder: 'Enter account number'
        },
        {
          type: 'text',
          key: 'beneficiaryName',
          label: 'Name Of Beneficiary Account holder',
          required: true,
          value: formData.beneficiaryName,
          placeholder: 'Enter beneficiary name'
        },
        {
          type: 'image',
          key: 'cancelledCheque',
          label: 'Upload Bank Cheque',
          value: formData.cancelledCheque,
          required: true,
          description: 'Upload your cancelled Cheque which is required for banking verification and penny drop'
        }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Create Seller</h1>
      </div>

      <div className="space-y-8">
        {formFields.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-2">{section.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{section.description}</p>
            <AddForm
              data={section.fields}
              handleInputonChange={handleInputChange}
              handleSelectonChange={handleInputChange}
            />
          </div>
        ))}
      </div>

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

export default AddSeller; 