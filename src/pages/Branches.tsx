import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, LayoutGrid, List, Search } from 'lucide-react';
import CustomTable from '../components/CustomTable';

interface Branch {
  id: string;
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
}

// Define table columns for CustomTable
const tableColumns = [
  {
    id: 'branchName',
    key: 'branchName',
    label: 'Branch Name',
    minWidth: 180,
  },
  {
    id: 'companyName',
    key: 'companyName',
    label: 'Company Name',
    minWidth: 180,
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
    id: 'partnerCount',
    key: 'partnerCount',
    label: 'Partner Count',
    minWidth: 120,
    type: 'number'
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    minWidth: 200,
    type: 'status_toggle'
  }
];

// Mock data
const branchData: Branch[] = [
  {
    id: '1',
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
  },
  {
    id: '2',
    branchName: 'Downtown Branch',
    companyName: 'New Test Company',
    createdDate: '17-10-2024',
    contactInformation: {
      email: 'downtown@test.com',
      phone: '9876543210'
    },
    address: '45 Main Street, Downtown',
    partnerCount: 3,
    status: 'Active'
  },
  {
    id: '3',
    branchName: 'East Side Branch',
    companyName: 'New Test Company',
    createdDate: '16-10-2024',
    contactInformation: {
      email: 'eastside@test.com',
      phone: '9876543211'
    },
    address: '22 East Avenue',
    partnerCount: 2,
    status: 'Inactive'
  }
];

const Branches: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Branches');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('table');
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    total: branchData.length
  });
  const [branches, setBranches] = useState(branchData);

  // Get filtered and paginated data
  const getFilteredData = () => {
    let filtered = branches;
    
    // Filter based on active tab
    switch (activeTab) {
      case 'Active Branches':
        filtered = branches.filter(branch => branch.status === 'Active');
        break;
      case 'Inactive Branches':
        filtered = filtered.filter(branch => branch.status === 'Inactive');
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
  const handleRowClick = (row: Branch) => {
    navigate(`view/${row.id}`);
  };

  // Add status toggle handler
  const handleStatusToggle = async (row: Branch) => {
    // Update the branches state with the toggled status
    setBranches(prevBranches => 
      prevBranches.map(branch => 
        branch.id === row.id 
          ? { ...branch, status: branch.status === 'Active' ? 'Inactive' : 'Active' }
          : branch
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['All Branches', 'Active Branches', 'Inactive Branches'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab}
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
              placeholder="Search by Branch Name"
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
            <List size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            title="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => navigate('create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Branches Table */}
      <div className="bg-white rounded-lg shadow">
        <CustomTable
          headCells={tableColumns}
          data={getFilteredData().data}
          meta_data={meta_data}
          setParams={handleParamsChange}
          pagination={true}
          onRowClick={handleRowClick}
          onStatusToggle={handleStatusToggle}
        />
      </div>

      {/* Pagination info */}
      <div className="text-sm text-gray-500 text-right">
        Showing {meta_data.from} to {meta_data.to} of {meta_data.total} entries
      </div>
    </div>
  );
};

export default Branches;
