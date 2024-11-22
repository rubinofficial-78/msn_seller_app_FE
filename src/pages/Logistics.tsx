import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Order ID', accessor: 'orderId' },
  { header: 'AWB Number', accessor: 'awbNumber' },
  { header: 'Status', accessor: 'status' },
  { header: 'Provider', accessor: 'provider' },
  { header: 'Pickup City', accessor: 'pickupCity' },
  { header: 'Delivery City', accessor: 'deliveryCity' },
  { header: 'Expected Delivery', accessor: 'expectedDelivery' },
];

const data = [
  {
    orderId: 'ORD001',
    awbNumber: 'AWB001',
    status: 'In Transit',
    provider: 'Express Logistics',
    pickupCity: 'Mumbai',
    deliveryCity: 'Delhi',
    expectedDelivery: '2024-03-05',
  },
  // Add more sample data as needed
];

function Logistics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Logistics</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Logistics;