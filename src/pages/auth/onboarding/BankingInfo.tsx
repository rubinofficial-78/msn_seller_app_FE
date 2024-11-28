import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AddForm from "../../../components/AddForm";
import { updateBankDetails } from "../../../redux/Action/action";
import { AppDispatch } from "../../../redux/store";
import { toast } from "react-toastify";

const BankingInfo = ({ onNext }: { onNext: (data: any) => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState({
    bankName: "",
    ifscCode: "",
    accountNumber: "",
    beneficiaryName: "",
    cancelledCheque: "",
  });

  const handleInputChange = (key: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageLink = (id: string, link: string | null) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: link || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formValues.bankName.trim()) {
      toast.error("Please enter bank name");
      return;
    }
    if (!formValues.ifscCode.trim()) {
      toast.error("Please enter IFSC code");
      return;
    }
    if (!formValues.accountNumber.trim()) {
      toast.error("Please enter account number");
      return;
    }
    if (!formValues.beneficiaryName.trim()) {
      toast.error("Please enter beneficiary name");
      return;
    }
    if (!formValues.cancelledCheque) {
      toast.error("Please upload cancelled cheque");
      return;
    }

    try {
      const payload = {
        account_holder_name: formValues.beneficiaryName.trim(),
        account_number: formValues.accountNumber.trim(),
        canceller_cheque: formValues.cancelledCheque,
        ifsc_code: formValues.ifscCode.trim(),
        bank_name: formValues.bankName.trim(),
        section_key: "BANK_DETAILS"
      };

      console.log('Submitting bank details:', payload);

      const result = await dispatch(updateBankDetails(2, payload));
      console.log('Bank details update response:', result);

      if (result?.payload?.meta?.status) {
        toast.success("Bank details updated successfully");
        
        // Save banking info
        onNext(formValues);

        // Get the email from local storage
        const email = localStorage.getItem("pendingLoginEmail");

        if (email) {
          // Mark onboarding as complete for this email
          localStorage.setItem(`onboarding_${email}`, "true");
          // Go directly to seller dashboard after onboarding
          navigate("/dashboard ");
        }
      } else {
        toast.error(result?.payload?.meta?.message || "Failed to update bank details");
      }
    } catch (error: any) {
      console.error('Error updating bank details:', error);
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          "An unexpected error occurred";
      toast.error(errorMessage);
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
      ),
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
      ),
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
              onChange={(e) =>
                handleInputChange("accountNumber", e.target.value)
              }
              placeholder="Account number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name Of Beneficiary Account holder{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formValues.beneficiaryName}
              onChange={(e) =>
                handleInputChange("beneficiaryName", e.target.value)
              }
              placeholder="Name Of Beneficiary Account holder"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      ),
    },
    {
      type: "image",
      key: "cancelledCheque",
      label: "Upload Blank Cheque",
      value: formValues.cancelledCheque,
      uploadText: "Upload a file",
      uploadDescription: "PNG, SVG up to 10MB",
      handleImageLink,
      description:
        "Upload your canceled Cheque which is required for banking verifications and penny drop",
      showLable: false,
      required: true
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AddForm 
        data={formFields} 
        handleInputonChange={handleInputChange}
        handleImageLink={handleImageLink}
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
