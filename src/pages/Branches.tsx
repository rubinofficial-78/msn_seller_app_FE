import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit, LayoutGrid, List, Search } from 'lucide-react';
import CustomTable, { Column } from '../components/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches, getCompanyDropdown } from '../redux/Action/action';
import { AppDispatch, RootState } from '../redux/types';
import { toast } from 'react-hot-toast';

// Define table columns for CustomTable
const tableColumns: Column[] = [
  {
    id: 'name',
    key: 'name',
    label: 'Branch Name',
    minWidth: 180,
  },
  {
    id: 'parent',
    key: 'parent.name',
    label: 'Company Name',
    minWidth: 180,
  },
  {
    id: 'createdAt',
    key: 'createdAt',
    label: 'Created Date',
    minWidth: 140,
  },
  {
    id: 'contact',
    key: ['email', 'mobile_number'],
    label: 'Contact Information',
    minWidth: 200,
    join: true,
    join_type: 'multiline'
  },
  {
    id: 'address',
    key: 'default_address.address',
    label: 'Address',
    minWidth: 200,
  },
  {
    id: 'partner_counts',
    key: 'partner_counts',
    label: 'Partner Count',
    minWidth: 120,
    type: 'number'
  },
  {
    id: 'status',
    key: 'status.lookup_code',
    label: 'Status',
    minWidth: 120,
    type: 'status_toggle' as const
  }
];

const Branches: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState('All Branches');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'table'>('table');
  
  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10
  });

  const [selectedCompany, setSelectedCompany] = useState<string>('');

  // Get branches data from Redux store
  const { data: branches = [], loading = false, meta = null, error = null } = useSelector((state: RootState) => state.data.branches || {});

  // Get company dropdown data from Redux store
  const { data: companies = [] } = useSelector((state: RootState) => state.data.companyDropdown || {});

  // Fetch branches on mount and when params change
  useEffect(() => {
    dispatch(getBranches(params));
  }, [dispatch, params]);

  // Fetch companies on mount
  useEffect(() => {
    dispatch(getCompanyDropdown());
  }, [dispatch]);

  // Handle pagination params change
  const handleParamsChange = (newParams: { page?: number; per_page?: number }) => {
    setParams(prev => ({
      ...prev,
      page_no: newParams.page || prev.page_no,
      per_page: newParams.per_page || prev.per_page,
    }));
  };

  // Handle row click for view/edit actions
  const handleRowClick = (row: any) => {
    navigate(`view/${row.id}`);
  };

  // Add status toggle handler
  const handleStatusToggle = async (row: any) => {
    try {
      // TODO: Implement status toggle API call
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
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
          {/* Company Dropdown */}
          <div className="relative flex-1 max-w-xs">
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

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
            onClick={() => navigate('create')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Branches Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <CustomTable
            headCells={tableColumns}
            data={branches}
            meta_data={meta?.pagination}
            setParams={handleParamsChange}
            pagination={true}
            onRowClick={handleRowClick}
            onStatusToggle={handleStatusToggle}
          />
        </div>
      )}
    </div>
  );
};

export default Branches;
