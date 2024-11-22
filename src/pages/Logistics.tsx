import React, { useState } from "react";
import { Search, Download, Eye } from "lucide-react";
import ScrollableTabs from "../components/ScrollableTabs";

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

// Sample data
const logisticsData: LogisticsOrder[] = [
  {
    logisticsBuyerNPName: "preprod.ondc.adya.ai",
    logisticsSellerNPName: "ondc-mock-server-dev.thewitslab.com",
    orderCreateDateTime: "06-11-2024 02:51 pm",
    createdBy: "Ananya Sharma",
    networkOrderID: "1R13B61HJ71YON6774",
    retailOrderID: "FF2UEP8LSK9TTCUCSJ",
    networkTransactionID: "9af98b47-55be-47a9-917c-...",
    logisticsSellerNPOrderID: "1R13B61HJ71YON6774",
    orderStatus: "Completed",
    fulfillmentStatus: "Fulfilled",
    rtoStatus: "None",
    orderUpdatedDateTime: "06-11-2024 03:51 pm",
    readyToShip: true,
    awbNo: "AWB123456",
    readyToShipTimestamp: "06-11-2024 03:00 pm",
    shipmentType: "Express",
    logisticsProvider: "Delhivery",
    promisedTATDelivery: "2 days",
    shippedDateTime: "06-11-2024 04:00 pm",
    deliveredDateTime: "08-11-2024 02:30 pm",
    pickupCity: "Mumbai",
    deliveryCity: "Delhi",
    cancelledDateTime: "",
    cancelledBy: "",
    cancellationReason: "",
    shippingCharges: 150.0,
  },
  // Add more sample data
];

// Tab definitions
const tabs = [
  { label: "All Orders" },
  { label: "RTS" },
  { label: "Created" },
  { label: "Accepted" },
  { label: "In Progress" },
  { label: "Completed" },
  { label: "Cancelled Orders" },
];

const LogisticsTable: React.FC<{ data: LogisticsOrder[] }> = ({ data }) => (
  <div className="h-[calc(100vh-280px)] flex flex-col bg-white rounded-lg shadow">
    {/* Table Header - Fixed */}
    <div className="bg-blue-50">
      <div className="overflow-x-auto">
        <table className="min-w-max" style={{ width: "3500px" }}>
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logistics Buyer NP name
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logistics Seller NP name
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Create Date & time
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Create By
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Network order ID
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Retail Order ID
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Network Transaction ID
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logistics Seller NP order ID
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Status
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fulfillment Status
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RTO Status
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Updated Date & time
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ready to Ship
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AWB No
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ready to Ship timestamp
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipment Type
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logistics Provider
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Promised TAT of delivery
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipped date and time
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivered at date and time
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup City
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery City
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cancelled at date & time
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cancelled by
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cancellation/Failure/return reason
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipping charges
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

    {/* Table Body - Scrollable */}
    <div className="flex-1 overflow-auto">
      <div className="overflow-x-auto">
        <table className="min-w-max" style={{ width: "3500px" }}>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.logisticsBuyerNPName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.logisticsSellerNPName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.orderCreateDateTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.createdBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.networkOrderID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.retailOrderID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.networkTransactionID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.logisticsSellerNPOrderID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      order.orderStatus === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.orderStatus === "In Progress"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.fulfillmentStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.rtoStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.orderUpdatedDateTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.readyToShip ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.awbNo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.readyToShipTimestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.shipmentType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.logisticsProvider}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.promisedTATDelivery}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.shippedDateTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.deliveredDateTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.pickupCity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.deliveryCity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.cancelledDateTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.cancelledBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.cancellationReason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{order.shippingCharges.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Logistics = () => {
  const [activeTab, setActiveTab] = useState("All Orders");

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <ScrollableTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search Order ID/ Transaction ID"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          {/* Filters */}
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">Shipment Type</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">Provider</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">Fulfillment Status</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">RTO Status</option>
          </select>
          <input
            type="text"
            placeholder="From"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* Download Button */}
        <button
          className="p-2 text-gray-600 hover:text-gray-800"
          title="Download"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Logistics Table */}
      <LogisticsTable data={logisticsData} />
    </div>
  );
};

export default Logistics;
