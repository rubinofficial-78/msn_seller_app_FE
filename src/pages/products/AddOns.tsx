import React, { useState } from "react";
import { Eye, Edit, Plus, Search } from "lucide-react";
import CustomTable, { Column } from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";

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

const addOnData: AddOn[] = [
  {
    id: 1,
    name: "Extra Cheese",
    groupName: "Toppings",
    type: "Veg",
    availableQuantity: 100,
    maximumQuantity: 2,
    costPerAddOn: 30,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Chicken Pepperoni",
    groupName: "Toppings",
    type: "Non-Veg",
    availableQuantity: 50,
    maximumQuantity: 2,
    costPerAddOn: 60,
    status: "ACTIVE",
  },
];

const AddOns = () => {
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: addOnData.length,
  });

  const handleViewAddOn = (addOn: AddOn) => {
    console.log("View add-on:", addOn);
  };

  const handleEditAddOn = (addOn: AddOn) => {
    navigate(`/dashboard/products/edit-addon/${addOn.id}`);
  };

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
      type: "custom",
      renderCell: (row: AddOn) => (
        <span
          className={`px-2 py-1 text-sm rounded-full ${
            row.type === "Veg"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.type}
        </span>
      ),
    },
    {
      id: "availableQuantity",
      key: "availableQuantity",
      label: "Available Quantity",
      minWidth: 140,
      type: "number",
    },
    {
      id: "maximumQuantity",
      key: "maximumQuantity",
      label: "Maximum Quantity",
      minWidth: 140,
      type: "number",
    },
    {
      id: "costPerAddOn",
      key: "costPerAddOn",
      label: "Cost per Add On",
      minWidth: 160,
      type: "amount",
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
      type: "custom",
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
            placeholder="Search Add-ons"
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={() => navigate("/dashboard/products/add-addon")}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus size={16} />
          <span>ADD ADD-ON</span>
        </button>
      </div>
      <CustomTable
        headCells={addOnTableColumns}
        data={addOnData}
        pagination={true}
        meta_data={{
          total_rows: addOnData.length,
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          totalPages: Math.ceil(addOnData.length / paginationState.per_page),
        }}
        setParams={handlePaginationChange}
      />
    </div>
  );
};

export default AddOns;