import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Search, Calendar, Filter } from "lucide-react";
import CustomTable from "../components/CustomTable";
import { getOrders, getOrderStatusLookup, getReturns } from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Define table columns
const tableColumns = [
  { id: "buyer_np_name", label: "Buyer NP Name", key: "customer_name" },
  { id: "seller_np_name", label: "Seller NP Name", key: "created_by.name" },
  { id: "order_create_date", label: "Order Create Date & Time", key: "createdAt", format: (date: string) => new Date(date).toLocaleString() },
  { id: "network_order_id", label: "Network Order ID", key: "sales_order_number" },
  { id: "network_transaction_id", label: "Network Transaction ID", key: "ondc_order_context.transaction_id" },
  { id: "seller_np_order_id", label: "Seller NP Order ID", key: "id" },
  { id: "item_id", label: "Item ID", key: "sales_order_lines[0].id" },
  { id: "order_status", label: "Order Status", key: "status.display_name" },
  { id: "seller_name", label: "Seller Name", key: "created_by.name" },
  { id: "quantity", label: "Quantity", key: "order_quantity" },
  { id: "seller_np_type", label: "Seller NP Type", key: "shipping_type" },
  { id: "seller_pincode", label: "Seller Pincode", key: "start_location.location.address.area_code" },
  { id: "seller_city", label: "Seller City", key: "start_location.location.address.city" },
  { id: "sku_name", label: "SKU Name", key: "sales_order_lines[0].product_name" },
  { id: "sku_code", label: "SKU Code", key: "sales_order_lines[0].product_sku_id" },
  { id: "order_category", label: "Order Category", key: "sales_order_lines[0].parent_category" },
  { id: "ready_to_ship_at", label: "Ready to Ship At Date & Time", key: "sales_order_fulfillments[0].ready_to_ship", format: (date: string) => date ? new Date(date).toLocaleString() : "-" },
  { id: "shipped_at", label: "Shipped At Date & Time", key: "sales_order_fulfillments[0].pickedup_time", format: (date: string) => date ? new Date(date).toLocaleString() : "-" },
  { id: "delivered_at", label: "Delivered At Date & Time", key: "sales_order_fulfillments[0].delivered_time", format: (date: string) => date ? new Date(date).toLocaleString() : "-" },
  { id: "delivery_type", label: "Delivery Type", key: "sales_order_fulfillments[0].fulfiilment_type" },
  { id: "logistics_seller_np_name", label: "Logistics Seller NP Name", key: "sales_order_fulfillments[0].service_provider_name" },
  { id: "logistics_network_order_id", label: "Logistics Network Order ID", key: "sales_order_fulfillments[0].fulfillment_id" },
  { id: "logistics_network_transaction_id", label: "Logistics Network Transaction ID", key: "logistics_network_transaction_id" },
  { id: "delivery_city", label: "Delivery City", key: "end_location.location.address.city" },
  { id: "delivery_pincode", label: "Delivery Pincode", key: "end_location.location.address.area_code" },
  { id: "cancelled_at", label: "Cancelled At Date & Time", key: "sales_order_fulfillments[0].cancelled_date", format: (date: string) => date ? new Date(date).toLocaleString() : "-" },
  { id: "cancelled_by", label: "Cancelled By", key: "sales_order_fulfillments[0].cancelled_by" },
  { id: "cancellation_reason", label: "Cancellation Reason / Return Reason", key: "sales_order_fulfillments[0].cancellation_reason" },
  { id: "total_shipping_charges", label: "Total Shipping Charges", key: "total_shipping_charges", format: (value: number) => `₹${value.toLocaleString('en-IN')}` },
  { id: "total_order_value", label: "Total Order Value", key: "order_amount", format: (value: number) => `₹${value.toLocaleString('en-IN')}` },
  { id: "total_refund_amount", label: "Total Refund Amount", key: "total_refund_amount", format: (value: number) => `₹${value.toLocaleString('en-IN')}` },
  { id: "action", label: "Action", key: "action_triggered" }
];


