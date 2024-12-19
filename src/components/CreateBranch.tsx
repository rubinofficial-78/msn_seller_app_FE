import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBranchApi, getCompanyDropdown } from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import AddForm from "./AddForm";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

interface BranchFormData {
  companyName: string | { value: number; label: string };
  branchName: string;
  mobileNumber: string;
  email: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
}

const CreateBranch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<BranchFormData>({} as BranchFormData);

  // Get companies from Redux store
  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  useEffect(() => {
    dispatch(getCompanyDropdown());
  }, [dispatch]);

  const handleInputChange = (key: string, value: any) => {
    if (key === 'companyName') {
      console.log('Select value received:', value);
      setFormData(prev => ({
        ...prev,
        [key]: value // Store the entire object for select
      }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const validateForm = (showError = false) => {
    let isValid = true;
    if (formData.companyName) {
      if (formData.companyName.length > 20) {
        if (showError)
          toast.error("Company name should not exceed 20 characters");
        isValid = false;
      }
    }
    if (formData.branchName) {
      if (formData.branchName.length > 20) {
        if (showError)
          toast.error("Branch name should not exceed 20 characters");
        isValid = false;
      }
    }
    if (formData.mobileNumber) {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(formData.mobileNumber)) {
        if (showError)
          toast.error("Mobile number should be 10 digits starting with 6-9");
        isValid = false;
      }
    }
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        if (showError) toast.error("Invalid email address");
        isValid = false;
      }
    }
    // if (formData.address) {
    //   if (formData.address.length > 20) {
    //     if (showError) toast.error("Address should not exceed 20 characters");
    //     isValid = false;
    //   }
    // }
    if (formData.state) {
      if (formData.state.length > 20) {
        if (showError) toast.error("State should not exceed 20 characters");
        isValid = false;
      }
    }
    // if (formData.city) {
    //   if (formData.city.length > 20) {
    //     if (showError) toast.error("City should not exceed 20 characters");
    //     isValid = false;
    //   }
    // }
    // Validate pincode
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode (should not start with 0)");
      return false;
    }
    setIsFormValid(isValid);
    return isValid;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
  
    if (!validateForm(true)) {
      return;
    }
  
    try {
      const companyId =
        typeof formData.companyName === "object"
          ? formData.companyName.value
          : formData.companyName;
  
      const payload = {
        name: formData.branchName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        created_by_id: Number(companyId),
        default_address: {
          address: formData.address || "",
          state: formData.state || "",
          city: formData.city || "",
          pincode: formData.pincode || "",
        },
      };
  
      console.log("Creating branch with payload:", payload);
  
      const response = await dispatch(createBranchApi(payload));
  
      if (response?.meta?.status) {
        toast.success("Branch created successfully");
        navigate(-1);
      } else {
        toast.error(response?.meta?.message || "Failed to create branch");
      }
    } catch (error) {
      console.error("Error creating branch:", error);
      toast.error(
        "Failed to create branch: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };
  

  const formFields = [
    {
      title: 'Company Branch Basics Details',
      description: 'This information represents branch basic details which is useful for identification of a partner',
      fields: [
        {
          type: 'select',
          key: 'companyName',
          label: 'Company Name',
          id: "company-name-input",
          required: true,
          value: formData.companyName || '',
          placeholder: 'Select Company',
          options: [
            { value: '', label: 'Select Company' },
            ...companies
              .filter(company => company.is_active)
              .map(company => ({
                value: company.id,
                label: company.name
              }))
          ]
        },
        {
          type: "text",
          key: "branchName",
          id: "branch-name-input",
          label: "Branch Name",
          required: true,
          value: formData.branchName,
          placeholder: "Enter Branch Name",
        },
        {
          type: "text",
          key: "mobileNumber",
          id: "mobile-number-input",
          label: "Mobile Number",
          required: true,
          value: formData.mobileNumber,
          placeholder: "Enter Mobile Number",
        },
        {
          type: "email",
          key: "email",
          id: "email-input",
          label: "Email",
          required: true,
          value: formData.email,
          placeholder: "Enter Email",
        },
        {
          type: "textarea",
          key: "address",
          id: "address-input",
          label: "Address",
          required: true,
          value: formData.address,
          placeholder: "Enter Address",
        },
        {
          type: "text",
          key: "state",
          id: "state-input",
          label: "State",
          required: true,
          value: formData.state,
          placeholder: "Enter State",
        },
        {
          type: "text",
          key: "city",
          id: "city-input",
          label: "City",
          required: true,
          value: formData.city,
          placeholder: "Enter City",
        },
        {
          type: "text",
          key: "pincode",
          label: "Pincode",
          id: "pincode-input",
          required: true,
          value: formData.pincode,
          placeholder: "Enter Pincode",
        },
      ]
    }
  ];

  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          id="back-button-branch"
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft id="back-button-branch-icon" className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-medium">Create Branch</h1>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg p-6">
        <AddForm
          data={formFields[0].fields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button
          id="save-button-branch"
          onClick={handleSave}
          className="px-4 py-2 bg-[#1a237e] text-white rounded-lg hover:bg-opacity-90"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default CreateBranch;
