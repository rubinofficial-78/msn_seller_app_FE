import React, { useState } from 'react';
import DataTable from '../components/DataTable';

interface Ticket {
  ticketType: string;
  ticketId: string;
  networkIssueId: string;
  orderId: string;
  category: string;
  networkParticipants: string[];
  creationDate: string;
  issueCategory: string;
  subCategory: string;
  relayDateTime: string;
  lastUpdateDateTime: string;
  closedDateTime: string;
  status: 'OPEN' | 'RESOLVED' | 'CLOSED';
}

interface Column {
  header: string;
  accessor: keyof Ticket;
  render?: (ticket: Ticket) => React.ReactNode;
}

const columns: Column[] = [
  { header: 'Ticket Type', accessor: 'ticketType' },
  { 
    header: 'Ticket Status\nTicket ID\nNetwork Issue ID', 
    accessor: 'ticketId',
    render: (ticket: Ticket) => (
      <div>
        <div className={`inline-block px-2 py-1 rounded-md text-white text-xs ${
          ticket.status === 'OPEN' ? 'bg-red-500' : 
          ticket.status === 'RESOLVED' ? 'bg-blue-500' : 'bg-green-500'
        }`}>
          {ticket.status}
        </div>
        <div className="mt-1">{ticket.ticketId}</div>
        <div className="text-gray-500">{ticket.networkIssueId}</div>
      </div>
    )
  },
  {
    header: 'Order ID\nCategory',
    accessor: 'orderId',
    render: (ticket: Ticket) => (
      <div>
        <div>{ticket.orderId}</div>
        <div className="text-gray-500">Category: {ticket.category}</div>
      </div>
    )
  },
  { header: 'Network Participants', accessor: 'networkParticipants' },
  {
    header: 'Creation\ndate & time',
    accessor: 'creationDate'
  },
  { header: 'Issue Category (L1)', accessor: 'issueCategory' },
  { header: 'Issue Sub Category (L2)', accessor: 'subCategory' },
  { header: 'Relay\ndate & time', accessor: 'relayDateTime' },
  { header: 'Last Update\ndate & time', accessor: 'lastUpdateDateTime' },
  { header: 'Closed\ndate & time', accessor: 'closedDateTime' },
];

const data: Ticket[] = [
  {
    ticketType: 'ISSUE',
    ticketId: 'd3aada2a-7099-4f60-9f03-0b0c83041578',
    networkIssueId: '--',
    orderId: '2024-10-01-800330',
    category: 'Dresses',
    networkParticipants: ['preprod-ondc.letsbho.in', 'preprod.ondc.adya.ai'],
    creationDate: '2024-11-01 17:53:19',
    issueCategory: 'PAYMENT',
    subCategory: 'Over paid',
    relayDateTime: '2024-11-01 17:53:19',
    lastUpdateDateTime: '2024-11-01 17:53:19',
    closedDateTime: '--',
    status: 'OPEN'
  },
  // Add more sample tickets...
];

function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Fixed Header Content */}
      <div className="flex-none">
        {/* Controls */}
        <div className="p-4 bg-white border-b">
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              RAISE TICKET
            </button>

            <input
              type="text"
              placeholder="Search by Network Issue Id"
              className="px-4 py-2 border rounded-md min-w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select 
              className="px-4 py-2 border rounded-md min-w-[200px]"
              value={issueCategory}
              onChange={(e) => setIssueCategory(e.target.value)}
            >
              <option value="">Issue category</option>
              <option value="PAYMENT">Payment</option>
              <option value="FULFILLMENT">Fulfillment</option>
              <option value="AGENT">Agent</option>
              <option value="ITEM">Item</option>
            </select>

            <select 
              className="px-4 py-2 border rounded-md min-w-[200px]"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="OPEN">Open</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>

            <input
              type="date"
              className="px-4 py-2 border rounded-md"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="From Date"
            />

            <input
              type="date"
              className="px-4 py-2 border rounded-md"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="To Date"
            />

            <button className="ml-auto">
              <DownloadIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 relative">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10">
          <table className="w-full">
            <thead className="bg-[#BBD6E8]">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-pre-line"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-auto h-[calc(100vh-200px)]">
          <table className="w-full">
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((ticket, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.render 
                        ? column.render(ticket)
                        : ticket[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Download icon component
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export default Support;