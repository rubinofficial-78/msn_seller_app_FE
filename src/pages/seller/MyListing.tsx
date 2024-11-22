import React, { useState } from 'react';
import { Search, Plus, Eye, LayoutGrid, Table } from 'lucide-react';
import ScrollableTabs from '../../components/ScrollableTabs';

// Product interface
interface Product {
  productName: string;
  productDescription: string;
  skuHsnCode: string;
  category: string;
  subCategory: string;
  totalVariants: number;
  mrp: number;
  sellingPrice: number;
  quantityInHand: number;
  status: string;
  sellerName: string;
  partnerName: string;
  branchName: string;
  companyName: string;
}

const productData: Product[] = [
  {
    productName: 'tomato',
    productDescription: 'Fresh tomatoes',
    skuHsnCode: 'rjfkfl0208',
    category: 'Grocery',
    subCategory: 'Frozen Vegetables',
    totalVariants: 0,
    mrp: 50.00,
    sellingPrice: 40.00,
    quantityInHand: 100,
    status: 'ACTIVE',
    sellerName: 'Nivedha',
    partnerName: 'Partner 1',
    branchName: 'Branch A',
    companyName: 'Company X'
  },
  // Add more sample data as needed
];

const tabs = [
  { label: 'All Products' },
  { label: 'Active', count: 969, color: 'text-green-600' },
  { label: 'Inactive', count: 88, color: 'text-red-500' },
  { label: 'Draft', count: 746, color: 'text-gray-500' },
  { label: 'My Groups' },
  { label: 'Add Ons' },
  { label: 'My Menu' },
  { label: 'Stock Overview' },
  { label: 'Pricing' },
  { label: 'Offers & Discounts' }
];

interface ProductTableProps {
  data: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ data }) => (
  <div className="h-[calc(100vh-280px)] flex flex-col bg-white rounded-lg shadow">
    {/* Table Header - Fixed */}
    <div className="bg-blue-50">
      <div className="overflow-x-auto">
        <table className="min-w-max" style={{ width: '2000px' }}>
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                Product Name
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                Product Description
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                SKU Id & HSN Code
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                Category / Sub-category
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Total no.of.Variants
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                MRP
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Selling Price
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Quantity in hand
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Status
              </th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Action
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>

    {/* Table Body - Scrollable */}
    <div className="flex-1 overflow-auto">
      <div className="overflow-x-auto">
        <table className="min-w-max" style={{ width: '2000px' }}>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-40">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">
                  {product.productDescription}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-40">
                  {product.skuHsnCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-48">
                  {product.category} / {product.subCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">
                  {product.totalVariants}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">
                  ₹{product.mrp.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">
                  ₹{product.sellingPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-32">
                  {product.quantityInHand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-32">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-24">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

interface ProductGridProps {
  data: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {data.map((product, index) => (
      <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">{product.productName}</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full
              ${product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2">{product.productDescription}</p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">SKU/HSN:</span>
              <span className="ml-1 text-gray-900">{product.skuHsnCode}</span>
            </div>
            <div>
              <span className="text-gray-500">Variants:</span>
              <span className="ml-1 text-gray-900">{product.totalVariants}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="text-sm font-medium text-gray-900">₹{product.sellingPrice}</p>
              {product.mrp !== product.sellingPrice && (
                <p className="text-xs text-gray-500 line-through">₹{product.mrp}</p>
              )}
            </div>
            <button className="text-blue-600 hover:text-blue-800">
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MyListing = () => {
  const [activeTab, setActiveTab] = useState('All Products');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">My Listings</h1>

      {/* Stats */}
      <div className="flex justify-end gap-4 text-sm">
        <span>Active Product <span className="font-semibold text-green-600">969</span></span>
        <span>Inactive Product <span className="font-semibold text-red-500">88</span></span>
        <span>Draft <span className="font-semibold text-gray-500">746</span></span>
      </div>

      {/* Scrollable Tabs */}
      <div className="border-b border-gray-200">
        <ScrollableTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Product Name"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">Select Category</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">Select Status</option>
          </select>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
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
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Products Content */}
      {viewMode === 'grid' ? (
        <ProductGrid data={productData} />
      ) : (
        <ProductTable data={productData} />
      )}
    </div>
  );
};

export default MyListing; 