import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit, LayoutGrid, List, Search } from "lucide-react";
import CustomTable, { Column } from "../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getBranches,
  getCompanyDropdown,
  updateBranch,
  getBranchStatusLookup,
} from "../redux/Action/action";
import { AppDispatch, RootState } from "../redux/types";
import { toast } from "react-hot-toast";

// Define table columns for CustomTable
const tableColumns: Column[] = [
  {
    id: "name",
    key: "name",
    label: "Branch Name",
    minWidth: 180,
  },
  {
    id: "parent",
    key: "parent.name",
    label: "Company Name",
    minWidth: 180,
  },
  {
    id: "createdAt",
    key: "createdAt",
    label: "Created Date",
    minWidth: 140,
  },
  {
    id: "contact",
    key: ["email", "mobile_number"],
    label: "Contact Information",
    minWidth: 200,
    join: true,
    join_type: "multiline",
  },
  {
    id: "address",
    key: "default_address.address",
    label: "Address",
    minWidth: 200,
  },
  {
    id: "partner_counts",
    key: "partner_counts",
    label: "Partner Count",
    minWidth: 120,
    type: "number",
  },
  {
    id: "status",
    key: "status.lookup_code",
    label: "Status",
    minWidth: 120,
    type: "status_toggle",
  },
  {
    id: "actions",
    key: "actions",
    label: "Actions",
    type: "custom",
    minWidth: 100,
    renderCell: (row: any) => (
      <div className="flex items-center gap-2">
        <button
          id={`view-button-${row.id}`}
          onClick={() => handleRowClick(row, "action")}
          className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
          title="View"
        >
          <Eye size={16} />
        </button>
        <button
          id={`edit-button-${row.id}`}
          onClick={() => handleRowClick(row, "action")}
          className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
          title="Edit"
        >
          <Edit size={16} />
        </button>
      </div>
    ),
  },
];
const handleRowClick = (row: any, source?: string) => {
  // Only navigate to view if not clicking action buttons
  if (source !== "action") {
    navigate(`view/${row.id}`);
  }
};

const Branches: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("All Branches");
  const [viewMode, setViewMode] = useState<"list" | "grid" | "table">("table");

  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10,
    status_id: undefined as number | undefined,
    company_id: undefined as number | undefined,
    search: undefined as string | undefined,
  });

  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");

  // Get branches data from Redux store
  const {
    data: branches = [],
    loading = false,
    meta = null,
    error = null,
  } = useSelector((state: RootState) => state.data.branches || {});

  // Get company dropdown data from Redux store
  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  // Get status lookup data from Redux store
  const { data: statusLookup = [] } = useSelector(
    (state: RootState) => state.data.branchStatusLookup || {}
  );

  // Add debounce function to prevent too many API calls
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handle search input change
  const handleSearch = debounce((value: string) => {
    setParams((prev) => ({
      ...prev,
      page_no: 1, // Reset to first page when searching
      search: value || undefined,
    }));
  }, 500); // 500ms delay

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    let statusId: number | undefined;

    switch (tab) {
      case "Active Branches":
        statusId = 425; // Active status ID
        break;
      case "Inactive Branches":
        statusId = 426; // Inactive status ID
        break;
      default:
        statusId = undefined;
    }

    setParams((prev) => ({
      ...prev,
      page_no: 1, // Reset to first page when changing tabs
      status_id: statusId,
    }));
  };

  // Fetch branches on mount and when params change
  useEffect(() => {
    dispatch(getBranches(params));
  }, [dispatch, params]);

  // Fetch companies on mount
  useEffect(() => {
    dispatch(getCompanyDropdown());
  }, [dispatch]);

  // Fetch status lookup data on mount
  useEffect(() => {
    dispatch(getBranchStatusLookup());
  }, [dispatch]);

  // Handle pagination params change
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

  // Handle row click for view/edit actions
  const handleRowClick = (row: any) => {
    navigate(`view/${row.id}`);
  };

  // Handle status toggle
  const handleStatusToggle = async (row: any) => {
    try {
      const currentStatus = row.status?.lookup_code;
      const newStatusId = currentStatus === "ACTIVE" ? 426 : 425;

      const payload = {
        name: row.name,
        email: row.email,
        mobile_number: row.mobile_number,
        created_by_id: row.parent?.id,
        status_id: newStatusId,
        default_address: row.default_address || {
          address: "",
          state: "",
          city: "",
          pincode: "",
        },
      };

      const response = await dispatch(updateBranch(row.id, payload));

      if (response?.meta?.status) {
        toast.success(
          `Branch ${
            newStatusId === 425 ? "activated" : "deactivated"
          } successfully`
        );
        // Refresh the branches list with current params
        dispatch(getBranches(params));
      } else {
        toast.error(response?.meta?.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  // Update company selection handler
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = e.target.value ? parseInt(e.target.value) : undefined;
    setSelectedCompany(e.target.value);
    setParams((prev) => ({
      ...prev,
      page_no: 1, // Reset to first page when changing company
      company_id: companyId,
    }));
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {["All Branches", "Active Branches", "Inactive Branches"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                id={`tab-${tab.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          {/* Company Dropdown */}
          <div className="relative flex-1 max-w-xs">
            <select
              value={selectedCompany}
              onChange={handleCompanyChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="company-dropdown"
            >
              <option value="">All Companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
              id="search-icon"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search by Branch Name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="search-input-branches"
            />
          </div>
        </div>

        {/* View Controls and Add Button */}
        <div className="flex items-center gap-2">
          <button
            id="grid-view-button"
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            title="Grid view"          
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded ${
              viewMode === "table"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            title="Table view"
            id="table-view-button"
          >
            <List size={20} />
          </button>
          <button
            id="add-button"
            onClick={() => navigate("create")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus id="add-icon" size={20} />
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
