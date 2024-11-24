import React, { useState } from 'react';
import CustomTable from '../components/CustomTable';
import { Download, Filter } from 'lucide-react';
import * as XLSX from 'xlsx';

const headCells = [
  { id: 'buyerNpName', key: 'buyerNpName', label: 'Buyer NP Name' },
  { id: 'sellerNpName', key: 'sellerNpName', label: 'Seller NP Name' },
  { id: 'orderCreateDateTime', key: 'orderCreateDateTime', label: 'Order Create Date & Time', timeFormat: true },
  { id: 'networkOrderId', key: 'networkOrderId', label: 'Network Order Id' },
  { id: 'networkTransactionId', key: 'networkTransactionId', label: 'Network Transaction Id' },
  { id: 'sellerNpOrderId', key: 'sellerNpOrderId', label: 'Seller NP Order Id' },
  { id: 'itemId', key: 'itemId', label: 'Item Id' },
  { id: 'qty', key: 'qty', label: 'Qty' },
  { id: 'orderStatus', key: 'orderStatus', label: 'Order Status', type: 'status' },
  { id: 'sellerName', key: 'sellerName', label: 'Name of Seller' },
  { id: 'sellerPincode', key: 'sellerPincode', label: 'Seller Pincode' },
  { id: 'sellerCity', key: 'sellerCity', label: 'Seller City' },
  { id: 'skuName', key: 'skuName', label: 'SKU Name' },
  { id: 'skuCode', key: 'skuCode', label: 'SKU Code' },
  { id: 'orderCategory', key: 'orderCategory', label: 'Order Category' },
  { id: 'readyToShipDateTime', key: 'readyToShipDateTime', label: 'Ready to Ship At Date & Time', timeFormat: true },
  { id: 'shippedDateTime', key: 'shippedDateTime', label: 'Shipped At Date & Time', timeFormat: true },
  { id: 'deliveredDateTime', key: 'deliveredDateTime', label: 'Delivered At Date & Time', timeFormat: true },
  { id: 'logisticsSellerNpName', key: 'logisticsSellerNpName', label: 'Logistics Seller NP Name' },
  { id: 'logisticsNetworkOrderId', key: 'logisticsNetworkOrderId', label: 'Logistics Network Order Id' },
  { id: 'logisticsNetworkTransactionId', key: 'logisticsNetworkTransactionId', label: 'Logistics Network Transaction Id' },
  { id: 'deliveryCity', key: 'deliveryCity', label: 'Delivery City' },
  { id: 'deliveryPincode', key: 'deliveryPincode', label: 'Delivery Pincode' },
  { id: 'cancelledDateTime', key: 'cancelledDateTime', label: 'Cancelled At Date & Time', timeFormat: true },
  { id: 'cancelledBy', key: 'cancelledBy', label: 'Cancelled By' },
  { id: 'cancellationReason', key: 'cancellationReason', label: 'Cancellation Reason' },
  { id: 'totalShippingCharges', key: 'totalShippingCharges', label: 'Total Shipping Charges', type: 'amount' },
  { id: 'totalOrderValue', key: 'totalOrderValue', label: 'Total Order Value', type: 'amount' }
];

