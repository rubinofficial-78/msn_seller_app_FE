import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ViewPartner = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with API call
  const partnerData = {
    partnerName: "New Test Partner",
    branchName: "New Test Branch",
    companyName: "New Test Company",
    affiliateUrl: "affiliate.company.com",
    createdDate: "18-10-2024",
    contactInformation: {
      email: "new_partner@test.com",
      phone: "9896863423",
    },
    address: "3-44/3, gandhi nagar Chintal",
    sellerCount: 1,
    status: "Active",
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
          <h1 className="text-2xl font-bold">View Partner</h1>
          <p className="text-sm text-gray-600">Partner ID: {id}</p>
        </div>
      </div>

      {/* Partner Details */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Partner Name</label>
              <p className="mt-1">{partnerData.partnerName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Branch Name</label>
              <p className="mt-1">{partnerData.branchName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Company Name</label>
              <p className="mt-1">{partnerData.companyName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Affiliate URL</label>
              <p className="mt-1">{partnerData.affiliateUrl}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Contact Information</label>
              <p className="mt-1">Email: {partnerData.contactInformation.email}</p>
              <p className="mt-1">Phone: {partnerData.contactInformation.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <p className="mt-1">{partnerData.address}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <p className="mt-1">{partnerData.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Seller Count</label>
              <p className="mt-1">{partnerData.sellerCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPartner; 