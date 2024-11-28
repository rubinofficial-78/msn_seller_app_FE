import React, { useState } from "react";
import AddForm from "../../../components/AddForm";
import { useNavigate } from "react-router-dom";

const BankingInfo = ({ onNext }: { onNext: (data: any) => void }) => {
  const [formValues, setFormValues] = useState({
    bankName: "",
    ifscCode: "",
    accountNumber: "",
    beneficiaryName: "",
    cancelledCheque: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (key: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImageLink = (id: string, link: string | null) => {
    setFormValues(prev => ({
      ...prev,
      [id]: link || ""
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save banking info
    onNext(formValues);

    // Get the email from session storage
    const email = sessionStorage.getItem('pendingLoginEmail');
    
    if (email) {
      // Mark onboarding as complete for this email
      sessionStorage.setItem(`onboarding_${email}`, 'true');
      
      // Go directly to seller dashboard after onboarding
      navigate('/dashboard/seller-dashboard');
    }
  };

  const formFields = [
    {
      type: "custom",
      key: "header",
      component: (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-blue-900">
            Banking Details
          </h2>
        </div>
      )
    },
    {
      type: "custom",
      key: "bankDetails",
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formValues.bankName}
              onChange={(e) => handleInputChange("bankName", e.target.value)}
              placeholder="Bank Name"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IFSC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formValues.ifscCode}
              onChange={(e) => handleInputChange("ifscCode", e.target.value)}
              placeholder="IFSC Code"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      )
    },
    {
      type: "custom",
      key: "accountDetails",
      component: (
        <div className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formValues.accountNumber}
              onChange={(e) => handleInputChange("accountNumber", e.target.value)}
              placeholder="Account number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name Of Beneficiary Account holder <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formValues.beneficiaryName}
              onChange={(e) => handleInputChange("beneficiaryName", e.target.value)}
              placeholder="Name Of Beneficiary Account holder"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      )
    },
    {
      type: "image",
      key: "cancelledCheque",
      label: "Upload Blank Cheque",
      value: formValues.cancelledCheque,
      uploadText: "Upload a file",
      uploadDescription: "PNG, SVG up to 10MB",
      handleImageLink: handleImageLink,
      description: "Upload your canceled Cheque which is required for banking verifications and penny drop",
      showLable: false
    }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <AddForm
        data={formFields}
        handleInputonChange={handleInputChange}
      />
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </form>
  );
};

export default BankingInfo; 