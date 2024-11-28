import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  LayoutGrid,
  Table,
  X,
  Upload,
  Edit,
} from "lucide-react";
import ScrollableTabs from "../../components/ScrollableTabs";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import AddForm from "../../components/AddForm";

// Update the product data structure
interface Product {
  id: string | number;
  productName: string;
  productDescription: string;
  skuHsnCode: string;
  category: string;
  subCategory: string;
  totalVariants: number;
  mrp: number;
  sellingPrice: number;
  quantityInHand: number;
  status: string;
  sellerName: string;
  partnerName: string;
  branchName: string;
  companyName: string;
  image: string;
  name: string;
  description: string;
  skuHsn: string;
  variants: number;
}

const productData: Product[] = [
  {
    id: 1,
    productName: "Fresh Tomatoes",
    name: "Fresh Tomatoes",
    productDescription: "Fresh, ripe tomatoes from local farms",
    description: "Fresh, ripe tomatoes from local farms",
    skuHsnCode: "SKU001",
    skuHsn: "SKU001",
    category: "Vegetables",
    subCategory: "Fresh Produce",
    totalVariants: 2,
    variants: 2,
    mrp: 50.0,
    sellingPrice: 40.0,
    quantityInHand: 100,
    status: "ACTIVE",
    sellerName: "Farm Fresh Ltd",
    partnerName: "Local Farms Co",
    branchName: "Central Branch",
    companyName: "Fresh Foods Inc",
    image: "https://example.com/tomatoes.jpg",
  },
  {
    id: 2,
    productName: "Organic Potatoes",
    name: "Organic Potatoes",
    productDescription: "Organic potatoes, perfect for cooking",
    description: "Organic potatoes, perfect for cooking",
    skuHsnCode: "SKU002",
    skuHsn: "SKU002",
    category: "Vegetables",
    subCategory: "Root Vegetables",
    totalVariants: 3,
    variants: 3,
    mrp: 40.0,
    sellingPrice: 35.0,
    quantityInHand: 150,
    status: "INACTIVE",
    sellerName: "Organic Farms",
    partnerName: "Eco Produce",
    branchName: "North Branch",
    companyName: "Organic Foods Inc",
    image: "https://example.com/potatoes.jpg",
  },
  {
    id: 3,
    productName: "Premium Rice",
    name: "Premium Rice",
    productDescription: "High-quality basmati rice",
    description: "High-quality basmati rice",
    skuHsnCode: "SKU003",
    skuHsn: "SKU003",
    category: "Grains",
    subCategory: "Rice",
    totalVariants: 1,
    variants: 1,
    mrp: 120.0,
    sellingPrice: 110.0,
    quantityInHand: 200,
    status: "DRAFT",
    sellerName: "Rice Traders",
    partnerName: "Grain Partners",
    branchName: "South Branch",
    companyName: "Grain Foods Inc",
    image: "https://example.com/rice.jpg",
  },
  // Add more products as needed
];

