import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AddForm from "../../../components/AddForm";
import {
  updateUserDetails,
  updateStoreDetails,
  getUserDetails,
} from "../../../redux/Action/action";
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const validateForm = (showError = false) => {
    let isValid = true;

    // Seller Name validation
    if (formValues.sellerName) {
      if (formValues.sellerName.length > 20) {
        if (showError)
          toast.error("Seller name should not exceed 20 characters");
        isValid = false;
      }
    } else {
      isValid = false;
    }

    // Mobile number validation
    if (formValues.mobileNumber) {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(formValues.mobileNumber)) {
        if (showError)
          toast.error("Mobile number should be 10 digits starting with 6-9");
        isValid = false;
      }
    } else {
      isValid = false;
    }

    // Email validation
    if (formValues.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;
      if (!emailRegex.test(formValues.email)) {
        if (showError)
          toast.error(
            "Invalid email format. Use domain@gmail.com or domain@gmail.in"
          );
        isValid = false;
      }
    } else {
      isValid = false;
    }

    // Store name validation
    if (formValues.storeName) {
      if (formValues.storeName.length > 20) {
        if (showError)
          toast.error("Store name should not exceed 20 characters");
        isValid = false;
      }
    } else {
      isValid = false;
    }

    // Website validation (optional)
    if (formValues.storeWebsite) {
      const websiteRegex = /^[a-zA-Z0-9-]+\.(com|in)$/;
      if (!websiteRegex.test(formValues.storeWebsite)) {
        if (showError)
          toast.error(
            "Invalid website format. Use format: example.com or example.in"
          );
        isValid = false;
      }
    }

    // Address validation
    if (formValues.address) {
      if (formValues.address.length > 50) {
        if (showError) toast.error("Address should not exceed 50 characters");
        isValid = false;
      }
    } else {
      isValid = false;
    }

    // State and City validation
    if (!formValues.state.trim() || !formValues.city.trim()) {
      if (showError) toast.error("State and City are required");
      isValid = false;
    }

    // Pincode validation
    if (formValues.pinCode) {
      const pincodeRegex = /^\d{6}$/;
      if (!pincodeRegex.test(formValues.pinCode)) {
        if (showError) toast.error("PIN code should be exactly 6 digits");
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    const isValid = validateForm(showValidation);
    setIsFormValid(isValid);
  }, [formValues, showValidation]);

  const handleInputChange = (key: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectChange = (key: string, value: any) => {
    const selectedValue = value?.value || value;
    setFormValues((prev) => ({
      ...prev,
      [key]: selectedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);

    if (!validateForm(true)) {
      return;
    }

    try {
      const userId = localStorage.getItem("userid");
      console.log("User ID from localStorage:", userId);
      if (!userId) {
        throw new Error("User ID not found");
      }

      console.log("Fetching user details...");
      const userResponse = await dispatch(getUserDetails(Number(userId)));
      console.log("User details response:", userResponse);

      const storeId = userResponse?.data?.store_details?.[0]?.id;
      console.log("Store ID from response:", storeId);
      if (!storeId) {
        throw new Error("Store ID not found in user details");
      }

      console.log("Updating user details...");
      await dispatch(
        updateUserDetails(Number(userId), {
          name: formValues.sellerName,
          mobile_number: formValues.mobileNumber,
          email: formValues.email,
        })
      );

      console.log("Updating store details...");
      await dispatch(
        updateStoreDetails(storeId, {
          name: formValues.storeName,
          store_contact_number: formValues.mobileNumber,
          store_email: formValues.email,
          default_address: {
            address_line_1: formValues.address,
            state: formValues.state,
            city: formValues.city,
            pin_code: formValues.pinCode,
          },
          website: formValues.storeWebsite,
        })
      );

      console.log("All updates successful");
      onNext(formValues);
    } catch (error: unknown) {
      console.error("Failed to update details:", error);
      console.error("Error details:", {
        userId: localStorage.getItem("userid"),
        userResponse: error instanceof Error ? error.message : "Unknown error",
        formValues,
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
      required: true,
    },
    {
      type: "text",
      key: "mobileNumber",
      label: "Mobile Number",
      placeholder: "Enter mobile number",
      value: formValues.mobileNumber,
      required: true,
    },
    {
      type: "email",
      key: "email",
      label: "Email Address",
      placeholder: "Enter your email address",
      value: formValues.email,
      required: true,
    },
    {
      type: "text",
      key: "storeName",
      label: "Store Name",
      placeholder: "Enter your store name",
      value: formValues.storeName,
      required: true,
    },
    {
      type: "text",
      key: "storeWebsite",
      label: "Store Website",
      placeholder: "Enter your store website (optional)",
      value: formValues.storeWebsite,
      required: false,
    },
    {
      type: "textarea",
      key: "address",
      label: "Address",
      placeholder: "Enter your complete address",
      value: formValues.address,
      required: true,
    },
    {
      type: "text",
      key: "state",
      label: "State",
      placeholder: "Enter your state",
      value: formValues.state,
      required: true,
    },
    {
      type: "text",
      key: "city",
      label: "City",
      placeholder: "Enter your city",
      value: formValues.city,
      required: true,
    },
    {
      type: "text",
      key: "pinCode",
      label: "PIN Code",
      placeholder: "Enter PIN code",
      value: formValues.pinCode,
      required: true,
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
          id="next-step-button"
          type="submit"
          className={`px-6 py-2.5 rounded-lg transition-colors ${
            isFormValid
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default SellerInfo;
