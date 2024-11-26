import React, { useState } from 'react';
import { Search, Plus, X, Download, Upload } from 'lucide-react';
import CustomTable from '../components/CustomTable';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

// Expanded sample data with different statuses
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
  },
  {
    id: 4,
    product_image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    product_name: 'Smart Watch Pro',
    product_description: 'Advanced fitness tracking smartwatch',
    sku_hsn_code: 'WATCH1001',
    variants_count: 4,
    mrp: 15999.00,
    selling_price: 12999.00,
    category: 'Electronics',
    sub_category: 'Wearables',
    status: 'Inactive',
    created_date: '2024-10-01T10:30:00'
  },
  {
    id: 5,
    product_image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    product_name: 'Organic Coffee Beans',
    product_description: 'Premium Arabica coffee beans',
    sku_hsn_code: 'COFFEE2001',
    variants_count: 2,
    mrp: 599.00,
    selling_price: 499.00,
    category: 'Food',
    sub_category: 'Beverages',
    status: 'Draft',
    created_date: '2024-09-28T15:45:00'
  },
  {
    id: 6,
    product_image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    product_name: 'Yoga Mat Premium',
    product_description: 'Non-slip exercise yoga mat',
    sku_hsn_code: 'YOGA3001',
    variants_count: 3,
    mrp: 1299.00,
    selling_price: 999.00,
    category: 'Sports',
    sub_category: 'Yoga',
    status: 'Draft',
    created_date: '2024-09-25T09:15:00'
  }
];

// Tab type definition
interface Tab {
  label: string;
  count?: number;
  color?: string;
}

// Update the tabs array with additional styling properties
const tabs = [
  { 
    label: 'All Products', 
    status: 'ALL',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    color: 'text-gray-600'
  },
  { 
    label: 'Active', 
    status: 'Active',
    count: 6, 
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  { 
    label: 'Inactive', 
    status: 'Inactive',
    count: 9, 
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  { 
    label: 'Draft', 
    status: 'Draft',
    count: 45, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  },
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

// Add categories array
const categories = [
  { label: 'F&B', count: 0 },
  { label: 'Fashion', count: 0 },
  { label: 'Grocery', count: 0 },
  { label: 'Beauty & Personal Care', count: 0 },
  { label: 'Home and Decor', count: 0 },
  { label: 'Electronics', count: 0 },
  { label: 'Home & Decor', count: 0 }
];

const MasterCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Products');
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    total: productData.length
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [products, setProducts] = useState(productData);

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

  // Add status toggle handler
  const handleStatusToggle = async (row: any) => {
    // Update the products state with the toggled status
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === row.id 
          ? { ...product, status: product.status === 'Active' ? 'Inactive' : 'Active' }
          : product
      )
    );
  };

  // Update getFilteredData to use products state
  const getFilteredData = () => {
    let filtered = products;
    
    // Filter by status
    switch (activeTab) {
      case 'Active':
        filtered = products.filter(product => product.status === 'Active');
        break;
      case 'Inactive':
        filtered = products.filter(product => product.status === 'Inactive');
        break;
      case 'Draft':
        filtered = products.filter(product => product.status === 'Draft');
        break;
    }

    // Calculate pagination
    const startIndex = (params.page - 1) * params.per_page;
    const endIndex = startIndex + params.per_page;
    
    return {
      data: filtered.slice(startIndex, endIndex),
      total: filtered.length
    };
  };

  // Create metadata for pagination
  const meta_data = {
    total: getFilteredData().total,
    per_page: params.per_page,
    current_page: params.page,
    last_page: Math.ceil(getFilteredData().total / params.per_page),
    from: ((params.page - 1) * params.per_page) + 1,
    to: Math.min(params.page * params.per_page, getFilteredData().total)
  };

  // Handle pagination and per_page changes
  const handleParamsChange = (newParams: { page?: number; per_page?: number }) => {
    setParams(prev => ({
      ...prev,
      page: newParams.page || prev.page,
      per_page: newParams.per_page || prev.per_page,
    }));
  };

  // Update tab counts
  const tabCounts = {
    'All Products': productData.length,
    'Active': productData.filter(p => p.status === 'Active').length,
    'Inactive': productData.filter(p => p.status === 'Inactive').length,
    'Draft': productData.filter(p => p.status === 'Draft').length
  };

  // Update the tabs array with actual counts
  const updatedTabs: Tab[] = [
    { label: 'All Products', count: tabCounts['All Products'] },
    { label: 'Active', count: tabCounts['Active'], color: 'text-green-600' },
    { label: 'Inactive', count: tabCounts['Inactive'], color: 'text-orange-500' },
    { label: 'Draft', count: tabCounts['Draft'], color: 'text-gray-600' },
  ];

  // Calculate category counts from product data
  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: productData.filter(product => 
      product.category.toLowerCase() === cat.label.toLowerCase()
    ).length
  }));

  return (
    <div className="space-y-4">
      {/* Enhanced Stats Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {tabs.slice(1).map((tab) => (
          <div
            key={tab.status}
            className={`${tab.bgColor} ${tab.borderColor} border rounded-lg p-3 transition-all hover:shadow-sm`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${tab.color} font-medium`}>
                {tab.label}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab.bgColor} ${tab.color} border ${tab.borderColor}`}
              >
                {tab.status}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className={`text-lg font-bold ${tab.color}`}>
                {tabCounts[tab.label]}
              </span>
              <span className="text-xs text-gray-500 ml-1">products</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center border-b border-gray-200 px-4">
          <div className="flex-1">
            <nav className="-mb-px flex space-x-8">
              {updatedTabs.map((tab) => (
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

          {/* Status Dropdown */}
          <div className="ml-4 py-2">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {updatedTabs.map((tab) => (
                <option key={tab.label} value={tab.label}>
                  {tab.label} {tab.count ? `(${tab.count})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Product name or ID"
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">Filter by Category</option>
              {categoryCounts.map((category) => (
                <option key={category.label} value={category.label}>
                  {category.label} - {category.count}
                </option>
              ))}
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

        {/* Products Table */}
        <div className="p-4">
          <CustomTable
            headCells={headCells}
            data={getFilteredData().data}
            setParams={handleParamsChange}
            meta_data={meta_data}
            pagination={true}
          />
        </div>
      </div>

      {/* Pagination info */}
      <div className="text-sm text-gray-500 text-right">
        Showing {meta_data.from} to {meta_data.to} of {meta_data.total} entries
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
    </div>
  );
};

export default MasterCatalog;