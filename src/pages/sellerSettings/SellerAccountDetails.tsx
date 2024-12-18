import React, { useState, useEffect } from "react";
import { ArrowLeft, Store, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddForm from "../../components/AddForm";
import { Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/types";
import { getUserStoreDetails, updateStoreDetails, getFulfillmentTypes, updateLoginDetails, updateUserDetails } from "../../redux/Action/action";

const SellerAccountDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const storeDetailsState = useSelector((state: RootState) => state.data.storeDetails);
  const { data: storeDetails, loading } = storeDetailsState || { data: null, loading: false };

  console.log('Component Rendered - Current storeDetails:', storeDetails);
  console.log('Loading state:', loading);

  const [formData, setFormData] = useState({
    storeName: '',
    website: '',
    phone: '',
    email: '',
    fulfillmentType: '',
    fssaiNo: '',
    minOrderValue: '',
    storeDescription: '',
    storeLogo: '',
    storeBanner: '',
    defaultAddress: '',
    city: '',
    state: '',
    postalCode: '',
    mobileNumber: '',
    loginEmail: '',
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerAddress: '',
    sellerCity: '',
    sellerState: '',
    sellerPostalCode: '',
    contactFromTime: '',
    contactToTime: ''
  });

  const fulfillmentTypes = useSelector((state: RootState) => state.data.fulfillmentTypes?.data || []);

  useEffect(() => {
    console.log('First useEffect - storeDetails changed:', storeDetails);
    if (storeDetails) {
      console.log('Setting form data with:', storeDetails);
      setFormData({
        storeName: storeDetails.name || '',
        website: storeDetails.website || '',
        phone: storeDetails.store_contact_number || '',
        email: storeDetails.store_email || '',
        fulfillmentType: storeDetails.fulfillment_type?.lookup_code?.toLowerCase() || '',
        fssaiNo: storeDetails.fssai_number || '',
        minOrderValue: String(storeDetails.order_minimum_value) || '',
        storeDescription: storeDetails.short_desc || '',
        storeLogo: storeDetails.store_symbols || '',
        storeBanner: storeDetails.store_banner || '',
        defaultAddress: storeDetails.default_address?.address_line_1 || '',
        city: storeDetails.default_address?.city || '',
        state: storeDetails.default_address?.state || '',
        postalCode: storeDetails.default_address?.pin_code || '',
        mobileNumber: storeDetails.core_user?.mobile_number || '',
        loginEmail: storeDetails.core_user?.email || '',
        sellerName: storeDetails.store_contact_person_name || storeDetails.name || '',
        sellerPhone: storeDetails.store_contact_number || '',
        sellerEmail: storeDetails.store_email || '',
        sellerAddress: storeDetails.default_address?.address_line_1 || '',
        sellerCity: storeDetails.default_address?.city || '',
        sellerState: storeDetails.default_address?.state || '',
        sellerPostalCode: storeDetails.default_address?.pin_code || '',
        contactFromTime: storeDetails.contact_from_time || '',
        contactToTime: storeDetails.contact_to_time || ''
      });
    }
  }, [storeDetails]);

  useEffect(() => {
    const userId = localStorage.getItem('userid');
    console.log('Second useEffect - userId from localStorage:', userId);
    if (userId) {
      console.log('Dispatching getUserStoreDetails');
      dispatch(getUserStoreDetails());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFulfillmentTypes());
  }, [dispatch]);

  const basicInfoFields = [
    {
      type: "text",
      key: "storeName",
      label: "Store Name",
      value: formData.storeName,
      required: true,
    },
    {
      type: "text",
      key: "website",
      label: "Website",
      value: formData.website,
    },
    {
      type: "text",
      key: "phone",
      label: "Phone Number",
      value: formData.phone,
      required: true,
    },
    {
      type: "email",
      key: "email",
      label: "Email Address",
      value: formData.email,
      required: true,
    },
    {
      type: "select",
      key: "fulfillmentType",
      label: "Product Fulfillment Type",
      value: formData.fulfillmentType,
      options: fulfillmentTypes.map(type => ({
        label: type.display_name,
        value: type.lookup_code.toLowerCase()
      })),
      required: true,
    },
    {
      type: "text",
      key: "fssaiNo",
      label: "FSSAI No.",
      value: formData.fssaiNo,
    },
    {
      type: "number",
      key: "minOrderValue",
      label: "Store Minimum Order Value",
      value: formData.minOrderValue,
      required: true,
    },
    {
      type: "textarea",
      key: "storeDescription",
      label: "Store Description",
      value: formData.storeDescription,
      required: true,
    },
    {
      type: "image",
      key: "storeLogo",
      label: "Your store logo",
      value: formData.storeLogo,
      required: true,
    },
    {
      type: "image",
      key: "storeBanner",
      label: "Store Banner",
      value: formData.storeBanner,
      required: true,
    },
    {
      type: "text",
      key: "defaultAddress",
      label: "Default Address",
      value: formData.defaultAddress,
      required: true,
    },
    {
      type: "text",
      key: "city",
      label: "City",
      value: formData.city,
      required: true,
    },
    {
      type: "text",
      key: "state",
      label: "State",
      value: formData.state,
      required: true,
    },
    {
      type: "text",
      key: "postalCode",
      label: "Postal Code",
      value: formData.postalCode,
      required: true,
    },
  ];

  const loginDetailsFields = [
    {
      type: "text",
      key: "mobileNumber",
      label: "Mobile Number",
      value: formData.mobileNumber,
      required: true,
    },
    {
      type: "email",
      key: "loginEmail",
      label: "Email Address",
      value: formData.loginEmail,
      required: true,
    },
  ];

  const contactDetailsFields = [
    {
      type: "text",
      key: "sellerName",
      label: "Seller Name",
      value: formData.sellerName,
      required: true,
    },
    {
      type: "text",
      key: "sellerPhone",
      label: "Phone Number",
      value: formData.sellerPhone,
      required: true,
    },
    {
      type: "email",
      key: "sellerEmail",
      label: "Email Address",
      value: formData.sellerEmail,
      required: true,
    },
    {
      type: "text",
      key: "sellerAddress",
      label: "Seller Address",
      value: formData.sellerAddress,
      required: true,
    },
    {
      type: "text",
      key: "sellerCity",
      label: "City",
      value: formData.sellerCity,
      required: true,
    },
    {
      type: "text",
      key: "sellerState",
      label: "State / Province",
      value: formData.sellerState,
      required: true,
    },
    {
      type: "text",
      key: "sellerPostalCode",
      label: "Postal Code",
      value: formData.sellerPostalCode,
      required: true,
    },
    {
      type: "time",
      key: "contactFromTime",
      label: "Available From",
      value: formData.contactFromTime,
      required: true,
      startIcon: <Clock size={20} />,
    },
    {
      type: "time",
      key: "contactToTime",
      label: "Available To",
      value: formData.contactToTime,
      required: true,
      startIcon: <Clock size={20} />,
    },
  ];

  const [editMode, setEditMode] = useState({
    basicInfo: true,
    loginDetails: true,
    contactDetails: true,
  });

  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const handleInputChange = (key: string, value: any) => {
    console.log('Input changed:', { key, value });
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getFulfillmentTypeId = (lookupCode: string, fulfillmentTypes: any[]) => {
    const type = fulfillmentTypes.find(type => 
      type.lookup_code.toLowerCase() === lookupCode.toLowerCase()
    );
    return type?.id || null;
  };

  const handleSave = (section: 'basicInfo' | 'loginDetails' | 'contactDetails') => {
    console.log('Saving section:', section);
    console.log('Current formData:', formData);
    
    const userId = localStorage.getItem('userid');
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    if (section === 'basicInfo' && storeDetails?.id) {
      const fulfillmentTypeId = getFulfillmentTypeId(formData.fulfillmentType, fulfillmentTypes);
      
      if (!fulfillmentTypeId) {
        console.error('Invalid fulfillment type selected');
        return;
      }

      console.log('Dispatching updateStoreDetails with ID:', storeDetails.id);
      dispatch(updateStoreDetails(storeDetails.id, {
        name: formData.storeName,
        website: formData.website,
        store_contact_number: formData.phone,
        store_email: formData.email,
        long_desc: formData.storeDescription,
        store_symbols: formData.storeLogo,
        store_banner: formData.storeBanner,
        fulfillment_type_id: fulfillmentTypeId,
        fssai_number: formData.fssaiNo,
        default_address: {
          address_line_1: formData.defaultAddress,
          city: formData.city,
          state: formData.state,
          pin_code: formData.postalCode
        },
        section_key: "BASIC_INFORMATION",
        order_minimum_value: Number(formData.minOrderValue)
      }));
    } 
    else if (section === 'loginDetails') {
      dispatch(updateUserDetails(userId, {
        mobile_number: formData.mobileNumber,
        email: formData.loginEmail,
        section_key: "LOGIN_DETAILS"
      }));
    }
    else if (section === 'contactDetails') {
      const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':');
        const today = new Date();
        today.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return today.toISOString();
      };

      dispatch(updateUserDetails(userId, {
        name: formData.sellerName,
        mobile_number: formData.sellerPhone,
        contact_from_time: formatTime(formData.contactFromTime),
        contact_to_time: formatTime(formData.contactToTime),
        default_address: {
          address_line_1: formData.sellerAddress,
          city: formData.sellerCity,
          state: formData.sellerState,
          pin_code: formData.sellerPostalCode
        },
        section_key: "CONTACT_DETAILS"
      }));
    }
  };

  const handleDeactivateStore = () => {
    if (!storeDetails?.id) {
      console.error('Store ID not found');
      return;
    }

    dispatch(updateStoreDetails(storeDetails.id, {
      is_active: false
    })).then(() => {
      setShowDeactivateConfirm(false);
      dispatch(getUserStoreDetails());
    }).catch((error) => {
      console.error('Failed to deactivate store:', error);
    });
  };

  console.log({
    basicInfoFields,
    loginDetailsFields,
    contactDetailsFields
  });

  return (
    <div className="space-y-8 p-6 bg-gray-50">
      {loading ? (
        <div>Loading...</div>
      ) : (
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
          
          {storeDetails?.is_active && (
            <button
              onClick={() => setShowDeactivateConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
            >
              <Store size={20} />
              Deactivate Store
            </button>
          )}
        </div>
      )}

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

export default SellerAccountDetails;  