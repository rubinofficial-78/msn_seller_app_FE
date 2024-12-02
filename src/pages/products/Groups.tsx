import React, { useState } from "react";
import { Eye, Edit, Plus } from "lucide-react";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";

interface Group {
  id: string | number;
  groupName: string;
  groupCode: string;
  groupDescription: string;
  quantity: number;
  levelName: string;
  status: string;
}

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
  // ... other group data
];

const Groups = () => {
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: groupData.length,
  });

  const handleViewGroup = (group: Group) => {
    console.log("View group:", group);
  };

  const handleEditGroup = (group: Group) => {
    console.log("Edit group:", group);
  };

  const groupTableColumns = [
    // ... your existing group columns
  ];

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
          {/* Search input */}
        </div>
        <button
          onClick={() => navigate("/dashboard/products/add-group")}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg"
        >
          <Plus size={16} />
          <span>ADD GROUP</span>
        </button>
      </div>
      <CustomTable
        headCells={groupTableColumns}
        data={groupData}
        pagination={true}
        meta_data={{
          total_rows: groupData.length,
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          totalPages: Math.ceil(groupData.length / paginationState.per_page),
        }}
        setParams={handlePaginationChange}
      />
    </div>
  );
};

export default Groups; 