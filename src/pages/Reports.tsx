import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Report ID', accessor: 'reportId' },
  { header: 'Type', accessor: 'type' },
  { header: 'Generated Date', accessor: 'generatedDate' },
  { header: 'Period', accessor: 'period' },
  { header: 'Status', accessor: 'status' },
];

const data = [
  {
    reportId: 'REP001',
    type: 'Sales Report',
    generatedDate: '2024-03-01',
    period: 'Feb 2024',
    status: 'Completed',
  },
  // Add more sample data as needed
];

function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Generate Report
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Reports;