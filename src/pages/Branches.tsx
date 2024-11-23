import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, LayoutGrid, List } from 'lucide-react';

interface Branch {
  branchName: string;
  companyName: string;
  createdDate: string;
  contactInformation: {
    email: string;
    phone: string;
  };
  address: string;
  partnerCount: number;
  status: 'Active' | 'Inactive';
  id: string; // Added id property to the Branch interface
}

const Branches: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Branches');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock data - replace with actual API call
  const branches: Branch[] = [
    {
      branchName: 'New Test Branch',
      companyName: 'New Test Company',
      createdDate: '18-10-2024',
      contactInformation: {
        email: 'new_company@test.com',
        phone: '9896863423'
      },
      address: '3-44/3, gandhi nagar Chintal',
      partnerCount: 1,
      status: 'Active',
      id: '1', // Added id to the branch object
    }
  ];

  const handleStatusToggle = (index: number) => {
    // Here you would typically make an API call to update the status
    const updatedBranches = [...branches];
    updatedBranches[index].status = updatedBranches[index].status === 'Active' ? 'Inactive' : 'Active';
    // setBranches(updatedBranches); // Uncomment when you have state management
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex space-x-8">
          {['All Branches', 'Active Branches', 'Inactive Branches'].map((tab) => (
            <button
              key={tab}
              className={`pb-4 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between my-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Branch Name"
            className="pl-10 pr-4 py-2 border rounded-lg w-[300px]"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
          <button
            onClick={() => navigate('create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus size={20} />
            ADD
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC] border-b">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">BRANCH NAME</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">COMPANY NAME</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">CREATED DATE</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">CONTACT INFORMATION</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">ADDRESS</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">PARTNER COUNT</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">STATUS</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch, index) => (
                <tr key={branch.id} className="border-b"> {/* Changed key from index to branch.id */}
                  <td className="px-6 py-4">{branch.branchName}</td>
                  <td className="px-6 py-4">{branch.companyName}</td>
                  <td className="px-6 py-4">{branch.createdDate}</td>
                  <td className="px-6 py-4">
                    <div>Email: {branch.contactInformation.email}</div>
                    <div>Phone: {branch.contactInformation.phone}</div>
                  </td>
                  <td className="px-6 py-4">{branch.address}</td>
                  <td className="px-6 py-4">
                    <span className="text-blue-600 cursor-pointer">{branch.partnerCount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={branch.status === 'Active'}
                          onChange={() => handleStatusToggle(index)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        branch.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {branch.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Eye 
                        className="w-5 h-5 text-blue-600 cursor-pointer" 
                        onClick={() => navigate(`view/${branch.id}`)}
                      />
                      <Edit 
                        className="w-5 h-5 text-blue-600 cursor-pointer" 
                        onClick={() => navigate(`edit/${branch.id}`)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {branches.map((branch, index) => (
            <div key={branch.id} className="bg-white rounded-lg shadow p-6"> {/* Changed key from index to branch.id */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{branch.branchName}</h3>
                  <p className="text-sm text-gray-500">{branch.companyName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={branch.status === 'Active'}
                      onChange={() => handleStatusToggle(index)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    branch.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {branch.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">Created: {branch.createdDate}</p>
                <div>
                  <p className="text-gray-600">Contact Information:</p>
                  <p>Email: {branch.contactInformation.email}</p>
                  <p>Phone: {branch.contactInformation.phone}</p>
                </div>
                <p className="text-gray-600">Address: {branch.address}</p>
                <p className="text-gray-600">
                  Partner Count: <span className="text-blue-600 cursor-pointer">{branch.partnerCount}</span>
                </p>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Branches;
