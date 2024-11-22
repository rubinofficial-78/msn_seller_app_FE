import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Order ID', accessor: 'orderId' },
  { header: 'Buyer NP Name', accessor: 'buyerNp' },
  { header: 'Seller NP Name', accessor: 'sellerNp' },
  { header: 'Order Date', accessor: 'orderDate' },
  { header: 'Status', accessor: 'status' },
  { header: 'Total Value', accessor: 'totalValue' },
  { header: 'Shipping Charges', accessor: 'shippingCharges' },
  { header: 'Delivery Type', accessor: 'deliveryType' },
];

const data = [
  {
    orderId: 'ORD001',
    buyerNp: 'Buyer 1',
    sellerNp: 'Seller 1',
    orderDate: '2024-03-01',
    status: 'Processing',
    totalValue: '₹1,999',
    shippingCharges: '₹49',
    deliveryType: 'Standard',
  },
  // Add more sample data as needed
];

function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Orders;