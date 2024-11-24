import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';
import CustomTable from '../components/CustomTable';
import * as XLSX from 'xlsx';

interface Payout {
  networkOrderID: string;
  collectorID: string;
  receiverID: string;
  orderState: string;
  orderCreatedDateTime: string;
  shippingCharges: number;
  packagingCharges: number;
  convenienceCharges: number;
  totalOrderValue: number;
  orderItemIDPrice: string;
  buyerFinderFee: number;
  withholdingAmount: number;
  tcs: number;
  tds: number;
  deductionByCollector: number;
  settlementAmount: number;
  returnWindow: string;
  beneficiaryIFSC: string;
  settlementReferenceNumber: string;
  differenceAmount: number;
  message: string;
  createdDateTime: string;
}

// Generate dummy data
const generatePayoutData = (count: number): Payout[] => {
  return Array(count).fill(null).map((_, index) => ({
    networkOrderID: `SMBOI04XRO27BIAUYW-${index + 1}`,
    collectorID: 'preprod.ondc.adya.ai',
    receiverID: 'preprod.ondc.adya.ai',
    orderState: ['Completed', 'Pending', 'Processing'][Math.floor(Math.random() * 3)],
    orderCreatedDateTime: '2024-11-07 13:10:54',
    shippingCharges: Math.random() * 100,
    packagingCharges: 32.00,
    convenienceCharges: 10.00,
    totalOrderValue: 282.00 + (index * 10),
    orderItemIDPrice: `ITEM${123 + index} - ₹${(250.00 + index * 5).toFixed(2)}`,
    buyerFinderFee: 5.00,
    withholdingAmount: 2.00,
    tcs: 1.00,
    tds: 1.50,
    deductionByCollector: 3.00,
    settlementAmount: 269.50 + (index * 2),
    returnWindow: '7 days',
    beneficiaryIFSC: 'HDFC0001234',
    settlementReferenceNumber: `SET123456789-${index + 1}`,
    differenceAmount: 0.00,
    message: 'Settlement successful',
    createdDateTime: '2024-11-07 13:15:54'
  }));
};

// Table columns configuration
const tableColumns = [
  {
    id: 'networkOrderID',
    key: 'networkOrderID',
    label: 'Network Order ID',
    minWidth: 180
  },
  {
    id: 'collectorID',
    key: 'collectorID',
    label: 'Collector ID',
    minWidth: 200
  },
  {
    id: 'receiverID',
    key: 'receiverID',
    label: 'Receiver ID',
    minWidth: 200
  },
  {
    id: 'orderState',
    key: 'orderState',
    label: 'Order State',
    type: 'status',
    minWidth: 120
  },
  {
    id: 'orderCreatedDateTime',
    key: 'orderCreatedDateTime',
    label: 'Order Created Date & Time',
    minWidth: 180
  },
  {
    id: 'shippingCharges',
    key: 'shippingCharges',
    label: 'Shipping Charges',
    type: 'amount',
    minWidth: 140
  },
  {
    id: 'packagingCharges',
    key: 'packagingCharges',
    label: 'Packaging Charges',
    type: 'amount',
    minWidth: 140
  },
  {
    id: 'convenienceCharges',
    key: 'convenienceCharges',
    label: 'Convenience Charges',
    type: 'amount',
    minWidth: 140
  },
  {
    id: 'totalOrderValue',
    key: 'totalOrderValue',
    label: 'Total Order Value',
    type: 'amount',
    minWidth: 140
  },
  {
    id: 'orderItemIDPrice',
    key: 'orderItemIDPrice',
    label: 'Order Item ID & Price',
    minWidth: 180
  },
  {
    id: 'buyerFinderFee',
    key: 'buyerFinderFee',
    label: 'Buyer Finder Fee',
    type: 'amount',
    minWidth: 140
  },
  {
    id: 'withholdingAmount',
    key: 'withholdingAmount',
    label: 'Withholding Amount',
    type: 'amount',
    minWidth: 140
  },
  {
    id: 'tcs',
    key: 'tcs',
    label: 'TCS',
    type: 'amount',
    minWidth: 120
  },
  {
    id: 'tds',
    key: 'tds',
    label: 'TDS',
    type: 'amount',
    minWidth: 120
  },
  {
    id: 'deductionByCollector',
    key: 'deductionByCollector',
    label: 'Deduction by Collector',
    type: 'amount',
    minWidth: 160
  },
  {
    id: 'settlementAmount',
    key: 'settlementAmount',
    label: 'Settlement Amount',
    type: 'amount',
    minWidth: 140
  },
  {
    id: 'returnWindow',
    key: 'returnWindow',
    label: 'Return Window',
    minWidth: 120
  },
  {
    id: 'beneficiaryIFSC',
    key: 'beneficiaryIFSC',
    label: 'Beneficiary IFSC',
    minWidth: 140
  },
  {
    id: 'settlementReferenceNumber',
    key: 'settlementReferenceNumber',
    label: 'Settlement Reference Number',
    minWidth: 200
  },
  {
    id: 'differenceAmount',
    key: 'differenceAmount',
    label: 'Difference Amount',
    type: 'amount',
    minWidth: 140
  },
  {
    id: 'message',
    key: 'message',
    label: 'Message',
    minWidth: 180
  },
  {
    id: 'createdDateTime',
    key: 'createdDateTime',
    label: 'Created Date & Time',
    minWidth: 180
  }
];

// Generate 100 dummy payouts
const dummyData = generatePayoutData(100);

const Payouts = () => {
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

  // Add this new function to handle Excel download
  const handleDownload = () => {
    // Create a worksheet from the data
    const worksheet = XLSX.utils.json_to_sheet(dummyData);
    
    // Create a workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payouts');
    
    // Generate and download the file
    XLSX.writeFile(workbook, 'payouts.xlsx');
  };

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search Network Order ID"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Download Button */}
        <button 
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download"
          onClick={handleDownload}
        >
          <Download size={20} />
        </button>
      </div>

      {/* Payouts Table */}
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
};

export default Payouts;