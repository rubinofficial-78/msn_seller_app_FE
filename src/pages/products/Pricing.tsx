import React, { useState } from "react";
import { Eye, Edit, Plus, Search } from "lucide-react";
import CustomTable, { Column } from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";

interface PricingRule {
  id: string | number;
  ruleName: string;
  ruleType: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  status: string;
  applicableProducts: number;
}

const pricingData: PricingRule[] = [
  {
    id: 1,
    ruleName: "Summer Sale",
    ruleType: "Seasonal",
    discountType: "Percentage",
    discountValue: 20,
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    status: "ACTIVE",
    applicableProducts: 150,
  },
  {
    id: 2,
    ruleName: "Bulk Purchase",
    ruleType: "Quantity Based",
    discountType: "Fixed Amount",
    discountValue: 500,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "ACTIVE",
    applicableProducts: 75,
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: pricingData.length,
  });

  const handleViewRule = (rule: PricingRule) => {
    console.log("View pricing rule:", rule);
  };

  const handleEditRule = (rule: PricingRule) => {
    console.log("Edit pricing rule:", rule);
  };

  const pricingTableColumns = [
    {
      id: "ruleName",
      key: "ruleName",
      label: "Rule Name",
      minWidth: 160,
    },
    {
      id: "ruleType",
      key: "ruleType",
      label: "Rule Type",
      minWidth: 140,
    },
    {
      id: "discountType",
      key: "discountType",
      label: "Discount Type",
      minWidth: 140,
    },
    {
      id: "discountValue",
      key: "discountValue",
      label: "Discount Value",
      minWidth: 120,
      type: "custom",
      renderCell: (row: PricingRule) => (
        <span>
          {row.discountType === "Percentage" ? `${row.discountValue}%` : `₹${row.discountValue}`}
        </span>
      ),
    },
    {
      id: "dateRange",
      key: ["startDate", "endDate"],
      label: "Valid Period",
      minWidth: 200,
      type: "custom",
      renderCell: (row: PricingRule) => (
        <span>
          {new Date(row.startDate).toLocaleDateString()} -{" "}
          {new Date(row.endDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "applicableProducts",
      key: "applicableProducts",
      label: "Applicable Products",
      minWidth: 140,
      type: "number",
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
      renderCell: (row: PricingRule) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditRule(row)}
            className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleViewRule(row)}
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
            placeholder="Search Pricing Rules"
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={() => navigate("/dashboard/products/create-pricing-rule")}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus size={16} />
          <span>ADD PRICING RULE</span>
        </button>
      </div>
      <CustomTable
        headCells={pricingTableColumns}
        data={pricingData}
        pagination={true}
        meta_data={{
          total_rows: pricingData.length,
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          totalPages: Math.ceil(pricingData.length / paginationState.per_page),
        }}
        setParams={handlePaginationChange}
      />
    </div>
  );
};

export default Pricing; 