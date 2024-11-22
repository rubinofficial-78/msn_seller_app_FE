import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Network Order ID', accessor: 'networkOrderId' },
  { header: 'Collector ID', accessor: 'collectorId' },
  { header: 'Receiver ID', accessor: 'receiverId' },
  { header: 'Order State', accessor: 'orderState' },
  { header: 'Total Value', accessor: 'totalValue' },
  { header: 'Settlement Amount', accessor: 'settlementAmount' },
  { header: 'Settlement Reference', accessor: 'settlementRef' },
  { header: 'Status', accessor: 'status' },
];

const data = [
  {
    networkOrderId: 'NET001',
    collectorId: 'COL001',
    receiverId: 'REC001',
    orderState: 'Completed',
    totalValue: '₹1,999',
    settlementAmount: '₹1,899',
    settlementRef: 'SET001',
    status: 'Paid',
  },
  // Add more sample data as needed
];

function Payouts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Payouts</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Payouts;