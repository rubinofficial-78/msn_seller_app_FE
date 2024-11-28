import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AddForm from '../../components/AddForm';

const EditPartner = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with API call
  const partnerData = {
    partnerName: "New Test Partner",
    branchName: "New Test Branch",
    companyName: "New Test Company",
    affiliateUrl: "affiliate.company.com",
    contactInformation: {
      email: "new_partner@test.com",
      phone: "9896863423",
    },
    address: "3-44/3, gandhi nagar Chintal",
  };

  const formFields = [
    {
      type: 'text',
      key: 'partnerName',
      label: 'Partner Name',
      required: true,
      value: partnerData.partnerName
    },
    {
      type: 'text',
      key: 'branchName',
      label: 'Branch Name',
      required: true,
      value: partnerData.branchName
    },
    {
      type: 'text',
      key: 'companyName',
      label: 'Company Name',
      required: true,
      value: partnerData.companyName
    },
    {
      type: 'text',
      key: 'affiliateUrl',
      label: 'Affiliate URL',
      required: true,
      value: partnerData.affiliateUrl
    },
    {
      type: 'text',
      key: 'email',
      label: 'Email',
      required: true,
      value: partnerData.contactInformation.email
    },
    {
      type: 'text',
      key: 'phone',
      label: 'Phone',
      required: true,
      value: partnerData.contactInformation.phone
    },
    {
      type: 'textarea',
      key: 'address',
      label: 'Address',
      required: true,
      value: partnerData.address
    }
  ];

  const handleInputChange = (key: string, value: string) => {
    console.log(key, value);
  };

  const handleSave = () => {
    // Handle save logic
    navigate(-1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Edit Partner</h1>
          <p className="text-sm text-gray-600">Partner ID: {id}</p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <AddForm
            data={formFields}
            handleInputonChange={handleInputChange}
            handleSaveOnClick={handleSave}
          />
          
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPartner; 