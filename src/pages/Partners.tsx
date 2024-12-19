import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Plus, Search, X } from "lucide-react";
import CustomTable, { Column } from "../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartners,
  getCompanyDropdown,
  getBranchDropdown,
  getPartnerStatusLookup,
  getPartnerCounts,
} from "../redux/Action/action";
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
    branch_id: undefined as number | undefined,
    status_id: undefined as number | undefined,
  });

  // Get data from Redux store
  const {
    data: partners = [],
    loading = false,
    meta = null,
    error = null,
  } = useSelector((state: RootState) => state.data.partners || {});

  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  const { data: branches = [] } = useSelector(
    (state: RootState) => state.data.branchDropdown || {}
  );

  const { data: statusLookup = [] } = useSelector(
    (state: RootState) => state.data.partnerStatusLookup || {}
  );

  const { data: partnerCounts = null } = useSelector(
    (state: RootState) => state.data.partnerCounts || {}
  );

  // Add search state
  const [searchTerm, setSearchTerm] = useState("");

  // Add debounce function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Add search handler
  const handleSearch = debounce((value: string) => {
    setParams(prev => ({
      ...prev,
      page_no: 1,
      search: value ? value : undefined
    }));
  }, 500);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  // Fetch data on mount
  useEffect(() => {
    dispatch(getCompanyDropdown());
    dispatch(getPartnerStatusLookup());
    dispatch(getPartnerCounts());
  }, [dispatch]);

  // Add useEffect for branch dropdown
  useEffect(() => {
    if (params.company_id) {
      dispatch(getBranchDropdown(params.company_id)); // Fetch branches when company is selected
    }
  }, [dispatch, params.company_id]);

  // Handle tab change with debug logging
  const handleTabChange = (tab: string) => {
    let statusId: number | undefined;

    console.log("Tab clicked:", tab);
    console.log("Status lookup data:", statusLookup);

    if (tab === "active partners") {
      const approvedStatus = statusLookup.find(
        (s) => s.lookup_code === "APPROVED"
      );
      statusId = approvedStatus?.id;
      console.log("Found APPROVED status:", approvedStatus);
    } else if (tab === "inactive partners") {
      const pendingStatus = statusLookup.find(
        (s) => s.lookup_code === "PENDING"
      );
      statusId = pendingStatus?.id;
      console.log("Found PENDING status:", pendingStatus);
    } else {
      statusId = undefined;
    }

    console.log("Setting status_id to:", statusId);

    setParams((prev) => {
      const newParams = {
        ...prev,
        page_no: 1,
        status_id: statusId,
      };
      console.log("New params:", newParams);
      return newParams;
    });

    setActiveTab(tab);
  };

  // Add effect to log params changes
  useEffect(() => {
    console.log("Params updated:", params);
  }, [params]);

  // Add effect to log when status lookup data changes
  useEffect(() => {
    console.log("Status lookup data loaded:", statusLookup);
  }, [statusLookup]);

  // Fetch partners when params change
  useEffect(() => {
    if (statusLookup.length > 0) {
      // Only fetch if status lookup is loaded
      dispatch(getPartners(params));
    }
  }, [dispatch, params, statusLookup.length]);

  // Handle company selection
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = e.target.value ? parseInt(e.target.value) : undefined;
    setParams((prev) => ({
      ...prev,
      page_no: 1,
      company_id: companyId,
    }));
  };

  // Handle branch selection
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branchId = e.target.value ? parseInt(e.target.value) : undefined;
    setParams((prev) => ({
      ...prev,
      page_no: 1,
      branch_id: branchId,
    }));
  };

  // Add handleParamsChange function
  const handleParamsChange = (newParams: {
    page?: number;
    per_page?: number;
  }) => {
    setParams((prev) => ({
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
      id: "name",
      key: "name",
      label: "Partner Name",
      minWidth: 150,
    },
    {
      id: "parent_company",
      key: "parent_company.name",
      label: "Company Name",
      minWidth: 150,
    },
    {
      id: "parent",
      key: "parent.name",
      label: "Branch Name",
      minWidth: 150,
    },   
    {
      id: "createdAt",
      key: "createdAt",
      label: "Created Date",
      minWidth: 120,
      type: "custom",
      renderCell: (row: any) => (
        <span>{new Date(row.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      id: "contact",
      key: ["email", "mobile_number"],
      label: "Contact Information",
      type: "custom" as const,
      minWidth: 200,
      renderCell: (row: any) => (
        <div>
          <div>Email: {row.email}</div>
          <div>Phone: {row.mobile_number}</div>
        </div>
      ),
    },
    {
      id: "address",
      key: "affiliate_partners_basic_details.0.address",
      label: "Address",
      minWidth: 200,
    },
    {
      id: "seller_counts",
      key: "seller_counts",
      label: "Seller Count",
      minWidth: 100,
    },
    {
      id: "status",
      key: "status.lookup_code",
      label: "Status",
      type: "status_toggle" as const,
      minWidth: 120,
    },
    {
      id: "actions",
      key: "actions",
      label: "Action",
      type: "custom" as const,
      minWidth: 100,
      renderCell: (row: any) => (
        <div className="flex gap-2">
          <button
            id={`view-button-${row.id}`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/partners/view/${row.id}`);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Eye size={18} />
          </button>
          <button
            id={`edit-button-${row.id}`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/partners/edit/${row.id}`);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Add clear filters function
  const handleClearFilters = () => {
    setParams({
      page_no: 1,
      per_page: 10,
      company_id: undefined,
      branch_id: undefined,
      status_id: undefined,
      search: undefined
    });
    setSearchTerm(''); // Clear search input
    setActiveTab('all'); // Reset active tab
  };

  return (
    <div className="p-6">
      {/* Partner Count Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Total Partners
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {partnerCounts?.Total || 0}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <svg
                id="total-partners-icon"
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Active Partners
              </p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">
                {partnerCounts?.Approved || 0}
              </h3>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <svg
                id="active-partners-icon"
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Inactive Partners
              </p>
              <h3 className="text-2xl font-bold text-yellow-600 mt-1">
                {partnerCounts?.Pending || 0}
              </h3>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <svg
                id="inactive-partners-icon"
                className="w-6 h-6 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {["All Partners", "Active Partners", "Inactive Partners"].map(
            (tab) => (
              <button
                key={tab}
                id={`tab-button-${tab.toLowerCase()}`}
                onClick={() => handleTabChange(tab.toLowerCase())}
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === tab.toLowerCase()
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Search and Actions Bar */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search
              id="search-icon-partners"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              id="search-input-partners"
              type="text"
              placeholder="Search Partner Name"
              className="pl-10 pr-4 py-2 border rounded-md text-sm w-64"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <select
            id="company-select-partners"
            className="px-4 py-2 border rounded-md text-sm min-w-[200px]"
            onChange={handleCompanyChange}
            value={params.company_id || ""}
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
          <select
            id="branch-select-partners"
            className="px-4 py-2 border rounded-md text-sm min-w-[200px]"
            onChange={handleBranchChange}
            value={params.branch_id || ""}
            disabled={!params.company_id}
          >
            <option value="">All Branches</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          {(searchTerm || params.company_id || params.branch_id || params.status_id) && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
            >
              <X size={16} /> Clear Filters
            </button>
          )}
        </div>

        <button
          onClick={() => navigate("/dashboard/partners/create")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-md text-sm"
        >
          <Plus id="add-icon-partners" size={20} />
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
