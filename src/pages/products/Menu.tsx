import React, { useState } from "react";
import { Eye, Edit, Plus, Search } from "lucide-react";
import CustomTable, { Column } from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";

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

const MenuComponent = () => {
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: menuData.length,
  });

  const handleViewMenu = (menu: Menu) => {
    console.log("View menu:", menu);
  };

  const handleEditMenu = (menu: Menu) => {
    navigate(`/dashboard/products/edit-menu/${menu.id}`);
  };

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
      type: "custom",
      renderCell: (row: Menu) => (
        <span>{`${row.startDay} - ${row.endDay}`}</span>
      ),
    },
    {
      id: "timeRange",
      key: ["startTime", "endTime"],
      label: "Start & End Time",
      minWidth: 180,
      type: "custom",
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
      label: "Actions",
      type: "custom",
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
            placeholder="Search Menu"
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={() => navigate("/dashboard/products/add-menu")}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus size={16} />
          <span>ADD MENU</span>
        </button>
      </div>
      <CustomTable
        headCells={menuTableColumns}
        data={menuData}
        pagination={true}
        meta_data={{
          total_rows: menuData.length,
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          totalPages: Math.ceil(menuData.length / paginationState.per_page),
        }}
        setParams={handlePaginationChange}
      />
    </div>
  );
};

export default MenuComponent; 