import React, { useState } from "react";
import { Eye, Edit, Plus, Search } from "lucide-react";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { Column } from "../../components/CustomTable";

interface Stock {
  id: string | number;
  productName: string;
  skuId: string;
  locationName: string;
  quantityInHand: number;
  alertQuantity: number;
  status: string;
  lastUpdated: string;
  image: string;
}

const stockData: Stock[] = [
  {
    id: 1,
    productName: "Premium T-Shirt",
    skuId: "SHRTM28",
    locationName: "Bangalore Warehouse",
    quantityInHand: 1,
    alertQuantity: 5,
    status: "Critical",
    lastUpdated: "2024-03-15T10:30:00",
    image: "/placeholder-image.jpg",
  },
  {
    id: 2,
    productName: "Gray T-shirt",
    skuId: "7O08KC",
    locationName: "MS warehouse",
    quantityInHand: 1,
    alertQuantity: 10,
    status: "Critical",
    lastUpdated: "2024-03-14T15:45:00",
    image: "/placeholder-image.jpg",
  },
];

const StockOverview = () => {
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: stockData.length,
  });

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
            src={row.image}
            alt={row.productName}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{row.productName}</p>
            <p className="text-sm text-gray-500">
              {new Date(row.lastUpdated).toLocaleString()}
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
    },
    {
      id: "locationName",
      key: "locationName",
      label: "Location Name",
      minWidth: 160,
      type: "custom",
      renderCell: (row: Stock) => (
        <div className="flex items-center gap-1">
          {row.locationName}
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
    },
    {
      id: "alertQuantity",
      key: "alertQuantity",
      label: "Alert Quantity",
      minWidth: 140,
      type: "number",
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      minWidth: 120,
      type: "custom",
      renderCell: (row: Stock) => (
        <span className="px-2 py-1 text-sm rounded-full bg-red-100 text-red-600">
          {row.status}
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
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-1 max-w-xs">
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
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/dashboard/products/stock-report")}
            className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Download Report
          </button>
          <button
            onClick={() => navigate("/dashboard/products/bulk-stock-update")}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus size={16} />
            <span>BULK UPDATE</span>
          </button>
        </div>
      </div>
      <CustomTable
        headCells={stockTableColumns}
        data={stockData}
        pagination={true}
        meta_data={{
          total_rows: stockData.length,
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          totalPages: Math.ceil(stockData.length / paginationState.per_page),
        }}
        setParams={handlePaginationChange}
      />
    </div>
  );
};

export default StockOverview;