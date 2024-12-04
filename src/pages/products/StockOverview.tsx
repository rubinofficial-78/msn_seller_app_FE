import React, { useState, useEffect } from "react";
import { Eye, Edit, Plus, Search, X } from "lucide-react";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { Column } from "../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryStatusLookup, getInventory,upsertInventory } from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/types";
import { toast } from "react-hot-toast";

interface Stock {
  id: number;
  product: {
    id: number;
    name: string;
    image_arr: string[];
    sku_id: string;
  };
  product_sku_id: string;
  location: {
    id: number;
    name: string;
  };
  on_hand_quantity: number;
  alert_quantity: number;
  status: {
    id: number;
    display_name: string;
    lookup_code: string;
  };
  createdAt: string;
}

interface UpdateInventoryForm {
  alert_quantity: number;
  on_hand_quantity: number;
}

const StockOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const inventoryStatusLookup = useSelector((state: RootState) => state.data.inventoryStatusLookup?.data || []);
  const inventory = useSelector((state: RootState) => state.data.inventory?.data || []);
  const inventoryMeta = useSelector((state: RootState) => state.data.inventory?.meta);
  
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: 0,
  });
  
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [updateForm, setUpdateForm] = useState<UpdateInventoryForm>({
    alert_quantity: 0,
    on_hand_quantity: 0,
  });

  useEffect(() => {
    console.log('Current Inventory State:', {
      inventory,
      inventoryMeta,
      inventoryStatusLookup
    });
  }, [inventory, inventoryMeta, inventoryStatusLookup]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching inventory with params:', {
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          status_id: selectedStatus ? Number(selectedStatus) : undefined
        });
        
        const response = await dispatch(getInventory({ 
          page_no: paginationState.page_no, 
          per_page: paginationState.per_page,
          status_id: selectedStatus ? Number(selectedStatus) : undefined
        }));
        
        console.log('Inventory API Response:', response);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchData();
    dispatch(getInventoryStatusLookup());
  }, [dispatch, paginationState.page_no, paginationState.per_page, selectedStatus]);

  const handleUpdateStock = (stock: Stock) => {
    setSelectedStock(stock);
    setUpdateForm({
      alert_quantity: stock.alert_quantity,
      on_hand_quantity: stock.on_hand_quantity,
    });
    setIsUpdateModalOpen(true);
  };

  const handleInventoryUpdate = async () => {
    try {
      if (!selectedStock) return;

      const payload = [{
        section_key: "INVENTORY",
        product_sku_id: selectedStock.product_sku_id,
        location_id: selectedStock.location.id,
        on_hand_quantity: Number(updateForm.on_hand_quantity),
        alert_quantity: Number(updateForm.alert_quantity),
      }];

      const response = await dispatch(upsertInventory(payload));
      
      if (response?.meta?.status) {
        toast.success("Inventory updated successfully");
        setIsUpdateModalOpen(false);
        // Refresh inventory data
        dispatch(getInventory({ 
          page_no: paginationState.page_no, 
          per_page: paginationState.per_page 
        }));
      } else {
        throw new Error(response?.meta?.message || "Failed to update inventory");
      }
    } catch (error) {
      console.error('Failed to update inventory:', error);
      toast.error("Failed to update inventory");
    }
  };

  const stockTableColumns = [
    {
      id: "productName",
      key: "product.name",
      label: "Product Name",
      minWidth: 200,
      type: "image_text",
      renderCell: (row: Stock) => (
        <div className="flex items-center gap-3">
          <img
            src={row.product.image_arr[0] || "/placeholder-image.jpg"}
            alt={row.product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{row.product.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(row.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "skuId",
      key: "product_sku_id",
      label: "SKU Id",
      minWidth: 140,
    },
    {
      id: "locationName",
      key: "location.name",
      label: "Location Name",
      minWidth: 160,
      type: "custom",
      // renderCell: (row: Stock) => (
      //   <div className="flex items-center gap-1">
      //     {row.location.name}
      //     <span className="text-blue-500 cursor-help" title="Location Info">
      //       ⓘ
      //     </span>
      //   </div>
      // ),
    },
    {
      id: "quantityInHand",
      key: "on_hand_quantity",
      label: "Quantity in hand",
      minWidth: 140,
      type: "number",
    },
    {
      id: "alertQuantity",
      key: "alert_quantity",
      label: "Alert Quantity",
      minWidth: 140,
      type: "number",
    },
    {
      id: "status",
      key: "status.display_name",
      label: "Status",
      minWidth: 120,
      type: "custom",
      renderCell: (row: Stock) => (
        <span 
          className={`px-2 py-1 text-sm rounded-full ${
            row.status.lookup_code === "OPTIMIZED" 
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.status.display_name}
        </span>
      ),
    },
    {
      id: "action",
      key: "action",
      label: "Action",
      minWidth: 100,
      type: "custom",
      renderCell: (row: Stock) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdateStock(row)}
            className="px-3 py-1 text-sm text-white bg-primary-600 rounded hover:bg-primary-700"
          >
            Update
          </button>
        </div>
      ),
    },
  ] satisfies Column[];

  const handlePaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    setPaginationState((prev) => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStatus(value);
    
    // Reset pagination when filter changes
    setPaginationState(prev => ({
      ...prev,
      page_no: 1
    }));
  };

  const renderUpdateModal = () => {
    if (!isUpdateModalOpen || !selectedStock) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Update Inventory</h2>
            <button 
              onClick={() => setIsUpdateModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <div className="text-gray-900">{selectedStock.product.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Quantity
              </label>
              <input
                type="number"
                value={updateForm.alert_quantity}
                onChange={(e) => setUpdateForm(prev => ({
                  ...prev,
                  alert_quantity: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity in Hand
              </label>
              <input
                type="number"
                value={updateForm.on_hand_quantity}
                onChange={(e) => setUpdateForm(prev => ({
                  ...prev,
                  on_hand_quantity: Number(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsUpdateModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleInventoryUpdate}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-4 text-sm text-gray-500">
        Debug: Inventory Count: {inventory?.length || 0}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-64">
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search Stock"
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-48 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Status</option>
          {inventoryStatusLookup.map((status) => (
            <option key={status.id} value={status.id}>
              {status.display_name}
            </option>
          ))}
        </select>
        <div className="flex-1"></div>
      </div>
      <CustomTable
        headCells={stockTableColumns}
        data={inventory}
        pagination={true}
        meta_data={{
          total_rows: inventoryMeta?.total_rows,
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          totalPages: inventoryMeta?.total_pages,
        }}
        setParams={handlePaginationChange}
      />
      {renderUpdateModal()}
    </div>
  );
};

export default StockOverview;