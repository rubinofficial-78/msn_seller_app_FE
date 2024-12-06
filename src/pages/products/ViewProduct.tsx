import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/Action/action';
import { RootState } from '../../redux/types';
import { AppDispatch } from '../../redux/store';
import { ArrowLeft } from 'lucide-react';

const ViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: product, loading, error } = useSelector((state: RootState) => state.data.selectedProduct);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(parseInt(id)));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error loading product: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4">
        No product found
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft id="back-to-products-button" className="w-4 h-4 mr-2" />
          Back to Products
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow">
        {/* Basic Info */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Product Images</label>
                <div className="mt-2 flex gap-4">
                  {product.image_arr?.map((image: string, index: number) => (
                    <img
                      id={`product-image-${index}`}
                      key={index}
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">SKU ID</label>
                <div className="mt-1 text-gray-900">{product.sku_id}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">HSN Code</label>
                <div className="mt-1 text-gray-900">{product.hsn?.hsn_code}</div>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div className="mt-1 text-gray-900">
                  {product.level1_category?.name} / {product.level2_category?.name}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <div className="mt-1 text-gray-900">{product.long_desc}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">MRP</label>
                <div className="mt-1 text-gray-900">₹{product.mrp}</div>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Selling Price</label>
                <div className="mt-1 text-gray-900">₹{product.sales_price}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Inventory Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Total Variants</label>
                <div className="mt-1 text-gray-900">{product.variants?.length || 0}</div>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Total Stock</label>
                <div className="mt-1 text-gray-900">
                  {product.inventory_arr?.reduce((sum: number, inv: any) => sum + (inv.quantity || 0), 0) || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Status Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${product.status?.lookup_code === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                      product.status?.lookup_code === 'INACTIVE' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {product.status?.display_name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct; 