const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: orders, loading, meta } = useSelector((state: RootState) => state.data.orders);
  const { data: statusLookup } = useSelector((state: RootState) => state.data.orderStatusLookup);
  const { 
    data: returnsData,
    loading: returnsLoading,
    meta: returnsMeta 
  } = useSelector((state: RootState) => state.data.returns);
  
  const [activeTab, setActiveTab] = useState("All Orders");
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({
    search: "",
    fromDate: null as Date | null,
    toDate: null as Date | null
  });

  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10,
    status: "",
    search: "",
    from_date: "",
    to_date: ""
  });

  const [returnsParams, setReturnsParams] = useState({
    page_no: 1,
    per_page: 10,
    search: "",
    from_date: "",
    to_date: ""
  });

  // Fetch orders with current params
  const fetchOrders = useCallback(() => {
    dispatch(getOrders(params));
  }, [dispatch, params]);

  // Fetch returns with current params
  const fetchReturns = useCallback(() => {
    dispatch(getReturns(returnsParams));
  }, [dispatch, returnsParams]);

  // Fetch status lookup on mount
  useEffect(() => {
    dispatch(getOrderStatusLookup());
  }, [dispatch]);

  // Fetch orders or returns when params change
  useEffect(() => {
    if (activeTab === "Returns") {
      fetchReturns();
    } else {
      fetchOrders();
    }
  }, [fetchOrders, fetchReturns, activeTab]);

  // Handle tab change
  const handleTabChange = (tabLabel: string) => {
    setActiveTab(tabLabel);
    if (tabLabel === "All Orders") {
      setParams(prev => ({
        ...prev,
        status: "",
        page_no: 1
      }));
    } else if (tabLabel === "Returns") {
      setReturnsParams(prev => ({
        ...prev,
        page_no: 1
      }));
    } else {
      const selectedStatus = statusLookup?.find(s => s.display_name === tabLabel);
      if (selectedStatus) {
        setParams(prev => ({
          ...prev,
          status: selectedStatus.lookup_code,
          page_no: 1
        }));
      }
    }
  };

  // Handle apply filters
  const handleApply = () => {
    const newParams = {
      search: filterValues.search,
      from_date: filterValues.fromDate ? filterValues.fromDate.toISOString() : "",
      to_date: filterValues.toDate ? filterValues.toDate.toISOString() : "",
      page_no: 1
    };

    if (activeTab === "Returns") {
      setReturnsParams(prev => ({
        ...prev,
        ...newParams
      }));
    } else {
      setParams(prev => ({
        ...prev,
        ...newParams
      }));
    }
    setShowFilters(false);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED': return 'text-green-600';
      case 'IN-PROGRESS': return 'text-orange-500';
      case 'COMPLETED': return 'text-blue-600';
      case 'CANCELLED': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Create tabs including Returns
  const tabs = [
    { label: "All Orders" },
    ...(statusLookup?.map(status => ({
      label: status.display_name,
      lookup_code: status.lookup_code,
      color: getStatusColor(status.lookup_code)
    })) || []),
    { label: "Returns", color: "text-purple-500" }
  ];

  // Returns table columns
  const returnsColumns = [
    {
      id: "return_order_id",
      key: "sales_return_number",
      label: "Return Order ID",
    },
    {
      id: "reference_number",
      key: "reference_number",
      label: "Reference No",
    },
    {
      id: "return_date",
      key: "createdAt",
      label: "Return Date",
      format: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      id: "customer_name",
      key: "customer_name",
      label: "Customer Name",
    },
    {
      id: "items",
      key: "sales_return_fulfillments",
      label: "Number of Items",
      format: (fulfillments: any[]) => 
        fulfillments.reduce((total, f) => total + f.sales_return_lines.length, 0),
    },
    {
      id: "order_amount",
      key: "order_amount",
      label: "Order Amount",
      format: (amount: number) => `₹${amount.toFixed(2)}`,
    },
    {
      id: "return_status",
      key: "status",
      label: "Return Status",
      format: (status: any) => status.display_name,
    },
    {
      id: "seller_name",
      key: "service_provider_name",
      label: "Seller Name",
    },
    {
      id: "actions",
      key: "actions",
      label: "Action",
      renderCell: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewReturn(row)}
            className="p-1 text-blue-600 hover:text-blue-700"
            title="View"
          >
            <Eye size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Handle view return (placeholder)
  const handleViewReturn = (row: any) => {
    console.log("View return:", row);
  };

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Search id="search-icon-orders" className="text-gray-400" size={20} />
          <input
            id="search-input-orders"
            type="text"
            placeholder="Search"
            value={filterValues.search}
            onChange={(e) => setFilterValues(prev => ({ ...prev, search: e.target.value }))}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Calendar id="calendar-icon-orders" className="text-gray-400" size={20} />
          <DatePicker
            id="from-date-picker-orders"
            selected={filterValues.fromDate}
            onChange={(date) => setFilterValues(prev => ({ ...prev, fromDate: date }))}
            placeholderText="From Date"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <DatePicker
            id="to-date-picker-orders"
            selected={filterValues.toDate}
            onChange={(date) => setFilterValues(prev => ({ ...prev, toDate: date }))}
            placeholderText="To Date"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            id="apply-filters-button-orders"
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply
          </button>
        </div>

        <button
          id="filter-button-orders"
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 text-gray-600 hover:text-gray-800"
          title="Filter"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              id={`tab-button-orders-${tab.label}`}
              key={tab.label}
              onClick={() => handleTabChange(tab.label)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.label
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
              {tab.lookup_code && (
                <span className={`ml-2 text-xs ${tab.color}`}>
                  ({meta?.pagination?.total_rows || 0})
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Table View */}
      {activeTab === "Returns" ? (
        <CustomTable
          headCells={returnsColumns}
          data={returnsData}
          meta_data={{
            total: returnsMeta?.pagination?.total_rows || 0,
            per_page: returnsParams.per_page,
            current_page: returnsParams.page_no,
            last_page: returnsMeta?.pagination?.total_pages || 1,
            from: ((returnsParams.page_no - 1) * returnsParams.per_page) + 1,
            to: Math.min(returnsParams.page_no * returnsParams.per_page, returnsMeta?.pagination?.total_rows || 0)
          }}
          setParams={setReturnsParams}
          pagination={true}
          loading={returnsLoading}
        />
      ) : (
        <CustomTable
          headCells={tableColumns}
          data={orders}
          meta_data={{
            total: meta?.pagination?.total_rows || 0,
            per_page: params.per_page,
            current_page: params.page_no,
            last_page: meta?.pagination?.total_pages || 1,
            from: ((params.page_no - 1) * params.per_page) + 1,
            to: Math.min(params.page_no * params.per_page, meta?.pagination?.total_rows || 0)
          }}
          setParams={setParams}
          pagination={true}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Orders;