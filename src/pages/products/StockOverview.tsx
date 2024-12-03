import React, { useState, useEffect } from "react";
import { Eye, Edit, Plus, Search } from "lucide-react";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { Column } from "../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryStatusLookup, getInventory } from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/types";

interface Stock {
  id: number;
  product: {
    name: string;
    image_arr: string[];
  };
  product_sku_id: string;
  location: {
    name: string;
  };
  on_hand_quantity: number;
  alert_quantity: number;
  status: {
    display_name: string;
    lookup_code: string;
  };
  createdAt: string;
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

  useEffect(() => {
    dispatch(getInventoryStatusLookup());
    dispatch(getInventory({ 
      page_no: paginationState.page_no, 
      per_page: paginationState.per_page 
    }));
  }, [dispatch, paginationState.page_no, paginationState.per_page]);

  const handleUpdateStock = (stock: Stock) => {
    console.log("Update stock:", stock);
  };

  const stockTableColumns = [
    {
      id: "productName",
      key: "productName",
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
      key: "skuId",
      label: "SKU Id",
      minWidth: 140,
      renderCell: (row: Stock) => row.product_sku_id,
    },
    {
      id: "locationName",
      key: "locationName",
      label: "Location Name",
      minWidth: 160,
      type: "custom",
      renderCell: (row: Stock) => (
        <div className="flex items-center gap-1">
          {row.location.name}
          <span className="text-blue-500 cursor-help" title="Location Info">
            ⓘ
          </span>
        </div>
      ),
    },
    {
      id: "quantityInHand",
      key: "quantityInHand",
      label: "Quantity in hand",
      minWidth: 140,
      type: "number",
      renderCell: (row: Stock) => row.on_hand_quantity,
    },
    {
      id: "alertQuantity",
      key: "alertQuantity",
      label: "Alert Quantity",
      minWidth: 140,
      type: "number",
      renderCell: (row: Stock) => row.alert_quantity,
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      minWidth: 120,
      type: "custom",
      renderCell: (row: Stock) => (
        <span className="px-2 py-1 text-sm rounded-full bg-red-100 text-red-600">
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

  return (
    <div>
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
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-48 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="">All Status</option>
          {inventoryStatusLookup.map((status) => (
            <option key={status.id} value={status.lookup_code}>
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
          total_rows: inventoryMeta?.total_rows || 0,
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          totalPages: inventoryMeta?.total_pages || 0,
        }}
        setParams={handlePaginationChange}
      />
    </div>
  );
};

export default StockOverview;