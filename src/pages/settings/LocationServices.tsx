import React, { useState } from "react";
import {
  ArrowLeft,
  Eye,
  Edit,
  LayoutGrid,
  List,
  ToggleLeft,
  ToggleRight,
  X,
  Save,
  Copy,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomTable, { Column } from "../../components/CustomTable";

type TabType = "stores" | "shipping";
type ViewType = "table" | "grid";

interface Region {
  zone: string;
  states: { name: string; checked: boolean }[];
}

interface ShippingDetail {
  regions: string[];
  shippingType: string;
  category: string;
  deliveryType: string;
  preferences: string;
  transitTime: string;
  shippingFee: string;
}

const shippingData = [
  {
    id: 1,
    storeName: "Delhi house",
    address: "sarojini nagar main building",
    createdDate: "24/10/2024, 03:31 PM",
    shippingDistance: "Pan India",
    domain: "Electronics",
    city: "New Delhi",
    pincode: "110023",
    status: "Active",
  },
  {
    id: 2,
    storeName: "Mumbai Store",
    address: "Andheri West Main Road",
    createdDate: "23/10/2024, 02:15 PM",
    shippingDistance: "Zone",
    domain: "Fashion",
    city: "Mumbai",
    pincode: "400053",
    status: "Active",
  },
  {
    id: 3,
    storeName: "Bangalore Hub",
    address: "Koramangala 4th Block",
    createdDate: "22/10/2024, 11:45 AM",
    shippingDistance: "Pan India",
    domain: "Beauty & Personal Care",
    city: "Bangalore",
    pincode: "560034",
    status: "Active",
  },
  {
    id: 4,
    storeName: "Chennai Center",
    address: "T Nagar Shopping District",
    createdDate: "21/10/2024, 04:20 PM",
    shippingDistance: "Zone",
    domain: "Home and Decor",
    city: "Chennai",
    pincode: "600017",
    status: "Active",
  },
  {
    id: 5,
    storeName: "Kolkata Store",
    address: "Park Street Area",
    createdDate: "20/10/2024, 01:30 PM",
    shippingDistance: "Pan India",
    domain: "Grocery",
    city: "Kolkata",
    pincode: "700016",
    status: "Active",
  },
  {
    id: 6,
    storeName: "Hyderabad Branch",
    address: "Hitech City Main Road",
    createdDate: "19/10/2024, 10:00 AM",
    shippingDistance: "Zone",
    domain: "Electronics",
    city: "Hyderabad",
    pincode: "500081",
    status: "Active",
  },
];

const regions: Region[] = [
  {
    zone: "North",
    states: [
      { name: "Jammu and Kashmir", checked: false },
      { name: "Himachal Pradesh", checked: false },
      { name: "Punjab", checked: false },
      { name: "Uttarakhand", checked: false },
      { name: "Haryana", checked: false },
      { name: "Delhi", checked: false },
      { name: "Rajasthan", checked: false },
    ],
  },
  {
    zone: "South",
    states: [
      { name: "Kerala", checked: false },
      { name: "Tamil Nadu", checked: false },
      { name: "Karnataka", checked: false },
      { name: "Andhra Pradesh", checked: false },
      { name: "Telangana", checked: false },
    ],
  },
  {
    zone: "East",
    states: [
      { name: "West Bengal", checked: false },
      { name: "Bihar", checked: false },
      { name: "Odisha", checked: false },
      { name: "Jharkhand", checked: false },
    ],
  },
  {
    zone: "West",
    states: [
      { name: "Gujarat", checked: false },
      { name: "Maharashtra", checked: false },
      { name: "Goa", checked: false },
    ],
  },
  {
    zone: "North East",
    states: [
      { name: "Assam", checked: false },
      { name: "Sikkim", checked: false },
      { name: "Nagaland", checked: false },
      { name: "Meghalaya", checked: false },
      { name: "Manipur", checked: false },
      { name: "Mizoram", checked: false },
      { name: "Arunachal Pradesh", checked: false },
      { name: "Tripura", checked: false },
    ],
  },
  {
    zone: "Union Territories",
    states: [
      { name: "Andaman and Nicobar Islands", checked: false },
      { name: "Chandigarh", checked: false },
      { name: "Dadra and Nagar Haveli", checked: false },
      { name: "Daman and Diu", checked: false },
      { name: "Lakshadweep", checked: false },
      { name: "Puducherry", checked: false },
    ],
  },
];

// Add new interface for the shipping details form
interface ShippingDetailsForm {
  store: string;
  domain: string;
  shippingDistance: string;
  regions: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
  shippingType: string;
  category: string;
  deliveryType: string;
  preferences: string;
  transitTime: string;
  shippingFee: string;
}

const LocationServices = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("stores");
  const [viewType, setViewType] = useState<ViewType>("table");
  const [showShippingDetails, setShowShippingDetails] = useState(false);

  const ActionButtons = ({
    status,
    onView,
  }: {
    status: string;
    onView: () => void;
  }) => {
    const [isActive, setIsActive] = useState(status === "Active");

    const handleToggle = () => {
      setIsActive(!isActive);
    };

    return (
      <div className="flex gap-2">
        <button
          id="view-details-button"
          className="p-1 text-gray-600 hover:text-gray-800"
          title="View Details"
          onClick={onView}
        >
          <Eye id="view-details-icon" size={18} />
        </button>
        <button
          id="edit-button"
          className="p-1 text-gray-600 hover:text-gray-800"
          title="Edit"
          onClick={() => console.log("Edit clicked")}
        >
          <Edit id="edit-icon" size={18} />
        </button>
        <button
          className={`p-1 ${
            isActive
              ? "text-green-600 hover:text-green-800"
              : "text-gray-400 hover:text-gray-600"
          }`}
          title={isActive ? "Deactivate" : "Activate"}
          onClick={handleToggle}
        >
          {isActive ? <ToggleRight id="toggle-right-icon" size={18} /> : <ToggleLeft id="toggle-left-icon" size={18} />}
        </button>
      </div>
    );
  };

  const StoresTab = () => (
    <>
      {/* Add Store Button and Search */}
      <div className="flex justify-between items-center mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          id="add-new-store-button"
        >
          ADD NEW STORE
        </button>
        <div className="relative">
          <input
            id="search-store-input"
            type="text"
            placeholder="Search Store Name"
            className="border border-gray-300 rounded-lg px-4 py-2 w-64"
          />
        </div>
      </div>

      {/* Store List Table */}
      <CustomTable
        headCells={storeColumns}
        data={[
          {
            storeName: "Delhi house",
            address: "sarojini nagar main building",
            createdDate: "24/09/2024, 01:06 PM",
            city: "New Delhi",
            pincode: "110023",
            status: "Active",
          },
        ]}
        pagination={true}
      />
    </>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shippingData.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {item.storeName}
            </h3>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              {item.status}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Address:</span> {item.address}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Domain:</span> {item.domain}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Shipping:</span>{" "}
              {item.shippingDistance}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span> {item.city},{" "}
              {item.pincode}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Created:</span> {item.createdDate}
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <ActionButtons
              status={item.status}
              onView={() => navigate(`/dashboard/settings/location-services/shipping-details/${item.id}`)}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Store Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Shipping Distance
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Domain
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pincode
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {shippingData.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.storeName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.createdDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.shippingDistance}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.domain}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.city}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.pincode}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ActionButtons
                  status={item.status}
                  onView={() => navigate(`/dashboard/settings/location-services/shipping-details/${item.id}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ShippingTab = () => (
    <>
      {/* Filter and View Toggle Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="w-64">
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Filter by Store</option>
              {shippingData.map((item) => (
                <option key={item.id} value={item.storeName}>
                  {item.storeName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-64">
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Filter by Domain</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="grocery">Grocery</option>
              <option value="beauty">Beauty & Personal Care</option>
              <option value="home">Home and Decor</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType("table")}
            className={`p-2 rounded ${
              viewType === "table"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Table View"
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded ${
              viewType === "grid"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Grid View"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      {/* Content based on view type */}
      {viewType === "table" ? (
        <CustomTable
          headCells={shippingColumns}
          data={shippingData}
          pagination={true}
        />
      ) : (
        <GridView />
      )}
    </>
  );

  // Add form field options
  const options = {
    shippingType: ["ONDC Logistics", "Own Shipping"],
    category: [
      "F&B",
      "Fashion",
      "Electronics",
      "Beauty & Personal Care",
      "Home & Decor",
    ],
    deliveryType: ["Standard", "Express", "Same Day"],
    preferences: ["Fast", "Cheap", "Balanced"],
  };

  // Create columns for the regions table
  const regionTableColumns = [
    {
      id: "regions",
      key: "regions",
      label: "Regions",
      type: "checkboxGroup",
    },
    {
      id: "shippingType",
      key: "shippingType",
      label: "Shipping Type",
      type: "select",
      options: options.shippingType,
    },
    {
      id: "category",
      key: "category",
      label: "Category",
      type: "select",
      options: options.category,
    },
    {
      id: "deliveryType",
      key: "deliveryType",
      label: "Delivery Type",
      type: "select",
      options: options.deliveryType,
    },
    {
      id: "preferences",
      key: "preferences",
      label: "Preferences",
      type: "select",
      options: options.preferences,
    },
    {
      id: "transitTime",
      key: "transitTime",
      label: "Transit Time",
      type: "text",
    },
    {
      id: "shippingFee",
      key: "shippingFee",
      label: "Shipping Fee",
      type: "number",
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      type: "actions",
    },
  ];

  // Add RegionActions component
  const RegionActions = ({
    regionZone,
    onSave,
    onDuplicate,
    onDelete,
  }: {
    regionZone: string;
    onSave: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
  }) => (
    <div className="flex gap-2">
      <button
        onClick={onSave}
        className="p-1 text-blue-600 hover:text-blue-800"
        title="Save"
      >
        <Save size={18} />
      </button>
      <button
        onClick={onDuplicate}
        className="p-1 text-gray-600 hover:text-gray-800"
        title="Duplicate"
      >
        <Copy size={18} />
      </button>
      <button
        onClick={onDelete}
        className="p-1 text-red-600 hover:text-red-800"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );

  // Update ShippingDetailsView component
  const ShippingDetailsView = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState<ShippingDetailsForm>({
      store: "Delhi house",
      domain: "Electronics",
      shippingDistance: "Pan India",
      regions: {},
      shippingType: "",
      category: "",
      deliveryType: "",
      preferences: "",
      transitTime: "",
      shippingFee: "",
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-[95%] max-w-7xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Shipping Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.store}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domain
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.domain}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Distance
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={formData.shippingDistance}
                disabled
              />
            </div>
          </div>

          {/* Regions and Configuration Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  {regionTableColumns.map((column) => (
                    <th
                      key={column.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {regions.map((region) => (
                  <tr key={region.zone}>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="font-medium">{region.zone}</div>
                        {region.states.map((state) => (
                          <label
                            key={state.name}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={
                                formData.regions[region.zone]?.[state.name] ||
                                false
                              }
                              onChange={(e) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  regions: {
                                    ...prev.regions,
                                    [region.zone]: {
                                      ...prev.regions[region.zone],
                                      [state.name]: e.target.checked,
                                    },
                                  },
                                }));
                              }}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{state.name}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                    {regionTableColumns.slice(1, -1).map((column) => (
                      <td key={column.id} className="px-6 py-4">
                        {column.type === "select" ? (
                          <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            value={
                              formData[
                                column.key as keyof ShippingDetailsForm
                              ] as string
                            }
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                [column.key]: e.target.value,
                              }));
                            }}
                          >
                            <option value="">Select {column.label}</option>
                            {column.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={column.type}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            value={
                              formData[
                                column.key as keyof ShippingDetailsForm
                              ] as string
                            }
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                [column.key]: e.target.value,
                              }));
                            }}
                            placeholder={`Enter ${column.label}`}
                          />
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4">
                      <RegionActions
                        regionZone={region.zone}
                        onSave={() => {
                          const regionData = {
                            zone: region.zone,
                            states: formData.regions[region.zone],
                            shippingType: formData.shippingType,
                            category: formData.category,
                            deliveryType: formData.deliveryType,
                            preferences: formData.preferences,
                            transitTime: formData.transitTime,
                            shippingFee: formData.shippingFee,
                          };
                          console.log("Save configuration for", regionData);
                          // Add your save logic here
                        }}
                        onDuplicate={() => {
                          console.log(
                            "Duplicate configuration for",
                            region.zone
                          );
                          // Add your duplicate logic here
                        }}
                        onDelete={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete the configuration for ${region.zone}?`
                            )
                          ) {
                            console.log(
                              "Delete configuration for",
                              region.zone
                            );
                            // Add your delete logic here
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Only keep the cancel button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Move the column definitions inside the component to access setShowShippingDetails
  const storeColumns: Column[] = [
    {
      id: "storeName",
      key: "storeName",
      label: "Store Name",
    },
    {
      id: "address",
      key: "address",
      label: "Address",
    },
    {
      id: "createdDate",
      key: "createdDate",
      label: "Created Date & Time",
    },
    {
      id: "city",
      key: "city",
      label: "City",
    },
    {
      id: "pincode",
      key: "pincode",
      label: "Pincode",
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      type: "status",
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      type: "custom",
      buttons: [
        {
          label: "View",
          icon: "eye",
          onClick: (row: any) => navigate(`shipping-details/${row.id}`),
        },
        {
          label: "Toggle Status",
          icon: "toggle",
          onClick: (row: any) => console.log("Toggle status", row),
        },
      ],
    },
  ];

  const shippingColumns: Column[] = [
    {
      id: "storeName",
      key: "storeName",
      label: "Store Name",
    },
    {
      id: "address",
      key: "address",
      label: "Address",
    },
    {
      id: "createdDate",
      key: "createdDate",
      label: "Created Date & Time",
    },
    {
      id: "shippingDistance",
      key: "shippingDistance",
      label: "Shipping Distance",
    },
    {
      id: "domain",
      key: "domain",
      label: "Domain",
    },
    {
      id: "city",
      key: "city",
      label: "City",
    },
    {
      id: "pincode",
      key: "pincode",
      label: "Pincode",
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      type: "status",
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      type: "custom",
      buttons: [
        {
          label: "View",
          icon: "eye",
          onClick: (row: any) => navigate(`shipping-details/${row.id}`),
        },
        {
          label: "Edit",
          icon: "edit",
          onClick: (row: any) => console.log("Edit", row),
        },
        {
          label: "Toggle Status",
          icon: "toggle",
          onClick: (row: any) => console.log("Toggle status", row),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Locations & Serviceability</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("stores")}
            className={`py-2 px-1 ${
              activeTab === "stores"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } font-medium`}
          >
            Your Stores
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`py-2 px-1 ${
              activeTab === "shipping"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } font-medium`}
          >
            Shipping services
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "stores" ? <StoresTab /> : <ShippingTab />}
      </div>

      {/* Add ShippingDetailsView modal */}
      {showShippingDetails && (
        <ShippingDetailsView onClose={() => setShowShippingDetails(false)} />
      )}
    </div>
  );
};

export default LocationServices;
