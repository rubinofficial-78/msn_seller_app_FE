import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  LayoutGrid,
  Table,
  X,
  Upload,
  Edit,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import Groups from "./products/Groups";
import AddOns from "./products/AddOns";
import Menu from "./products/Menu";
import StockOverview from "./products/StockOverview";
import Offers from "./products/Offers";
import Pricing from "./products/Pricing";
import ScrollableTabs from "../components/ScrollableTabs";
import CustomTable, { Column } from "../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";

interface Product {
  id: number;
  name: string;
  sku_id: string;
  long_desc: string;
  image_arr: string[];
  mrp: number;
  sales_price: number;
  status: {
    id: number;
    lookup_code: string;
    display_name: string;
  };
  hsn: {
    hsn_code: string;
  };
  level1_category: {
    name: string;
  };
  level2_category: {
    name: string;
  };
  variants: any[];
  inventory_arr: Array<{
    quantity: number;
  }>;
  created_by: {
    name: string;
  };
  partner: {
    name: string;
  };
  branch: {
    name: string;
  };
  company: {
    name: string;
  };
}

// Define the tabs with their properties
const tabs = [
  { label: "All Products", status: "ALL" },
  {
    label: "Active",
    status: "ACTIVE",
    count: 0,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    label: "Inactive",
    status: "INACTIVE",
    count: 0,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    label: "Draft",
    status: "DRAFT",
    count: 0,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
  { label: "My Groups", status: "GROUPS" },
  { label: "Add Ons", status: "ADDONS" },
  { label: "My Menu", status: "MENU" },
  { label: "Stock Overview", status: "STOCK" },
  { label: "Pricing", status: "PRICING" },
  { label: "Offers & Discounts", status: "OFFERS" },
];

// Add ProductGrid component
const ProductGrid: React.FC<{ data: Product[] }> = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {data.map((product) => (
      <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
        {/* Product card content */}
      </div>
    ))}
  </div>
);

