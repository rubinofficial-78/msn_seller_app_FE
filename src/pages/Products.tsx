import React, { useState } from 'react';
import { Search, Plus, Eye, LayoutGrid, Table } from 'lucide-react';
import ScrollableTabs from '../components/ScrollableTabs';
import CustomTable from '../components/CustomTable';

// Update the product data structure
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
  // Add more sample data
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

// Define the table columns for CustomTable
const tableColumns = [
  {
    id: 'productName',
    key: 'productName',
    label: 'Product Name',
    minWidth: 160
  },
  {
    id: 'productDescription',
    key: 'productDescription',
    label: 'Product Description',
    minWidth: 200
  },
  {
    id: 'skuHsnCode',
    key: 'skuHsnCode',
    label: 'SKU Id & HSN Code',
    minWidth: 160
  },
  {
    id: 'category',
    key: ['category', 'subCategory'],
    label: 'Category / Sub-category',
    join: true,
    minWidth: 200
  },
  {
    id: 'totalVariants',
    key: 'totalVariants',
    label: 'Total no.of.Variants',
    minWidth: 140
  },
  {
    id: 'mrp',
    key: 'mrp',
    label: 'MRP',
    type: 'amount',
    minWidth: 120
  },
  {
    id: 'sellingPrice',
    key: 'sellingPrice',
    label: 'Selling Price',
    type: 'amount',
    minWidth: 120
  },
  {
    id: 'quantityInHand',
    key: 'quantityInHand',
    label: 'Quantity in hand',
    minWidth: 140
  },
  {
    id: 'status',
    key: 'status',
    label: 'Status',
    type: 'status',
    minWidth: 120
  },
  {
    id: 'sellerName',
    key: 'sellerName',
    label: 'Seller Name',
    minWidth: 160
  },
  {
    id: 'partnerName',
    key: 'partnerName',
    label: 'Partner Name',
    minWidth: 160
  },
  {
    id: 'branchName',
    key: 'branchName',
    label: 'Branch Name',
    minWidth: 160
  },
  {
    id: 'companyName',
    key: 'companyName',
    label: 'Company Name',
    minWidth: 160
  }
];

// Replace the ProductTable component with this simpler version
const ProductTable: React.FC<{ data: Product[] }> = ({ data }) => (
  <div className="bg-white rounded-lg shadow">
    <CustomTable
      headCells={tableColumns}
      data={data}
      pagination={true}
      setParams={(params) => {
        // Handle pagination params here
        console.log('Pagination params:', params);
      }}
    />
  </div>
);

const ProductGrid = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {data.map((product) => (
      <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="aspect-w-1 aspect-h-1 mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full
              ${product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">SKU/HSN:</span>
              <span className="ml-1 text-gray-900">{product.skuHsn}</span>
            </div>
            <div>
              <span className="text-gray-500">Variants:</span>
              <span className="ml-1 text-gray-900">{product.variants}</span>
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
            <button className="text-primary-600 hover:text-primary-700">
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Products = () => {
  const [activeTab, setActiveTab] = useState('All Products');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  return (
    <div className="space-y-4">
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          {/* Filters */}
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">Select Company</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">Select Branch</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">Select Partner</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option value="">Select Seller</option>
          </select>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            title="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded ${viewMode === 'table' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            title="Table view"
          >
            <Table size={20} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Plus size={20} />
            <span>ADD</span>
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

export default Products;