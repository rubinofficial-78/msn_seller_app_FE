import React, { useState } from 'react';
import { Search, Calendar, Download, LayoutList, Table, Eye, Plus } from 'lucide-react';

// Sample data for the products table
const productData = [
  {
    productImage: '/path/to/image.jpg',
    productName: 'Hudi',
    productDescription: 'This is short description for hudi',
    skuHsnCode: 'HUDI1230307',
    noOfVariants: 0,
    mrp: 250.00,
    sellingPrice: 250.00,
    category: 'Fashion',
    subCategory: 'Jeans',
    status: 'Active',
    createdDate: '18-11-2024, 09:50 pm'
  },
  {
    productImage: '/path/to/image.jpg',
    productName: 'ddf',
    productDescription: 'dfdf',
    skuHsnCode: 'fdfdfd0209',
    noOfVariants: 0,
    mrp: 11.00,
    sellingPrice: 11.00,
    category: 'Electronics',
    subCategory: 'Keyboard',
    status: 'Active',
    createdDate: '11-10-2024, 01:33 pm'
  },
  // Add more sample data as needed
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

const ProductTable = ({ data }) => (
  <div className="bg-white rounded-lg shadow overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Product Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Product Description
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            SKU Id & HSN Code
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            No of Variants
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            MRP
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Selling Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category Sub-category
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((product, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={product.productImage} alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                  <div className="text-sm text-gray-500">{product.createdDate}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">{product.productDescription}</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-900">{product.skuHsnCode}</span>
                <Eye className="ml-2 text-gray-400 cursor-pointer" size={16} />
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">{product.noOfVariants}</td>
            <td className="px-6 py-4 text-sm text-gray-900">₹{product.mrp.toFixed(2)}</td>
            <td className="px-6 py-4 text-sm text-gray-900">₹{product.sellingPrice.toFixed(2)}</td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">{product.category}</div>
              <div className="text-sm text-gray-500">{product.subCategory}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  product.status === 'Inactive' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'}`}>
                {product.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MasterCatalog = () => {
  const [activeTab, setActiveTab] = useState('All Products');

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
      <ProductTable data={productData} />
    </div>
  );
};

export default MasterCatalog;