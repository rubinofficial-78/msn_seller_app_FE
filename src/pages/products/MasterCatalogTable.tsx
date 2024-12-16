import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, X, Trash2 } from "lucide-react";
import CustomTable, { Column } from "../../components/CustomTable";
import { getmylisting, getLocations, createInventoryProduct } from "../../redux/Action/action";
import { RootState } from "../../redux/types";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-hot-toast";

// Add interface for location
interface Location {
  id: number;
  name: string;
}

const MasterCatalogTable: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedProductDetails, setSelectedProductDetails] = useState<any[]>([]);

  const { data: masterCatalogProducts, meta_data } = useSelector(
    (state: RootState) => state.data.myListing
  );

  const locations = useSelector(
    (state: RootState) => state.data.locations?.data || []
  );

  useEffect(() => {
    if (showLocationModal) {
      dispatch(getLocations());
    }
  }, [showLocationModal, dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        await dispatch(getmylisting({ 
          page_no: 1, 
          per_page: 10,
          status: 'ACTIVE',
          master_catalog: true,
          search: searchTerm
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch, searchTerm]);

  const columns: Column[] = [
    {
      id: "checkbox",
      key: "checkbox",
      label: "",
      type: "custom",
      minWidth: 50,
      renderCell: (row: any) => (
        <input
          type="checkbox"
          checked={selectedProducts.includes(row.sku_id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedProducts(prev => [...prev, row.sku_id]);
            } else {
              setSelectedProducts(prev => prev.filter(id => id !== row.sku_id));
            }
          }}
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      ),
    },
    {
      id: "name",
      key: "name",
      label: "Product Name",
      type: "image_text",
      image_path: "image_arr[0]",
      minWidth: 200,
    },
    {
      id: "description",
      key: "short_desc",
      label: "Product Description",
      minWidth: 200,
    },
    {
      id: "skuHsn",
      key: ["sku_id", "hsn.hsn_code"],
      label: "SKU Id & HSN Code",
      minWidth: 150,
    },
    {
      id: "category",
      key: ["level1_category.name", "level2_category.name"],
      label: "Category / Sub-category",
      minWidth: 180,
    },
    {
      id: "mrp",
      key: "mrp",
      label: "MRP",
      type: "amount",
      minWidth: 120,
    },
    {
      id: "sales_price",
      key: "sales_price",
      label: "Selling Price",
      type: "amount",
      minWidth: 120,
    },
     
  ];

  const handleAddToInventory = () => {
    const selectedProductsList = masterCatalogProducts?.filter(product => 
      selectedProducts.includes(product.sku_id)
    ) || [];
    setSelectedProductDetails(selectedProductsList);
    setShowLocationModal(true);
  };

  const handleRemoveProduct = (skuId: string) => {
    setSelectedProducts(prev => prev.filter(id => id !== skuId));
    setSelectedProductDetails(prev => prev.filter(product => product.sku_id !== skuId));
  };

  const handleSubmit = async () => {
    if (!selectedLocation) {
      toast.error('Please select a location');
      return;
    }

    try {
      const loadingToast = toast.loading('Adding products to inventory...');
      
      // Get product IDs from selectedProductDetails
      const productIds = selectedProductDetails.map(product => product.id);
      const locationId = parseInt(selectedLocation);

      await dispatch(createInventoryProduct(productIds, locationId));
      
      toast.dismiss(loadingToast);
      toast.success(`${selectedProductDetails.length} products added to inventory`);
      setShowLocationModal(false);
      setSelectedProducts([]);
      setSelectedProductDetails([]);

      // Refresh the product list
      dispatch(getmylisting({ 
        page_no: 1, 
        per_page: 10,
        status: 'ACTIVE',
        master_catalog: true,
        search: searchTerm
      }));
    } catch (error) {
      console.error('Error adding products to inventory:', error);
      toast.error('Failed to add products to inventory');
    }
  };

  const LocationModal = () => {
    if (!showLocationModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Add Products to Inventory</h2>
            <button
              onClick={() => setShowLocationModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Selected Products List */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selected Products ({selectedProductDetails.length})
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {selectedProductDetails.map((product) => (
                <div
                  key={product.sku_id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {product.image_arr?.[0] && (
                      <img
                        src={product.image_arr[0]}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">SKU: {product.sku_id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(product.sku_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Location Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select a location</option>
              {locations.map((location: Location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowLocationModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedLocation}
              className="px-4 py-2 bg-[#9D0E29] text-white rounded-lg hover:bg-[#8B0D24] disabled:opacity-50"
            >
              Add to Inventory
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-semibold">Add Products from Catalog</h1>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <button
          onClick={handleAddToInventory}
          disabled={!selectedProducts.length}
          className="px-4 py-2 bg-[#9D0E29] text-white rounded-lg hover:bg-[#8B0D24] disabled:opacity-50"
        >
          Add to Inventory ({selectedProducts.length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9D0E29]"></div>
          </div>
        ) : (
          <CustomTable
            headCells={columns}
            data={masterCatalogProducts || []}
            pagination={true}
            meta_data={meta_data || {
              total_rows: 0,
              page_no: 1,
              per_page: 10,
              totalPages: 0,
            }}
            setParams={(params) => {
              dispatch(getmylisting({
                ...params,
                status: 'ACTIVE',
                master_catalog: true,
                search: searchTerm
              }));
            }}
          />
        )}
      </div>

      {/* Add Location Modal */}
      <LocationModal />
    </div>
  );
};

export default MasterCatalogTable; 