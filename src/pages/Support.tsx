import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Ticket ID', accessor: 'ticketId' },
  { header: 'Status', accessor: 'status' },
  { header: 'Type', accessor: 'type' },
  { header: 'Category', accessor: 'category' },
  { header: 'Created Date', accessor: 'createdDate' },
  { header: 'Last Updated', accessor: 'lastUpdated' },
  { header: 'Priority', accessor: 'priority' },
];

const data = [
  {
    ticketId: 'TIC001',
    status: 'Open',
    type: 'Technical',
    category: 'Order Issues',
    createdDate: '2024-03-01',
    lastUpdated: '2024-03-02',
    priority: 'High',
  },
  // Add more sample data as needed
];

function Support() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Create Ticket
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Support;