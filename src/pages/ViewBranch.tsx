import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';

const ViewBranch: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with API call using id
  const branchData = {
    branchName: 'New Test Branch',
    companyName: 'New Test Company',
    createdDate: '18-10-2024',
    contactInformation: {
      email: 'new_company@test.com',
      phone: '9896863423'
    },
    address: '3-44/3, gandhi nagar Chintal',
    partnerCount: 1,
    status: 'Active'
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium">View Branch</h1>
        </div>
        <button
          onClick={() => navigate(`/dashboard/branches/edit/${id}`)}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Edit size={20} />
          Edit
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Branch Name</h3>
              <p className="mt-1">{branchData.branchName}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Company Name</h3>
              <p className="mt-1">{branchData.companyName}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Created Date</h3>
              <p className="mt-1">{branchData.createdDate}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="mt-1">{branchData.contactInformation.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Phone Number</h3>
              <p className="mt-1">{branchData.contactInformation.phone}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Address</h3>
              <p className="mt-1">{branchData.address}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Partner Count</h3>
              <p className="mt-1">{branchData.partnerCount}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Status</h3>
              <span className={`inline-block px-2 py-1 mt-1 rounded-full text-xs ${
                branchData.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {branchData.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBranch; 