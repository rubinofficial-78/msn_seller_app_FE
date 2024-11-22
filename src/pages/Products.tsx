import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { header: 'Product Name', accessor: 'name' },
  { header: 'Description', accessor: 'description' },
  { header: 'SKU & HSN Code', accessor: 'skuHsn' },
  { header: 'Category', accessor: 'category' },
  { header: 'Sub-category', accessor: 'subCategory' },
  { header: 'Variants', accessor: 'variants' },
  { header: 'MRP', accessor: 'mrp' },
  { header: 'Selling Price', accessor: 'sellingPrice' },
  { header: 'Quantity', accessor: 'quantity' },
  { header: 'Status', accessor: 'status' },
  { header: 'Seller', accessor: 'seller' },
];

const data = [
  {
    name: 'Product 1',
    description: 'Description for product 1',
    skuHsn: 'SKU001-HSN001',
    category: 'Electronics',
    subCategory: 'Mobile Accessories',
    variants: 3,
    mrp: '₹999',
    sellingPrice: '₹799',
    quantity: 100,
    status: 'Active',
    seller: 'Seller 1',
  },
  // Add more sample data as needed
];

function Products() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Product
        </button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Products;