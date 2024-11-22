import React, { useState } from "react";
import { ArrowLeft, Store, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddForm from "../../components/AddForm";
import { Clock } from "lucide-react";

const AccountDetails = () => {
  const navigate = useNavigate();
  
  const basicInfoFields = [
    {
      type: "text",
      key: "storeName",
      label: "Store Name",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "website",
      label: "Website",
      value: "",
    },
    {
      type: "text",
      key: "phone",
      label: "Phone Number",
      value: "",
      required: true,
    },
    {
      type: "email",
      key: "email",
      label: "Email Address",
      value: "",
      required: true,
    },
    {
      type: "select",
      key: "fulfillmentType",
      label: "Product Fulfillment Type",
      value: null,
      options: [
        { label: "Delivery", value: "delivery" },
        { label: "Pickup", value: "pickup" },
      ],
      required: true,
    },
    {
      type: "text",
      key: "fssaiNo",
      label: "FSSAI No.",
      value: "",
    },
    {
      type: "number",
      key: "minOrderValue",
      label: "Store Minimum Order Value",
      value: "",
      required: true,
    },
    {
      type: "textarea",
      key: "storeDescription",
      label: "Store Description",
      value: "",
      required: true,
    },
    {
      type: "image",
      key: "storeLogo",
      label: "Your store logo",
      value: "",
      required: true,
    },
    {
      type: "image",
      key: "storeBanner",
      label: "Store Banner",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "defaultAddress",
      label: "Default Address",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "city",
      label: "City",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "state",
      label: "State",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "postalCode",
      label: "Postal Code",
      value: "",
      required: true,
    },
  ];

  const loginDetailsFields = [
    {
      type: "text",
      key: "mobileNumber",
      label: "Mobile Number",
      value: "",
      required: true,
    },
    {
      type: "email",
      key: "loginEmail",
      label: "Email Address",
      value: "",
      required: true,
    },
  ];

  const contactDetailsFields = [
    {
      type: "text",
      key: "sellerName",
      label: "Seller Name",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "sellerPhone",
      label: "Phone Number",
      value: "",
      required: true,
    },
    {
      type: "email",
      key: "sellerEmail",
      label: "Email Address",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "sellerAddress",
      label: "Seller Address",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "sellerCity",
      label: "City",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "sellerState",
      label: "State / Province",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "sellerPostalCode",
      label: "Postal Code",
      value: "",
      required: true,
    },
    {
      type: "text",
      key: "timeSlot",
      label: "Seller Time Slot To Contact",
      value: "",
      required: true,
      startIcon: <Clock size={20} />,
    },
  ];

  const [formData, setFormData] = useState({});

  const [editMode, setEditMode] = useState({
    basicInfo: true,
    loginDetails: true,
    contactDetails: true,
  });

  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (section: 'basicInfo' | 'loginDetails' | 'contactDetails') => {
    console.log(`Saving ${section}:`, formData);
  };

  const handleDeactivateStore = () => {
    console.log('Store deactivated');
    setShowDeactivateConfirm(false);
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Account Details</h1>
        </div>
        
        <button
          onClick={() => setShowDeactivateConfirm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
        >
          <Store size={20} />
          Deactivate Store
        </button>
      </div>

      {showDeactivateConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle size={24} />
              <h3 className="text-lg font-semibold">Deactivate Store</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to deactivate your store? This will make your store invisible to customers until you reactivate it.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeactivateConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeactivateStore}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Basic Information */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                <p className="text-sm text-gray-500 mt-1">
                  This information is helpful for you to track your product. This information will be displayed publicly so be careful what you share.
                </p>
              </div>
              <button 
                onClick={() => handleSave('basicInfo')} 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                SAVE
              </button>
            </div>
          </div>
          <div className="p-6">
            <AddForm 
              data={basicInfoFields}
              handleInputonChange={handleInputChange}
              handleSelectonChange={handleInputChange}
              edit={true}
            />
          </div>
        </section>

        {/* Login Details */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Login Details</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
              <button 
                onClick={() => handleSave('loginDetails')} 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                SAVE
              </button>
            </div>
          </div>
          <div className="p-6">
            <AddForm 
              data={loginDetailsFields}
              handleInputonChange={handleInputChange}
              edit={true}
            />
          </div>
        </section>

        {/* Contact Details */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Contact Details</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Decide which communications you'd like to receive and how.
                </p>
              </div>
              <button 
                onClick={() => handleSave('contactDetails')} 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                SAVE
              </button>
            </div>
          </div>
          <div className="p-6">
            <AddForm 
              data={contactDetailsFields}
              handleInputonChange={handleInputChange}
              edit={true}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountDetails; 