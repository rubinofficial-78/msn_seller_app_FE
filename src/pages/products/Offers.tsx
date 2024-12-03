import React, { useState, useEffect } from "react";
import { Eye, Edit, Plus, Search } from "lucide-react";
import CustomTable, { Column } from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/types";
import { toast } from "react-hot-toast";

interface Offer {
  id: number;
  name: string;
  code: string;
  description: string;
  start_date: string;
  end_date: string;
  offer_type: {
    display_name: string;
    // lookup_code: string;
  };
  discount_amount: number;
  discount_percentage: number;
  is_active: boolean;
}

const Offers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: offers,
    loading,
    error,
    meta,
  } = useSelector((state: RootState) => {
    const offersState = state.data.offers;
    console.log("Current offers state:", offersState);
    return offersState;
  });
  const [paginationState, setPaginationState] = useState({
    page_no: 1,
    per_page: 10,
  });

  useEffect(() => {
    console.log("Effect triggered with paginationState:", paginationState);
    fetchOffers();
  }, [paginationState]);

  const fetchOffers = async () => {
    try {
      console.log("Fetching offers with params:", paginationState);
      const response = await dispatch(getOffers(paginationState));
      console.log("Offers API Response:", response);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      toast.error("Failed to fetch offers");
    }
  };

  const handleViewOffer = (offer: Offer) => {
    console.log("View offer:", offer);
  };

  const handleEditOffer = (offer: Offer) => {
    navigate(`/dashboard/products/edit-offer/${offer.id}`);
  };

  const offerTableColumns: Column[] = [
    {
      id: "name",
      key: "name",
      label: "Offer Name",
      minWidth: 160,
    },
    {
      id: "code",
      key: "code",
      label: "Coupon Code",
      minWidth: 140,
    },
    {
      id: "description",
      key: "description",
      label: "Offer Description",
      minWidth: 200,
    },
    {
      id: "offerType",
      key: "offer_type.display_name",
      label: "Offer Type",
      minWidth: 120,
    },
    {
      id: "value",
      key: "value",
      label: "Value",
      type: "custom",
      minWidth: 100,
      // renderCell: (row: Offer) => {
      //   if (row.offer_type.lookup_code === "Disc_Pct") {
      //     return <span>{row.discount_percentage}%</span>;
      //   } else {
      //     return <span>₹{row.discount_amount}</span>;
      //   }
      // },
    },
    {
      id: "dateRange",
      key: ["start_date", "end_date"],
      label: "Valid Period",
      minWidth: 180,
      type: "custom",
      renderCell: (row: Offer) => (
        <span>
          {new Date(row.start_date).toLocaleDateString()} -{" "}
          {new Date(row.end_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "status",
      key: "is_active",
      label: "Status",
      type: "custom",
      minWidth: 120,
      renderCell: (row: Offer) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.is_active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.is_active ? "Active" : "Inactive"}
        </span>
      ),
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

  console.log("Rendering with offers:", offers);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        data={offers}
        pagination={true}
        meta_data={
          meta || {
            total_rows: 0,
            page_no: paginationState.page_no,
            per_page: paginationState.per_page,
            totalPages: 0,
          }
        }
        setParams={handlePaginationChange}
      />
    </div>
  );
};

export default Offers;
