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

  // Define status steps
  const statusSteps = [
    { id: 10, code: "PENDING", label: "Pending", icon: Package },
    { id: 11, code: "PACKED", label: "Packed", icon: Package },
    { id: 12, code: "ORDER-PICKED-UP", label: "Picked Up", icon: Truck },
    {
      id: 13,
      code: "OUT-FOR-DELIVERY",
      label: "Out for Delivery",
      icon: Truck,
    },
    { id: 14, code: "ORDER-DELIVERED", label: "Delivered", icon: CheckCircle },
  ];

  // Find current status index
  const currentStatusIndex = statusSteps.findIndex(
    (step) =>
      step.id === order?.sales_order_fulfillments?.[0]?.fulfillment_status?.id
  );

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header with Update Status Button for In-progress Orders */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">
              Order ID : {order?.sales_order_number}
            </h1>
            <p className="text-sm text-gray-500">
              Please take the several essential to ensure a smooth and
              successful transaction.
            </p>
          </div>
        </div>

        {/* Show Update Status button only for in-progress orders */}
        {order?.status?.lookup_code === "IN-PROGRESS" && (
          <button
            onClick={() => setShowProcessingModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            UPDATE STATUS
          </button>
        )}
      </div>

      {/* Order Status Timeline */}
      <div className="flex justify-between items-center px-20">
        {order?.status_history?.map((status: any, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                status.status === order.status.display_name
                  ? "bg-green-100"
                  : "bg-gray-100"
              }`}
            >
              {status.status === "Created" && <Package />}
              {status.status === "Accepted" && <CheckCircle />}
              {status.status === "In-progress" && <Truck />}
            </div>
            <span className="mt-2 text-sm font-medium">{status.status}</span>
            <span className="text-xs text-gray-500">
              {new Date(status.updated_at).toLocaleString()}
            </span>
          </div>
        ))}
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

      {/* Order Processing Modal */}
      {showProcessingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[800px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Update Order Status</h2>
              <button
                onClick={() => setShowProcessingModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Status Stepper */}
            <div className="mb-8">
              <div className="relative">
                {/* Progress Bar */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 transition-all duration-300"
                  style={{
                    width: `${
                      (currentStatusIndex / (statusSteps.length - 1)) * 100
                    }%`,
                  }}
                />

                {/* Steps */}
                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const stepStatus = getStepStatus(index);
                    const StepIcon = step.icon;

                    return (
                      <div
                        key={step.id}
                        className="flex flex-col items-center"
                        onClick={() => {
                          // Only allow moving one step forward
                          if (index === currentStatusIndex + 1) {
                            setSelectedStatus(step.id.toString());
                          }
                        }}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors cursor-pointer
                            ${
                              stepStatus === "completed"
                                ? "bg-blue-500 text-white"
                                : stepStatus === "current"
                                ? "bg-blue-500 text-white"
                                : "bg-white border-2 border-gray-300 text-gray-500"
                            }
                            ${
                              index === currentStatusIndex + 1
                                ? "hover:bg-blue-400"
                                : ""
                            }
                          `}
                        >
                          <StepIcon size={20} />
                        </div>
                        <div className="mt-2 text-sm font-medium text-gray-600">
                          {step.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowProcessingModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={!selectedStatus}
                className={`px-4 py-2 rounded-md text-white
                  ${
                    selectedStatus
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
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
