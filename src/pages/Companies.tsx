import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Company Name', accessor: 'name' },
  { header: 'White Label URL', accessor: 'url' },
  { header: 'Company Website', accessor: 'website' },
  { header: 'Created Date', accessor: 'createdDate' },
  { header: 'Contact Information', accessor: 'contact' },
  { header: 'Address', accessor: 'address' },
  { header: 'Branch Count', accessor: 'branchCount' },
  { header: 'System Users Count', accessor: 'usersCount' },
  { header: 'Status', accessor: 'status' },
];

const data = [
  {
    name: 'Tech Corp',
    url: 'techcorp.msn.com',
    website: 'www.techcorp.com',
    createdDate: '2024-03-01',
    contact: '+91 9876543210',
    address: 'Bangalore, India',
    branchCount: 5,
    usersCount: 25,
    status: 'Active',
  },
  // Add more sample data as needed
];

function Companies() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Company
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Companies;