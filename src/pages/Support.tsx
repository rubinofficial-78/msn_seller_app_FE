import React, { useState } from 'react';
import { Download } from 'lucide-react';
import CustomTable from '../components/CustomTable';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  // Filter data based on all criteria
  const filteredData = React.useMemo(() => {
    return dummyData.filter(ticket => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        ticket.networkIssueId.toLowerCase().includes(searchTerm.toLowerCase());

      // Issue category filter
      const categoryMatch = issueCategory === '' || 
        ticket.issueCategory === issueCategory;

      // Status filter
      const statusMatch = status === '' || 
        ticket.status === status;

      // Date range filter
      let dateMatch = true;
      if (fromDate || toDate) {
        const ticketDate = new Date(ticket.creationDate);
        
        if (fromDate) {
          const startDate = new Date(fromDate);
          dateMatch = dateMatch && ticketDate >= startDate;
        }
        
        if (toDate) {
          const endDate = new Date(toDate);
          endDate.setHours(23, 59, 59, 999);
          dateMatch = dateMatch && ticketDate <= endDate;
        }
      }

      return searchMatch && categoryMatch && statusMatch && dateMatch;
    });
  }, [searchTerm, issueCategory, status, fromDate, toDate]);

  // Get paginated data from filtered data
  const getPaginatedData = () => {
    const startIndex = (paginationState.page_no - 1) * paginationState.per_page;
    const endIndex = startIndex + paginationState.per_page;
    return filteredData.slice(startIndex, endIndex);
  };

  // Handle pagination changes
  const handlePaginationChange = (params: { page_no?: number; per_page?: number }) => {
    setPaginationState(prev => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page
    }));
  };

  // Handle export with filtered data
  const handleExportToExcel = () => {
    const exportData = filteredData.map(ticket => ({
      'Ticket Type': ticket.ticketType,
      'Ticket Status': ticket.status,
      'Ticket ID': ticket.ticketId,
      'Network Issue ID': ticket.networkIssueId,
      'Order ID': ticket.orderId,
      'Category': ticket.category,
      'Network Participants': Array.isArray(ticket.networkParticipants) 
        ? ticket.networkParticipants.join(', ')
        : ticket.networkParticipants,
      'Creation Date & Time': ticket.creationDate,
      'Issue Category': ticket.issueCategory,
      'Sub Category': ticket.subCategory,
      'Relay Date & Time': ticket.relayDateTime,
      'Last Update Date & Time': ticket.lastUpdateDateTime,
      'Closed Date & Time': ticket.closedDateTime,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Support Tickets');
    XLSX.writeFile(wb, `Support_Tickets_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setIssueCategory('');
    setStatus('');
    setFromDate('');
    setToDate('');
    setPaginationState(prev => ({
      ...prev,
      page_no: 1
    }));
  };

  return (
    <div className="space-y-4">
      {/* Controls - Updated Layout to match screenshot */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/support/create')} 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            RAISE TICKET
          </button>

          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-[300px]">
              <input
                type="text"
                placeholder="Search by Network Issue Id"
                className="w-full px-4 py-2 border rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              className="px-4 py-2 border rounded-md text-sm min-w-[180px]"
              value={issueCategory}
              onChange={(e) => {
                setIssueCategory(e.target.value);
                setPaginationState(prev => ({ ...prev, page_no: 1 }));
              }}
            >
              <option value="">All Issue Categories</option>
              <option value="PAYMENT">Payment</option>
              <option value="DELIVERY">Delivery</option>
              <option value="PRODUCT">Product</option>
              <option value="SERVICE">Service</option>
            </select>

            <select 
              className="px-4 py-2 border rounded-md text-sm min-w-[180px]"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPaginationState(prev => ({ ...prev, page_no: 1 }));
              }}
            >
              <option value="">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>

            <input
              type="date"
              className="px-4 py-2 border rounded-md text-sm w-[150px]"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />

            <input
              type="date"
              className="px-4 py-2 border rounded-md text-sm w-[150px]"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear Filters
            </button>
            <button
              onClick={handleExportToExcel}
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Download Excel"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <CustomTable
          headCells={tableColumns}
          data={getPaginatedData()}
          pagination={true}
          meta_data={{
            total_rows: filteredData.length,
            page_no: paginationState.page_no,
            per_page: paginationState.per_page,
            totalPages: Math.ceil(filteredData.length / paginationState.per_page)
          }}
          setParams={handlePaginationChange}
        />
      </div>

      {/* No Results Message */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tickets found matching the selected filters
        </div>
      )}
    </div>
  );
}

export default Support;