// Updated tabs with better color schemes
const tabs = [
  { label: "All Products", status: "ALL" },
  {
    label: "Active",
    status: "ACTIVE",
    count: 969,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    label: "Inactive",
    status: "INACTIVE",
    count: 88,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    label: "Draft",
    status: "DRAFT",
    count: 746,
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

// First, update the ProductGrid interface
const ProductGrid: React.FC<{ data: Product[] }> = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {data.map((product: Product) => (
      <div
        key={product.id}
        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
      >
        <div className="aspect-w-1 aspect-h-1 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">
              {product.name}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full
              ${
                product.status === "ACTIVE"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">SKU/HSN:</span>
              <span className="ml-1 text-gray-900">{product.skuHsn}</span>
            </div>
            <div>
              <span className="text-gray-500">Variants:</span>
              <span className="ml-1 text-gray-900">{product.variants}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="text-sm font-medium text-gray-900">
                ₹{product.sellingPrice}
              </p>
              {product.mrp !== product.sellingPrice && (
                <p className="text-xs text-gray-500 line-through">
                  ₹{product.mrp}
                </p>
              )}
            </div>
            <button className="text-primary-600 hover:text-primary-700">
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Add these near the top of the file where other interfaces are defined
interface PaginationParams {
  page: number;
  pageSize: number;
  totalItems?: number;
}

// Add new interface for Group data
interface Group {
  id: string | number;
  groupName: string;
  groupCode: string;
  groupDescription: string;
  quantity: number;
  levelName: string;
  status: string;
}

// Add sample group data
const groupData: Group[] = [
  {
    id: 1,
    groupName: "Premium Vegetables",
    groupCode: "PV001",
    groupDescription: "High quality organic vegetables",
    quantity: 150,
    levelName: "Level 1",
    status: "ACTIVE",
  },
  {
    id: 2,
    groupName: "Basic Groceries",
    groupCode: "BG001",
    groupDescription: "Essential grocery items",
    quantity: 200,
    levelName: "Level 2",
    status: "ACTIVE",
  },
];

// Add group table columns
const groupTableColumns = [
  {
    id: "groupName",
    key: "groupName",
    label: "Group Name",
    minWidth: 160,
  },
  {
    id: "groupCode",
    key: "groupCode",
    label: "Group Code",
    minWidth: 140,
  },
  {
    id: "groupDescription",
    key: "groupDescription",
    label: "Group Description",
    minWidth: 200,
  },
  {
    id: "quantity",
    key: "quantity",
    label: "Quantity",
    minWidth: 120,
  },
  {
    id: "levelName",
    key: "levelName",
    label: "Level Name",
    minWidth: 140,
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    type: "status",
    minWidth: 120,
  },
  {
    id: "actions",
    key: "actions",
    label: "Actions",
    type: "actions",
    minWidth: 100,
    renderCell: (row: Group) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleViewGroup(row)}
          className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
          title="View"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={() => handleEditGroup(row)}
          className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
          title="Edit"
        >
          <Edit size={16} />
        </button>
      </div>
    ),
  },
];

// Add this interface for the form data
interface GroupFormData {
  groupName: string;
  groupCode: string;
  minCustomizations: number;
  maxCustomizations: number;
  levelId: string;
  description: string;
}

// Add this interface for Add On data
interface AddOn {
  id: string | number;
  name: string;
  groupName: string;
  type: string;
  availableQuantity: number;
  maximumQuantity: number;
  costPerAddOn: number;
  status: string;
}

// Add sample add-on data
const addOnData: AddOn[] = [
  {
    id: 1,
    name: "smal size pizza",
    groupName: "Size",
    type: "Veg",
    availableQuantity: 1,
    maximumQuantity: 10,
    costPerAddOn: 0,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "dfghj",
    groupName: "dfghjk799",
    type: "Veg",
    availableQuantity: 10,
    maximumQuantity: 10,
    costPerAddOn: 2,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "MANCHURIA",
    groupName: "Test starter",
    type: "Veg",
    availableQuantity: 10,
    maximumQuantity: 10,
    costPerAddOn: 10,
    status: "ACTIVE",
  },
];

// Add add-on table columns
const addOnTableColumns = [
  {
    id: "name",
    key: "name",
    label: "Name",
    minWidth: 160,
  },
  {
    id: "groupName",
    key: "groupName",
    label: "Group Name",
    minWidth: 160,
  },
  {
    id: "type",
    key: "type",
    label: "Type",
    minWidth: 120,
  },
  {
    id: "availableQuantity",
    key: "availableQuantity",
    label: "Available Quantity",
    minWidth: 140,
  },
  {
    id: "maximumQuantity",
    key: "maximumQuantity",
    label: "Maximum Quantity",
    minWidth: 140,
  },
  {
    id: "costPerAddOn",
    key: "costPerAddOn",
    label: "Cost per Add On (Rs.)",
    type: "amount",
    minWidth: 160,
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    type: "status",
    minWidth: 120,
  },
  {
    id: "actions",
    key: "actions",
    label: "Action",
    type: "actions",
    minWidth: 100,
    renderCell: (row: AddOn) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleEditAddOn(row)}
          className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
          title="Edit"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => handleViewAddOn(row)}
          className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
          title="View"
        >
          <Eye size={16} />
        </button>
      </div>
    ),
  },
];

// Add this interface for Menu data
interface Menu {
  id: string | number;
  menuName: string;
  menuCode: string;
  menuCategory: string;
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  status: string;
}

// Add sample menu data
const menuData: Menu[] = [
  {
    id: 1,
    menuName: "Breakfast Menu",
    menuCode: "BF001",
    menuCategory: "Breakfast",
    startDay: "Monday",
    endDay: "Sunday",
    startTime: "07:00",
    endTime: "11:00",
    status: "ACTIVE",
  },
  {
    id: 2,
    menuName: "Lunch Special",
    menuCode: "LN001",
    menuCategory: "Lunch",
    startDay: "Monday",
    endDay: "Friday",
    startTime: "12:00",
    endTime: "15:00",
    status: "ACTIVE",
  },
];

// Add menu table columns
const menuTableColumns = [
  {
    id: "menuName",
    key: "menuName",
    label: "Menu Name",
    minWidth: 160,
  },
  {
    id: "menuCode",
    key: "menuCode",
    label: "Menu Code",
    minWidth: 140,
  },
  {
    id: "menuCategory",
    key: "menuCategory",
    label: "Menu Category",
    minWidth: 160,
  },
  {
    id: "dayRange",
    key: ["startDay", "endDay"],
    label: "Start & End Day",
    minWidth: 180,
    renderCell: (row: Menu) => <span>{`${row.startDay} - ${row.endDay}`}</span>,
  },
  {
    id: "timeRange",
    key: ["startTime", "endTime"],
    label: "Start & End Time",
    minWidth: 180,
    renderCell: (row: Menu) => (
      <span>{`${row.startTime} - ${row.endTime}`}</span>
    ),
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    type: "status",
    minWidth: 120,
  },
  {
    id: "actions",
    key: "actions",
    label: "Action",
    type: "actions",
    minWidth: 100,
    renderCell: (row: Menu) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleEditMenu(row)}
          className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
          title="Edit"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => handleViewMenu(row)}
          className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
          title="View"
        >
          <Eye size={16} />
        </button>
      </div>
    ),
  },
];

