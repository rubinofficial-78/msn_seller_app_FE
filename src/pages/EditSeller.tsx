import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getSellerById,   } from "../redux/Action/action";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import AddForm from "../components/AddForm";

const EditSeller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobile_number: "",
    store_name: "",
    store_email: "",
    store_contact_number: "",
    website: "",
    address_line_1: "",
    city: "",
    state: "",
    pin_code: "",
    gstin: "",
  });

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await dispatch(getSellerById(Number(id)));
        if (response?.meta?.status) {
          const data = response.data;
          setFormValues({
            name: data?.name || "",
            email: data?.email || "",
            mobile_number: data?.mobile_number || "",
            store_name: data?.store_details?.[0]?.name || "",
            store_email: data?.store_details?.[0]?.store_email || "",
            store_contact_number:
              data?.store_details?.[0]?.store_contact_number || "",
            website: data?.store_details?.[0]?.website || "",
            address_line_1:
              data?.store_details?.[0]?.default_address?.address_line_1 || "",
            city: data?.store_details?.[0]?.default_address?.city || "",
            state: data?.store_details?.[0]?.default_address?.state || "",
            pin_code: data?.store_details?.[0]?.default_address?.pin_code || "",
            gstin: data?.business_details?.gstin || "",
          });
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

  const handleInputChange = (key: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formValues.name,
        email: formValues.email,
        mobile_number: formValues.mobile_number,
        store_details: {
          name: formValues.store_name,
          store_email: formValues.store_email,
          store_contact_number: formValues.store_contact_number,
          website: formValues.website,
          default_address: {
            address_line_1: formValues.address_line_1,
            city: formValues.city,
            state: formValues.state,
            pin_code: formValues.pin_code,
          },
        },
        business_details: {
          gstin: formValues.gstin,
        },
      };
 
      if (response?.meta?.status) {
        toast.success("Seller updated successfully");
        navigate(`/dashboard/sellers/view/${id}`);
      } else {
        toast.error(response?.meta?.message || "Failed to update seller");
      }
    } catch (error) {
      console.error("Error updating seller:", error);
      toast.error("Error updating seller");
    }
  };

  const formFields = [
    {
      type: "text",
      key: "name",
      label: "Seller Name",
      value: formValues.name,
      required: true,
    },
    {
      type: "text",
      key: "email",
      label: "Email",
      value: formValues.email,
      required: true,
    },
    {
      type: "text",
      key: "mobile_number",
      label: "Mobile Number",
      value: formValues.mobile_number,
      required: true,
    },
    {
      type: "text",
      key: "store_name",
      label: "Store Name",
      value: formValues.store_name,
      required: true,
    },
    {
      type: "text",
      key: "store_email",
      label: "Store Email",
      value: formValues.store_email,
      required: true,
    },
    {
      type: "text",
      key: "store_contact_number",
      label: "Store Contact Number",
      value: formValues.store_contact_number,
      required: true,
    },
    {
      type: "text",
      key: "website",
      label: "Website",
      value: formValues.website,
    },
    {
      type: "text",
      key: "gstin",
      label: "GSTIN",
      value: formValues.gstin,
      required: true,
    },
    {
      type: "text",
      key: "address_line_1",
      label: "Address",
      value: formValues.address_line_1,
      required: true,
    },
    {
      type: "text",
      key: "city",
      label: "City",
      value: formValues.city,
      required: true,
    },
    {
      type: "text",
      key: "state",
      label: "State",
      value: formValues.state,
      required: true,
    },
    {
      type: "text",
      key: "pin_code",
      label: "PIN Code",
      value: formValues.pin_code,
      required: true,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Edit Seller</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <AddForm data={formFields} handleInputonChange={handleInputChange} />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSeller;
