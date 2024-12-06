import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: string;
}

const CreateUser = () => {
  const navigate = useNavigate();
  const { userName } = useParams();
  const location = useLocation();
  const editUser = location.state?.user;

  const [formData, setFormData] = useState<UserFormData>({
    firstName: editUser ? editUser.userName.split(' ')[0] : '',
    lastName: editUser ? editUser.userName.split(' ')[1] || '' : '',
    email: editUser ? editUser.contactInfo.email : '',
    mobileNumber: editUser ? editUser.contactInfo.mobile : '',
    role: editUser ? editUser.roles : ''
  });

  const handleInputChange = (key: keyof UserFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Save user:', formData);
    navigate('/dashboard/settings/access-management');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          id="back-button"
          onClick={() => navigate('/dashboard/settings/access-management')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft id="back-button-icon" size={20} />
        </button>
        <h1 className="text-2xl font-semibold">{userName ? 'Edit User' : 'Create User'}</h1>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* User Basics */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-1">User Basics</h3>
          <p className="text-sm text-gray-500 mb-4">
            This information is helpful for you to track your user. This information will not be displayed publicly so be careful what you share.
          </p>

          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User / Agent First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="first-name-input"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User / Agent Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="last-name-input"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter last name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User / Agent Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email-input"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter email address"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User / Agent Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="mobile-number-input"
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter mobile number"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role-select"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Role</option>
                <option value="SELLER">SELLER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="COMPANY_PARTNER_USERS">COMPANY PARTNER USERS</option>
                <option value="AFFILIATE_PARTNER">AFFILIATE PARTNER</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            id="cancel-button"
            onClick={() => navigate('/dashboard/settings/access-management')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            id="save-user-button"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {userName ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser; 