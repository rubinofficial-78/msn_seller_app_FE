import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../../components/AddForm';
import { ArrowLeft } from 'lucide-react';

const AddSeller = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sellerName: '',
    storeName: '',
    email: '',
    phone: '',
    address: '',
    gstNo: '',
    companyName: '',
    branchName: '',
    partnerName: ''
  });

  const formFields = [
    {
      type: 'text',
      key: 'sellerName',
      label: 'Seller Name',
      value: formData.sellerName,
      required: true,
    },
    {
      type: 'text',
      key: 'storeName',
      label: 'Store Name',
      value: formData.storeName,
      required: true,
    },
    {
      type: 'email',
      key: 'email',
      label: 'Email',
      value: formData.email,
      required: true,
    },
    {
      type: 'text',
      key: 'phone',
      label: 'Phone Number',
      value: formData.phone,
      required: true,
    },
    {
      type: 'textarea',
      key: 'address',
      label: 'Address',
      value: formData.address,
      required: true,
    },
    {
      type: 'text',
      key: 'gstNo',
      label: 'GST Number',
      value: formData.gstNo,
      required: true,
    },
    {
      type: 'select',
      key: 'companyName',
      label: 'Company Name',
      value: formData.companyName,
      options: [], // Fetch from API
      required: true,
    },
    {
      type: 'select',
      key: 'branchName',
      label: 'Branch Name',
      value: formData.branchName,
      options: [], // Fetch based on selected company
      required: true,
    },
    {
      type: 'select',
      key: 'partnerName',
      label: 'Partner Name',
      value: formData.partnerName,
      options: [], // Fetch from API
      required: true,
    }
  ];

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    // API call to create seller
    try {
      // await createSeller(formData);
      navigate('/sellers');
    } catch (error) {
      console.error('Error creating seller:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add New Seller</h1>
        
        <AddForm
          data={formFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
          handleSaveOnClick={handleSubmit}
        />

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSeller; 