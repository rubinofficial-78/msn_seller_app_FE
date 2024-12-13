import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Search, Calendar, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import {
  getOrders,
  getOrderStatusLookup,
  getReturns,
  getCancellationReasons,
  cancelOrder,
} from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Move tableColumns inside the component to access navigate
  const tableColumns = [
    { id: "buyer_np_name", label: "Buyer NP Name", key: "customer_name" },
    { id: "seller_np_name", label: "Seller NP Name", key: "created_by.name" },
    {
      id: "order_create_date",
      label: "Order Create Date & Time",
      key: "createdAt",
      type: "custom",
      renderCell: (row: any) => (
        <span>{new Date(row.createdAt).toLocaleString()}</span>
      ),
    },
    {
      id: "network_order_id",
      label: "Network Order ID",
      key: "sales_order_number",
    },
    {
      id: "network_transaction_id",
      label: "Network Transaction ID",
      key: "ondc_order_context.transaction_id",
    },
    { id: "seller_np_order_id", label: "Seller NP Order ID", key: "id" },
    { id: "item_id", label: "Item ID", key: "sales_order_lines[0].id" },
    { id: "order_status", label: "Order Status", key: "status.display_name" },
    { id: "seller_name", label: "Seller Name", key: "created_by.name" },
    { id: "quantity", label: "Quantity", key: "order_quantity" },
    { id: "seller_np_type", label: "Seller NP Type", key: "shipping_type" },
    {
      id: "seller_pincode",
      label: "Seller Pincode",
      key: "start_location.location.address.area_code",
    },
    {
      id: "seller_city",
      label: "Seller City",
      key: "start_location.location.address.city",
    },
    {
      id: "sku_name",
      label: "SKU Name",
      key: "sales_order_lines[0].product_name",
    },
    {
      id: "sku_code",
      label: "SKU Code",
      key: "sales_order_lines[0].product_sku_id",
    },
    {
      id: "order_category",
      label: "Order Category",
      key: "sales_order_lines[0].parent_category",
    },
    {
      id: "ready_to_ship_at",
      label: "Ready to Ship At Date & Time",
      key: "sales_order_fulfillments[0].ready_to_ship",
      type: "custom",
      renderCell: (row: any) => (
        <span>{new Date(row.sales_order_fulfillments[0].ready_to_ship).toLocaleString()}</span>
      ),
    },
    {
      id: "shipped_at",
      label: "Shipped At Date & Time",
      key: "sales_order_fulfillments[0].pickedup_time",
      type: "custom",
      renderCell: (row: any) => (
        <span>{new Date(row.sales_order_fulfillments[0].pickedup_time).toLocaleString()}</span>
      ),
    },
    {
      id: "delivered_at",
      label: "Delivered At Date & Time",
      key: "sales_order_fulfillments[0].delivered_time",
      type: "custom",
      renderCell: (row: any) => (
        <span>{new Date(row.sales_order_fulfillments[0].delivered_time).toLocaleString()}</span>
      ),
    },
    {
      id: "delivery_type",
      label: "Delivery Type",
      key: "sales_order_fulfillments[0].fulfiilment_type",
    },
    {
      id: "logistics_seller_np_name",
      label: "Logistics Seller NP Name",
      key: "sales_order_fulfillments[0].service_provider_name",
    },
    {
      id: "logistics_network_order_id",
      label: "Logistics Network Order ID",
      key: "sales_order_fulfillments[0].fulfillment_id",
    },
    {
      id: "logistics_network_transaction_id",
      label: "Logistics Network Transaction ID",
      key: "logistics_network_transaction_id",
    },
    {
      id: "delivery_city",
      label: "Delivery City",
      key: "end_location.location.address.city",
    },
    {
      id: "delivery_pincode",
      label: "Delivery Pincode",
      key: "end_location.location.address.area_code",
    },
    {
      id: "cancelled_at",
      label: "Cancelled At Date & Time",
      key: "sales_order_fulfillments[0].cancelled_date",
      type: "custom",
      renderCell: (row: any) => (
        <span>{new Date(row.sales_order_fulfillments[0].cancelled_date).toLocaleString()}</span>
      ),
    },
    {
      id: "cancelled_by",
      label: "Cancelled By",
      key: "sales_order_fulfillments[0].cancelled_by",
    },
    {
      id: "cancellation_reason",
      label: "Cancellation Reason / Return Reason",
      key: "sales_order_fulfillments[0].cancellation_reason",
    },
    {
      id: "total_shipping_charges",
      label: "Total Shipping Charges",
      key: "total_shipping_charges",
      format: (value: number) => `₹${value.toLocaleString("en-IN")}`,
    },
    {
      id: "total_order_value",
      label: "Total Order Value",
      key: "order_amount",
      format: (value: number) => `₹${value.toLocaleString("en-IN")}`,
    },
    {
      id: "total_refund_amount",
      label: "Total Refund Amount",
      key: "total_refund_amount",
      format: (value: number) => `₹${value.toLocaleString("en-IN")}`,
    },
    {
      id: "action",
      label: "Action",
      key: "action_triggered",
      type: "actions",
      minWidth: 100,
      actions: [
        {
          label: "View",
          icon: "eye",
          onClick: (row: any) => navigate(`/dashboard/orders/view/${row.id}`),
        },
        {
          label: "Cancel",
          icon: "close",
          onClick: (row: any) => handleCancelOrder(row),
          show: (row: any) =>
            ["IN-PROGRESS", "ACCEPTED"].includes(row.status?.lookup_code),
          className: "text-red-600 hover:bg-red-50",
        },
      ],
    },
  ];

  const {
    data: orders,
    loading,
    meta,
  } = useSelector((state: RootState) => state.data.orders);
  const { data: statusLookup } = useSelector(
    (state: RootState) => state.data.orderStatusLookup
  );
  const {
    data: returnsData,
    loading: returnsLoading,
    meta: returnsMeta,
  } = useSelector((state: RootState) => state.data.returns);

  const [activeTab, setActiveTab] = useState("All Orders");
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({
    search: "",
    fromDate: null as Date | null,
    toDate: null as Date | null,
  });

  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10,
    status: "",
    search: "",
    from_date: "",
    to_date: "",
  });

  const [returnsParams, setReturnsParams] = useState({
    page_no: 1,
    per_page: 10,
    search: "",
    from_date: "",
    to_date: "",
  });

  // Add states for cancel popup
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState("");

  // Add selector for cancellation reasons
  const { data: cancellationReasons } = useSelector(
    (state: RootState) => state.data.cancellationReasons
  );

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

  // Fetch cancellation reasons when component mounts
  useEffect(() => {
    dispatch(getCancellationReasons());
  }, [dispatch]);

  // Handle tab change
  const handleTabChange = (tabLabel: string) => {
    setActiveTab(tabLabel);
    if (tabLabel === "All Orders") {
      setParams((prev) => ({
        ...prev,
        status: "",
        page_no: 1,
      }));
    } else if (tabLabel === "Returns") {
      setReturnsParams((prev) => ({
        ...prev,
        page_no: 1,
      }));
    } else {
      const selectedStatus = statusLookup?.find(
        (s) => s.display_name === tabLabel
      );
      if (selectedStatus) {
        setParams((prev) => ({
          ...prev,
          status: selectedStatus.lookup_code,
          page_no: 1,
        }));
      }
    }
  };

  // Handle apply filters
  const handleApply = () => {
    const newParams = {
      search: filterValues.search,
      from_date: filterValues.fromDate
        ? filterValues.fromDate.toISOString()
        : "",
      to_date: filterValues.toDate ? filterValues.toDate.toISOString() : "",
      page_no: 1,
    };

    if (activeTab === "Returns") {
      setReturnsParams((prev) => ({
        ...prev,
        ...newParams,
      }));
    } else {
      setParams((prev) => ({
        ...prev,
        ...newParams,
      }));
    }
    setShowFilters(false);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return "text-green-600";
      case "IN-PROGRESS":
        return "text-orange-500";
      case "COMPLETED":
        return "text-blue-600";
      case "CANCELLED":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Create tabs including Returns
  const tabs = [
    { label: "All Orders" },
    ...(statusLookup?.map((status) => ({
      label: status.display_name,
      lookup_code: status.lookup_code,
      color: getStatusColor(status.lookup_code),
    })) || []),
    { label: "Returns", color: "text-purple-500" },
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
      type: "custom",
      renderCell: (row: any) => {
        const itemCount =
          row.sales_return_fulfillments?.reduce(
            (total: number, fulfillment: any) =>
              total + (fulfillment.sales_return_lines?.length || 0),
            0
          ) || 0;
        return <span>{itemCount}</span>;
      },
    },
    {
      id: "order_amount",
      key: "order_amount",
      label: "Order Amount",
      format: (amount: number) => `₹${amount?.toFixed(2) || "0.00"}`,
    },
    {
      id: "return_status",
      key: "status",
      label: "Return Status",
      type: "custom",
      renderCell: (row: any) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row.status?.lookup_code === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : row.status?.lookup_code === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status?.display_name || "N/A"}
        </span>
      ),
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
      type: "actions",
      actions: [
        {
          label: "View",
          icon: "eye",
          onClick: (row: any) => navigate(`/dashboard/returns/view/${row.id}`),
        },
      ],
    },
  ];

  // Handle view return (placeholder)
  const handleViewReturn = (row: any) => {
    console.log("View return:", row);
  };

  // Add the cancel handler function
  const handleCancelOrder = (order: any) => {
    setSelectedOrder(order);
    setShowCancelModal(true);
  };

  // Add cancel confirmation handler
  const handleConfirmCancel = async () => {
    if (!cancelReason) {
      alert("Please select a reason for cancellation");
      return;
    }

    try {
      const payload = {
        id: selectedOrder.id,
        ids: selectedOrder.sales_order_fulfillments[0].sales_order_lines.map(
          (line: any) => ({
            id: line.id,
            item_quantity: line.item_quantity,
          })
        ),
        cancellation_reason_id: parseInt(cancelReason),
        item_status_id: 7, // Status ID for cancelled
      };

      await dispatch(cancelOrder(payload));

      // Refresh orders list
      fetchOrders();

      // Show success message
      alert("Order cancelled successfully");

      // Close modal and reset state
      setShowCancelModal(false);
      setSelectedOrder(null);
      setCancelReason("");
    } catch (error) {
      // Show error message
      alert(error instanceof Error ? error.message : "Failed to cancel order");
    }
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
            onChange={(e) =>
              setFilterValues((prev) => ({ ...prev, search: e.target.value }))
            }
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Calendar
            id="calendar-icon-orders"
            className="text-gray-400"
            size={20}
          />
          <DatePicker
            id="from-date-picker-orders"
            selected={filterValues.fromDate}
            onChange={(date) =>
              setFilterValues((prev) => ({ ...prev, fromDate: date }))
            }
            placeholderText="From Date"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <DatePicker
            id="to-date-picker-orders"
            selected={filterValues.toDate}
            onChange={(date) =>
              setFilterValues((prev) => ({ ...prev, toDate: date }))
            }
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
                ${
                  activeTab === tab.label
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
            from: (returnsParams.page_no - 1) * returnsParams.per_page + 1,
            to: Math.min(
              returnsParams.page_no * returnsParams.per_page,
              returnsMeta?.pagination?.total_rows || 0
            ),
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
            from: (params.page_no - 1) * params.per_page + 1,
            to: Math.min(
              params.page_no * params.per_page,
              meta?.pagination?.total_rows || 0
            ),
          }}
          setParams={setParams}
          pagination={true}
          loading={loading}
        />
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Cancel Order</h2>
              <button
                onClick={() => setShowCancelModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Order has been accepted by default if you want to cancel the
              order.
            </p>

            {/* Fulfillment Section */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-4">Fulfillment 1</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Select
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Product Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Tax
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Total amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.sales_order_fulfillments?.[0]?.sales_order_lines?.map(
                      (item: any) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked
                              readOnly
                              className="rounded"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product_images?.[0]}
                                alt={item.product_name}
                                className="w-10 h-10 object-cover rounded"
                              />
                              {item.product_name}
                            </div>
                          </td>
                          <td className="px-4 py-3">{item.item_quantity}</td>
                          <td className="px-4 py-3">₹{item.item_price}</td>
                          <td className="px-4 py-3">₹{item.item_tax}</td>
                          <td className="px-4 py-3">₹{item.total_amount}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cancel Reason */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancel reason
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select reason to cancel order</option>
                {cancellationReasons?.map((reason: any) => (
                  <option key={reason.id} value={reason.lookup_code}>
                    {reason.display_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Yes cancel order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
