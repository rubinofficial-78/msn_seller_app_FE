import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Edit, Plus, LayoutGrid, Table } from "lucide-react";
import CustomTable from "../components/CustomTable";
import {
  getSellers,
  getSellerCounts,
  getSellerStatusLookup,
  getPartnerDropdown,
  getCompanyDropdown,
  getBranchDropdown,
} from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import SellerGrid from "../components/SellerGrid";

const columns = [
  {
    id: "name",
    key: "name",
    label: "Seller Name",
    minWidth: 150,
  },
  {
    id: "storeName",
    key: "store_details.0.name",
    label: "Store Name",
    minWidth: 150,
  },
  {
    id: "contactInfo",
    key: ["email", "mobile_number"],
    label: "Contact Information",
    minWidth: 200,
    join: true,
    join_type: "multiline",
  },
  {
    id: "address",
    key: "store_details.0.default_address.city",
    label: "Address",
    minWidth: 200,
    format: (address: any) =>
      address
        ? `${address.address_line_1}, ${address.city}, ${address.state}, ${address.pin_code}`
        : "-",
  },
  {
    id: "gstin",
    key: "business_details.gstin",
    label: "GST No",
    minWidth: 150,
    format: (gstin: string) => gstin || "--",
  },
  {
    id: "productCounts",
    key: "store_details.0.product_counts",
    label: "Product Counts",
    minWidth: 120,
    type: "number",
    format: (count: number) => count || 0,
  },
  {
    id: "ondc_live_date",
    key: "store_details.0.activated_date",
    label: "ONDC Live Date",
    minWidth: 150,
    format: (date: string) =>
      date ? new Date(date).toLocaleDateString() : "-",
  },
  {
    id: "createdAt",
    key: "createdAt",
    label: "Seller Onboarding Date",
    minWidth: 150,
    format: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    id: "seller_activation_datetime",
    key: "seller_activation_datetime",
    label: "Seller Activation Date",
    minWidth: 150,
    format: (date: string) =>
      date ? new Date(date).toLocaleDateString() : "-",
  },
  {
    id: "seller_approval_date",
    key: "status.createdAt",
    label: "Seller Approval Date",
    minWidth: 150,
    format: (date: string) =>
      date ? new Date(date).toLocaleDateString() : "-",
  },
  {
    id: "catalog_status",
    key: "store_details.0.is_active",
    label: "Catalog Status",
    minWidth: 150,
    format: (isActive: boolean) => isActive ? "Active" : "Inactive",
  },
  {
    id: "company_status",
    key: "company_payment_status",
    label: "Company Status",
    minWidth: 150,
    format: (status: string) => status || "Not Available",
  },
  {
    id: "store_status",
    key: "status.display_name",
    label: "Store Status (ONDC)",
    minWidth: 150,
    format: (status: string) => status || "Not Available",
    cellRenderer: (status: string) => (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          status === "APPROVED"
            ? "bg-green-100 text-green-800"
            : status === "PENDING"
            ? "bg-yellow-100 text-yellow-800"
            : status === "REJECTED"
            ? "bg-red-100 text-red-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {status || "Not Available"}
      </span>
    ),
  },
  {
    id: "partnerName",
    key: "parent.name",
    label: "Partner Name",
    minWidth: 150,
    format: (name: string) => name || "-",
  },
  {
    id: "branchName",
    key: "parent.parent.name",
    label: "Branch Name",
    minWidth: 150,
    format: (name: string) => name || "-",
  },
  {
    id: "companyName",
    key: "company_details.name",
    label: "Company Name",
    minWidth: 150,
    format: (name: string) => name || "-",
  },
];

const tabs: { label: string }[] = [
  { label: "All Sellers" },
  { label: "Approved" },
  { label: "Pending" },
  { label: "Rejected" },
];

