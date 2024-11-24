import React, { useState } from 'react';
import { Download } from 'lucide-react';
import CustomTable from '../components/CustomTable';

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

// Generate dummy data
const generateDummyData = (count: number): Ticket[] => {
  return Array(count).fill(null).map((_, index) => ({
    ticketType: 'ISSUE',
    ticketId: `TKT-${String(index + 1).padStart(4, '0')}`,
    networkIssueId: `NI-${String(index + 1).padStart(4, '0')}`,
    orderId: `2024-10-01-${String(800330 + index).padStart(6, '0')}`,
    category: ['Dresses', 'Electronics', 'Food', 'Groceries'][Math.floor(Math.random() * 4)],
    networkParticipants: ['preprod-ondc.letsbho.in', 'preprod.ondc.adya.ai'],
    creationDate: '2024-11-01 17:53:19',
    issueCategory: ['PAYMENT', 'DELIVERY', 'PRODUCT', 'SERVICE'][Math.floor(Math.random() * 4)],
    subCategory: ['Over paid', 'Delayed', 'Quality Issue', 'Wrong Item'][Math.floor(Math.random() * 4)],
    relayDateTime: '2024-11-01 17:53:19',
    lastUpdateDateTime: '2024-11-01 17:53:19',
    closedDateTime: Math.random() > 0.5 ? '2024-11-02 10:30:00' : '--',
    status: ['OPEN', 'RESOLVED', 'CLOSED'][Math.floor(Math.random() * 3)] as 'OPEN' | 'RESOLVED' | 'CLOSED'
  }));
};

// Table columns configuration
const tableColumns = [
  {
    id: 'ticketType',
    key: 'ticketType',
    label: 'Ticket Type',
    minWidth: 120
  },
  {
    id: 'status',
    key: 'status',
    label: 'Ticket Status\nTicket ID\nNetwork Issue ID',
    type: 'custom',
    minWidth: 200,
    render: (row: Ticket) => (
      <div>
        <div className={`inline-block px-2 py-1 rounded-md text-white text-xs ${
          row.status === 'OPEN' ? 'bg-red-500' : 
          row.status === 'RESOLVED' ? 'bg-blue-500' : 'bg-green-500'
        }`}>
          {row.status}
        </div>
        <div className="mt-1">{row.ticketId}</div>
        <div className="text-gray-500">{row.networkIssueId}</div>
      </div>
    )
  },
  {
    id: 'orderDetails',
    key: ['orderId', 'category'],
    label: 'Order ID\nCategory',
    type: 'custom',
    minWidth: 180,
    render: (row: Ticket) => (
      <div>
        <div>{row.orderId}</div>
        <div className="text-gray-500">Category: {row.category}</div>
      </div>
    )
  },
  {
    id: 'networkParticipants',
    key: 'networkParticipants',
    label: 'Network Participants',
    minWidth: 200
  },
  {
    id: 'creationDate',
    key: 'creationDate',
    label: 'Creation\ndate & time',
    minWidth: 150
  },
  {
    id: 'issueCategory',
    key: 'issueCategory',
    label: 'Issue Category (L1)',
    minWidth: 150
  },
  {
    id: 'subCategory',
    key: 'subCategory',
    label: 'Issue Sub Category (L2)',
    minWidth: 180
  },
  {
    id: 'relayDateTime',
    key: 'relayDateTime',
    label: 'Relay\ndate & time',
    minWidth: 150
  },
  {
    id: 'lastUpdateDateTime',
    key: 'lastUpdateDateTime',
    label: 'Last Update\ndate & time',
    minWidth: 150
  },
  {
    id: 'closedDateTime',
    key: 'closedDateTime',
    label: 'Closed\ndate & time',
    minWidth: 150
  }
];

// Generate 100 dummy tickets
const dummyData = generateDummyData(100);

function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [status, setStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: dummyData.length
  });

  // Get paginated data
  const getPaginatedData = () => {
    const startIndex = (paginationState.page_no - 1) * paginationState.per_page;
    const endIndex = startIndex + paginationState.per_page;
    return dummyData.slice(startIndex, endIndex);
  };

  // Handle pagination changes
  const handlePaginationChange = (params: { page_no?: number; per_page?: number }) => {
    setPaginationState(prev => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page
    }));
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow">
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
            <option value="DELIVERY">Delivery</option>
            <option value="PRODUCT">Product</option>
            <option value="SERVICE">Service</option>
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

          <button className="ml-auto p-2 text-gray-600 hover:text-gray-800">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <CustomTable
          headCells={tableColumns}
          data={getPaginatedData()}
          pagination={true}
          meta_data={{
            total_rows: dummyData.length,
            page_no: paginationState.page_no,
            per_page: paginationState.per_page,
            totalPages: Math.ceil(dummyData.length / paginationState.per_page)
          }}
          setParams={handlePaginationChange}
        />
      </div>
    </div>
  );
}

export default Support;