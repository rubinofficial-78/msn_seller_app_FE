import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import CustomTable from '../components/CustomTable';
import moment from 'moment';

// Sample data for the products table
const productData = [
  {
    id: 1,
    product_image: '/path/to/image.jpg',
    product_name: 'Hudi',
    product_description: 'This is short description for hudi',
    sku_hsn_code: 'HUDI1230307',
    variants_count: 0,
    mrp: 250.00,
    selling_price: 250.00,
    category: 'Fashion',
    sub_category: 'Jeans',
    status: 'Active',
    created_date: '2024-11-18T21:50:00'
  },
  {
    id: 2,
    product_image: '/path/to/image.jpg',
    product_name: 'ddf',
    product_description: 'dfdf',
    sku_hsn_code: 'fdfdfd0209',
    variants_count: 0,
    mrp: 11.00,
    selling_price: 11.00,
    category: 'Electronics',
    sub_category: 'Keyboard',
    status: 'Active',
    created_date: '2024-10-11T13:33:00'
  },
];

// Tab type definition
interface Tab {
  label: string;
  count?: number;
  color?: string;
}

const tabs: Tab[] = [
  { label: 'All Products' },
  { label: 'Active', count: 6, color: 'text-green-600' },
  { label: 'Inactive', count: 9, color: 'text-orange-500' },
  { label: 'Draft', count: 45, color: 'text-gray-600' },
];

// Define table headers
const headCells = [
  {
    id: 'product',
    key: ['product_name', 'created_date'],
    label: 'Product Name',
    type: 'image_text',
    image_path: 'product_image',
    join: true,
    join_type: 'sameline'
  },
  {
    id: 'description',
    key: 'product_description',
    label: 'Product Description'
  },
  {
    id: 'sku',
    key: 'sku_hsn_code',
    label: 'SKU Id & HSN Code',
    type: 'component'
  },
  {
    id: 'variants',
    key: 'variants_count',
    label: 'No of Variants',
    type: 'number'
  },
  {
    id: 'mrp',
    key: 'mrp',
    label: 'MRP',
    type: 'amount'
  },
  {
    id: 'selling_price',
    key: 'selling_price',
    label: 'Selling Price',
    type: 'amount'
  },
  {
    id: 'category',
    key: ['category', 'sub_category'],
    label: 'Category Sub-category',
    join: true,
    join_type: 'sameline_with_text'
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    type: 'status'
  }
];

const MasterCatalog: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Products');
  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10
  });

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex flex-wrap justify-end gap-4 text-sm">
        <span>Draft Product <span className="font-semibold text-gray-700">45</span></span>
        <span>Active Product <span className="font-semibold text-green-600">6</span></span>
        <span>Inactive Product <span className="font-semibold text-gray-500">9</span></span>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-4">
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

      {/* Filters and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Product name or ID"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">Filter by Category</option>
            {/* Add category options */}
          </select>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <CustomTable
        headCells={headCells}
        data={productData}
        setParams={setParams}
        meta_data={{
          total_rows: productData.length,
          page_no: params.page_no
        }}
      />
    </div>
  );
};

export default MasterCatalog;