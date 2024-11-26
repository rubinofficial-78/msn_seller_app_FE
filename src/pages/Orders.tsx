import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Download,
  LayoutList,
  Table,
  ExternalLink,
  Clock,
  LayoutGrid,
} from "lucide-react";
import CustomTable from "../components/CustomTable";

// Extended sample data
const generateOrderData = (count: number) => {
  const statuses = [
    "Accepted",
    "In-progress",
    "Completed",
    "Cancelled",
    "Returns",
  ];
  return Array.from({ length: count }, (_, i) => ({
    buyerNPName: `buyer${i}@ondc.org`,
    sellerNPName: "preprod.ondc.adya.ai",
    orderCreateDate: new Date(
      Date.now() - Math.random() * 10000000000
    ).toLocaleString(),
    networkOrderID: `ORDER${Math.random()
      .toString(36)
      .substr(2, 8)
      .toUpperCase()}`,
    networkTransactionID: `TXN${Math.random().toString(36).substr(2, 24)}`,
    sellerNPOrderID: (1000 + i).toString(),
    itemID: Math.random().toString(36).substr(2, 8).toUpperCase(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    amount: Math.floor(Math.random() * 10000),
  }));
};

const allOrderData = generateOrderData(50);

// Table column definitions
const tableColumns = [
  {
    id: "buyerNPName",
    key: "buyerNPName",
    label: "Buyer NP Name",
    minWidth: 180,
  },
  {
    id: "sellerNPName",
    key: "sellerNPName",
    label: "Seller NP Name",
    minWidth: 180,
  },
  {
    id: "orderCreateDate",
    key: "orderCreateDate",
    label: "Order Date & Time",
    minWidth: 160,
  },
  {
    id: "networkOrderID",
    key: "networkOrderID",
    label: "Network Order ID",
    minWidth: 150,
  },
  {
    id: "networkTransactionID",
    key: "networkTransactionID",
    label: "Transaction ID",
    minWidth: 220,
  },
  {
    id: "sellerNPOrderID",
    key: "sellerNPOrderID",
    label: "Seller Order ID",
    minWidth: 130,
  },
  {
    id: "amount",
    key: "amount",
    label: "Amount",
    type: "amount",
    minWidth: 120,
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    type: "status",
    minWidth: 120,
  },
];

// Tab type definition
interface Tab {
  label: string;
  count?: number;
  color?: string;
}

const tabs: Tab[] = [
  { label: "All Orders" },
  { label: "Accepted", count: 1295, color: "text-green-600" },
  { label: "In-progress", count: 133, color: "text-orange-500" },
  { label: "Completed", count: 775, color: "text-blue-600" },
  { label: "Cancelled", count: 466, color: "text-red-500" },
  { label: "Returns", count: 73, color: "text-purple-500" },
];

interface Order {
  buyerNPName: string;
  sellerNPName: string;
  orderCreateDate: string;
  networkOrderID: string;
  networkTransactionID: string;
  sellerNPOrderID: string;
  itemID: string;
  status: string;
}

interface OrderComponentProps {
  data: Order[];
}

const OrderTable: React.FC<OrderComponentProps> = ({ data }) => (
  <div className="bg-white rounded-lg shadow overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Buyer NP Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Seller NP Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order Create Date & Time
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Network Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Network Transaction ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Seller NP Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Item ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((order, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.buyerNPName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.sellerNPName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.orderCreateDate}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.networkOrderID}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.networkTransactionID}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.sellerNPOrderID}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {order.itemID}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={order.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderGrid: React.FC<OrderComponentProps> = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((order, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Order #{order.sellerNPOrderID}
            </p>
            <p className="text-xs text-gray-500">{order.orderCreateDate}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="space-y-2">
          <InfoRow label="Buyer" value={order.buyerNPName} />
          <InfoRow label="Seller" value={order.sellerNPName} />
          <InfoRow label="Network Order ID" value={order.networkOrderID} />
          <InfoRow label="Item ID" value={order.itemID} />
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
            <ExternalLink size={14} />
            View Details
          </button>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock size={14} />
            {order.orderCreateDate}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const OrderList: React.FC<OrderComponentProps> = ({ data }) => (
  <div className="space-y-3">
    {data.map((order, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-900">
                Order #{order.sellerNPOrderID}
              </p>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-gray-500">{order.orderCreateDate}</p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
            <ExternalLink size={14} />
            View Details
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoRow label="Buyer" value={order.buyerNPName} />
          <InfoRow label="Seller" value={order.sellerNPName} />
          <InfoRow label="Network Order ID" value={order.networkOrderID} />
          <InfoRow
            label="Network Transaction ID"
            value={order.networkTransactionID}
          />
          <InfoRow label="Item ID" value={order.itemID} />
        </div>
      </div>
    ))}
  </div>
);

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span
    className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full
    ${
      status === "Completed"
        ? "bg-green-100 text-green-800"
        : status === "In-progress"
        ? "bg-orange-100 text-orange-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-900 truncate" title={value}>
      {value}
    </p>
  </div>
);

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [viewMode, setViewMode] = useState<"table" | "list" | "grid">("table");
  const [filteredData, setFilteredData] = useState(allOrderData);
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    per_page: 10,
    total: filteredData.length
  });

  // Mock metadata for pagination with proper structure
  const meta_data = {
    total: filteredData.length,
    per_page: paginationParams.per_page,
    current_page: paginationParams.page,
    last_page: Math.ceil(filteredData.length / paginationParams.per_page),
    from: ((paginationParams.page - 1) * paginationParams.per_page) + 1,
    to: Math.min(paginationParams.page * paginationParams.per_page, filteredData.length)
  };

  // Handle tab switching and filtering
  useEffect(() => {
    if (activeTab === "All Orders") {
      setFilteredData(allOrderData);
    } else {
      const filtered = allOrderData.filter(
        (order) => order.status === activeTab
      );
      setFilteredData(filtered);
    }
    // Reset to first page when changing tabs
    setPaginationParams(prev => ({ ...prev, page: 1 }));
  }, [activeTab]);

  // Handle pagination
  const setParams = (params: { page?: number; per_page?: number }) => {
    setPaginationParams(prev => ({
      ...prev,
      page: params.page || prev.page,
      per_page: params.per_page || prev.per_page
    }));
  };

  // Calculate paginated data
  const paginatedData = filteredData.slice(
    (paginationParams.page - 1) * paginationParams.per_page,
    paginationParams.page * paginationParams.per_page
  );

  const handleRowClick = (row: any) => {
    console.log("Row clicked:", row);
    // Implement row click handling
  };

  return (
    <div className="space-y-4">
      {/* Order Stats */}
      <div className="flex justify-end space-x-4 text-sm">
        <span>
          Total <span className="font-semibold text-gray-700">2678</span>
        </span>
        <span>
          Completed <span className="font-semibold text-green-600">775</span>
        </span>
        <span>
          Inprogress <span className="font-semibold text-orange-500">133</span>
        </span>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
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
              {tab.count !== undefined && (
                <span className={`ml-2 ${tab.color || "text-gray-600"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by Order Id"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Seller Select */}
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">Select Seller</option>
            {/* Add seller options */}
          </select>

          {/* Date Filters */}
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="From Date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="To Date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Items per page selector */}
          <select
            value={paginationParams.per_page}
            onChange={(e) => setParams({ per_page: Number(e.target.value) })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            title="List view"
          >
            <LayoutList size={20} />
          </button>
          <button
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
          >
            <Table size={20} />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-gray-800"
            title="Download"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Render Orders based on view mode */}
      {viewMode === "table" ? (
        <div className="bg-white rounded-lg shadow">
          <CustomTable
            headCells={tableColumns}
            data={paginatedData}
            meta_data={meta_data}
            setParams={setParams}
            pagination={true}
            onRowClick={handleRowClick}
          />
        </div>
      ) : viewMode === "grid" ? (
        <OrderGrid data={paginatedData} />
      ) : (
        <OrderList data={paginatedData} />
      )}

      {/* Pagination info */}
      <div className="text-sm text-gray-500 text-right">
        Showing {meta_data.from} to {meta_data.to} of {meta_data.total} entries
      </div>
    </div>
  );
};

export default Orders;