const Sellers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    data: sellers,
    loading,
    meta,
  } = useSelector((state: RootState) => state.data.sellers);
  const { data: sellerCounts } = useSelector(
    (state: RootState) => state.data.sellerCounts
  );

  const [activeTab, setActiveTab] = useState("All Sellers");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [statusLookup, setStatusLookup] = useState<any[]>([]);
  const [companyOptions, setCompanyOptions] = useState<any[]>([]);
  const [branchOptions, setBranchOptions] = useState<any[]>([]);
  const [partnerOptions, setPartnerOptions] = useState<any[]>([]);
  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10,
    status_id: null as number | null,
    search: "",
    company_id: null as number | null,
    branch_id: null as number | null,
    partner_id: null as number | null,
  });

  // Fetch sellers with updated params
  useEffect(() => {
    const queryParams = {
      ...params,
      status_id: params.status_id || undefined,
      company_id: params.company_id || undefined,
      branch_id: params.branch_id || undefined,
      partner_id: params.partner_id || undefined,
    };
    dispatch(getSellers(queryParams));
  }, [dispatch, params]);

  // Fetch dropdown data on mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [companyResponse, branchResponse, partnerResponse] =
          await Promise.all([
            dispatch(getCompanyDropdown()),
            dispatch(getBranchDropdown()),
            dispatch(getPartnerDropdown()),
          ]);

        if (companyResponse?.data) {
          setCompanyOptions(companyResponse.data);
        }
        if (branchResponse?.data) {
          setBranchOptions(branchResponse.data);
        }
        if (partnerResponse?.data) {
          setPartnerOptions(partnerResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, [dispatch]);

  // Fetch status lookup on mount
  useEffect(() => {
    const fetchStatusLookup = async () => {
      try {
        const response = await dispatch(getSellerStatusLookup());
        if (response?.data) {
          setStatusLookup(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch seller status lookup:", error);
      }
    };

    fetchStatusLookup();
    dispatch(getSellerCounts());
  }, [dispatch]); // Only run once on mount

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

  const handleRowClick = (row: any) => {
    navigate(`view/${row.id}`);
  };

  const handleActionClick = (action: string, row: any) => {
    if (action === "view") {
      navigate(`view/${row.id}`);
    } else if (action === "edit") {
      navigate(`edit/${row.id}`);
    }
  };

  const handleView = (id: number) => {
    navigate(`view/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`);
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setParams((prev) => ({
      ...prev,
      search: searchValue,
      page_no: 1, // Reset to first page when searching
    }));
  };

  // Handle tab change with status filtering
  const handleTabChange = (tabLabel: string) => {
    setActiveTab(tabLabel);
    let statusId = null;

    switch (tabLabel) {
      case "Pending":
        const pendingStatus = statusLookup.find(
          (s) => s.lookup_code === "PENDING"
        );
        statusId = pendingStatus?.id || null; // Should be 95
        break;
      case "Approved":
        const approvedStatus = statusLookup.find(
          (s) => s.lookup_code === "APPROVED"
        );
        statusId = approvedStatus?.id || null; // Should be 96
        break;
      case "Rejected":
        const rejectedStatus = statusLookup.find(
          (s) => s.lookup_code === "REJECTED"
        );
        statusId = rejectedStatus?.id || null; // Should be 97
        break;
      default:
        statusId = null;
    }

    // Update params which will trigger the useEffect to fetch sellers
    setParams((prev) => ({
      ...prev,
      status_id: statusId,
      page_no: 1,
    }));
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = event.target.value ? Number(event.target.value) : null;
    setParams((prev) => ({
      ...prev,
      company_id: companyId,
      branch_id: null, // Reset dependent filters
      partner_id: null,
      page_no: 1,
    }));
  };

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const branchId = event.target.value ? Number(event.target.value) : null;
    setParams((prev) => ({
      ...prev,
      branch_id: branchId,
      partner_id: null, // Reset dependent filter
      page_no: 1,
    }));
  };

  const handlePartnerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const partnerId = event.target.value ? Number(event.target.value) : null;
    setParams((prev) => ({
      ...prev,
      partner_id: partnerId,
      page_no: 1,
    }));
  };

  const renderContent = () => {
    if (viewMode === "grid") {
      return (
        <SellerGrid
          data={sellers || []}
          onView={handleView}
          onEdit={handleEdit}
        />
      );
    }

    return (
      <CustomTable
        headCells={columns}
        data={sellers || []}
        meta_data={meta?.pagination}
        setParams={handleParamsChange}
        pagination={true}
        onRowClick={handleRowClick}
        onActionClick={handleActionClick}
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Sellers Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-blue-700 font-medium">
              Total Sellers
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              ALL
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-700">
                {(sellerCounts?.Pending || 0) +
                  (sellerCounts?.Approved || 0) +
                  (sellerCounts?.Rejected || 0)}
              </span>
              <span className="text-sm text-gray-500 ml-2">total sellers</span>
            </div>
          </div>
        </div>

        {/* Approved Sellers Card */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-green-700 font-medium">
              Approved Sellers
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200">
              APPROVED
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-green-700">
                {sellerCounts?.Approved || 0}
              </span>
              <span className="text-sm text-gray-500 ml-2">sellers</span>
            </div>
          </div>
        </div>

        {/* Pending Sellers Card */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-yellow-700 font-medium">
              Pending Sellers
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
              PENDING
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-yellow-700">
                {sellerCounts?.Pending || 0}
              </span>
              <span className="text-sm text-gray-500 ml-2">sellers</span>
            </div>
          </div>
        </div>

        {/* Rejected Sellers Card */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-red-700 font-medium">
              Rejected Sellers
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
              REJECTED
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-red-700">
                {sellerCounts?.Rejected || 0}
              </span>
              <span className="text-sm text-gray-500 ml-2">sellers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200 px-4">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => handleTabChange(tab.label)}
                className={`py-4 px-2 relative ${
                  activeTab === tab.label
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="whitespace-nowrap">{tab.label}</span>
                {tab.label !== "All Sellers" && (
                  <span
                    className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      tab.label === "Approved"
                        ? "bg-green-100 text-green-800"
                        : tab.label === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {tab.label === "Approved"
                      ? sellerCounts?.Approved || 0
                      : tab.label === "Pending"
                      ? sellerCounts?.Pending || 0
                      : sellerCounts?.Rejected || 0}
                  </span>
                )}
                {tab.label === "All Sellers" && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                    {(sellerCounts?.Pending || 0) +
                      (sellerCounts?.Approved || 0) +
                      (sellerCounts?.Rejected || 0)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-wrap mt-3 mb-3 gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
                id="search-icon-sellers"
              />
              <input
                type="text"
                value={params.search}
                onChange={handleSearch}
                placeholder="Search by Seller Name"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                id="search-input-sellers"
              />
            </div>
            <div className="flex flex-wrap gap-4 mb-6"></div>

            <select
              id="company-select-sellers"
              value={params.company_id || ""}
              onChange={handleCompanyChange}
              className="border rounded-lg px-4 py-2 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Company</option>
              {companyOptions.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>

            <select
              id="branch-select-sellers"
              value={params.branch_id || ""}
              onChange={handleBranchChange}
              className="border rounded-lg px-4 py-2 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Branch</option>
              {branchOptions
                .filter(
                  (branch) =>
                    !params.company_id ||
                    branch.company_id === params.company_id
                )
                .map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
            </select>
            <select
              id="partner-select-sellers"
              value={params.branch_id || ""}
              onChange={handlePartnerChange}
              className="border rounded-lg px-4 py-2 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select partner</option>
              {branchOptions
                .filter(
                  (branch) =>
                    !params.company_id ||
                    branch.company_id === params.company_id
                )
                .map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
            </select>
          </div>

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
              <LayoutGrid id="grid-view-sellers" size={20} />
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
              <Table id="table-view-sellers" size={20} />
            </button>
            <button
              onClick={() => navigate("add")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              id="add-button-sellers"
            >
              <Plus id="add-icon-sellers" size={20} />
              <span>ADD</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              Loading...
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default Sellers;
