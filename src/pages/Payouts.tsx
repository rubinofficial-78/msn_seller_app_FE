import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';

// Sample data for payouts
const payoutData = [
  {
    networkOrderID: 'SMBOI04XRO27BIAUYW',
    collectorID: 'preprod.ondc.adya.ai',
    receiverID: 'preprod.ondc.adya.ai',
    orderState: 'Completed',
    orderCreatedDateTime: '2024-11-07 13:10:54',
    shippingCharges: 0.00,
    packagingCharges: 32.00,
    convenienceCharges: 10.00,
    totalOrderValue: 282.00,
    orderItemIDPrice: 'ITEM123 - ₹250.00',
    buyerFinderFee: 5.00,
    withholdingAmount: 2.00,
    tcs: 1.00,
    tds: 1.50,
    deductionByCollector: 3.00,
    settlementAmount: 269.50,
    returnWindow: '7 days',
    beneficiaryIFSC: 'HDFC0001234',
    settlementReferenceNumber: 'SET123456789',
    differenceAmount: 0.00,
    message: 'Settlement successful',
    createdDateTime: '2024-11-07 13:15:54'
  },
  // Add more sample data as needed
];

const PayoutsTable = () => (
  <div className="h-[calc(100vh-180px)] flex flex-col bg-white rounded-lg shadow">
    {/* Table Header - Fixed */}
    <div className="bg-blue-50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-max" style={{ width: '2500px' }}> {/* Fixed width for table */}
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Network Order ID</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Collector ID</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Receiver ID</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Order State</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Order Created Date & Time</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Shipping Charges</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Packaging Charges</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Convenience Charges</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Total Order Value</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Order Item ID & Price</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Buyer Finder Fee</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Withholding Amount</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">TCS</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">TDS</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Deduction by Collector</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Settlement Amount</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Return Window</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Beneficiary IFSC</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Settlement Reference Number</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Difference Amount</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Message</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Created Date & Time</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

    {/* Table Body - Scrollable */}
    <div className="flex-1 overflow-auto">
      <div className="overflow-x-auto">
        <table className="min-w-max" style={{ width: '2500px' }}> {/* Fixed width for table */}
          <tbody className="bg-white divide-y divide-gray-200">
            {payoutData.map((payout, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">{payout.networkOrderID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">{payout.collectorID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">{payout.receiverID}</td>
                <td className="px-6 py-4 whitespace-nowrap w-32">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${payout.orderState === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {payout.orderState}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">{payout.orderCreatedDateTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.shippingCharges.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.packagingCharges.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.convenienceCharges.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.totalOrderValue.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">{payout.orderItemIDPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.buyerFinderFee.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.withholdingAmount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.tcs.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.tds.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.deductionByCollector.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 w-32">₹{payout.settlementAmount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">{payout.returnWindow}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">{payout.beneficiaryIFSC}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">{payout.settlementReferenceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">₹{payout.differenceAmount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">{payout.message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">{payout.createdDateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Payouts = () => {
  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search Network Order ID"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Download Button */}
        <button 
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Payouts Table */}
      <PayoutsTable />
    </div>
  );
};

export default Payouts;