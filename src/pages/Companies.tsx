import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  ExternalLink,
  LayoutList,
  LayoutGrid,
  Table,
  Eye,
  Edit,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  getStatusLookup,
  updateCompany,
  getCompanyUsers,
} from "../redux/Action/action";
import { RootState } from "../redux/types";
import CompanyGrid from "../components/CompanyGrid";
import { toast } from "react-hot-toast";
import { AppDispatch } from "../redux/store";

// Tab type definition
interface Tab {
  label: string;
  count?: number;
}

const tabs: Tab[] = [
  { label: "All Companies" },
  { label: "Active Companies" },
  { label: "Inactive Companies" },
  { label: "System Users" },
];

// Define table columns for CustomTable
const Companies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("All Companies");
  const [viewMode, setViewMode] = useState<"table" | "list" | "grid">("table");

  const {
    data: companies,
    loading,
    meta,
  } = useSelector((state: RootState) => state.data.companies);

  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10,
    status_id: null as number | null,
    search: ''
  });

  // Add state for filtered status ID
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);

  // Add debounce function to prevent too many API calls
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  // Add handleSearch function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams(prev => ({
      ...prev,
      search: e.target.value,
      page_no: 1 // Reset to first page on new search
    }));
  };

  // Create a fetchCompanies function that can be called to refresh the list
  const fetchCompanies = useCallback(() => {
    const queryParams = {
      ...params,
      status_id: params.status_id || undefined, // Only include if not null
      search: params.search // Always include search parameter
    };
    dispatch(getCompanies(queryParams));
  }, [dispatch, params]);

  // Fetch on mount and when location changes (navigation back)
  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, location]);

  // Format data for CustomTable
  const formatCompanyData = (companies: any[]) => {
    return companies.map((company) => ({
      id: company.id,
      companyName: company.name,
      whiteLabeledUrl: company.partner_company[0]?.url,
      companyWebsite: company.partner_company[0]?.website,
      createdDate: new Date(company.createdAt).toLocaleDateString(),
      contactInformation: {
        email: company.email,
        phone: company.mobile_number,
      },
      address: company.partner_company[0]?.address,
      branchCount: company.branches_counts,
      systemUsersCount: company.users_counts,
      status: company.status.lookup_code,
    }));
  };

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
  const handleRowClick = (row: any, source?: string) => {
    // Only navigate to view if not clicking action buttons
    if (source !== "action") {
      navigate(`view/${row.id}`);
    }
  };

  // Add state for status lookup
  const [statusLookup, setStatusLookup] = useState<any[]>([]);

  // Fetch status lookup on mount
  useEffect(() => {
    const fetchStatusLookup = async () => {
      try {
        const data = await dispatch(getStatusLookup());
        setStatusLookup(data);
      } catch (error) {
        console.error("Failed to fetch status lookup:", error);
      }
    };
    fetchStatusLookup();
  }, [dispatch]);

  // Update status toggle handler
  const handleStatusToggle = async (row: any) => {
    try {
      const currentStatus = row.status;
      const newStatus = currentStatus === "ACTIVE" ? "IN-ACTIVE" : "ACTIVE";

      // Find the status ID from lookup
      const statusObj = statusLookup.find((s) => s.lookup_code === newStatus);
      if (!statusObj) {
        throw new Error("Status lookup not found");
      }

      const payload = {
        status_id: statusObj.id,
      };

      const response = await dispatch(updateCompany(row.id, payload));

      if (response?.meta?.status) {
        toast.success(
          `Company ${currentStatus === "ACTIVE" ? "deactivated" : "activated"} successfully`
        );
        // Refresh the companies list
        await fetchCompanies();
      } else {
        toast.error(response?.meta?.message || "Failed to update status");
      }
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(typeof error === 'string' ? error : "Failed to update status");
    }
  };

  const handleAddClick = () => {
    navigate("create");
  };

  // Add state for system users
  const {
    data: systemUsers,
    loading: usersLoading,
    meta: usersMeta,
  } = useSelector((state: RootState) => state.data.companyUsers);

  // Update handleTabChange
  const handleTabChange = (tabLabel: string) => {
    setActiveTab(tabLabel);

    if (tabLabel === "System Users") {
      dispatch(getCompanyUsers(params));
    } else {
      // Find corresponding status ID from lookup
      let statusId = null;
      if (tabLabel === "Active Companies") {
        const activeStatus = statusLookup.find(
          (s) => s.lookup_code === "ACTIVE"
        );
        statusId = activeStatus?.id || null;
      } else if (tabLabel === "Inactive Companies") {
        const inactiveStatus = statusLookup.find(
          (s) => s.lookup_code === "IN-ACTIVE"
        );
        statusId = inactiveStatus?.id || null;
      }

      setParams((prev) => ({
        ...prev,
        status_id: statusId,
        page_no: 1,
      }));
    }
  };

  // Update system user columns definition
  const systemUserColumns = [
    {
      id: "company",
      key: "company.name",
      label: "Company Name",
      minWidth: 180,
      type: "custom", // Use custom type for proper typing
    },
    {
      id: "name",
      key: "name",
      label: "Name",
      minWidth: 180,
      type: "custom",
    },
    {
      id: "email",
      key: "email",
      label: "Email",
      minWidth: 200,
      type: "custom",
    },
    {
      id: "mobile_number",
      key: "mobile_number",
      label: "Mobile Number",
      minWidth: 150,
      type: "custom",
    },
    {
      id: "created_date",
      key: "createdAt",
      label: "Created Date",
      minWidth: 150,
      type: "custom",
      renderCell: (row: any) => (
        <span>{new Date(row.createdAt).toLocaleDateString()}</span>
      ),
    },
  ];

  // Move tableColumns definition here to access navigate
  const tableColumns = [
    {
      id: "companyName",
      key: "companyName",
      label: "Company Name",
      minWidth: 180,
    },
    {
      id: "whiteLabeledUrl",
      key: "whiteLabeledUrl",
      label: "White Labeled URL",
      minWidth: 180,
      type: "link",
    },
    // {
    //   id: "companyWebsite",
    //   key: "companyWebsite",
    //   label: "Company Website",
    //   minWidth: 180,
    //   type: "link",
    // },
    {
      id: "createdDate",
      key: "createdDate",
      label: "Created Date",
      minWidth: 140,
    },
    {
      id: "contactInformation",
      key: ["contactInformation.email", "contactInformation.phone"],
      label: "Contact Information",
      minWidth: 200,
      join: true,
      join_type: "multiline",
    },
    {
      id: "address",
      key: "address",
      label: "Address",
      minWidth: 200,
    },
    {
      id: "branchCount",
      key: "branchCount",
      label: "Branch Count",
      minWidth: 120,
      type: "number",
    },
    {
      id: "systemUsersCount",
      key: "systemUsersCount",
      label: "System Users Count",
      minWidth: 140,
      type: "number",
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
            onClick={(e) => {
              e.stopPropagation();
              navigate(`view/${row.id}`);
            }}
            className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusToggle(row);
            }}
            className={`p-1.5 rounded-full transition-colors ${
              row.status === "ACTIVE"
                ? "bg-green-50 text-green-600 hover:bg-green-100"
                : "bg-red-50 text-red-600 hover:bg-red-100"
            }`}
            title={`${row.status === "ACTIVE" ? "Deactivate" : "Activate"} Company`}
          >
            {row.status === "ACTIVE" ? (
              <ToggleRight size={16} />
            ) : (
              <ToggleLeft size={16} />
            )}
          </button>
        </div>
      ),
    },
  ];

  // Update renderCompanies
  const renderCompanies = () => {
    if (activeTab === "System Users") {
      if (usersLoading) {
        return (
          <div className="flex justify-center items-center h-64">
            Loading...
          </div>
        );
      }

      return (
        <div className="bg-white rounded-lg shadow">
          <CustomTable
            headCells={systemUserColumns}
            data={systemUsers || []}
            meta_data={usersMeta?.pagination}
            setParams={handleParamsChange}
            pagination={true}
            onRowClick={handleRowClick}
            onStatusToggle={handleStatusToggle}
          />
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">Loading...</div>
      );
    }

    switch (viewMode) {
      case "grid":
        return <CompanyGrid data={formatCompanyData(companies || [])} />;
      default:
        return (
          <div className="bg-white rounded-lg shadow">
            <CustomTable
              headCells={tableColumns}
              data={formatCompanyData(companies || [])}
              meta_data={meta?.pagination}
              setParams={handleParamsChange}
              pagination={true}
              onRowClick={handleRowClick}
              onStatusToggle={handleStatusToggle}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4" id="companies-container">
      {/* Tabs */}
      <div className="border-b border-gray-200" id="tabs-container">
        <nav className="-mb-px flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => handleTabChange(tab.label)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.label
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              id={`tab-${tab.label.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between" id="search-actions-container">
        <div className="flex flex-wrap gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              id="search-icon-companies"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              id="search-input-companies"
              type="text"
              placeholder="Search by Company Name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* View Controls and Add Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            title="Grid view"
          >
            <LayoutGrid id="grid-view-button-companies" size={20} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded ${
              viewMode === "table"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            title="Table view"
          >
            <Table id="table-view-button-companies" size={20} />
          </button>
          {activeTab !== "System Users" && (
            <button
              id="add-button-companies"
              onClick={handleAddClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus id="add-button-companies" size={20} />
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>

      {/* Render Companies */}
      {renderCompanies()}
    </div>
  );
};

export default Companies;
