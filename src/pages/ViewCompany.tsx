import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';

const ViewCompany: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - replace with API call
  const companyData = {
    companyName: 'New Test Company',
    whiteLabeledUrl: 'new.company.com',
    website: 'new.company.com',
    mobileNumber: '9896863423',
    email: 'new_company@test.com',
    address: '3-44/3, gandhi nagar Chintal',
    state: 'Telangana',
    contactPersonName: 'John Doe',
    contactPersonDesignation: 'Manager',
    contactPersonEmail: 'john@test.com',
    contactPersonPhone: '9876543210',
    bankName: 'Test Bank',
    accountNumber: '1234567890',
    ifscCode: 'TEST0001234',
    branchName: 'Test Branch',
    logoUrl: '',
    primaryColor: '#1E40AF',
    secondaryColor: '#60A5FA'
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
          <h1 className="text-xl font-medium">View Company</h1>
        </div>
        <button
          onClick={() => navigate(`/dashboard/companies/edit/${id}`)}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Edit size={20} />
          Edit
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Company Partner Basics Details</h2>
        <p className="text-gray-600 text-sm mb-6">
          This information represents partner basic details which is useful for identification of a partner
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Company Name</h3>
              <p className="mt-1">{companyData.companyName}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">White Labeled URL</h3>
              <p className="mt-1">{companyData.whiteLabeledUrl}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Website</h3>
              <p className="mt-1">{companyData.website}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Mobile Number</h3>
              <p className="mt-1">{companyData.mobileNumber}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="mt-1">{companyData.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Address</h3>
              <p className="mt-1">{companyData.address}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">State</h3>
              <p className="mt-1">{companyData.state}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Person Details */}
      <div className="bg-white rounded-lg p-6 mt-8">
        <h2 className="text-lg font-medium mb-4">Company Contact Person Details</h2>
        <p className="text-gray-600 text-sm mb-6">
          Contact person information for primary communication
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Contact Person Name</h3>
              <p className="mt-1">{companyData.contactPersonName}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Designation</h3>
              <p className="mt-1">{companyData.contactPersonDesignation}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="mt-1">{companyData.contactPersonEmail}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Phone Number</h3>
              <p className="mt-1">{companyData.contactPersonPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Banking Details */}
      <div className="bg-white rounded-lg p-6 mt-8">
        <h2 className="text-lg font-medium mb-4">Company Banking Details</h2>
        <p className="text-gray-600 text-sm mb-6">
          Banking information for financial transactions
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Bank Name</h3>
              <p className="mt-1">{companyData.bankName}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Account Number</h3>
              <p className="mt-1">{companyData.accountNumber}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">IFSC Code</h3>
              <p className="mt-1">{companyData.ifscCode}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Branch Name</h3>
              <p className="mt-1">{companyData.branchName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Settings */}
      <div className="bg-white rounded-lg p-6 mt-8">
        <h2 className="text-lg font-medium mb-4">Company Brand Settings</h2>
        <p className="text-gray-600 text-sm mb-6">
          Company branding and appearance settings
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Company Logo</h3>
              {companyData.logoUrl ? (
                <img 
                  src={companyData.logoUrl} 
                  alt="Company Logo" 
                  className="mt-1 h-20 object-contain"
                />
              ) : (
                <p className="mt-1 text-gray-400">No logo uploaded</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">Primary Color</h3>
              <div 
                className="mt-1 w-10 h-10 rounded-lg border"
                style={{ backgroundColor: companyData.primaryColor }}
              />
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Secondary Color</h3>
              <div 
                className="mt-1 w-10 h-10 rounded-lg border"
                style={{ backgroundColor: companyData.secondaryColor }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCompany; 