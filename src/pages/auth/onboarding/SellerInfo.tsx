import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AddForm from "../../../components/AddForm";
import { updateUserDetails, updateStoreDetails, getUserDetails } from "../../../redux/Action/action";
import { RootState } from "../../../redux/types";
import { AppDispatch } from "../../../redux/store";

const SellerInfo = ({ onNext }: { onNext: (data: any) => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.data.user);
  const [formValues, setFormValues] = useState({
    sellerName: "",
    mobileNumber: "",
    email: "",
    storeName: "",
    storeWebsite: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
  });

  const handleInputChange = (key: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSelectChange = (key: string, value: any) => {
    const selectedValue = value?.value || value;
    setFormValues(prev => ({
      ...prev,
      [key]: selectedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userId = localStorage.getItem('userid');
      console.log('User ID from localStorage:', userId);
      if (!userId) {
        throw new Error('User ID not found');
      }

      console.log('Fetching user details...');
      const userResponse = await dispatch(getUserDetails(Number(userId)));
      console.log('User details response:', userResponse);
      
      const storeId = userResponse?.data?.store_details?.[0]?.id;
      console.log('Store ID from response:', storeId);
      if (!storeId) {
        throw new Error('Store ID not found in user details');
      }

      console.log('Updating user details...');
      await dispatch(updateUserDetails(Number(userId), {
        name: formValues.sellerName,
        mobile_number: formValues.mobileNumber,
        email: formValues.email
      }));

      console.log('Updating store details...');
      await dispatch(updateStoreDetails(storeId, {
        name: formValues.storeName,
        store_contact_number: formValues.mobileNumber,
        store_email: formValues.email,
        default_address: {
          address_line_1: formValues.address,
          state: formValues.state,
          city: formValues.city,
          pin_code: formValues.pinCode
        },
        website: formValues.storeWebsite
      }));

      console.log('All updates successful');
      onNext(formValues);
    } catch (error) {
      console.error('Failed to update details:', error);
      console.error('Error details:', {
        userId: localStorage.getItem('userid'),
        userResponse: error.response?.data,
        formValues
      });
    }
  };

  const formFields = [
    {
      type: "text",
      key: "sellerName",
      label: "Seller Name",
      placeholder: "Enter your full name",
      value: formValues.sellerName,
    },
    {
      type: "text",
      key: "mobileNumber",
      label: "Mobile Number",
      placeholder: "Enter mobile number",
      value: formValues.mobileNumber,
    },
    {
      type: "email",
      key: "email",
      label: "Email Address",
      placeholder: "Enter your email address",
      value: formValues.email,
    },
    {
      type: "text",
      key: "storeName",
      label: "Store Name",
      placeholder: "Enter your store name",
      value: formValues.storeName,
    },
    {
      type: "text",
      key: "storeWebsite",
      label: "Store Website",
      placeholder: "Enter your store website (optional)",
      value: formValues.storeWebsite,
    },
    {
      type: "textarea",
      key: "address",
      label: "Address",
      placeholder: "Enter your complete address",
      value: formValues.address,
    },
    {
      type: "text",
      key: "state",
      label: "State",
      placeholder: "Enter your state",
      value: formValues.state,
      
    },
    {
      type: "text",
      key: "city",
      label: "City",
      placeholder: "Enter your city",
      value: formValues.city,
    },
    {
      type: "text",
      key: "pinCode",
      label: "PIN Code",
      placeholder: "Enter PIN code",
      value: formValues.pinCode,
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <AddForm
        data={formFields}
        handleInputonChange={handleInputChange}
        handleSelectonChange={handleSelectChange}
      />
      
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default SellerInfo;
