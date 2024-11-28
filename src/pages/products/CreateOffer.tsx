import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import AddForm from "../../components/AddForm";
import CustomTable from "../../components/CustomTable";

interface OfferFormData {
  offerTitle: string;
  offerDescription: string;
  couponCode: string;
  maxCount: number;
  offerType: string;
  fromDate: string;
  toDate: string;
  usageMaximumLimit: number;
  currentUsageLimit: number;
  storeLocations: string;
  products: string;
}

// Add this interface for the product table
interface ProductTableData {
  productName: string;
  skuId: string;
  mrp: number;
  salesPrice: number;
  action: boolean;
}

const CreateOffer = () => {
  const navigate = useNavigate();
  const [offerFormData, setOfferFormData] = useState<OfferFormData>({
    offerTitle: '',
    offerDescription: '',
    couponCode: '',
    maxCount: 0,
    offerType: '',
    fromDate: '',
    toDate: '',
    usageMaximumLimit: 0,
    currentUsageLimit: 0,
    storeLocations: '',
    products: ''
  });

  // Add state for selected products
  const [selectedProducts, setSelectedProducts] = useState<ProductTableData[]>([]);

  // Update the product table data structure
  const productTableData: ProductTableData[] = [
    {
      productName: "Fresh Tomatoes",
      skuId: "SKU001",
      mrp: 50.00,
      salesPrice: 40.00,
      action: false
    },
    {
      productName: "Organic Potatoes",
      skuId: "SKU002",
      mrp: 40.00,
      salesPrice: 35.00,
      action: false
    },
    {
      productName: "Premium Rice",
      skuId: "SKU003",
      mrp: 120.00,
      salesPrice: 110.00,
      action: false
    }
  ];

  // Update the product table columns configuration
  const productTableColumns = [
    {
      id: "productName",
      key: "productName",
      label: "Product Name",
      minWidth: 200,
    },
    {
      id: "skuId",
      key: "skuId",
      label: "SKU ID",
      minWidth: 120,
    },
    {
      id: "mrp",
      key: "mrp",
      label: "MRP",
      minWidth: 100,
      type: "amount",
    },
    {
      id: "salesPrice",
      key: "salesPrice",
      label: "Sales Price",
      minWidth: 120,
      type: "amount",
    },
    {
      id: "action",
      key: "action",
      label: "Action",
      minWidth: 100,
      renderCell: (row: ProductTableData) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={selectedProducts.some(p => p.skuId === row.skuId)}
            onChange={() => handleProductSelection(row)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
        </div>
      ),
    },
  ];

  // Add handler for product selection
  const handleProductSelection = (product: ProductTableData) => {
    setSelectedProducts(prev => {
      const exists = prev.some(p => p.skuId === product.skuId);
      if (exists) {
        return prev.filter(p => p.skuId !== product.skuId);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleOfferInputChange = (key: string, value: any) => {
    setOfferFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveOffer = () => {
    console.log('Saving offer:', offerFormData);
    navigate('/dashboard/products');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/products')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create your offer</h1>
          <p className="text-sm text-gray-500">
            Create your custom offers for your customers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl space-y-6">
        {/* Offers Basics */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Offers Basics</h3>
          <p className="text-sm text-gray-500 mb-4">
            This information is helpful for you to track your offer. This information will be displayed publicly so be careful what you share.
          </p>

          <AddForm
            data={[
              {
                type: "text",
                key: "offerTitle",
                label: "Offer Title",
                required: true,
                value: offerFormData.offerTitle,
                placeholder: "Enter offer title",
              },
              {
                type: "textarea",
                key: "offerDescription",
                label: "Offer Description",
                required: true,
                value: offerFormData.offerDescription,
                placeholder: "Brief description for your offer",
              },
              {
                type: "text",
                key: "couponCode",
                label: "Coupon Code",
                required: true,
                value: offerFormData.couponCode,
                placeholder: "Enter coupon code",
              },
              {
                type: "number",
                key: "maxCount",
                label: "Max Count",
                required: true,
                value: offerFormData.maxCount,
                placeholder: "Enter maximum count",
              },
              {
                type: "select",
                key: "offerType",
                label: "Offer Type",
                required: true,
                value: offerFormData.offerType,
                options: [
                  { value: "percentage", label: "Percentage" },
                  { value: "fixed", label: "Fixed Amount" },
                ],
                placeholder: "Select offer type",
              }
            ]}
            handleInputonChange={handleOfferInputChange}
            handleSelectonChange={handleOfferInputChange}
          />
        </div>

        {/* Applicable Configuration */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Applicable Configuration</h3>
          <p className="text-sm text-gray-500 mb-4">
            This information is product pricing which will be shown to your customers.
          </p>

          <AddForm
            data={[
              {
                type: "number",
                key: "usageMaximumLimit",
                label: "Usage Maximum Limit",
                required: true,
                value: offerFormData.usageMaximumLimit,
                placeholder: "Enter maximum usage limit",
              },
              {
                type: "number",
                key: "currentUsageLimit",
                label: "Current Usage Limit",
                required: true,
                value: offerFormData.currentUsageLimit,
                placeholder: "Enter current usage limit",
              }
            ]}
            handleInputonChange={handleOfferInputChange}
          />
        </div>

        {/* Offer Applicable Stores */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Offer Applicable Stores</h3>
          <p className="text-sm text-gray-500 mb-4">
            This information will be shown to your customers.
          </p>

          <AddForm
            data={[
              {
                type: "select",
                key: "storeLocations",
                label: "Select Stores Locations",
                required: true,
                value: offerFormData.storeLocations,
                options: [
                  { value: "all", label: "All Stores" },
                  { value: "selected", label: "Selected Stores" },
                ],
                placeholder: "Select store locations",
              }
            ]}
            handleSelectonChange={handleOfferInputChange}
          />
        </div>

        {/* Offer Applicable Products */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Offer Applicable Products</h3>
          <p className="text-sm text-gray-500 mb-4">
            This information will be displayed publicly so be careful what you share.
          </p>

          <AddForm
            data={[
              {
                type: "select",
                key: "products",
                label: "Products / Bundles",
                required: true,
                value: offerFormData.products,
                options: [
                  { value: "all", label: "All Products" },
                  { value: "selected", label: "Selected Products" },
                ],
                placeholder: "Select products",
              }
            ]}
            handleSelectonChange={handleOfferInputChange}
          />

          {/* Product Table */}
          {offerFormData.products === "selected" && (
            <div className="mt-6 space-y-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <CustomTable
                    headCells={productTableColumns}
                    data={productTableData}
                    pagination={false}
                  />
                </div>
              </div>
              
              {/* Selected Products Summary */}
              {selectedProducts.length > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Products ({selectedProducts.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProducts.map((product) => (
                      <div 
                        key={product.skuId}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm shadow-sm"
                      >
                        <span>{product.productName}</span>
                        <button
                          onClick={() => handleProductSelection(product)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => navigate('/dashboard/products')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveOffer}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer; 