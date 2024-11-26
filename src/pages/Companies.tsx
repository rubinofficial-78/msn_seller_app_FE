import React, { useState } from 'react';
import { Search, Plus, ExternalLink, LayoutList, LayoutGrid, Table, Eye, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/CustomTable';

// Sample data for the companies table
const companyData = [
  {
    id: 1,
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
    id: 2, // Added missing id
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

const CompanyTable: React.FC<CompanyTableProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleStatusToggle = (index: number) => {
    // Your toggle logic here
  };

  return (
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
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
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
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={company.status === 'Active'}
                        onChange={() => handleStatusToggle(index)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {company.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Eye 
                      className="w-5 h-5 text-blue-600 cursor-pointer" 
                      onClick={() => navigate(`view/${company.id}`)}
                    />
                    <Edit 
                      className="w-5 h-5 text-blue-600 cursor-pointer" 
                      onClick={() => navigate(`edit/${company.id}`)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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

// Define table columns for CustomTable
const tableColumns = [
  {
    id: 'companyName',
    key: 'companyName',
    label: 'Company Name',
    minWidth: 180,
  },
  {
    id: 'whiteLabeledUrl',
    key: 'whiteLabeledUrl',
    label: 'White Labeled URL',
    minWidth: 180,
    type: 'link'
  },
  {
    id: 'companyWebsite',
    key: 'companyWebsite',
    label: 'Company Website',
    minWidth: 180,
    type: 'link'
  },
  {
    id: 'createdDate',
    key: 'createdDate',
    label: 'Created Date',
    minWidth: 140,
  },
  {
    id: 'contactInformation',
    key: ['contactInformation.email', 'contactInformation.phone'],
    label: 'Contact Information',
    minWidth: 200,
    join: true,
    join_type: 'multiline'
  },
  {
    id: 'address',
    key: 'address',
    label: 'Address',
    minWidth: 200,
  },
  {
    id: 'branchCount',
    key: 'branchCount',
    label: 'Branch Count',
    minWidth: 120,
    type: 'number'
  },
  {
    id: 'systemUsersCount',
    key: 'systemUsersCount',
    label: 'System Users Count',
    minWidth: 140,
    type: 'number'
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    minWidth: 200,
    type: 'status_toggle',
  },
  // {
  //   id: 'actions',
  //   key: 'actions',
  //   label: 'Actions',
  //   minWidth: 100,
  //   type: 'actions',
  // }
];

const Companies = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Companies');
  const [viewMode, setViewMode] = useState<'table' | 'list' | 'grid'>('table');
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    total: companyData.length
  });
  const [companies, setCompanies] = useState(companyData);

  // Get filtered and paginated data
  const getFilteredData = () => {
    let filtered = companies;
    
    // Filter based on active tab
    switch (activeTab) {
      case 'Active Companies':
        filtered = companies.filter(company => company.status === 'Active');
        break;
      case 'Inactive Companies':
        filtered = filtered.filter(company => company.status === 'Inactive');
        break;
      case 'System Users':
        filtered = filtered.filter(company => company.systemUsersCount > 0);
        break;
    }

    // Calculate pagination
    const startIndex = (params.page - 1) * params.per_page;
    const endIndex = startIndex + params.per_page;
    
    return {
      data: filtered.slice(startIndex, endIndex),
      total: filtered.length
    };
  };

  // Create metadata for pagination
  const meta_data = {
    total: getFilteredData().total,
    per_page: params.per_page,
    current_page: params.page,
    last_page: Math.ceil(getFilteredData().total / params.per_page),
    from: ((params.page - 1) * params.per_page) + 1,
    to: Math.min(params.page * params.per_page, getFilteredData().total)
  };

  // Handle pagination params change
  const handleParamsChange = (newParams: { page?: number; per_page?: number }) => {
    setParams(prev => ({
      ...prev,
      page: newParams.page || prev.page,
      per_page: newParams.per_page || prev.per_page,
    }));
  };

  // Handle row click for view/edit actions
  const handleRowClick = (row: any) => {
    // You can customize this based on which column was clicked
    navigate(`view/${row.id}`);
  };

  // Add status toggle handler
  const handleStatusToggle = async (row: any) => {
    // Update the companies state with the toggled status
    setCompanies(prevCompanies => 
      prevCompanies.map(company => 
        company.id === row.id 
          ? { ...company, status: company.status === 'Active' ? 'Inactive' : 'Active' }
          : company
      )
    );
  };

  const renderCompanies = () => {
    switch (viewMode) {
      case 'grid':
        return <CompanyGrid data={getFilteredData().data} />;
      case 'list':
        return <CompanyList data={getFilteredData().data} />;
      default:
        return (
          <div className="bg-white rounded-lg shadow">
            <CustomTable
              headCells={tableColumns}
              data={getFilteredData().data}
              meta_data={meta_data}
              setParams={handleParamsChange}
              pagination={true}
              onRowClick={handleRowClick}
              onStatusToggle={handleStatusToggle} // Add status toggle handler
            />
          </div>
        );
    }
  };

  const handleAddClick = () => {
    navigate('create');
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
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
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