const sampleData = [
  {
    buyerNpName: 'Buyer Corp',
    sellerNpName: 'Seller Corp',
    orderCreateDateTime: '2024-03-15 14:30:00',
    networkOrderId: 'NO123456',
    networkTransactionId: 'NT789012',
    sellerNpOrderId: 'SO345678',
    itemId: 'ITEM001',
    qty: 2,
    orderStatus: 'ACTIVE',
    sellerName: 'John Doe Enterprises',
    sellerPincode: '400001',
    sellerCity: 'Mumbai',
    skuName: 'Premium Widget',
    skuCode: 'WID001',
    orderCategory: 'Home & Decor',
    readyToShipDateTime: '2024-03-15 16:30:00',
    shippedDateTime: '2024-03-15 17:30:00',
    deliveredDateTime: '2024-03-17 11:45:00',
    logisticsSellerNpName: 'Fast Logistics',
    logisticsNetworkOrderId: 'LO987654',
    logisticsNetworkTransactionId: 'LT654321',
    deliveryCity: 'Delhi',
    deliveryPincode: '110001',
    cancelledDateTime: '',
    cancelledBy: '',
    cancellationReason: '',
    totalShippingCharges: '250.00',
    totalOrderValue: '2499.00',
  },
  {
    buyerNpName: 'Tech Solutions Inc',
    sellerNpName: 'Electronics Hub',
    orderCreateDateTime: '2024-03-16 09:15:00',
    networkOrderId: 'NO123457',
    networkTransactionId: 'NT789013',
    sellerNpOrderId: 'SO345679',
    itemId: 'ITEM002',
    qty: 1,
    orderStatus: 'SHIPPED',
    sellerName: 'Electronics Hub Ltd',
    sellerPincode: '560001',
    sellerCity: 'Bangalore',
    skuName: 'Smart Watch Pro',
    skuCode: 'SW001',
    orderCategory: 'Electronics',
    readyToShipDateTime: '2024-03-16 11:30:00',
    shippedDateTime: '2024-03-16 14:30:00',
    deliveredDateTime: '',
    logisticsSellerNpName: 'Speed Post',
    logisticsNetworkOrderId: 'LO987655',
    logisticsNetworkTransactionId: 'LT654322',
    deliveryCity: 'Chennai',
    deliveryPincode: '600001',
    cancelledDateTime: '',
    cancelledBy: '',
    cancellationReason: '',
    totalShippingCharges: '150.00',
    totalOrderValue: '4999.00',
  },
  {
    buyerNpName: 'Fashion Retail Co',
    sellerNpName: 'Style Merchants',
    orderCreateDateTime: '2024-03-14 11:20:00',
    networkOrderId: 'NO123458',
    networkTransactionId: 'NT789014',
    sellerNpOrderId: 'SO345680',
    itemId: 'ITEM003',
    qty: 3,
    orderStatus: 'DELIVERED',
    sellerName: 'Style Merchants Pvt Ltd',
    sellerPincode: '700001',
    sellerCity: 'Kolkata',
    skuName: 'Designer Handbag',
    skuCode: 'DH001',
    orderCategory: 'Fashion',
    readyToShipDateTime: '2024-03-14 13:30:00',
    shippedDateTime: '2024-03-14 15:30:00',
    deliveredDateTime: '2024-03-16 11:45:00',
    logisticsSellerNpName: 'Express Delivery',
    logisticsNetworkOrderId: 'LO987656',
    logisticsNetworkTransactionId: 'LT654323',
    deliveryCity: 'Hyderabad',
    deliveryPincode: '500001',
    cancelledDateTime: '',
    cancelledBy: '',
    cancellationReason: '',
    totalShippingCharges: '300.00',
    totalOrderValue: '3999.00',
  },
  {
    buyerNpName: 'Home Essentials',
    sellerNpName: 'Kitchen Kings',
    orderCreateDateTime: '2024-03-13 16:45:00',
    networkOrderId: 'NO123459',
    networkTransactionId: 'NT789015',
    sellerNpOrderId: 'SO345681',
    itemId: 'ITEM004',
    qty: 4,
    orderStatus: 'CANCELLED',
    sellerName: 'Kitchen Kings India',
    sellerPincode: '110092',
    sellerCity: 'Delhi',
    skuName: 'Premium Cookware Set',
    skuCode: 'CS001',
    orderCategory: 'Home & Kitchen',
    readyToShipDateTime: '',
    shippedDateTime: '',
    deliveredDateTime: '',
    logisticsSellerNpName: 'Quick Delivery',
    logisticsNetworkOrderId: 'LO987657',
    logisticsNetworkTransactionId: 'LT654324',
    deliveryCity: 'Pune',
    deliveryPincode: '411001',
    cancelledDateTime: '2024-03-14 10:30:00',
    cancelledBy: 'Seller',
    cancellationReason: 'Out of Stock',
    totalShippingCharges: '400.00',
    totalOrderValue: '5999.00',
  },
  {
    buyerNpName: 'Sports Galaxy',
    sellerNpName: 'Fitness First',
    orderCreateDateTime: '2024-03-12 13:25:00',
    networkOrderId: 'NO123460',
    networkTransactionId: 'NT789016',
    sellerNpOrderId: 'SO345682',
    itemId: 'ITEM005',
    qty: 1,
    orderStatus: 'PENDING',
    sellerName: 'Fitness First Equipment',
    sellerPincode: '380001',
    sellerCity: 'Ahmedabad',
    skuName: 'Treadmill Pro',
    skuCode: 'TM001',
    orderCategory: 'Sports & Fitness',
    readyToShipDateTime: '',
    shippedDateTime: '',
    deliveredDateTime: '',
    logisticsSellerNpName: 'Heavy Logistics',
    logisticsNetworkOrderId: 'LO987658',
    logisticsNetworkTransactionId: 'LT654325',
    deliveryCity: 'Mumbai',
    deliveryPincode: '400002',
    cancelledDateTime: '',
    cancelledBy: '',
    cancellationReason: '',
    totalShippingCharges: '1200.00',
    totalOrderValue: '49999.00',
  }
];

