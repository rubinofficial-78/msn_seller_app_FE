import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateCompany } from '../redux/Action/action';
import toast from 'react-hot-toast';

const EditCompany: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Details
    companyName: 'New Test Company',
    whiteLabeledUrl: 'new.company.com',
    website: 'new.company.com',
    mobileNumber: '9896863423',
    email: 'new_company@test.com',
    address: '3-44/3, gandhi nagar Chintal',
    state: 'Telangana',
    
    // Contact Person Details
    contactPersonName: 'John Doe',
    contactPersonDesignation: 'Manager',
    contactPersonEmail: 'john@test.com',
    contactPersonPhone: '9876543210',
    
    // Banking Details
    bankName: 'Test Bank',
    accountNumber: '1234567890',
    ifscCode: 'TEST0001234',
    branchName: 'Test Branch',
    
    // Brand Settings
    logoUrl: '',
    primaryColor: '#1E40AF',
    secondaryColor: '#60A5FA'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const payload = {
        name: formData.companyName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        company_images: formData.logoUrl ? [formData.logoUrl] : [],
        contact_person_name: formData.contactPersonName,
        contact_person_email: formData.contactPersonEmail,
        contact_person_mobile: formData.contactPersonPhone,
        website: formData.website,
        address: formData.address,
        state: formData.state,
        city: formData.city || '',
        pincode: formData.pincode || '',
        gst_number: formData.gstNumber || '',
        pan_number: formData.panNumber || '',
        bank_account_number: formData.accountNumber,
        bank_account_holder_name: formData.accountHolderName || '',
        bank_name: formData.bankName,
        ifsc_code: formData.ifscCode,
        header_color: formData.primaryColor,
        url: formData.whiteLabeledUrl,
        header_style: {
          logo: formData.logoUrl,
          background_color: formData.primaryColor
        },
        seller_activation_min_charges: formData.minActivationCharges || "50",
        seller_activation_max_charges: formData.maxActivationCharges || "70"
      };

      const response = await dispatch(updateCompany(Number(id), payload));
      
      if (response?.meta?.status) {
        toast.success('Company updated successfully!');
        setTimeout(() => {
          navigate('/dashboard/companies');
        }, 1000);
      } else {
        toast.error(response?.meta?.message || 'Failed to update company');
      }

    } catch (error) {
      toast.error('Failed to update company: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-medium">Edit Company</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Partner Basics Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Company Partner Basics Details</h2>
          <p className="text-gray-600 text-sm mb-6">
            This information represents partner basic details which is useful for identification of a partner
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                White Labeled Url <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="E.g. seller.zionmar.in"
                value={formData.whiteLabeledUrl}
                onChange={(e) => setFormData({...formData, whiteLabeledUrl: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website
              </label>
              <input
                type="text"
                placeholder="Enter website URL"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-2 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter state"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Company Contact Person Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Company Contact Person Details</h2>
          <p className="text-gray-600 text-sm mb-6">
            Contact person information for primary communication
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter contact person name"
                value={formData.contactPersonName}
                onChange={(e) => setFormData({...formData, contactPersonName: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter designation"
                value={formData.contactPersonDesignation}
                onChange={(e) => setFormData({...formData, contactPersonDesignation: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                value={formData.contactPersonEmail}
                onChange={(e) => setFormData({...formData, contactPersonEmail: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={formData.contactPersonPhone}
                onChange={(e) => setFormData({...formData, contactPersonPhone: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Company Banking Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Company Banking Details</h2>
          <p className="text-gray-600 text-sm mb-6">
            Banking information for financial transactions
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter bank name"
                value={formData.bankName}
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                IFSC Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter IFSC code"
                value={formData.ifscCode}
                onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter branch name"
                value={formData.branchName}
                onChange={(e) => setFormData({...formData, branchName: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Company Brand Settings */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Company Brand Settings</h2>
          <p className="text-gray-600 text-sm mb-6">
            Customize the appearance of your company portal
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Logo
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded-lg"
                onChange={(e) => {
                  // Handle file upload
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                className="w-full h-10 p-1 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Color
              </label>
              <input
                type="color"
                value={formData.secondaryColor}
                onChange={(e) => setFormData({...formData, secondaryColor: e.target.value})}
                className="w-full h-10 p-1 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompany; 