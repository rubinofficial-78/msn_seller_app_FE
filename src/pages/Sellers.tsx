import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Edit, Plus, LayoutGrid, Table } from "lucide-react";
import CustomTable from "../components/CustomTable";
import { getSellers, getSellerCounts, getSellerStatusLookup } from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import SellerGrid from "../components/SellerGrid";

const columns = [
  {
    id: 'name',
    key: 'name',
    label: 'Seller Name',
    minWidth: 150,
  },
  {
    id: 'storeName',
    key: 'store_details[0].name',
    label: 'Store Name',
    minWidth: 150,
  },
  {
    id: 'contactInfo',
    key: ['email', 'mobile_number'],
    label: 'Contact Information',
    minWidth: 200,
    join: true,
    join_type: "multiline",
  },
  {
    id: 'address',
    key: 'default_address',
    label: 'Address',
    minWidth: 200,
    format: (address: any) => 
      address ? `${address.address_line_1}, ${address.city}, ${address.state}, ${address.pin_code}` : '-',
  },
  {
    id: 'gstin',
    key: 'gstin',
    label: 'GST No',
    minWidth: 150,
  },
  {
    id: 'productCounts',
    key: 'product_counts',
    label: 'Product Counts',
    minWidth: 120,
    type: 'number',
  },
  {
    id: 'ondc_live_date',
    key: 'ondc_live_date',
    label: 'ONDC Live Date',
    minWidth: 150,
    format: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
  },
  {
    id: 'createdAt',
    key: 'createdAt',
    label: 'Seller Onboarding Date',
    minWidth: 150,
    format: (date: string) => new Date(date).toLocaleDateString(),
  },
  {
    id: 'seller_activation_datetime',
    key: 'seller_activation_datetime',
    label: 'Seller Activation Date',
    minWidth: 150,
    format: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
  },
  {
    id: 'seller_approval_date',
    key: 'status.createdAt',
    label: 'Seller Approval Date',
    minWidth: 150,
    format: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
  },
  {
    id: 'catalog_status',
    key: 'store_details[0].catalog_status',
    label: 'Catalog Status',
    minWidth: 150,
    format: (status: string) => status || 'Not Available',
  },
  {
    id: 'company_status',
    key: 'company_payment_status',
    label: 'Company Status',
    minWidth: 150,
  },
  {
    id: 'store_status',
    key: 'status.display_name',
    label: 'Store Status (ONDC)',
    minWidth: 150,
    format: (status: string) => status || 'Not Available',
    cellRenderer: (status: string) => (
      <span className={`px-2 py-1 rounded-full text-sm ${
        status === 'APPROVED' ? 'bg-green-100 text-green-800' :
        status === 'PENDING' ? 'bg-gray-100 text-gray-800' :
        status === 'REJECTED' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {status || 'Not Available'}
      </span>
    ),
  },
  {
    id: 'partnerName',
    key: 'parent.name',
    label: 'Partner Name',
    minWidth: 150,
  },
  {
    id: 'branchName',
    key: 'parent.parent.name',
    label: 'Branch Name',
    minWidth: 150,
  },
  {
    id: 'companyName',
    key: 'parent.parent.parent.name',
    label: 'Company Name',
    minWidth: 150,
  },
  {
    id: 'actions',
    key: 'actions',
    label: 'Actions',
    minWidth: 100,
    type: 'actions',
    actions: ['view', 'edit'],
  },
];

const tabs: { label: string }[] = [
  { label: "All Sellers" },
  { label: "Approved" },
  { label: "Pending" },
  { label: "Rejected" }
];

const Sellers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { data: sellers, loading, meta } = useSelector((state: RootState) => state.data.sellers);
  const { data: sellerCounts } = useSelector((state: RootState) => state.data.sellerCounts);

  const [activeTab, setActiveTab] = useState("All Sellers");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [statusLookup, setStatusLookup] = useState<any[]>([]);
  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10,
    status_id: null as number | null,
    search: '' // Add search parameter
  });

  // Fetch sellers with updated params
  useEffect(() => {
    const queryParams = {
      ...params,
      status_id: params.status_id || undefined
    };
    dispatch(getSellers(queryParams));
  }, [dispatch, params]); // This will trigger whenever params changes

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

  const handleParamsChange = (newParams: { page?: number; per_page?: number }) => {
    setParams(prev => ({
      ...prev,
      page_no: newParams.page || prev.page_no,
      per_page: newParams.per_page || prev.per_page,
    }));
  };

  const handleRowClick = (row: any) => {
    navigate(`view/${row.id}`);
  };

  const handleActionClick = (action: string, row: any) => {
    if (action === 'view') {
      navigate(`view/${row.id}`);
    } else if (action === 'edit') {
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
    setParams(prev => ({
      ...prev,
      search: searchValue,
      page_no: 1 // Reset to first page when searching
    }));
  };

  // Handle tab change with status filtering
  const handleTabChange = (tabLabel: string) => {
    setActiveTab(tabLabel);
    let statusId = null;

    switch (tabLabel) {
      case "Pending":
        const pendingStatus = statusLookup.find(s => s.lookup_code === "PENDING");
        statusId = pendingStatus?.id || null; // Should be 95
        break;
      case "Approved":
        const approvedStatus = statusLookup.find(s => s.lookup_code === "APPROVED");
        statusId = approvedStatus?.id || null; // Should be 96
        break;
      case "Rejected":
        const rejectedStatus = statusLookup.find(s => s.lookup_code === "REJECTED");
        statusId = rejectedStatus?.id || null; // Should be 97
        break;
      default:
        statusId = null;
    }

    // Update params which will trigger the useEffect to fetch sellers
    setParams(prev => ({
      ...prev,
      status_id: statusId,
      page_no: 1
    }));
  };

  const renderContent = () => {
    if (viewMode === 'grid') {
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
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => handleTabChange(tab.label)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.label
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Stats */}
      <div className="flex justify-end gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Total Sellers</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {(sellerCounts?.Pending || 0) + (sellerCounts?.Approved || 0) + (sellerCounts?.Rejected || 0)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Approved</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {sellerCounts?.Approved || 0}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Pending</span>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
            {sellerCounts?.Pending || 0}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Rejected</span>
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            {sellerCounts?.Rejected || 0}
          </span>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={params.search}
              onChange={handleSearch}
              placeholder="Search by Seller Name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
            title="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded ${viewMode === "table" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
            title="Table view"
          >
            <Table size={20} />
          </button>
          <button
            onClick={() => navigate('add')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex justify-center items-center h-64">Loading...</div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default Sellers;