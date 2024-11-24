import React, { useState } from 'react';
import { Search, Plus, X, Download, Upload } from 'lucide-react';
import CustomTable from '../components/CustomTable';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// Sample data for the products table
const productData = [
  {
    id: 1,
    product_image: 'https://images.unsplash.com/photo-1682686580391-615b1e32590a',
    product_name: 'Winter Jacket',
    product_description: 'Warm winter jacket for extreme conditions',
    sku_hsn_code: 'HUDI1230307',
    variants_count: 3,
    mrp: 2500.00,
    selling_price: 1999.00,
    category: 'Fashion',
    sub_category: 'Winter Wear',
    status: 'Active',
    created_date: '2024-11-18T21:50:00'
  },
  {
    id: 2,
    product_image: 'https://images.unsplash.com/photo-1682686580186-b55d2a91053c',
    product_name: 'Mechanical Keyboard',
    product_description: 'Professional gaming mechanical keyboard',
    sku_hsn_code: 'KB0209',
    variants_count: 2,
    mrp: 8999.00,
    selling_price: 7499.00,
    category: 'Electronics',
    sub_category: 'Gaming Accessories',
    status: 'Active',
    created_date: '2024-10-11T13:33:00'
  },
  {
    id: 3,
    product_image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    product_name: 'Ceramic Vase',
    product_description: 'Handcrafted ceramic flower vase',
    sku_hsn_code: 'VASE0307',
    variants_count: 1,
    mrp: 1299.00,
    selling_price: 999.00,
    category: 'Home Decor',
    sub_category: 'Vases',
    status: 'Active',
    created_date: '2024-10-15T09:30:00'
  }
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Products');
  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleCloseModal = () => setShowAddModal(false);

  const handleManualUpload = () => {
    setShowAddModal(false);
    navigate('/dashboard/master-catalog/add-product');
  };

  const handleBulkUpload = () => {
    setShowAddModal(false);
    navigate('/dashboard/master-catalog/bulk-upload');
  };

  const handleDownloadTemplate = () => {
    // Add your download template logic here
    console.log('Downloading template...');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Add your file upload logic here
      console.log('Uploading file:', file);
    }
  };

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
          <button 
            onClick={() => setShowAddModal(true)} 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Product</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">Choose a method to add your product listing</p>
            
            <div className="space-y-4">
              <button 
                onClick={handleManualUpload}
                className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left flex items-start gap-4"
              >
                <div className="p-2 bg-gray-100 rounded">
                  <Plus size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">Manual upload</h3>
                  <p className="text-sm text-gray-600">Add product via form. Fill all the required one by one create variants.</p>
                </div>
              </button>

              <button 
                onClick={handleBulkUpload}
                className="w-full p-4 border rounded-lg hover:bg-gray-50 text-left flex items-start gap-4"
              >
                <div className="p-2 bg-gray-100 rounded">
                  <Upload size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">Bulk upload</h3>
                  <p className="text-sm text-gray-600">Add product via .csv file. Fill all the required information in a predefined template and upload.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

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