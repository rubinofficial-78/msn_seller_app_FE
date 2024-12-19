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
  Filter,
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
import { getProducts, getProductCounts, getProductById,saveBasicDetails, getCompanyDropdown, getBranchDropdown, getPartnerDropdown, getSellerDropdown } from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from '../redux/store';
import { toast } from 'react-hot-toast';

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
    status: "IN_ACTIVE",
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

// Update the ProductGrid component
const ProductGrid: React.FC<{ data: Product[] }> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleViewProduct = async (product: Product) => {
    try {
      await dispatch(getProductById(product.id));
      navigate(`/dashboard/products/view/${product.id}`);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };

  const handleStatusToggle = async (product: Product) => {
    try {
      console.log("Toggle status for product:", product);
      const newStatusId = product.status?.lookup_code === "ACTIVE" ? 34 : 33;
      
      const payload = {
        sku_id: product.sku_id,
        status_id: newStatusId,
         
      };

      console.log('Updating product status with payload:', payload);
      
      const response = await dispatch(saveBasicDetails(payload));
      console.log('Status update response:', response);
      
      // Refresh the products list after status update
      await dispatch(getProducts({ page_no: 1, per_page: 10 }));
      
      toast.success("Product status updated successfully");
    } catch (error) {
      console.error("Failed to update product status:", error);
      toast.error("Failed to update product status");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          {/* Product Image */}
          <div className="relative aspect-square mb-4">
            <img
              src={product.image_arr?.[0] || "/placeholder-product.png"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {/* Action Buttons Overlay */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                id="view-product-button-products"
                onClick={() => handleViewProduct(product)}
                className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 text-gray-600"
                title="View"
              >
                <Eye id="view-icon-products" size={16} />
              </button>
              <button
                onClick={() => handleStatusToggle(product)}
                className={`p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 
                  ${product.status?.lookup_code === "ACTIVE" ? "text-green-600" : "text-red-600"}`}
                title="Toggle Status"
              >
                {product.status?.lookup_code === "ACTIVE" ? (
                  <ToggleRight id="toggle-right-products" size={16} />
                ) : (
                  <ToggleLeft id="toggle-left-products" size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 truncate" title={product.name}>
              {product.name}
            </h3>
            
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-500">SKU: {product.sku_id}</div>
              <div className="text-gray-500">HSN: {product.hsn?.hsn_code}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Category: {product.level1_category?.name}
              </div>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                  ${
                    product.status?.lookup_code === "ACTIVE"
                      ? "bg-green-50 text-green-700"
                      : product.status?.lookup_code === "IN_ACTIVE"
                      ? "bg-red-50 text-red-700"
                      : "bg-gray-50 text-gray-700"
                  }`}
              >
                {product.status?.display_name}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <div className="text-xs text-gray-500">MRP</div>
                <div className="font-medium">₹{product.mrp}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Selling Price</div>
                <div className="font-medium">₹{product.sales_price}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-500">
                Variants: {product.variants?.length || 0}
              </div>
              <div className="text-gray-500">
                Stock: {product.inventory_arr?.reduce((sum, inv) => sum + (inv.quantity || 0), 0) || 0}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Update the ProductTable component
const ProductTable: React.FC<{ data: Product[] }> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const productsMetaData = useSelector((state: RootState) => state.data.products.meta);
  const selectedProduct = useSelector((state: RootState) => state.data.selectedProduct);
  
  const handleViewProduct = async (product: Product) => {
    try {
      await dispatch(getProductById(product.id));
      // Navigate to view product page or open modal
      // For example:
      navigate(`/dashboard/products/view/${product.id}`);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  const handleStatusToggle = async (product: Product) => {
    try {
    console.log("Toggle status for product:", product);
      const newStatusId = product.status?.lookup_code === "ACTIVE" ? 34 : 33;
      
      const payload = {
        sku_id: product.sku_id,
        status_id: newStatusId,
     
      };

      console.log('Updating product status with payload:', payload);
      
      const response = await dispatch(saveBasicDetails(payload));
      console.log('Status update response:', response);
      
      // Refresh the products list after status update
      await dispatch(getProducts({ page_no: 1, per_page: 10 }));
      
      toast.success("Product status updated successfully");
    } catch (error) {
      console.error("Failed to update product status:", error);
      toast.error("Failed to update product status");
    }
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
      id: "created_at",
      key: "createdAt",
      label: "Created At",
      type: "date",
      minWidth: 120,
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
      meta_data={productsMetaData || {
        total_rows: 0,
        page_no: 1,
        per_page: 10,
        totalPages: 0,
      }}
      setParams={(params) => {
        dispatch(getProducts({ 
          page_no: params.page_no  , 
          per_page: params.per_page  
        }));
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
  const productCounts = useSelector((state: RootState) => state.data.productCounts?.data);
  const companyDropdown = useSelector((state: RootState) => state.data.companyDropdown);
  const branchDropdown = useSelector((state: RootState) => state.data.branchDropdown);
  const partnerDropdown = useSelector((state: RootState) => state.data.partnerDropdown);
  const sellerDropdown = useSelector((state: RootState) => state.data.sellerDropdown);
  const [filters, setFilters] = useState({
    parent_company_id: '',
    company_branch_id: '',
    partner_id: '',
    seller_id: '',
    search: ''
  });

  // Fetch products and counts when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let params: any = {
          page_no: 1,
          per_page: 10,
          ...filters // Include any existing filters
        };

        // Add status parameter based on active tab
        switch (activeTab) {
          case "Active":
            params.status = "ACTIVE";
            break;
          case "Inactive":
            params.status = "IN_ACTIVE";
            break;
          case "Draft":
            params.status = "DRAFT";
            break;
          // "All Products" tab doesn't need a status parameter
          default:
            break;
        }

        await dispatch(getProducts(params));
        await dispatch(getProductCounts());
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (["All Products", "Active", "Inactive", "Draft"].includes(activeTab)) {
      fetchProducts();
    }
  }, [dispatch, activeTab, filters]);

  // Load dropdowns on component mount
  useEffect(() => {
    dispatch(getCompanyDropdown());
  }, [dispatch]);

  // Load branch dropdown when company changes
  useEffect(() => {
    if (filters.parent_company_id) {
      dispatch(getBranchDropdown(Number(filters.parent_company_id)));
    }
  }, [dispatch, filters.parent_company_id]);

  // Load partner dropdown when branch changes
  useEffect(() => {
    if (filters.company_branch_id) {
      dispatch(getPartnerDropdown(Number(filters.company_branch_id)));
    }
  }, [dispatch, filters.company_branch_id]);

  // Load seller dropdown
  useEffect(() => {
    dispatch(getSellerDropdown());
  }, [dispatch]);

  // Handle filter changes
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [field]: value
      };

      // Clear dependent fields
      if (field === 'parent_company_id') {
        newFilters.company_branch_id = '';
        newFilters.partner_id = '';
      } else if (field === 'company_branch_id') {
        newFilters.partner_id = '';
      }

      // Fetch products with new filters
      dispatch(getProducts({ 
        page_no: 1,
        per_page: 10,
        ...newFilters
      }));

      return newFilters;
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      parent_company_id: '',
      company_branch_id: '',
      partner_id: '',
      seller_id: '',
      search: ''
    });
    
    dispatch(getProducts({ 
      page_no: 1,
      per_page: 10
    }));
  };

  // Update the tabs with counts from API
  const updatedTabs = tabs.map((tab) => {
    switch (tab.status) {
      case "ACTIVE":
        return { ...tab, count: productCounts?.active || 0 };
      case "IN_ACTIVE":
        return { ...tab, count: productCounts?.inactive || 0 };
      case "DRAFT":
        return { ...tab, count: productCounts?.draft || 0 };
      default:
        return tab;
    }
  });

  // Get filtered data from Redux store
  const getFilteredData = () => {
    return productsData.data || [];
  };

  // Update the renderFiltersAndActions function
  const renderFiltersAndActions = () => {
    if (["All Products", "Active", "Inactive", "Draft"].includes(activeTab)) {
      return (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter size={18} />
                Filters
              </button>
              <button
                id="add-product-button-products"
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>
          </div>

          {/* Search and Filters Section */}
          <div className="bg-white p-4 border-t border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div>
              <input
                type="text"
                  placeholder="Search by Product Name/SKU"
                  className="w-full border rounded-md px-3 py-2"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Company Dropdown */}
              <div>
            <select
                  className="w-full border rounded-md px-3 py-2 bg-white text-gray-700"
              value={filters.parent_company_id}
              onChange={(e) => handleFilterChange('parent_company_id', e.target.value)}
            >
                  <option value="" className="text-gray-500">Select Company</option>
                  {companyDropdown.data.map((company: any) => (
                    <option 
                      key={company.id} 
                      value={company.id}
                      className="text-gray-700"
                    >
                  {company.name}
                </option>
              ))}
            </select>
              </div>

            {/* Branch Dropdown */}
              <div>
            <select
                  className="w-full border rounded-md px-3 py-2 bg-white text-gray-700"
              value={filters.company_branch_id}
              onChange={(e) => handleFilterChange('company_branch_id', e.target.value)}
              disabled={!filters.parent_company_id}
            >
                  <option value="" className="text-gray-500">Select Branch</option>
                  {branchDropdown.data.map((branch: any) => (
                    <option 
                      key={branch.id} 
                      value={branch.id}
                      className="text-gray-700"
                    >
                  {branch.name}
                </option>
              ))}
            </select>
              </div>

            {/* Partner Dropdown */}
              <div>
            <select
                  className="w-full border rounded-md px-3 py-2 bg-white text-gray-700"
              value={filters.partner_id}
              onChange={(e) => handleFilterChange('partner_id', e.target.value)}
              disabled={!filters.company_branch_id}
            >
                  <option value="" className="text-gray-500">Select Partner</option>
                  {partnerDropdown.data?.map((partner: any) => (
                    <option 
                      key={partner.id} 
                      value={partner.id}
                      className="text-gray-700"
                    >
                  {partner.name}
                </option>
              ))}
            </select>
              </div>

            {/* Seller Dropdown */}
              <div>
            <select
                  className="w-full border rounded-md px-3 py-2 bg-white text-gray-700"
              value={filters.seller_id}
              onChange={(e) => handleFilterChange('seller_id', e.target.value)}
            >
                  <option value="" className="text-gray-500">Select Seller</option>
                  {sellerDropdown.data.map((seller: any) => (
                    <option 
                      key={seller.id} 
                      value={seller.id}
                      className="text-gray-700"
                    >
                  {seller.name}
                </option>
              ))}
            </select>
              </div>

            {/* Clear Filters Button */}
              <div>
            <button
              onClick={handleClearFilters}
                  className="w-full px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md border border-gray-300"
            >
              Clear Filters
            </button>
              </div>
          </div>

            {/* View Mode Toggles */}
            <div className="flex justify-end gap-2">
            <button
              onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-primary-100 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50"
              }`}
            >
                <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode("table")}
                className={`p-2 rounded ${
                viewMode === "table"
                  ? "bg-primary-100 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Table size={20} />
            </button>
          </div>
        </div>
        </>
      );
    }
    return null;
  };

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
              <ProductTable 
                data={getFilteredData()} 
              />
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
              id="close-add-product-modal"
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
              id="manual-upload-button-add-product"
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
              id="bulk-upload-button-add-product"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Products Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-blue-700 font-medium">
              Total Products
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              ALL
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-700">
                {(productCounts?.draft || 0) +
                  (productCounts?.active || 0) +
                    (productCounts?.inactive || 0)}
              </span>
              <span className="text-sm text-gray-500 ml-2">total products</span>
            </div>
          </div>
        </div>

        {/* Active Products Card */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-green-700 font-medium">
              Active Products
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200">
              ACTIVE
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-green-700">
                {productCounts?.active || 0}
              </span>
              <span className="text-sm text-gray-500 ml-2">products</span>
            </div>
          </div>
        </div>

        {/* Inactive Products Card */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-yellow-700 font-medium">
              Inactive Products
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
              INACTIVE
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-yellow-700">
                {productCounts?.inactive || 0}
              </span>
              <span className="text-sm text-gray-500 ml-2">products</span>
            </div>
          </div>
        </div>

        {/* Draft Products Card */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-red-700 font-medium">
              Draft Products
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
              DRAFT
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-red-700">
                {productCounts?.draft || 0}
              </span>
              <span className="text-sm text-gray-500 ml-2">products</span>
            </div>
          </div>
        </div>
      </div>
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
