import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  X,
  ArrowRight,
} from "lucide-react";
import {
  getOrderDetails,
  getOrderFulfillmentStatus,
  updateOrderFulfillment,
} from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/types";

const OrderView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { data: order, loading } = useSelector(
    (state: RootState) => state.data.orderDetails
  );
  const { data: fulfillmentStatus } = useSelector(
    (state: RootState) => state.data.orderFulfillmentStatus
  );
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
      dispatch(getOrderFulfillmentStatus());
    }
  }, [dispatch, id]);

  // Define the fixed order of statuses - remove Cancelled from the base order
  const STATUS_ORDER = ["Created", "Accepted", "In-progress", "Completed"];

  // Update the getStatusColor function
  const getStatusColor = (status: string, currentStatus: string) => {
    const statusIndex = STATUS_ORDER.indexOf(status);
    const currentStatusIndex = STATUS_ORDER.indexOf(currentStatus);

    // For Completed orders - all previous steps should be green
    if (currentStatus === "Completed") {
      return statusIndex <= currentStatusIndex ? "bg-green-100" : "bg-gray-100";
    }

    // For Cancelled orders
    if (currentStatus === "Cancelled") {
      if (status === "Cancelled") return "bg-red-100";
      return statusIndex <= STATUS_ORDER.indexOf("Accepted")
        ? "bg-green-100"
        : "bg-gray-100";
    }

    // For In-progress orders
    if (currentStatus === "In-progress") {
      return statusIndex <= currentStatusIndex ? "bg-green-100" : "bg-gray-100";
    }

    // For Accepted orders
    if (currentStatus === "Accepted") {
      return statusIndex <= currentStatusIndex ? "bg-green-100" : "bg-gray-100";
    }

    return "bg-gray-100";
  };

  // Function to get step status
  const getStepStatus = (index: number) => {
    if (index < currentStatusIndex) return "completed";
    if (index === currentStatusIndex) return "current";
    return "upcoming";
  };

  // Function to handle status update
  const handleStatusUpdate = async () => {
    if (!selectedStatus) {
      alert("Please select a status");
      return;
    }

    try {
      await dispatch(
        updateOrderFulfillment(order.id, {
          fulfillment_status_id: parseInt(selectedStatus),
        })
      );

      // Refresh order details
      dispatch(getOrderDetails(id));

      // Show success message
      alert("Order status updated successfully");

      // Close modal and reset state
      setShowProcessingModal(false);
      setSelectedStatus("");
    } catch (error) {
      // Show error message
      alert(
        error instanceof Error ? error.message : "Failed to update order status"
      );
    }
  };

  if (loading || !order) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold">
            Order ID : {order?.sales_order_number}
          </h1>
          <p className="text-sm text-gray-500">
            Please take the several essential to ensure a smooth and successful
            transaction.
          </p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Current Status</span>
            <div
              className={`mt-1 font-medium ${
                order?.status?.lookup_code === "CANCELLED"
                  ? "text-red-600"
                  : order?.status?.lookup_code === "COMPLETED"
                  ? "text-green-600"
                  : order?.status?.lookup_code === "IN-PROGRESS"
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {order?.status?.display_name}
            </div>
          </div>

          {/* Update Status button - Only show if not cancelled or completed */}
          {order?.status?.lookup_code !== "CANCELLED" &&
            order?.status?.lookup_code !== "COMPLETED" && (
              <button
                onClick={() => setShowProcessingModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Update Status
              </button>
            )}
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="flex justify-between items-center px-4 max-w-3xl mx-auto">
        {STATUS_ORDER.map((status, index) => {
          if (!order?.status?.display_name) return null;

          const isCurrentStatus = status === order.status.display_name;
          const statusColor = getStatusColor(status, order.status.display_name);
          const showRedStatus =
            order.status.display_name === "Cancelled" &&
            status === "In-progress";

          // Skip Completed status when order is cancelled
          if (
            order.status.display_name === "Cancelled" &&
            status === "Completed"
          ) {
            return null;
          }

          return (
            <div
              key={status}
              className="flex flex-col items-center relative w-40"
            >
              {/* Connector Line */}
              {index < STATUS_ORDER.length - 1 && (
                <div
                  className={`absolute left-1/2 w-full h-1 top-6 -z-10 
                    ${(() => {
                      if (!order?.status?.display_name) return "bg-gray-200";

                      if (order.status.display_name === "Cancelled") {
                        if (index < STATUS_ORDER.indexOf("Accepted"))
                          return "bg-green-200";
                        if (index === STATUS_ORDER.indexOf("Accepted"))
                          return "bg-red-200";
                        return "bg-gray-200";
                      }

                      const currentIndex = STATUS_ORDER.indexOf(
                        order.status.display_name
                      );
                      if (index < currentIndex) return "bg-green-200";
                      if (index === currentIndex) return "bg-green-200";
                      return "bg-gray-200";
                    })()}`}
                />
              )}

              {/* Status Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center 
                  ${showRedStatus ? "bg-red-100" : statusColor}`}
              >
                {status === "Created" && <Package />}
                {status === "Accepted" && <CheckCircle />}
                {status === "In-progress" && !showRedStatus && <Truck />}
                {status === "Completed" && <CheckCircle />}
                {showRedStatus && <X />}
              </div>

              {/* Status Label */}
              <span
                className={`mt-2 text-sm font-medium 
                  ${
                    showRedStatus
                      ? "text-red-600"
                      : isCurrentStatus
                      ? "text-blue-600"
                      : statusColor === "bg-green-100"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
              >
                {showRedStatus ? "Cancelled" : status}
              </span>

              {/* Timestamp */}
              <span className="text-xs text-gray-500">
                {order.status_history?.find((h) =>
                  showRedStatus ? h.status === "Cancelled" : h.status === status
                )?.updated_at || new Date().toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Order Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Order Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Id
            </label>
            <div className="mt-1">{order?.sales_order_number}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created Date
            </label>
            <div className="mt-1">
              {new Date(order?.createdAt).toLocaleString()}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reference Number
            </label>
            <div className="mt-1">{order?.reference_number}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expected Shipping Date
            </label>
            <div className="mt-1">
              {new Date(order?.order_expected_shipping_date).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Customer Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">{order?.customer_name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <div className="mt-1">{order?.customer_mobile_number}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">{order?.customer_email}</div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Payment Information</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Type
            </label>
            <div className="mt-1">
              {order?.payment_type?.display_name || "-"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Status
            </label>
            <div className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order?.payment_status?.display_name === "PAID"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order?.payment_status?.display_name || "-"}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Transaction ID
            </label>
            <div className="mt-1">
              {order?.payment?.params?.transaction_id || "-"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Collected By
            </label>
            <div className="mt-1">{order?.payment?.collected_by || "-"}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Amount
            </label>
            <div className="mt-1">
              ₹{order?.order_amount?.toLocaleString("en-IN") || "0"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Tax
            </label>
            <div className="mt-1">
              ₹{order?.total_tax?.toLocaleString("en-IN") || "0"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shipping Charges
            </label>
            <div className="mt-1">
              ₹{order?.total_shipping_charges?.toLocaleString("en-IN") || "0"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Packaging Charges
            </label>
            <div className="mt-1">
              ₹{order?.total_packaging_charges?.toLocaleString("en-IN") || "0"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Discount
            </label>
            <div className="mt-1">
              ₹{order?.total_discount?.toLocaleString("en-IN") || "0"}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Refund Amount
            </label>
            <div className="mt-1">
              ₹{order?.total_refund_amount?.toLocaleString("en-IN") || "0"}
            </div>
          </div>
        </div>

        {/* Settlement Details */}
        {order?.payment?.["@ondc/org/settlement_details"]?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium mb-4">Settlement Details</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Settlement Type
                  </label>
                  <div className="mt-1">
                    {order?.payment?.["@ondc/org/settlement_details"][0]
                      ?.settlement_type || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Settlement Phase
                  </label>
                  <div className="mt-1">
                    {order?.payment?.["@ondc/org/settlement_details"][0]
                      ?.settlement_phase || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Beneficiary Name
                  </label>
                  <div className="mt-1">
                    {order?.payment?.["@ondc/org/settlement_details"][0]
                      ?.beneficiary_name || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Settlement Bank Account
                  </label>
                  <div className="mt-1">
                    {order?.payment?.["@ondc/org/settlement_details"][0]
                      ?.settlement_bank_account_no
                      ? `XXXX${order.payment[
                          "@ondc/org/settlement_details"
                        ][0].settlement_bank_account_no.slice(-4)}`
                      : "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Settlement IFSC
                  </label>
                  <div className="mt-1">
                    {order?.payment?.["@ondc/org/settlement_details"][0]
                      ?.settlement_ifsc_code || "-"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Settlement Counterparty
                  </label>
                  <div className="mt-1">
                    {order?.payment?.["@ondc/org/settlement_details"][0]
                      ?.settlement_counterparty || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-6">Order Items</h2>
        <div className="space-y-4">
          {order?.sales_order_fulfillments?.[0]?.sales_order_lines?.map(
            (item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.product_images[0]}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.product_name}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.item_quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ₹{item.item_price}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {showProcessingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Manual status update</h2>
              <button
                onClick={() => setShowProcessingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Status Options */}
            <div className="space-y-6 mb-6">
              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-blue-500 transition-all duration-300 ease-in-out"
                  style={{
                    width: `${
                      (selectedStatus
                        ? fulfillmentStatus
                            ?.slice(1, 6)
                            .findIndex(
                              (s) => s.id.toString() === selectedStatus
                            ) + 1
                        : 0) *
                      (100 / 5)
                    }%`,
                  }}
                />
              </div>

              {/* Status Buttons */}
              <div className="flex justify-between gap-3">
                {fulfillmentStatus?.slice(1, 6).map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setSelectedStatus(status.id.toString())}
                    className={`flex-1 relative p-4 rounded-lg transition-all duration-200 ${
                      selectedStatus === status.id.toString()
                        ? "bg-blue-50 border-2 border-blue-500 shadow-sm"
                        : "bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    {/* Status Icon */}
                    <div
                      className={`mb-2 ${
                        selectedStatus === status.id.toString()
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    >
                      {status.lookup_code === "PENDING" && (
                        <Package size={20} />
                      )}
                      {status.lookup_code === "PACKED" && <Package size={20} />}
                      {status.lookup_code === "ORDER-PICKED-UP" && (
                        <Truck size={20} />
                      )}
                      {status.lookup_code === "OUT-FOR-DELIVERY" && (
                        <Truck size={20} />
                      )}
                      {status.lookup_code === "ORDER-DELIVERED" && (
                        <CheckCircle size={20} />
                      )}
                    </div>

                    {/* Status Name */}
                    <div
                      className={`text-sm font-medium ${
                        selectedStatus === status.id.toString()
                          ? "text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {status.display_name}
                    </div>

                    {/* Selected Indicator */}
                    {selectedStatus === status.id.toString() && (
                      <div className="absolute -top-1 -right-1">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle size={12} className="text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Air way bill input - with improved styling */}
            {selectedStatus ===
              fulfillmentStatus
                ?.slice(1, 6)
                .find((s) => s.lookup_code === "ORDER-PICKED-UP")
                ?.id.toString() && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Air way bill number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter air way bill number"
                />
              </div>
            )}

            {/* Action Buttons - with improved styling */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setShowProcessingModal(false)}
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={!selectedStatus}
                className={`px-6 py-2.5 rounded-lg transition-all duration-200 ${
                  selectedStatus
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderView;
