import React, { useState } from "react";
import AddForm from "../../../components/AddForm";

const SellerInfo = ({ onNext }: { onNext: (data: any) => void }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formValues);
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
      type: "select",
      key: "state",
      label: "State",
      value: formValues.state,
      options: [
        { label: "Select State", value: "" },
        { label: "Maharashtra", value: "maharashtra" },
        { label: "Delhi", value: "delhi" },
        { label: "Karnataka", value: "karnataka" },
        { label: "Tamil Nadu", value: "tamil_nadu" },
        { label: "Gujarat", value: "gujarat" },
      ],
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
