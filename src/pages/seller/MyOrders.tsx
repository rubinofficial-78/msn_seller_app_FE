import React, { useState } from 'react';
import { Search, Calendar, Download, LayoutList, Table, ExternalLink, Clock, LayoutGrid } from 'lucide-react';

// Sample data for the orders table
const orderData = [
  {
    buyerNPName: 'preprod.ondc.adya.ai',
    sellerNPName: 'preprod.ondc.adya.ai',
    orderCreateDate: '07-11-2024 01:10 pm',
    networkOrderID: 'SMBOI04XRO27BIAUYW',
    networkTransactionID: 'a1205e74-410c-4717-936c-7f3f7dea7cb8',
    sellerNPOrderID: '2740',
    itemID: '2VIJFPA6',
    status: 'Completed'
  },
  // Add more sample data as needed
];

// Interface definitions
interface Order {
  buyerNPName: string;
  sellerNPName: string;
  orderCreateDate: string;
  networkOrderID: string;
  networkTransactionID: string;
  sellerNPOrderID: string;
  itemID: string;
  status: string;
}

interface OrderComponentProps {
  data: Order[];
}

interface Tab {
  label: string;
  count?: number;
  color?: string;
}

interface StatusBadgeProps {
  status: string;
}

interface InfoRowProps {
  label: string;
  value: string;
}

// Component definitions
const OrderTable: React.FC<OrderComponentProps> = ({ data }) => (
  <div className="bg-white rounded-lg shadow overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Buyer NP Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Seller NP Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order Create Date & Time
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Network Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Network Transaction ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Seller NP Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Item ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((order, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.buyerNPName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.sellerNPName}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderCreateDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.networkOrderID}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.networkTransactionID}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.sellerNPOrderID}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.itemID}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={order.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderGrid: React.FC<OrderComponentProps> = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((order, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Order #{order.sellerNPOrderID}</p>
            <p className="text-xs text-gray-500">{order.orderCreateDate}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>
        
        <div className="space-y-2">
          <InfoRow label="Buyer" value={order.buyerNPName} />
          <InfoRow label="Seller" value={order.sellerNPName} />
          <InfoRow label="Network Order ID" value={order.networkOrderID} />
          <InfoRow label="Item ID" value={order.itemID} />
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
            <ExternalLink size={14} />
            View Details
          </button>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <Clock size={14} />
            {order.orderCreateDate}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const OrderList: React.FC<OrderComponentProps> = ({ data }) => (
  <div className="space-y-3">
    {data.map((order, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-900">Order #{order.sellerNPOrderID}</p>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-gray-500">{order.orderCreateDate}</p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
            <ExternalLink size={14} />
            View Details
          </button>
        </div>
        
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoRow label="Buyer" value={order.buyerNPName} />
          <InfoRow label="Seller" value={order.sellerNPName} />
          <InfoRow label="Network Order ID" value={order.networkOrderID} />
          <InfoRow label="Network Transaction ID" value={order.networkTransactionID} />
          <InfoRow label="Item ID" value={order.itemID} />
        </div>
      </div>
    ))}
  </div>
);

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full
    ${status === 'Completed' ? 'bg-green-100 text-green-800' : 
      status === 'In-progress' ? 'bg-orange-100 text-orange-800' : 
      'bg-gray-100 text-gray-800'}`}>
    {status}
  </span>
);

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-900 truncate" title={value}>{value}</p>
  </div>
);

const tabs: Tab[] = [
  { label: 'All Orders' },
  { label: 'Accepted', count: 1295, color: 'text-green-600' },
  { label: 'In-progress', count: 133, color: 'text-orange-500' },
  { label: 'Completed', count: 775, color: 'text-blue-600' },
  { label: 'Cancelled', count: 466, color: 'text-red-500' },
  { label: 'Returns', count: 73, color: 'text-purple-500' },
];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [viewMode, setViewMode] = useState<'table' | 'list' | 'grid'>('table');

  const renderOrders = () => {
    switch (viewMode) {
      case 'grid':
        return <OrderGrid data={orderData} />;
      case 'list':
        return <OrderList data={orderData} />;
      default:
        return <OrderTable data={orderData} />;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">My Orders</h1>
      
      {/* Order Stats */}
      <div className="flex justify-end space-x-4 text-sm">
        <span>Total <span className="font-semibold text-gray-700">2678</span></span>
        <span>Completed <span className="font-semibold text-green-600">775</span></span>
        <span>Inprogress <span className="font-semibold text-orange-500">133</span></span>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.label
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`ml-2 ${tab.color || 'text-gray-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Order Id"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Date Filters */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="From Date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="To Date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            title="List view"
          >
            <LayoutList size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            title="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            title="Table view"
          >
            <Table size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-800" title="Download">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Render Orders based on view mode */}
      {renderOrders()}
    </div>
  );
};

export default MyOrders; 