function Reports() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedStatus, setSelectedStatus] = useState('');
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  // Filter data based on selected status and date range
  const filteredData = React.useMemo(() => {
    return sampleData.filter(item => {
      // Status filter - show all if no status selected
      const statusMatch = 
        !selectedStatus || 
        item.orderStatus.toLowerCase() === selectedStatus.toLowerCase();

      // Date range filter
      let dateMatch = true;
      if (dateRange.start || dateRange.end) {
        const orderDate = new Date(item.orderCreateDateTime);
        
        if (dateRange.start) {
          const startDate = new Date(dateRange.start);
          dateMatch = dateMatch && orderDate >= startDate;
        }
        
        if (dateRange.end) {
          const endDate = new Date(dateRange.end);
          endDate.setHours(23, 59, 59, 999);
          dateMatch = dateMatch && orderDate <= endDate;
        }
      }

      return statusMatch && dateMatch;
    });
  }, [selectedStatus, dateRange, sampleData]);

  const handleExportToExcel = () => {
    // Use filteredData instead of sampleData for export
    const exportData = filteredData.map(item => {
      // Format dates for Excel
      const formatDate = (dateStr: string) => dateStr ? new Date(dateStr).toLocaleString() : '';
      
      return {
        'Buyer NP Name': item.buyerNpName,
        'Seller NP Name': item.sellerNpName,
        'Order Create Date & Time': formatDate(item.orderCreateDateTime),
        'Network Order Id': item.networkOrderId,
        'Network Transaction Id': item.networkTransactionId,
        'Seller NP Order Id': item.sellerNpOrderId,
        'Item Id': item.itemId,
        'Qty': item.qty,
        'Order Status': item.orderStatus,
        'Name of Seller': item.sellerName,
        'Seller Pincode': item.sellerPincode,
        'Seller City': item.sellerCity,
        'SKU Name': item.skuName,
        'SKU Code': item.skuCode,
        'Order Category': item.orderCategory,
        'Ready to Ship At': formatDate(item.readyToShipDateTime),
        'Shipped At': formatDate(item.shippedDateTime),
        'Delivered At': formatDate(item.deliveredDateTime),
        'Logistics Seller NP Name': item.logisticsSellerNpName,
        'Logistics Network Order Id': item.logisticsNetworkOrderId,
        'Logistics Network Transaction Id': item.logisticsNetworkTransactionId,
        'Delivery City': item.deliveryCity,
        'Delivery Pincode': item.deliveryPincode,
        'Cancelled At': formatDate(item.cancelledDateTime),
        'Cancelled By': item.cancelledBy,
        'Cancellation Reason': item.cancellationReason,
        'Total Shipping Charges': `₹${item.totalShippingCharges}`,
        'Total Order Value': `₹${item.totalOrderValue}`
      };
    });

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders Report');

    // Generate file name with current date
    const fileName = `Orders_Report_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Order Reports</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2">
            <Filter size={18} />
            Filters
          </button>
          <button 
            onClick={handleExportToExcel}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Modified Filters Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="flex-1 border rounded-md px-3 py-2"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
              <input
                type="date"
                className="flex-1 border rounded-md px-3 py-2"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Order Status</label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setDateRange({ start: '', end: '' });
                setSelectedStatus('');
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md border border-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table Section with Filtered Data */}
      <div className="bg-white rounded-lg border border-gray-200">
        <CustomTable 
          headCells={headCells} 
          data={filteredData}
          meta_data={{
            total: filteredData.length,
            per_page: 10,
            current_page: params.page,
            total_pages: Math.ceil(filteredData.length / 10)
          }}
          setParams={setParams}
          pagination={true}
        />
      </div>

      {/* No Results Message */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No orders found matching the selected filters
        </div>
      )}
    </div>
  );
}

export default Reports;