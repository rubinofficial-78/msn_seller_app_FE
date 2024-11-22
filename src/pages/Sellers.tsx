import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Seller Name', accessor: 'name' },
  { header: 'Store Name', accessor: 'store' },
  { header: 'Contact Information', accessor: 'contact' },
  { header: 'Address', accessor: 'address' },
  { header: 'GST No', accessor: 'gst' },
  { header: 'Product Count', accessor: 'productCount' },
  { header: 'ONDC Live Date', accessor: 'ondcLiveDate' },
  { header: 'Onboarding Date', accessor: 'onboardingDate' },
  { header: 'Status', accessor: 'status' },
];

const data = [
  {
    name: 'Seller 1',
    store: 'Store 1',
    contact: '+91 9876543210',
    address: 'Chennai, India',
    gst: 'GST123456789',
    productCount: 50,
    ondcLiveDate: '2024-03-01',
    onboardingDate: '2024-02-15',
    status: 'Active',
  },
  // Add more sample data as needed
];

function Sellers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Sellers</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Seller
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Sellers;