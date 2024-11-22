// Copy the entire content from src/pages/settings/BankingDetails.tsx
// No changes needed to the file content import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../../components/AddForm';

const BankingDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    accountHolderName: '',
    cancelledCheque: ''
  });

  const formFields = [
    {
      type: 'text',
      key: 'accountNumber',
      label: 'Account Number',
      value: formData.accountNumber,
      required: true,
      placeholder: 'Enter your account number'
    },
    {
      type: 'text',
      key: 'bankName',
      label: 'Bank Name',
      value: formData.bankName,
      required: true,
      placeholder: 'Enter your bank name'
    },
    {
      type: 'text',
      key: 'ifscCode',
      label: 'IFSC Code',
      value: formData.ifscCode,
      required: true,
      placeholder: 'Enter IFSC code'
    },
    {
      type: 'text',
      key: 'accountHolderName',
      label: 'Account Holder Name',
      value: formData.accountHolderName,
      required: true,
      placeholder: 'Enter account holder name'
    },
    {
      type: 'image',
      key: 'cancelledCheque',
      label: 'Upload Your Cancelled Cheque',
      value: formData.cancelledCheque,
      required: true
    }
  ];

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Bank Details</h1>
            <p className="text-sm text-gray-600">
              This information will help us to setup your transactions and payments with the ONDC network.
            </p>
          </div>
        </div>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Deactivate
        </button>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-red-500">
            Bank Details Not Verified - 0/3
          </h2>
        </div>
        
        <AddForm
          data={formFields}
          handleInputonChange={handleInputChange}
          handleImageLink={(value) => handleInputChange('cancelledCheque', value)}
        />
      </div>
    </div>
  );
};

export default BankingDetails; 