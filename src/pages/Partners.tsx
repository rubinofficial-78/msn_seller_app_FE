import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Partner Name', accessor: 'name' },
  { header: 'Branch Name', accessor: 'branch' },
  { header: 'Company Name', accessor: 'company' },
  { header: 'Affiliate URL', accessor: 'affiliateUrl' },
  { header: 'Created Date', accessor: 'createdDate' },
  { header: 'Contact Information', accessor: 'contact' },
  { header: 'Address', accessor: 'address' },
  { header: 'Seller Count', accessor: 'sellerCount' },
  { header: 'Status', accessor: 'status' },
];

const data = [
  {
    name: 'Partner 1',
    branch: 'Branch 1',
    company: 'Tech Corp',
    affiliateUrl: 'partner1.msn.com',
    createdDate: '2024-03-01',
    contact: '+91 9876543210',
    address: 'Delhi, India',
    sellerCount: 15,
    status: 'Active',
  },
  // Add more sample data as needed
];

function Partners() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Partners</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Partner
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Partners;