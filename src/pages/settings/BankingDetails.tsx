import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../../components/AddForm';

const BankingDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gstnumber: '',
    panNumber: '',
    tanNumber: '',
    currentBankName: '',
    currentAccountNumber: '',
    currentIfscCode: '',
    currentBankHolderName: '',
  });

  const formFields = [
    {
      type: 'text',
      key: 'gstnumber',
      label: 'GST No',
      value: formData.gstnumber,
      required: true,
      placeholder: 'Enter your GST number'
    },
    {
      type: 'text',
      key: 'pannumber',
      label: 'Pan No',
      value: formData.panNumber,
      required: true,
      placeholder: 'Enter your PAN number'
    },
    {
      type: 'text',
      key: 'tanNumber',
      label: 'Tan No',
      value: formData.tanNumber,
      required: true,
      placeholder: 'Enter TAN number'
    },
    {
      type: 'text',
      key: 'currentBankName',
      label: 'Current Bank Name',
      value: formData.currentBankName,
      required: true,
      placeholder: 'Enter current bank name'
    },
    {
      type: 'text',
      key: 'currentAccountNumber',
      label: 'Current Account Number',
      value: formData.currentAccountNumber,
      required: true,
      placeholder: 'Enter current account number'
    },
    {
      type: 'text',
      key: 'currentIfscCode',
      label: 'Current IFSC Code',
      value: formData.currentIfscCode,
      required: true,
      placeholder: 'Enter current IFSC code'
    },
    {
      type: 'text',
      key: 'currentBankHolderName',
      label: 'Current Bank Holder Name',
      value: formData.currentBankHolderName,
      required: true,
      placeholder: 'Enter current bank holder name'
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
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Save and Update
        </button>
      </div>

      <div className="bg-white rounded-lg p-6">
         
        
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