import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, X } from "lucide-react";
import { RootState } from "../../redux/types";
import { AppDispatch } from "../../redux/store";
import { getReturnDetails } from "../../redux/Action/action";

const ReturnView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { data: returnDetails, loading, error } = useSelector(
    (state: RootState) => state.data.returnDetails
  );

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    if (id) {
      console.log('Fetching return details for ID:', id);
      dispatch(getReturnDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log('Return Details State:', { loading, returnDetails });
  }, [loading, returnDetails]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading return details...</p>
        </div>
      </div>
    );
  }

  if (!returnDetails && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No return details found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Get the current status index for the progress bar
  const statusOrder = ["Initiated", "Approved", "Picked-up", "Completed"];
  const currentStatusIndex = statusOrder.indexOf(returnDetails?.status?.display_name || "");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with Back Button and Reject Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">
              Order ID : {returnDetails?.sales_return_number}
            </h1>
            <p className="text-sm text-gray-600">
              This information is helpful for you to track your order. This information will be displayed publicly so be careful of what you share.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowRejectModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Reject return
        </button>
      </div>

      {/* Status Progress */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between mb-8">
          {statusOrder.map((status, index) => (
            <div
              key={status}
              className={`flex flex-col items-center relative ${
                index <= currentStatusIndex ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  index <= currentStatusIndex ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                {/* Add appropriate icon based on status */}
                ✓
              </div>
              <span className="text-sm font-medium">{status}</span>
              {index < statusOrder.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-0.5 ${
                    index < currentStatusIndex ? "bg-green-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Return Items */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Return Items</h2>
          <p className="text-sm text-gray-600 mb-4">
            Products that are needed to processed and send at the delivery address of the customer.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tax
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {returnDetails?.sales_return_fulfillments?.[0]?.sales_return_lines?.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={item.product_images?.[0] || "/placeholder.png"}
                          alt={item.product_name}
                          className="w-12 h-12 rounded object-cover mr-3"
                        />
                        <span>{item.product_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">₹{item.price?.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4">₹{item.tax?.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4">₹{item.total?.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
        <p className="text-sm text-gray-600 mb-4">
          Payment details that will help you understand how much profit you make via this product.
        </p>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{returnDetails?.order_amount?.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Tax</span>
            <span>₹{returnDetails?.return_total_amount?.toLocaleString("en-IN")}</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span>₹{(returnDetails?.order_amount + returnDetails?.return_total_amount)?.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
       {/* Return Order Information */}
       <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Returns Order Information</h2>
        <p className="text-sm text-gray-600 mb-6">
          This information is helpful for you to track your order. This information will be displayed publicly so be careful of what you share.
        </p>

        {/* Return Reason */}
        <div className="mb-6">
          <h3 className="text-base font-medium mb-2">Return Reason</h3>
          <p className="text-gray-700">
            {returnDetails?.sales_return_fulfillments?.[0]?.tags?.[0]?.list?.find(
              (item: any) => item.code === "reason_desc"
            )?.value || "No reason provided"}
          </p>
        </div>

        {/* Grid Layout for Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Order Id :</h3>
            <p className="mt-1">{returnDetails?.sales_return_number}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Created Date :</h3>
            <p className="mt-1">{new Date(returnDetails?.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Product Liquidated :</h3>
            <p className="mt-1">{returnDetails?.sales_return_fulfillments?.[0]?.is_liquidated ? "Yes" : "No"}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Reference Number :</h3>
            <p className="mt-1">{returnDetails?.reference_number}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Expected Shipping Date :</h3>
            <p className="mt-1">
              {returnDetails?.return_expected_shipping_date 
                ? new Date(returnDetails.return_expected_shipping_date).toLocaleString() 
                : "Not set"}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Customer name :</h3>
            <p className="mt-1">{returnDetails?.customer_name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Customer Contact no :</h3>
            <p className="mt-1">{returnDetails?.customer_mobile_number}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Customer email :</h3>
            <p className="mt-1">{returnDetails?.customer_email}</p>
          </div>
        </div>

        {/* Address Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="text-base font-medium mb-2">Delivery Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{returnDetails?.customer_shipping_address?.name}</p>
              <p>{returnDetails?.customer_shipping_address?.building}</p>
              <p>{returnDetails?.customer_shipping_address?.locality}</p>
              <p>
                {returnDetails?.customer_shipping_address?.city}, {returnDetails?.customer_shipping_address?.state}
              </p>
              <p>{returnDetails?.customer_shipping_address?.area_code}</p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium mb-2">Billing Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{returnDetails?.customer_billing_address?.name}</p>
              <p>{returnDetails?.customer_billing_address?.building}</p>
              <p>{returnDetails?.customer_billing_address?.locality}</p>
              <p>
                {returnDetails?.customer_billing_address?.city}, {returnDetails?.customer_billing_address?.state}
              </p>
              <p>{returnDetails?.customer_billing_address?.area_code}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold">Reject return</h3>
                <p className="text-gray-500 mt-1">
                  Are you sure you want to reject the return.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Fulfillment 1</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={returnDetails?.sales_return_fulfillments?.[0]?.sales_return_lines?.[0]?.product_images?.[0] || "/placeholder.png"}
                    alt="Product"
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {returnDetails?.sales_return_fulfillments?.[0]?.sales_return_lines?.[0]?.product_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {returnDetails?.sales_return_fulfillments?.[0]?.sales_return_lines?.[0]?.sku_id}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-gray-500">Quantity</p>
                    <p>{returnDetails?.sales_return_fulfillments?.[0]?.sales_return_lines?.[0]?.quantity}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p>₹{returnDetails?.sales_return_fulfillments?.[0]?.sales_return_lines?.[0]?.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tax</p>
                    <p>₹{returnDetails?.sales_return_fulfillments?.[0]?.sales_return_lines?.[0]?.tax}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total amount</p>
                    <p>₹{returnDetails?.sales_return_fulfillments?.[0]?.sales_return_lines?.[0]?.total}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Return Reject Reason
              </label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Return Reject Reason</option>
                {/* Add your reject reasons here */}
                <option value="reason1">Reason 1</option>
                <option value="reason2">Reason 2</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  // Add your reject logic here
                  console.log('Rejecting return with reason:', rejectReason);
                  setShowRejectModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!rejectReason}
              >
                Yes Reject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReturnView; 