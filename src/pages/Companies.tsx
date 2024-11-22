import React, { useState } from 'react';
import { Search, Plus, ExternalLink, LayoutList, LayoutGrid, Table } from 'lucide-react';

// Sample data for the companies table
const companyData = [
  {
    companyName: 'New Test Company',
    whiteLabeledUrl: 'new.company.com',
    companyWebsite: 'new.company.com',
    createdDate: '18-10-2024',
    contactInformation: {
      email: 'new_company@test.com',
      phone: '9896863423'
    },
    address: '3-44/3, gandhi nagar Chintal',
    branchCount: 1,
    systemUsersCount: 0,
    status: 'Active'
  },
  {
    companyName: 'Role Company',
    whiteLabeledUrl: 'company.com',
    companyWebsite: 'company.com',
    createdDate: '16-10-2024',
    contactInformation: {
      email: 'company@tmail.in',
      phone: '7892580147'
    },
    address: 'hyderabad, sector 4, main villa park venue',
    branchCount: 1,
    systemUsersCount: 0,
    status: 'Active'
  },
  // Add more sample data as needed
];

export { companyData };

// Tab type definition
interface Tab {
  label: string;
  count?: number;
}

const tabs: Tab[] = [
  { label: 'All Companies' },
  { label: 'Active Companies' },
  { label: 'Inactive Companies' },
  { label: 'System Users' }
];

interface CompanyTableProps {
  data: typeof companyData;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ data }) => (
  <div className="h-[calc(100vh-280px)] flex flex-col bg-white rounded-lg shadow">
    {/* Table Header - Fixed */}
    <div className="bg-blue-50">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company name
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              White Labeled Url
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company Website
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created Date
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact Information
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Branch Count
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              System Users Count
            </th>
            <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
      </table>
    </div>

    {/* Table Body - Scrollable */}
    <div className="flex-1 overflow-auto">
      <table className="min-w-full">
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((company, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {company.companyName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                <a href={`https://${company.whiteLabeledUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  {company.whiteLabeledUrl}
                  <ExternalLink size={14} />
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                <a href={`https://${company.companyWebsite}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  {company.companyWebsite}
                  <ExternalLink size={14} />
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {company.createdDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div>
                  <div className="text-gray-900">Email: {company.contactInformation.email}</div>
                  <div className="text-gray-900">Phone: {company.contactInformation.phone}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {company.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                <a href="#" className="flex items-center gap-1">
                  {company.branchCount}
                  <ExternalLink size={14} />
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                <a href="#" className="flex items-center gap-1">
                  {company.systemUsersCount}
                  <ExternalLink size={14} />
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {company.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CompanyGrid: React.FC<CompanyTableProps> = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((company, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm font-medium text-gray-900">{company.companyName}</p>
            <p className="text-xs text-gray-500">{company.createdDate}</p>
          </div>
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
            ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {company.status}
          </span>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Website</p>
            <a href={`https://${company.companyWebsite}`} target="_blank" rel="noopener noreferrer" 
               className="text-sm text-blue-600 flex items-center gap-1">
              {company.companyWebsite}
              <ExternalLink size={14} />
            </a>
          </div>

          <div>
            <p className="text-xs text-gray-500">Contact Information</p>
            <div className="text-sm text-gray-900">
              <p>Email: {company.contactInformation.email}</p>
              <p>Phone: {company.contactInformation.phone}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-900">{company.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Branches</p>
              <a href="#" className="text-sm text-blue-600 flex items-center gap-1">
                {company.branchCount}
                <ExternalLink size={14} />
              </a>
            </div>
            <div>
              <p className="text-xs text-gray-500">System Users</p>
              <a href="#" className="text-sm text-blue-600 flex items-center gap-1">
                {company.systemUsersCount}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CompanyList: React.FC<CompanyTableProps> = ({ data }) => (
  <div className="space-y-3">
    {data.map((company, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-900">{company.companyName}</p>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {company.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">{company.createdDate}</p>
          </div>
          <a href={`https://${company.companyWebsite}`} target="_blank" rel="noopener noreferrer" 
             className="text-sm text-blue-600 flex items-center gap-1">
            {company.companyWebsite}
            <ExternalLink size={14} />
          </a>
        </div>
        
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Contact Information</p>
            <div className="text-sm text-gray-900">
              <p>Email: {company.contactInformation.email}</p>
              <p>Phone: {company.contactInformation.phone}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-900">{company.address}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-gray-500">Branches</p>
              <a href="#" className="text-sm text-blue-600 flex items-center gap-1">
                {company.branchCount}
                <ExternalLink size={14} />
              </a>
            </div>
            <div>
              <p className="text-xs text-gray-500">System Users</p>
              <a href="#" className="text-sm text-blue-600 flex items-center gap-1">
                {company.systemUsersCount}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Companies = () => {
  const [activeTab, setActiveTab] = useState('All Companies');
  const [viewMode, setViewMode] = useState<'table' | 'list' | 'grid'>('table');

  const renderCompanies = () => {
    switch (viewMode) {
      case 'grid':
        return <CompanyGrid data={companyData} />;
      case 'list':
        return <CompanyList data={companyData} />;
      default:
        return <CompanyTable data={companyData} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.label
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Company Name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* View Controls and Add Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            title="List view"
          >
            <LayoutList size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            title="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            title="Table view"
          >
            <Table size={20} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Render Companies based on view mode */}
      {renderCompanies()}
    </div>
  );
};

export default Companies;