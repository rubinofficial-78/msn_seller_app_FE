import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getSellerById, updateSellerStatus, updateSellerDetails, activateSeller } from "../redux/Action/action";
import { toast } from "react-toastify";
import { ArrowLeft, Check, X } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

const ViewSeller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [sellerData, setSellerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await dispatch(getSellerById(Number(id)));
        if (response?.meta?.status) {
          setSellerData(response.data);
        } else {
          toast.error("Failed to fetch seller details");
        }
      } catch (error) {
        console.error("Error fetching seller details:", error);
        toast.error("Error fetching seller details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSellerDetails();
    }
  }, [dispatch, id]);

  const getStatusButton = () => {
    const companyPaymentStatus = sellerData?.company_payment_status;
    const currentStatus = sellerData?.status?.lookup_code;

    if (companyPaymentStatus !== "Active") {
      return (
        <button
          id="activate-seller-button"
          onClick={handleActivateSeller}
          disabled={updating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            updating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Check className="h-5 w-5" />
          Activate Seller
        </button>
      );
    }

    switch (currentStatus) {
      case "APPROVED":
        return (
          <button
            id="reject-seller-button"
            onClick={() => handleStatusUpdate(97)}
            disabled={updating}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <X className="h-5 w-5" />
            Reject Seller
          </button>
        );

      case "REJECTED":
        return null;

      case "PENDING":
        return (
          <div className="flex gap-2">
            <button
              id="approve-seller-button"
              onClick={() => handleStatusUpdate(96)}
              disabled={updating}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                updating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <Check className="h-5 w-5" />
              Approve Seller
            </button>
            <button
              id="reject-seller-button"
              onClick={() => handleStatusUpdate(97)}
              disabled={updating}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                updating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <X className="h-5 w-5" />
              Reject Seller
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const handleActivateSeller = async () => {
    if (updating) return;

    setUpdating(true);
    try {
      const response = await dispatch(activateSeller(Number(id)));

      if (response?.meta?.status) {
        setSellerData({
          ...sellerData,
          company_payment_status: "Active"
        });
        toast.success("Seller activated successfully");
      } else {
        toast.error("Failed to activate seller");
      }
    } catch (error) {
      console.error("Error activating seller:", error);
      toast.error("Error activating seller");
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusUpdate = async (statusId: number) => {
    if (updating) return;

    setUpdating(true);
    try {
      const response = await dispatch(
        updateSellerStatus(Number(id), statusId)
      );
      
      if (response?.meta?.status) {
        setSellerData({
          ...sellerData,
          activation_status: statusId === 96 ? "APPROVED" : "REJECTED"
        });
        toast.success(
          `Seller ${statusId === 96 ? "approved" : "rejected"} successfully`
        );
      } else {
        toast.error("Failed to update seller status");
      }
    } catch (error) {
      console.error("Error updating seller status:", error);
      toast.error("Error updating seller status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "--";
    try {
      return format(new Date(dateString), "dd-MM-yyyy hh:mm a");
    } catch {
      return "Invalid Date";
    }
  };

  const sections = [
    {
      title: "Store Information",
      fields: [
        {
          label: "Store Name",
          value: sellerData?.store_details?.[0]?.name || "--",
        },
        {
          label: "Website",
          value: sellerData?.store_details?.[0]?.website || "--",
        },
        { label: "Phone Number", value: sellerData?.mobile_number || "--" },
        { label: "Email Address", value: sellerData?.email || "--" },
        {
          label: "Seller Activation Min Charges",
          value: sellerData?.activation_min_charges || "--",
        },
        {
          label: "Seller Activation Max Charges",
          value: sellerData?.activation_max_charges || "--",
        },
        {
          label: "Seller Activation Charges",
          value: sellerData?.activation_charges || "--",
        },
        {
          label: "Seller Activation Status",
          value: sellerData?.activation_status || "--",
        },
        {
          label: "Seller Onboarding Date",
          value: formatDate(sellerData?.onboarding_date),
        },
        {
          label: "Seller Activation Date",
          value: formatDate(sellerData?.activation_date),
        },
        {
          label: "Seller Approval Date",
          value: formatDate(sellerData?.approval_date),
        },
        {
          label: "Seller Activation Remarks",
          value: sellerData?.activation_remarks || "--",
        },
        {
          label: "Store Description",
          value: sellerData?.store_details?.[0]?.description || "--",
        },
        {
          label: "Address",
          value: sellerData?.store_details?.[0]?.address || "--",
        },
        {
          label: "City",
          value: sellerData?.store_details?.[0]?.city || "--",
        },
        {
          label: "State",
          value: sellerData?.store_details?.[0]?.state || "--",
        },
        {
          label: "Postal code",
          value: sellerData?.store_details?.[0]?.postal_code || "--",
        },
        {
          label: "Fulfillment Type",
          value: sellerData?.fulfillment_type || "--",
        },
        { label: "FSSAI Number", value: sellerData?.fssai_number || "--" },
        {
          label: "Store Logo",
          value: sellerData?.store_details?.[0]?.logo || "--",
        },
        {
          label: "Store banner",
          value: sellerData?.store_details?.[0]?.banner || "--",
        },
      ],
    },
    {
      title: "Contact Details",
      subtitle: "Decide which communications you'd like to receive and how.",
      fields: [
        { label: "Seller Name", value: sellerData?.name || "--" },
        {
          label: "Phone Number",
          value: sellerData?.mobile_number || "--",
        },
        {
          label: "Email Address",
          value: sellerData?.email || "--",
        },
        {
          label: "Seller Time Slot to Contact",
          value: sellerData?.contact_time_slot || "Invalid Date - Invalid Date",
        },
        { label: "Seller Address", value: sellerData?.address || "--" },
        { label: "City", value: sellerData?.city || "--" },
        { label: "State", value: sellerData?.state || "--" },
        { label: "Postal code", value: sellerData?.postal_code || "--" },
      ],
    },
    {
      title: "Bank Details",
      subtitle:
        "This information will help us to setup your transactions and payments with the ONDC network.",
      fields: [
        {
          label: "Account number",
          value: sellerData?.bank_details?.account_number || "--",
        },
        {
          label: "Bank Name",
          value: sellerData?.bank_details?.bank_name || "--",
        },
        {
          label: "IFSC Code",
          value: sellerData?.bank_details?.ifsc_code || "--",
        },
        {
          label: "Penny Transfer",
          value: sellerData?.bank_details?.penny_transfer || "--",
        },
        {
          label: "Business Entity Name",
          value: sellerData?.business_details?.entity_name || "--",
        },
        {
          label: "Cancelled Cheque",
          value: sellerData?.bank_details?.cancelled_cheque || "--",
        },
      ],
    },
    // {
    //   title: "Business Details",
    //   subtitle:
    //     "Business information will help us to verify your business so the store at ONDC works smoothly and help us in smoother interactions.",
    //   fields: [
    //     {
    //       label: "Business Name",
    //       value: sellerData?.business_details?.name || "--",
    //     },
    //     {
    //       label: "TAN number",
    //       value: sellerData?.business_details?.tan || "--",
    //     },
    //     { label: "GST No.", value: sellerData?.business_details?.gst || "--" },
    //     {
    //       label: "Account holder name",
    //       value: sellerData?.bank_details?.account_holder_name || "--",
    //     },
    //     {
    //       label: "Business Type",
    //       value: sellerData?.business_details?.type || "Partnerships",
    //     },
    //     { label: "PAN No.", value: sellerData?.business_details?.pan || "--" },
    //     {
    //       label: "Registered Business Address",
    //       value: sellerData?.business_details?.address || "--",
    //     },
    //     { label: "City", value: sellerData?.business_details?.city || "--" },
    //     {
    //       label: "State / Province",
    //       value: sellerData?.business_details?.state || "--",
    //     },
    //     {
    //       label: "Postal code",
    //       value: sellerData?.business_details?.postal_code || "--",
    //     },
    //     {
    //       label: "Signature",
    //       value: sellerData?.business_details?.signature || "--",
    //     },
    //     {
    //       label: "Address Proof",
    //       value: sellerData?.business_details?.address_proof || "--",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            id="back-button-seller"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft id="back-icon-seller" className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold">View Seller Details</h1>
        </div>
        <div className="flex items-center gap-2">{getStatusButton()}</div>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            {section.subtitle && (
              <p className="text-sm text-gray-600 mb-4">{section.subtitle}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  <p className="text-sm text-gray-600 mb-1">{field.label}</p>
                  <p className="text-sm font-medium">
                    {field.label === "Seller Activation Status" ? (
                      <span
                        className={`px-2 py-1 rounded-full ${
                          field.value === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : field.value === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : field.value === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {field.value}
                      </span>
                    ) : (
                      field.value
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSeller;