// Update the ProductTable component
const ProductTable: React.FC<{ data: Product[] }> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const productsMetaData = useSelector(
    (state: RootState) => state.data.products.meta
  );

  const handleViewProduct = (product: Product) => {
    // Handle view product
    console.log("View product:", product);
  };

  const handleStatusToggle = (product: Product) => {
    // Handle status toggle
    console.log("Toggle status for product:", product);
  };

  const columns: Column[] = [
    {
      id: "name",
      key: "name",
      label: "Product Name",
      type: "image_text",
      minWidth: 200,
      renderCell: (row: any) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image_arr?.[0] || "/placeholder-product.png"}
            alt={row.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="font-medium text-gray-900">{row.name}</div>
        </div>
      ),
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
      type: "custom",
      renderCell: (row: any) => (
        <div>
          <div>SKU: {row.sku_id}</div>
          <div className="text-gray-500">HSN: {row.hsn?.hsn_code}</div>
        </div>
      ),
    },
    {
      id: "category",
      key: ["level1_category.name", "level2_category.name"],
      label: "Category / Sub-category",
      minWidth: 180,
      type: "custom",
      renderCell: (row: any) => (
        <div>
          <div>{row.level1_category?.name}</div>
          <div className="text-gray-500">{row.level2_category?.name}</div>
        </div>
      ),
    },
    {
      id: "variants",
      key: ["total_variants"],
      label: "Total no.of.Variants",
      type: "number",
      minWidth: 120,
      renderCell: (row: any) => row.variants?.length || 0,
    },
    {
      id: "mrp",
      key: "mrp",
      label: "MRP",
      type: "amount",
      minWidth: 120,
    },
    {
      id: "sellingPrice",
      key: "sales_price",
      label: "Selling Price",
      type: "amount",
      minWidth: 120,
    },
    {
      id: "quantity",
      key: "quantity_in_hand",
      label: "Quantity in hand",
      type: "number",
      minWidth: 140,
      renderCell: (row: any) => {
        const totalQuantity = row.inventory_arr?.reduce(
          (sum: number, inv: any) => sum + (inv.quantity || 0),
          0
        );
        return totalQuantity || 0;
      },
    },
    {
      id: "status",
      key: "status.display_name",
      label: "Status",
      type: "status",
      minWidth: 120,
    },
    {
      id: "sellerName",
      key: "created_by.name",
      label: "Seller Name",
      minWidth: 150,
    },
    {
      id: "partnerName",
      key: "created_by.parent.name", // Adjust based on actual API response
      label: "Partner Name",
      minWidth: 150,
    },
    {
      id: "branchName",
      key: "created_by.parent.parent.name", // Adjust based on actual API response
      label: "Branch Name",
      minWidth: 150,
    },
    {
      id: "companyName",
      key: "created_by.parent.parent.parent.name", // Adjust based on actual API response
      label: "Company Name",
      minWidth: 150,
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      type: "custom",
      minWidth: 100,
      renderCell: (row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewProduct(row)}
            className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleStatusToggle(row)}
            className={`p-1 rounded-full ${
              row.status?.lookup_code === "ACTIVE"
                ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                : "text-red-600 hover:text-red-700 hover:bg-red-50"
            }`}
            title="Toggle Status"
          >
            {row.status?.lookup_code === "ACTIVE" ? (
              <ToggleRight size={16} />
            ) : (
              <ToggleLeft size={16} />
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <CustomTable
      headCells={columns}
      data={data}
      pagination={true}
      meta_data={
        productsMetaData || {
          total_rows: 0,
          page_no: 1,
          per_page: 10,
          totalPages: 0,
        }
      }
      setParams={(params) => {
        dispatch(
          getProducts({
            page_no: params.page_no,
            per_page: params.per_page,
          })
        );
      }}
    />
  );
};

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const productsData = useSelector((state: RootState) => state.data.products);

  // Get filtered data from Redux store
  const getFilteredData = () => {
    return productsData.data || [];
  };

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(getProducts({ page_no: 1, per_page: 10 }));
  }, [dispatch]);

  // Update the renderFiltersAndActions function
  const renderFiltersAndActions = () => {
    // Only show filters for product-related tabs
    if (["All Products", "Active", "Inactive", "Draft"].includes(activeTab)) {
      return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search products"
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
              <option value="">Select Company</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
              <option value="">Select Branch</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
              <option value="">Select Partner</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
              <option value="">Select Seller</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-primary-100 text-primary-600"
                  : "text-gray-600"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded ${
                viewMode === "table"
                  ? "bg-primary-100 text-primary-600"
                  : "text-gray-600"
              }`}
            >
              <Table size={18} />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg"
            >
              <Plus size={16} />
              <span>ADD PRODUCT</span>
            </button>
          </div>
        </div>
      );
    }

    // Return null for other tabs as they handle their own filters
    return null;
  };

  // Get tab counts and update tabs
  const getTabCounts = () => {
    return {
      ACTIVE: 0,
      INACTIVE: 0,
      DRAFT: 0,
    };
  };

  const tabCounts = getTabCounts();
  const updatedTabs = tabs.map((tab) => {
    if (tab.status && tabCounts.hasOwnProperty(tab.status)) {
      return { ...tab, count: tabCounts[tab.status as keyof typeof tabCounts] };
    }
    return tab;
  });

  const renderContent = () => {
    switch (activeTab) {
      case "My Groups":
        return <Groups />;
      case "Add Ons":
        return <AddOns />;
      case "My Menu":
        return <Menu />;
      case "Stock Overview":
        return <StockOverview />;
      case "Offers & Discounts":
        return <Offers />;
      case "Pricing":
        return <Pricing />;
      default:
        return (
          <div className="p-4">
            {viewMode === "grid" ? (
              <ProductGrid data={getFilteredData()} />
            ) : (
              <ProductTable data={getFilteredData()} />
            )}
          </div>
        );
    }
  };

  const handleManualUpload = () => {
    setShowAddModal(false);
    navigate("/dashboard/products/add-product");
  };

  const handleBulkUpload = () => {
    setShowAddModal(false);
    navigate("/dashboard/products/bulk-upload");
  };

  const renderAddModal = () => {
    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Add Product</h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            Choose a method to add your product listing
          </p>

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
                <p className="text-sm text-gray-600">
                  Add product via form. Fill all the required one by one create
                  variants.
                </p>
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
                <p className="text-sm text-gray-600">
                  Add product via .csv file. Fill all the required information
                  in a predefined template and upload.
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 px-4">
          <ScrollableTabs
            tabs={updatedTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        {renderFiltersAndActions()}
        {renderContent()}
      </div>
      {renderAddModal()}
    </div>
  );
};

export default Products;
