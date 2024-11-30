import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Plus, Search } from "lucide-react";
import CustomTable, { Column } from "../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getPartners, getCompanyDropdown, getBranchDropdown } from "../redux/Action/action";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/types";
import { toast } from "react-hot-toast";

const Partners: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("all");

  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10,
    company_id: undefined as number | undefined,
    branch_id: undefined as number | undefined
  });

  // Get data from Redux store
  const { data: partners = [], loading = false, meta = null, error = null } = useSelector(
    (state: RootState) => state.data.partners || {}
  );

  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  const { data: branches = [] } = useSelector(
    (state: RootState) => state.data.branchDropdown || {}
  );

  // Fetch data on mount
  useEffect(() => {
    dispatch(getCompanyDropdown());
    dispatch(getBranchDropdown());
  }, [dispatch]);

  // Fetch partners when params change
  useEffect(() => {
    dispatch(getPartners(params));
  }, [dispatch, params]);

  // Handle company selection
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = e.target.value ? parseInt(e.target.value) : undefined;
    setParams(prev => ({
      ...prev,
      page_no: 1,
      company_id: companyId
    }));
  };

  // Handle branch selection
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branchId = e.target.value ? parseInt(e.target.value) : undefined;
    setParams(prev => ({
      ...prev,
      page_no: 1,
      branch_id: branchId
    }));
  };

  // Add handleParamsChange function
  const handleParamsChange = (newParams: { page?: number; per_page?: number }) => {
    setParams(prev => ({
      ...prev,
      page_no: newParams.page || prev.page_no,
      per_page: newParams.per_page || prev.per_page,
    }));
  };

  // Add interface for branch type
  interface Branch {
    id: number;
    name: string;
    email: string;
    mobile_number: string;
    is_active: boolean;
  }

  // Define table columns inside the component to access navigate
  const tableColumns: Column[] = [
    {
      id: 'name',
      key: 'name',
      label: 'Partner Name',
      minWidth: 150
    },
    {
      id: 'parent_company',
      key: 'parent_company.name',
      label: 'Company Name',
      minWidth: 150
    },
    {
      id: 'parent',
      key: 'parent.name',
      label: 'Branch Name',
      minWidth: 150
    },
    {
      id: 'affiliate_url',
      key: 'affiliate_partners_basic_details[0].website',
      label: 'Affiliate URL',
      minWidth: 150
    },
    {
      id: 'createdAt',
      key: 'createdAt',
      label: 'Created Date',
      minWidth: 120
    },
    {
      id: 'contact',
      key: ['email', 'mobile_number'],
      label: 'Contact Information',
      type: 'custom' as const,
      minWidth: 200,
      renderCell: (row: any) => (
        <div>
          <div>Email: {row.email}</div>
          <div>Phone: {row.mobile_number}</div>
        </div>
      )
    },
    {
      id: 'address',
      key: 'affiliate_partners_basic_details[0].address',
      label: 'Address',
      minWidth: 200
    },
    {
      id: 'seller_counts',
      key: 'seller_counts',
      label: 'Seller Count',
      minWidth: 100
    },
    {
      id: 'status',
      key: 'status.lookup_code',
      label: 'Status',
      type: 'status_toggle' as const,
      minWidth: 120
    },
    {
      id: 'actions',
      key: 'actions',
      label: 'Action',
      type: 'custom' as const,
      minWidth: 100,
      renderCell: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/partners/view/${row.id}`);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/partners/edit/${row.id}`);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['All Partners', 'Active Partners', 'Inactive Partners'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === tab.toLowerCase()
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Actions Bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Partner Name"
              className="pl-10 pr-4 py-2 border rounded-md text-sm w-64"
            />
          </div>
          <select 
            className="px-4 py-2 border rounded-md text-sm min-w-[200px]"
            onChange={handleCompanyChange}
            value={params.company_id || ''}
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <select 
            className="px-4 py-2 border rounded-md text-sm min-w-[200px]"
            onChange={handleBranchChange}
            value={params.branch_id || ''}
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => navigate("/dashboard/partners/create")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-md text-sm"
        >
          <Plus size={20} />
          <span>ADD</span>
        </button>
      </div>

      {/* Partners Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="mt-4">
          <CustomTable
            headCells={tableColumns}
            data={partners}
            pagination={true}
            meta_data={meta?.pagination}
            setParams={handleParamsChange}
          />
        </div>
      )}
    </div>
  );
};

export default Partners;
