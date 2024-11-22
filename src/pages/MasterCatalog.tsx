import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Product Name', accessor: 'name' },
  { header: 'Description', accessor: 'description' },
  { header: 'SKU & HSN Code', accessor: 'skuHsn' },
  { header: 'Variants', accessor: 'variants' },
  { header: 'MRP', accessor: 'mrp' },
  { header: 'Selling Price', accessor: 'sellingPrice' },
  { header: 'Category', accessor: 'category' },
  { header: 'Sub-category', accessor: 'subCategory' },
  { header: 'Status', accessor: 'status' },
];

const data = [
  {
    name: 'Sample Product 1',
    description: 'Description for product 1',
    skuHsn: 'SKU001-HSN001',
    variants: 3,
    mrp: '₹999',
    sellingPrice: '₹799',
    category: 'Electronics',
    subCategory: 'Mobile Accessories',
    status: 'Active',
  },
  // Add more sample data as needed
];

function MasterCatalog() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Master Catalog</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Product
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default MasterCatalog;