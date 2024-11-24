import React, { useState, useMemo } from "react";
import { Search, Download, Eye } from "lucide-react";
import ScrollableTabs from "../components/ScrollableTabs";
import CustomTable from "../components/CustomTable";
import { useNavigate } from 'react-router-dom';

interface LogisticsOrder {
  logisticsBuyerNPName: string;
  logisticsSellerNPName: string;
  orderCreateDateTime: string;
  createdBy: string;
  networkOrderID: string;
  retailOrderID: string;
  networkTransactionID: string;
  logisticsSellerNPOrderID: string;
  orderStatus: string;
  fulfillmentStatus: string;
  rtoStatus: string;
  orderUpdatedDateTime: string;
  readyToShip: boolean;
  awbNo: string;
  readyToShipTimestamp: string;
  shipmentType: string;
  logisticsProvider: string;
  promisedTATDelivery: string;
  shippedDateTime: string;
  deliveredDateTime: string;
  pickupCity: string;
  deliveryCity: string;
  cancelledDateTime: string;
  cancelledBy: string;
  cancellationReason: string;
  shippingCharges: number;
}

// Updated tabs with better color schemes
const tabs = [
  { label: "All Orders", status: "ALL" },
  {
    label: "Pending",
    status: "PENDING",
    count: 25,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    label: "Accepted",
    status: "ACCEPTED",
    count: 42,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    label: "Picked",
    status: "PICKED",
    count: 18,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    label: "In Transit",
    status: "IN_TRANSIT",
    count: 31,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    label: "Delivered",
    status: "DELIVERED",
    count: 156,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    label: "Cancelled",
    status: "CANCELLED",
    count: 12,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    label: "RTO",
    status: "RTO",
    count: 5,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
];

// Sample data for different fulfillment statuses
const generateLogisticsData = (status: string): LogisticsOrder[] => {
  const baseOrder: LogisticsOrder = {
    logisticsBuyerNPName: "preprod.ondc.adya.ai",
    logisticsSellerNPName: "ondc-mock-server-dev.thewitslab.com",
    orderCreateDateTime: "06-11-2024 02:51 pm",
    createdBy: "Ananya Sharma",
    networkOrderID: "1R13B61HJ71YON6774",
    retailOrderID: "FF2UEP8LSK9TTCUCSJ",
    networkTransactionID: "9af98b47-55be-47a9-917c-...",
    logisticsSellerNPOrderID: "1R13B61HJ71YON6774",
    orderStatus: "Active",
    fulfillmentStatus: status,
    rtoStatus: status === "RTO" ? "Initiated" : "None",
    orderUpdatedDateTime: "06-11-2024 03:51 pm",
    readyToShip: status !== "PENDING",
    awbNo: "AWB123456",
    readyToShipTimestamp: "06-11-2024 03:00 pm",
    shipmentType: "Express",
    logisticsProvider: "Delhivery",
    promisedTATDelivery: "2 days",
    shippedDateTime: status !== "PENDING" ? "06-11-2024 04:00 pm" : "",
    deliveredDateTime: status === "DELIVERED" ? "08-11-2024 02:30 pm" : "",
    pickupCity: "Mumbai",
    deliveryCity: "Delhi",
    cancelledDateTime: status === "CANCELLED" ? "07-11-2024 10:30 am" : "",
    cancelledBy: status === "CANCELLED" ? "Seller" : "",
    cancellationReason: status === "CANCELLED" ? "Out of stock" : "",
    shippingCharges: 150.0,
  };

  // Generate multiple orders for each status
  return Array(5)
    .fill(null)
    .map((_, index) => ({
      ...baseOrder,
      networkOrderID: `${baseOrder.networkOrderID}-${index}`,
      retailOrderID: `${baseOrder.retailOrderID}-${index}`,
      shippingCharges: 150.0 + index * 10,
    }));
};

// Create a map of all logistics data
const allLogisticsData = {
  ALL: [
    ...generateLogisticsData("PENDING"),
    ...generateLogisticsData("ACCEPTED"),
    ...generateLogisticsData("PICKED"),
    ...generateLogisticsData("IN_TRANSIT"),
    ...generateLogisticsData("DELIVERED"),
    ...generateLogisticsData("CANCELLED"),
    ...generateLogisticsData("RTO"),
  ],
  PENDING: generateLogisticsData("PENDING"),
  ACCEPTED: generateLogisticsData("ACCEPTED"),
  PICKED: generateLogisticsData("PICKED"),
  IN_TRANSIT: generateLogisticsData("IN_TRANSIT"),
  DELIVERED: generateLogisticsData("DELIVERED"),
  CANCELLED: generateLogisticsData("CANCELLED"),
  RTO: generateLogisticsData("RTO"),
};

// Define the table columns for CustomTable
const tableColumns = [
  {
    id: "logisticsBuyerNPName",
    key: "logisticsBuyerNPName",
    label: "Logistics Buyer NP name",
    minWidth: 200,
  },
  {
    id: "logisticsSellerNPName",
    key: "logisticsSellerNPName",
    label: "Logistics Seller NP name",
    minWidth: 200,
  },
  {
    id: "orderCreateDateTime",
    key: "orderCreateDateTime",
    label: "Order Create Date & time",
    minWidth: 160,
  },
  {
    id: "createdBy",
    key: "createdBy",
    label: "Create By",
    minWidth: 150,
  },
  {
    id: "networkOrderID",
    key: "networkOrderID",
    label: "Network order ID",
    minWidth: 160,
  },
  {
    id: "retailOrderID",
    key: "retailOrderID",
    label: "Retail Order ID",
    minWidth: 160,
  },
  {
    id: "networkTransactionID",
    key: "networkTransactionID",
    label: "Network Transaction ID",
    minWidth: 200,
  },
  {
    id: "logisticsSellerNPOrderID",
    key: "logisticsSellerNPOrderID",
    label: "Logistics Seller NP order ID",
    minWidth: 200,
  },
  {
    id: "orderStatus",
    key: "orderStatus",
    label: "Order Status",
    type: "status",
    minWidth: 140,
  },
  {
    id: "fulfillmentStatus",
    key: "fulfillmentStatus",
    label: "Fulfillment Status",
    minWidth: 150,
  },
  {
    id: "rtoStatus",
    key: "rtoStatus",
    label: "RTO Status",
    minWidth: 140,
  },
  {
    id: "orderUpdatedDateTime",
    key: "orderUpdatedDateTime",
    label: "Order Updated Date & time",
    minWidth: 180,
  },
  {
    id: "readyToShip",
    key: "readyToShip",
    label: "Ready to Ship",
    minWidth: 120,
  },
  {
    id: "awbNo",
    key: "awbNo",
    label: "AWB No",
    minWidth: 140,
  },
  {
    id: "readyToShipTimestamp",
    key: "readyToShipTimestamp",
    label: "Ready to Ship timestamp",
    minWidth: 180,
  },
  {
    id: "shipmentType",
    key: "shipmentType",
    label: "Shipment Type",
    minWidth: 140,
  },
  {
    id: "logisticsProvider",
    key: "logisticsProvider",
    label: "Logistics Provider",
    minWidth: 160,
  },
  {
    id: "promisedTATDelivery",
    key: "promisedTATDelivery",
    label: "Promised TAT of delivery",
    minWidth: 180,
  },
  {
    id: "shippedDateTime",
    key: "shippedDateTime",
    label: "Shipped date and time",
    minWidth: 180,
  },
  {
    id: "deliveredDateTime",
    key: "deliveredDateTime",
    label: "Delivered at date and time",
    minWidth: 180,
  },
  {
    id: "pickupCity",
    key: "pickupCity",
    label: "Pickup City",
    minWidth: 140,
  },
  {
    id: "deliveryCity",
    key: "deliveryCity",
    label: "Delivery City",
    minWidth: 140,
  },
  {
    id: "cancelledDateTime",
    key: "cancelledDateTime",
    label: "Cancelled at date & time",
    minWidth: 180,
  },
  {
    id: "cancelledBy",
    key: "cancelledBy",
    label: "Cancelled by",
    minWidth: 140,
  },
  {
    id: "cancellationReason",
    key: "cancellationReason",
    label: "Cancellation/Failure/return reason",
    minWidth: 240,
  },
  {
    id: "shippingCharges",
    key: "shippingCharges",
    label: "Shipping charges",
    type: "amount",
    minWidth: 140,
  },
];

// Add meta data interface
interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

// Add pagination state and handlers
const Logistics = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: 0,
  });
  const navigate = useNavigate();

  // Get paginated data with updated logic
  const getPaginatedData = (data: LogisticsOrder[]) => {
    const { page_no, per_page } = paginationState;
    const startIndex = (page_no - 1) * per_page;
    const endIndex = startIndex + per_page;
    return data.slice(startIndex, endIndex);
  };

  const handleViewDetails = (order: LogisticsOrder) => {
    navigate(`/dashboard/logistics/${order.networkOrderID}`, { 
      state: { orderDetails: order } 
    });
  };

  // Get the current data based on active tab with pagination
  const currentData = useMemo(() => {
    const tabData = allLogisticsData[activeTab as keyof typeof allLogisticsData] || [];
    setPaginationState(prev => ({
      ...prev,
      total_rows: tabData.length
    }));
    return getPaginatedData(tabData);
  }, [activeTab, paginationState.page_no, paginationState.per_page]);

  // Calculate meta data for pagination
  const meta_data = useMemo(() => {
    const tabData =
      allLogisticsData[activeTab as keyof typeof allLogisticsData] || [];
    return {
      total_rows: tabData.length,
      page_no: paginationState.page_no,
      per_page: paginationState.per_page,
      totalPages: Math.ceil(tabData.length / paginationState.per_page),
    };
  }, [activeTab, paginationState.page_no, paginationState.per_page]);

  // Handle pagination params change with immediate update
  const handlePaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    setPaginationState((prev) => {
      const newState = {
        ...prev,
        page_no: params.page_no || prev.page_no,
        per_page: params.per_page || prev.per_page,
      };

      // If per_page is changing, reset to first page
      if (params.per_page && params.per_page !== prev.per_page) {
        newState.page_no = 1;
      }

      return newState;
    });
  };

  // Handle tab change with pagination reset
  const handleTabChange = (tabLabel: string) => {
    const tab = tabs.find((t) => t.label === tabLabel);
    if (tab) {
      setActiveTab(tab.status);
      setSelectedStatus(tab.status);
      // Reset pagination when changing tabs
      setPaginationState((prev) => ({
        ...prev,
        page_no: 1,
      }));
    }
  };

  // Handle status dropdown change
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    setActiveTab(newStatus);
    // Reset to first page when changing status
    setPaginationState((prev) => ({
      ...prev,
      page_no: 1,
    }));
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Stats Display - Made Smaller and More Compact */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {tabs.slice(1).map((tab) => (
          <div
            key={tab.status}
            className={`${tab.bgColor} ${tab.borderColor} border rounded-lg p-3 transition-all hover:shadow-sm`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${tab.color} font-medium`}>
                {tab.label}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab.bgColor} ${tab.color} border ${tab.borderColor}`}
              >
                {tab.status}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className={`text-lg font-bold ${tab.color}`}>
                {tab.count}
              </span>
              <span className="text-xs text-gray-500 ml-1">orders</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs and Filters - Made More Compact */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center border-b border-gray-200 px-4">
          <div className="flex-1">
            <ScrollableTabs
              tabs={tabs}
              activeTab={
                tabs.find((t) => t.status === activeTab)?.label || "All Orders"
              }
              onTabChange={handleTabChange}
            />
          </div>

          <div className="ml-4 py-2">
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {tabs.map((tab) => (
                <option key={tab.status} value={tab.status}>
                  {tab.label} {tab.count ? `(${tab.count})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters - Made More Compact */}
        <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Order ID/ Transaction ID"
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {/* Other Filters */}
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Shipment Type</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Provider</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">RTO Status</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Fulfillment Status</option>
              {tabs.map((tab) => (
                <option key={tab.status} value={tab.status}>
                  {tab.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="From"
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <button
            className="p-1.5 text-gray-600 hover:text-gray-800"
            title="Download"
          >
            <Download size={18} />
          </button>
        </div>

        {/* Logistics Table */}
        <div className="p-4">
          <CustomTable
            headCells={tableColumns}
            data={currentData}
            pagination={true}
            meta_data={meta_data}
            setParams={handlePaginationChange}
            onRowClick={handleViewDetails}
          />
        </div>
      </div>
    </div>
  );
};

// Helper function to get status messages
const getStatusMessage = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "Awaiting processing";
    case "ACCEPTED":
      return "Orders confirmed";
    case "PICKED":
      return "Ready for shipping";
    case "IN_TRANSIT":
      return "Currently shipping";
    case "DELIVERED":
      return "Successfully delivered";
    case "CANCELLED":
      return "Order cancellations";
    case "RTO":
      return "Return to origin";
    default:
      return "";
  }
};

export default Logistics;
