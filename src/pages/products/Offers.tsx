import React, { useState } from "react";
import { Eye, Edit, Plus, Search } from "lucide-react";
import CustomTable, { Column } from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";

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

const offerData: Offer[] = [
  {
    id: 1,
    offerName: "Summer Special",
    couponCode: "SUMMER2024",
    offerDescription: "Get 20% off on all summer items",
    offerType: "Percentage",
    fromDate: "2024-03-01",
    toDate: "2024-05-31",
    status: "ACTIVE",
  },
  {
    id: 2,
    offerName: "Welcome Discount",
    couponCode: "WELCOME50",
    offerDescription: "Flat ₹50 off on your first order",
    offerType: "Fixed Amount",
    fromDate: "2024-01-01",
    toDate: "2024-12-31",
    status: "ACTIVE",
  },
];

const Offers = () => {
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
    total_rows: offerData.length,
  });

  const handleViewOffer = (offer: Offer) => {
    console.log("View offer:", offer);
  };

  const handleEditOffer = (offer: Offer) => {
    navigate(`/dashboard/products/edit-offer/${offer.id}`);
  };

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
      label: "Offer Description",
      minWidth: 200,
    },
    {
      id: "offerType",
      key: "offerType",
      label: "Offer Type",
      minWidth: 120,
    },
    {
      id: "dateRange",
      key: ["fromDate", "toDate"],
      label: "Valid Period",
      minWidth: 180,
      type: "custom",
      renderCell: (row: Offer) => (
        <span>
          {new Date(row.fromDate).toLocaleDateString()} -{" "}
          {new Date(row.toDate).toLocaleDateString()}
        </span>
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
      renderCell: (row: Offer) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEditOffer(row)}
            className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleViewOffer(row)}
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
            placeholder="Search Offers"
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={() => navigate("/dashboard/products/create-offer")}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus size={16} />
          <span>CREATE OFFER</span>
        </button>
      </div>
      <CustomTable
        headCells={offerTableColumns}
        data={offerData}
        pagination={true}
        meta_data={{
          total_rows: offerData.length,
          page_no: paginationState.page_no,
          per_page: paginationState.per_page,
          totalPages: Math.ceil(offerData.length / paginationState.per_page),
        }}
        setParams={handlePaginationChange}
      />
    </div>
  );
};

export default Offers;