import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface FormData {
  branchName: string;
  companyName: string;
  createdDate: string;
  contactInformation: string;
  address: string;
  partnerCount: string;
  status: 'Active' | 'Inactive';
}

const EditBranch: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock initial data - replace with API call
  const [formData, setFormData] = useState({
    branchName: 'New Test Branch',
    companyName: 'New Test Company',
    email: 'new_company@test.com',
    phone: '9896863423',
    address: '3-44/3, gandhi nagar Chintal',
    partnerCount: '1'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // Navigate back after successful update
    navigate(-1);
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
        <h1 className="text-xl font-medium">Edit Branch</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.branchName}
              onChange={(e) => setFormData({...formData, branchName: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
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
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
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
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full p-2 border rounded-lg"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Partner Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.partnerCount}
              onChange={(e) => setFormData({...formData, partnerCount: e.target.value})}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBranch;