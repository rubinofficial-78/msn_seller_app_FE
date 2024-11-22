import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Branch Name', accessor: 'name' },
  { header: 'Company Name', accessor: 'company' },
  { header: 'Created Date', accessor: 'createdDate' },
  { header: 'Contact Information', accessor: 'contact' },
  { header: 'Address', accessor: 'address' },
  { header: 'Partner Count', accessor: 'partnerCount' },
  { header: 'Status', accessor: 'status' },
];

const data = [
  {
    name: 'Branch 1',
    company: 'Tech Corp',
    createdDate: '2024-03-01',
    contact: '+91 9876543210',
    address: 'Mumbai, India',
    partnerCount: 10,
    status: 'Active',
  },
  // Add more sample data as needed
];

function Branches() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Branches</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Branch
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Branches;