// Add this interface for Stock data
interface Stock {
  id: string | number;
  productName: string;
  skuId: string;
  locationName: string;
  quantityInHand: number;
  alertQuantity: number;
  status: string;
}

// Add sample stock data
const stockData: Stock[] = [
  {
    id: 1,
    productName: "shirts",
    skuId: "SHRTM28",
    locationName: "Bng Loc",
    quantityInHand: 1,
    alertQuantity: 5,
    status: "Critical",
  },
  {
    id: 2,
    productName: "Gray T-shirt",
    skuId: "7O08KC",
    locationName: "MS warehouse",
    quantityInHand: 1,
    alertQuantity: 10,
    status: "Critical",
  },
  {
    id: 3,
    productName: "t shirt",
    skuId: "UDMI98",
    locationName: "Bng Loc",
    quantityInHand: 1,
    alertQuantity: 10,
    status: "Critical",
  },
  {
    id: 4,
    productName: "shirt",
    skuId: "W27DGRHLTJNH",
    locationName: "chennai",
    quantityInHand: 5,
    alertQuantity: 45,
    status: "Critical",
  },
];

// Add stock table columns
const stockTableColumns = [
  {
    id: "productName",
    key: "productName",
    label: "Product Name",
    minWidth: 200,
    renderCell: (row: Stock) => (
      <div className="flex items-center gap-3">
        <img
          src="/placeholder-image.jpg"
          alt={row.productName}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <p className="font-medium">{row.productName}</p>
          <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
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
    align: "center",
  },
  {
    id: "alertQuantity",
    key: "alertQuantity",
    label: "Alert Quantity",
    minWidth: 140,
    align: "center",
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    minWidth: 120,
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
];

// Add Offer interface
interface Offer {
  id: string | number;
  offerName: string;
  couponCode: string;
  offerDescription: string;
  offerType: string;
  fromDate: string;
  toDate: string;
  status: string;
}

// Add sample offer data
const offerData: Offer[] = [
  {
    id: 1,
    offerName: "Summer Special",
    couponCode: "SUMMER2024",
    offerDescription: "Get 20% off on all summer items",
    offerType: "Percentage",
    fromDate: "2024-03-01",
    toDate: "2024-05-31",
    status: "Active",
  },
  {
    id: 2,
    offerName: "Welcome Discount",
    couponCode: "WELCOME50",
    offerDescription: "Flat ₹50 off on your first order",
    offerType: "Fixed Amount",
    fromDate: "2024-01-01",
    toDate: "2024-12-31",
    status: "Active",
  },
  {
    id: 3,
    offerName: "Weekend Sale",
    couponCode: "WEEKEND25",
    offerDescription: "25% off on weekends",
    offerType: "Percentage",
    fromDate: "2024-03-15",
    toDate: "2024-04-15",
    status: "Inactive",
  },
];

// Add offer table columns
const offerTableColumns = [
  {
    id: "offerName",
    key: "offerName",
    label: "Offer Name",
    minWidth: 160,
  },
  {
    id: "couponCode",
    key: "couponCode",
    label: "Coupon Code",
    minWidth: 140,
  },
  {
    id: "offerDescription",
    key: "offerDescription",
    label: "Offer Desc",
    minWidth: 200,
  },
  {
    id: "offerType",
    key: "offerType",
    label: "Offer type",
    minWidth: 120,
  },
  {
    id: "dateRange",
    key: ["fromDate", "toDate"],
    label: "From & To Date",
    minWidth: 180,
    renderCell: (row: Offer) => (
      <span>{`${new Date(row.fromDate).toLocaleDateString()} - ${new Date(
        row.toDate
      ).toLocaleDateString()}`}</span>
    ),
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    type: "status",
    minWidth: 120,
  },
  {
    id: "actions",
    key: "actions",
    label: "Action",
    type: "custom",
    minWidth: 100,
    buttons: [
      {
        label: "Edit",
        icon: "edit",
        onClick: (row: Offer) => {
          handleEditOffer(row);
        },
      },
      {
        label: "View",
        icon: "eye",
        onClick: (row: Offer) => {
          handleViewOffer(row);
        },
      },
    ],
  },
];

// Add this interface for the form data
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

const MyListing = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Separate pagination states for products and groups
  const [productPaginationState, setProductPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: productData.length,
  });

  const [groupPaginationState, setGroupPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: groupData.length,
  });

  const [addOnPaginationState, setAddOnPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: addOnData.length,
  });

  const [menuPaginationState, setMenuPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: menuData.length,
  });

  const [stockPaginationState, setStockPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: stockData.length,
  });

  // Separate handlers for product and group pagination
  const handleProductPaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    setProductPaginationState((prev) => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page,
    }));
  };

  const handleGroupPaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    setGroupPaginationState((prev) => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page,
    }));
  };

  const handleAddOnPaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    setAddOnPaginationState((prev) => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page,
    }));
  };

  const handleMenuPaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    setMenuPaginationState((prev) => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page,
    }));
  };

  const handleStockPaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    setStockPaginationState((prev) => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page,
    }));
  };

  // Move GroupTable component here
  const GroupTable: React.FC<{ data: Group[] }> = ({ data }) => (
    <div className="bg-white rounded-lg shadow">
      <CustomTable
        headCells={groupTableColumns}
        data={data}
        pagination={true}
        meta_data={{
          total_rows: groupData.length,
          page_no: groupPaginationState.page_no,
          per_page: groupPaginationState.per_page,
          totalPages: Math.ceil(
            groupData.length / groupPaginationState.per_page
          ),
        }}
        setParams={handleGroupPaginationChange}
      />
    </div>
  );

  // Update ProductTable to use productPaginationState
  const ProductTable: React.FC<{ data: Product[] }> = ({ data }) => (
    <div className="bg-white rounded-lg shadow">
      <CustomTable
        headCells={tableColumns}
        data={data}
        pagination={true}
        meta_data={{
          total_rows: productData.length,
          page_no: productPaginationState.page_no,
          per_page: productPaginationState.per_page,
          totalPages: Math.ceil(
            productData.length / productPaginationState.per_page
          ),
        }}
        setParams={handleProductPaginationChange}
      />
    </div>
  );

  // Get paginated group data
  const getPaginatedGroupData = () => {
    const startIndex =
      (groupPaginationState.page_no - 1) * groupPaginationState.per_page;
    const endIndex = startIndex + groupPaginationState.per_page;
    return groupData.slice(startIndex, endIndex);
  };

  // Update getFilteredData to use productPaginationState
  const getFilteredData = () => {
    let filteredProducts = productData;

    if (activeTab !== "All Products") {
      const status = tabs.find((tab) => tab.label === activeTab)?.status;
      if (status) {
        filteredProducts = productData.filter(
          (product) => product.status === status
        );
      }
    }

    const startIndex =
      (productPaginationState.page_no - 1) * productPaginationState.per_page;
    const endIndex = startIndex + productPaginationState.per_page;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Update tab counts
  const getTabCounts = () => {
    const counts = {
      ACTIVE: 0,
      INACTIVE: 0,
      DRAFT: 0,
    } as Record<string, number>;

    productData.forEach((product) => {
      if (counts.hasOwnProperty(product.status)) {
        counts[product.status]++;
      }
    });

    return counts;
  };

  const tabCounts = getTabCounts();

  // Update the tabs with actual counts
  const updatedTabs = tabs.map((tab) => {
    if (tab.status && tabCounts.hasOwnProperty(tab.status)) {
      return { ...tab, count: tabCounts[tab.status as keyof typeof tabCounts] };
    }
    return tab;
  });

  // Add these handler functions in the Products component
  const handleViewGroup = (group: Group) => {
    // Implement view group logic
    console.log("View group:", group);
  };

  const handleEditGroup = (group: Group) => {
    // Implement edit group logic
    console.log("Edit group:", group);
  };

  const handleEditAddOn = (addOn: AddOn) => {
    console.log("Edit add-on:", addOn);
  };

  const handleViewAddOn = (addOn: AddOn) => {
    console.log("View add-on:", addOn);
  };

  const handleEditMenu = (menu: Menu) => {
    console.log("Edit menu:", menu);
  };

  const handleViewMenu = (menu: Menu) => {
    console.log("View menu:", menu);
  };

  // Add tableColumns definition inside Products component
  const tableColumns = [
    {
      id: "productName",
      key: "productName",
      label: "Product Name",
      minWidth: 160,
    },
    {
      id: "productDescription",
      key: "productDescription",
      label: "Product Description",
      minWidth: 200,
    },
    {
      id: "skuHsnCode",
      key: "skuHsnCode",
      label: "SKU Id & HSN Code",
      minWidth: 160,
    },
    {
      id: "category",
      key: ["category", "subCategory"],
      label: "Category / Sub-category",
      join: true,
      minWidth: 200,
    },
    {
      id: "totalVariants",
      key: "totalVariants",
      label: "Total no.of.Variants",
      minWidth: 140,
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
      key: "sellingPrice",
      label: "Selling Price",
      type: "amount",
      minWidth: 120,
    },
    {
      id: "quantityInHand",
      key: "quantityInHand",
      label: "Quantity in hand",
      minWidth: 140,
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      type: "status",
      minWidth: 120,
    },
    {
      id: "sellerName",
      key: "sellerName",
      label: "Seller Name",
      minWidth: 160,
    },
    {
      id: "partnerName",
      key: "partnerName",
      label: "Partner Name",
      minWidth: 160,
    },
    {
      id: "branchName",
      key: "branchName",
      label: "Branch Name",
      minWidth: 160,
    },
    {
      id: "companyName",
      key: "companyName",
      label: "Company Name",
      minWidth: 160,
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      type: "actions",
      minWidth: 100,
      renderCell: (row: Product) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewProduct(row)}
            className="p-1 text-blue-600 hover:text-blue-700 rounded-full hover:bg-blue-50"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleEditProduct(row)}
            className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
            title="Edit"
          >
            <Edit size={16} />
          </button>
        </div>
      ),
    },
  ];

  // Add these handler functions
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditProduct = (product: Product) => {
    navigate(`/dashboard/products/edit/${product.id}`);
  };

  const handleManualUpload = () => {
    setShowAddModal(false);
    navigate("/dashboard/products/add-product");
  };

  const handleBulkUpload = () => {
    setShowAddModal(false);
    navigate("/dashboard/products/bulk-upload");
  };

  // Add this helper function in the Products component
  const renderFiltersAndActions = () => {
    // For product-related tabs (All Products, Active, Inactive, Draft)
    if (["All Products", "Active", "Inactive", "Draft"].includes(activeTab)) {
      return (
        <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Product Name"
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {/* Filters */}
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Select Company</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Select Branch</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Select Partner</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Select Seller</option>
            </select>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-primary-100 text-primary-600"
                  : "text-gray-600"
              }`}
              title="Grid view"
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
              title="Table view"
            >
              <Table size={18} />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
            >
              <Plus size={16} />
              <span>ADD PRODUCT</span>
            </button>
          </div>
        </div>
      );
    }

    // For My Groups tab
    if (activeTab === "My Groups") {
      return (
        <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Group Name"
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="">Select Level</option>
            </select>
          </div>
          <button
            onClick={() => navigate("/dashboard/products/add-group")}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
          >
            <Plus size={16} />
            <span>ADD GROUP</span>
          </button>
        </div>
      );
    }

    // For Add Ons tab
    if (activeTab === "Add Ons") {
      return (
        <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Add On"
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard/products/add-addon")}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
          >
            <Plus size={16} />
            <span>ADD ADD-ON</span>
          </button>
        </div>
      );
    }

    // For My Menu tab
    if (activeTab === "My Menu") {
      return (
        <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search Menu"
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard/products/add-menu")}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
          >
            <Plus size={16} />
            <span>ADD MENU</span>
          </button>
        </div>
      );
    }

    // Default return for other tabs
    return (
      <div className="flex flex-wrap gap-3 items-center justify-between p-4 border-b border-gray-200">
        <div className="relative flex-1 max-w-xs">
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
    );
  };

  // Add this to the Products component
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupFormData, setGroupFormData] = useState<GroupFormData>({
    groupName: "",
    groupCode: "",
    minCustomizations: 0,
    maxCustomizations: 1,
    levelId: "",
    description: "",
  });

  // Add these handler functions
  const handleGroupInputChange = (key: string, value: any) => {
    setGroupFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveGroup = () => {
    console.log("Saving group:", groupFormData);
    setShowGroupModal(false);
  };

  // Add AddOnTable component
  const AddOnTable: React.FC<{ data: AddOn[] }> = ({ data }) => (
    <div className="bg-white rounded-lg shadow">
      <CustomTable
        headCells={addOnTableColumns}
        data={data}
        pagination={true}
        meta_data={{
          total_rows: addOnData.length,
          page_no: addOnPaginationState.page_no,
          per_page: addOnPaginationState.per_page,
          totalPages: Math.ceil(
            addOnData.length / addOnPaginationState.per_page
          ),
        }}
        setParams={handleAddOnPaginationChange}
      />
    </div>
  );

  // Get paginated add-on data
  const getPaginatedAddOnData = () => {
    const startIndex =
      (addOnPaginationState.page_no - 1) * addOnPaginationState.per_page;
    const endIndex = startIndex + addOnPaginationState.per_page;
    return addOnData.slice(startIndex, endIndex);
  };

  // Add MenuTable component
  const MenuTable: React.FC<{ data: Menu[] }> = ({ data }) => (
    <div className="bg-white rounded-lg shadow">
      <CustomTable
        headCells={menuTableColumns}
        data={data}
        pagination={true}
        meta_data={{
          total_rows: menuData.length,
          page_no: menuPaginationState.page_no,
          per_page: menuPaginationState.per_page,
          totalPages: Math.ceil(menuData.length / menuPaginationState.per_page),
        }}
        setParams={handleMenuPaginationChange}
      />
    </div>
  );

  // Get paginated menu data
  const getPaginatedMenuData = () => {
    const startIndex =
      (menuPaginationState.page_no - 1) * menuPaginationState.per_page;
    const endIndex = startIndex + menuPaginationState.per_page;
    return menuData.slice(startIndex, endIndex);
  };

  // Add StockTable component
  const StockTable: React.FC<{ data: Stock[] }> = ({ data }) => (
    <div className="bg-white rounded-lg shadow">
      <CustomTable
        headCells={stockTableColumns}
        data={data}
        pagination={true}
        meta_data={{
          total_rows: stockData.length,
          page_no: stockPaginationState.page_no,
          per_page: stockPaginationState.per_page,
          totalPages: Math.ceil(
            stockData.length / stockPaginationState.per_page
          ),
        }}
        setParams={handleStockPaginationChange}
      />
    </div>
  );

  // Get paginated stock data
  const getPaginatedStockData = () => {
    const startIndex =
      (stockPaginationState.page_no - 1) * stockPaginationState.per_page;
    const endIndex = startIndex + stockPaginationState.per_page;
    return stockData.slice(startIndex, endIndex);
  };

  // Add this state for the update quantity modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [updateQuantity, setUpdateQuantity] = useState<number>(0);

  // Add this handler for updating stock
  const handleUpdateStock = (stock: Stock) => {
    setSelectedStock(stock);
    setUpdateQuantity(stock.quantityInHand);
    setShowUpdateModal(true);
  };

  // Add this handler for saving updated quantity
  const handleSaveUpdate = () => {
    if (selectedStock) {
      console.log("Updating stock:", {
        ...selectedStock,
        quantityInHand: updateQuantity,
      });
      setShowUpdateModal(false);
    }
  };

  // Add these handler functions
  const handleEditOffer = (offer: Offer) => {
    navigate(`/dashboard/products/edit-offer/${offer.id}`);
  };

  const handleViewOffer = (offer: Offer) => {
    console.log("View offer:", offer);
  };

  // Add pagination state for offers
  const [offerPaginationState, setOfferPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: offerData.length,
  });

  // Add pagination handler for offers
  const handleOfferPaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    setOfferPaginationState((prev) => ({
      ...prev,
      page_no: params.page_no || prev.page_no,
      per_page: params.per_page || prev.per_page,
    }));
  };

  // Add OfferTable component
  const OfferTable: React.FC<{ data: Offer[] }> = ({ data }) => (
    <div className="bg-white rounded-lg shadow">
      <CustomTable
        headCells={offerTableColumns}
        data={data}
        pagination={true}
        meta_data={{
          total_rows: offerData.length,
          page_no: offerPaginationState.page_no,
          per_page: offerPaginationState.per_page,
          totalPages: Math.ceil(
            offerData.length / offerPaginationState.per_page
          ),
        }}
        setParams={handleOfferPaginationChange}
      />
    </div>
  );

  // Get paginated offer data
  const getPaginatedOfferData = () => {
    const startIndex =
      (offerPaginationState.page_no - 1) * offerPaginationState.per_page;
    const endIndex = startIndex + offerPaginationState.per_page;
    return offerData.slice(startIndex, endIndex);
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Stats Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {updatedTabs.slice(1, 4).map((tab) => (
          <div
            key={tab.status}
            className={`${tab.bgColor} ${tab.borderColor} border rounded-lg p-3 transition-all hover:shadow-sm`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs ${tab.color} font-medium`}>
                {tab.label}
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab.bgColor} ${tab.color} border ${tab.borderColor}`}
              >
                {tab.status}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className={`text-lg font-bold ${tab.color}`}>
                {tab.count}
              </span>
              <span className="text-xs text-gray-500 ml-1">products</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs and Filters in White Card */}
      <div className="bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="border-b border-gray-200 px-4">
          <ScrollableTabs
            tabs={updatedTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Render filters and actions based on active tab */}
        {renderFiltersAndActions()}

        {/* Products Content */}
        <div className="p-4">
          {activeTab === "Stock Overview" ? (
            <StockTable data={getPaginatedStockData()} />
          ) : activeTab === "My Menu" ? (
            <MenuTable data={getPaginatedMenuData()} />
          ) : activeTab === "Add Ons" ? (
            <AddOnTable data={getPaginatedAddOnData()} />
          ) : activeTab === "My Groups" ? (
            <GroupTable data={getPaginatedGroupData()} />
          ) : activeTab === "Offers & Discounts" ? (
            <OfferTable data={getPaginatedOfferData()} />
          ) : ["All Products", "Active", "Inactive", "Draft"].includes(
              activeTab
            ) ? (
            viewMode === "grid" ? (
              <ProductGrid data={getFilteredData()} />
            ) : (
              <ProductTable data={getFilteredData()} />
            )
          ) : (
            <div className="text-center py-8 text-gray-500">
              Content for {activeTab} tab is under development
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
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
                    Add product via form. Fill all the required one by one
                    create variants.
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
      )}

      {/* View Product Modal */}
      {showViewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Product Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Product Name</label>
                <p className="font-medium">{selectedProduct.productName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">SKU/HSN Code</label>
                <p className="font-medium">{selectedProduct.skuHsnCode}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Category</label>
                <p className="font-medium">{selectedProduct.category}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Sub Category</label>
                <p className="font-medium">{selectedProduct.subCategory}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">MRP</label>
                <p className="font-medium">₹{selectedProduct.mrp}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Selling Price</label>
                <p className="font-medium">₹{selectedProduct.sellingPrice}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  Quantity in Hand
                </label>
                <p className="font-medium">{selectedProduct.quantityInHand}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <p
                  className={`font-medium ${
                    selectedProduct.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedProduct.status}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Description</label>
                <p className="font-medium">
                  {selectedProduct.productDescription}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => handleEditProduct(selectedProduct)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Edit Product
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Create My Groups
                </h2>
                <p className="text-sm text-gray-500">
                  Create your custom groups for your customers
                </p>
              </div>

              {/* Basic Information Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Basic Information
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  This information is helpful for you to track your product.
                  This information will be displayed publicly so be careful what
                  you share.
                </p>

                <AddForm
                  data={[
                    {
                      type: "text",
                      key: "groupName",
                      label: "Custom Group Name",
                      required: true,
                      value: groupFormData.groupName,
                      placeholder: "Custom Group Name",
                    },
                    {
                      type: "text",
                      key: "groupCode",
                      label: "Custom Group Code",
                      required: true,
                      value: groupFormData.groupCode,
                      placeholder: "Custom Group Code",
                    },
                    {
                      type: "number",
                      key: "minCustomizations",
                      label: "Add Minimum Customisations Allowed",
                      required: true,
                      value: groupFormData.minCustomizations,
                      endIcon: <span className="text-gray-500">Units</span>,
                    },
                    {
                      type: "number",
                      key: "maxCustomizations",
                      label: "Add Maximum Customisations Allowed",
                      required: true,
                      value: groupFormData.maxCustomizations,
                      endIcon: <span className="text-gray-500">Units</span>,
                    },
                    {
                      type: "select",
                      key: "levelId",
                      label: "Select Level Id",
                      required: true,
                      value: groupFormData.levelId,
                      options: [
                        { value: "1", label: "Level 1" },
                        { value: "2", label: "Level 2" },
                        { value: "3", label: "Level 3" },
                      ],
                      placeholder: "Select Level ID",
                    },
                    {
                      type: "textarea",
                      key: "description",
                      label: "Group Description",
                      value: groupFormData.description,
                      placeholder: "Specific long description for your menu.",
                      description: "Group description",
                    },
                  ]}
                  handleInputonChange={handleGroupInputChange}
                  handleSelectonChange={handleGroupInputChange}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSaveGroup}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Update Inventory
                </h2>
                <p className="text-sm text-gray-500">
                  Update your inventory in your Location
                </p>
              </div>

              {/* Product Info */}
              <div className="flex gap-4">
                <img
                  src="/placeholder-image.jpg"
                  alt={selectedStock.productName}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="space-y-2">
                  <h3 className="font-medium">{selectedStock.productName}</h3>
                  <p className="text-sm text-gray-500">
                    SKU ID- {selectedStock.skuId}
                  </p>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Location Name-</span> Marriott
                  Hotel Whitefield, 8th Road, EPIP Zone
                </p>
                <p className="text-sm">
                  <span className="font-medium">Bengaluru, Karnataka</span>
                </p>
                <div className="flex justify-between">
                  <p className="text-sm">
                    <span className="font-medium">City -</span> Bengaluru
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Pincode -</span> 560066
                  </p>
                </div>
              </div>

              {/* Quantity Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alert Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={selectedStock.alertQuantity}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      Unit
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Update Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={updateQuantity}
                      onChange={(e) =>
                        setUpdateQuantity(Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                      Unit
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleSaveUpdate}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListing;
