import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, Package, MapPin, Clock, DollarSign } from 'lucide-react';

interface LogisticsOrder {
  // ... your existing interface ...
  shippingCharges: number;
}

const LogisticsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state as { orderDetails: LogisticsOrder };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Order Details
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Order ID:</span>
          <span className="text-sm font-medium">{orderDetails.networkOrderID}</span>
        </div>
      </div>

      {/* Order Status Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Status</p>
              <p className="font-medium">{orderDetails.orderStatus}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Truck className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fulfillment Status</p>
              <p className="font-medium">{orderDetails.fulfillmentStatus}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MapPin className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Location</p>
              <p className="font-medium">{orderDetails.deliveryCity}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">{orderDetails.orderCreateDateTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <DollarSign className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Shipping Charges</p>
              <p className="font-medium">₹{orderDetails.shippingCharges.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Order Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Buyer NP Name</p>
                <p className="font-medium">{orderDetails.logisticsBuyerNPName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seller NP Name</p>
                <p className="font-medium">{orderDetails.logisticsSellerNPName}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Transaction ID</p>
              <p className="font-medium">{orderDetails.networkTransactionID}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">AWB Number</p>
              <p className="font-medium">{orderDetails.awbNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Shipping Charges</p>
              <p className="font-medium text-blue-600">₹{orderDetails.shippingCharges.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Shipment Type</p>
                <p className="font-medium">{orderDetails.shipmentType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Logistics Provider</p>
                <p className="font-medium">{orderDetails.logisticsProvider}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Pickup City</p>
                <p className="font-medium">{orderDetails.pickupCity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delivery City</p>
                <p className="font-medium">{orderDetails.deliveryCity}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Promised TAT Delivery</p>
              <p className="font-medium">{orderDetails.promisedTATDelivery}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add a new section for Charges Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Charges Breakdown</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500">Base Shipping Charge</p>
              <p className="font-medium">₹{(orderDetails.shippingCharges * 0.8).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Additional Charges</p>
              <p className="font-medium">₹{(orderDetails.shippingCharges * 0.15).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Taxes</p>
              <p className="font-medium">₹{(orderDetails.shippingCharges * 0.05).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Charges</p>
              <p className="font-medium text-blue-600">₹{orderDetails.shippingCharges.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDetails; 