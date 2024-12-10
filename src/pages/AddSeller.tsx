import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddForm from "../components/AddForm";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  sellerRegister,
  updateSellerDetails,
  getPartnerDropdown,
  getCompanyDropdown,
  getBranchDropdown,
  getLookupCodes,
  updateBusinessSettings,
  updateBankDetails,
} from "../redux/Action/action";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/types";
import { toast } from "react-toastify";

const AddSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    companyName: "",
    branchName: "",
    partnerName: "",
    sellerName: "",
    email: "",
    mobileNumber: "",
    storeName: "",
    storeWebsite: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    gstNumber: "",
    businessType: "",
    govtAuthorizedProof: "",
    signature: "",
    bankName: "",
    ifscCode: "",
    accountNumber: "",
    beneficiaryName: "",
    cancelledCheque: "",
  });

  // Get dropdown data from Redux state
  const { data: companies, loading: companiesLoading } = useSelector(
    (state: RootState) => state.data.companyDropdown
  );
  const { data: branches, loading: branchesLoading } = useSelector(
    (state: RootState) => state.data.branchDropdown
  );
  const { data: partners, loading: partnersLoading } = useSelector(
    (state: RootState) => state.data.partnerDropdown
  );

  // Add selector for lookup codes
  const { data: lookupCodes, loading: lookupLoading } = useSelector(
    (state: RootState) => state.data.lookupCodes
  );

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        await Promise.all([
          dispatch(getCompanyDropdown()),
          dispatch(getPartnerDropdown()),
          dispatch(getLookupCodes("TYPE_OF_BUSINESS")),
        ]);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error("Failed to fetch dropdown data");
      }
    };

    fetchDropdownData();
  }, [dispatch]);

  // Fetch branches when company is selected
  useEffect(() => {
    const fetchBranches = async () => {
      if (formData.companyName) {
        try {
          await dispatch(getBranchDropdown(Number(formData.companyName)));
        } catch (error) {
          console.error("Error fetching branches:", error);
          toast.error("Failed to fetch branches");
        }
      }
    };

    fetchBranches();
  }, [dispatch, formData.companyName]);

  // Transform data for dropdowns
  const companyOptions =
    companies?.map((company) => ({
      label: company.name,
      value: company.id.toString(),
    })) || [];

  const branchOptions =
    branches?.map((branch) => ({
      label: branch.name,
      value: branch.id.toString(),
    })) || [];

  const partnerOptions =
    partners?.map((partner) => ({
      label: partner.name,
      value: partner.id.toString(),
    })) || [];

  // Transform lookup codes for business type dropdown
  const businessTypeOptions =
    lookupCodes?.map((code) => ({
      label: code.display_name,
      value: code.id.toString(),
    })) || [];

  // Update handleInputChange to handle both input and select changes
  const handleInputChange = (key: string, value: any) => {
    console.log("Input/Select change:", key, value);
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Add separate handler for select changes
  const handleSelectChange = (key: string, value: any) => {
    console.log("Select change:", key, value);
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Add this effect to log partner selection changes
  useEffect(() => {
    if (formData.partnerName) {
      // Extract just the ID value from the selected option
      const partnerId =
        typeof formData.partnerName === "object"
          ? formData.partnerName.value
          : formData.partnerName;

      console.log("Selected Partner ID:", partnerId);

      const selectedPartner = partners?.find(
        (partner) => partner.id.toString() === partnerId
      );
      console.log("Selected Partner Details:", selectedPartner);
    }
  }, [formData.partnerName, partners]);

  // Add state for storing registration response
  const [registerResponse, setRegisterResponse] = useState<any>(null);

  const handleBasicDetailsSave = async () => {
    try {
      // Validate required fields
      const requiredFields = [
        { key: "companyName", label: "Company Name" },
        { key: "branchName", label: "Branch Name" },
        { key: "partnerName", label: "Partner Name" },
        { key: "sellerName", label: "Seller Name" },
        { key: "email", label: "Email" },
        { key: "mobileNumber", label: "Mobile Number" },
        { key: "storeName", label: "Store Name" },
        { key: "address", label: "Address" },
        { key: "state", label: "State" },
        { key: "city", label: "City" },
        { key: "pinCode", label: "Pin Code" },
      ];

      // Check if any required field is empty
      const emptyFields = requiredFields.filter(
        (field) => !formData[field.key]
      );
      if (emptyFields.length > 0) {
        toast.error(
          `Please fill in ${emptyFields.map((f) => f.label).join(", ")}`
        );
        return;
      }

      // Check if partner is selected
      if (!formData.partnerName) {
        toast.error("Please select a partner");
        return;
      }

      // Validate mobile number (10 digits)
      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(formData.mobileNumber)) {
        toast.error("Please enter a valid 10-digit mobile number");
        return;
      }

      // Validate pincode (6 digits)
      const pincodeRegex = /^\d{6}$/;
      if (!pincodeRegex.test(formData.pinCode)) {
        toast.error("Please enter a valid 6-digit pin code");
        return;
      }

      // Extract the ID value from the selected option
      const partnerId =
        typeof formData.partnerName === "object"
          ? formData.partnerName.value
          : formData.partnerName;

      // Get selected partner details
      const selectedPartner = partners?.find(
        (partner) => partner.id.toString() === partnerId
      );

      console.log("Selected Partner ID for Registration:", partnerId);
      console.log("Selected Partner Object:", selectedPartner);

      if (!selectedPartner) {
        toast.error("Selected partner not found");
        return;
      }

      // First API call - Register Seller
      const response = await dispatch(
        sellerRegister({
          name: formData.sellerName,
          email: formData.email,
          mobile_number: formData.mobileNumber,
          core_user_id: Number(partnerId),
        })
      );

      console.log("Register Response:", response);

      if (response?.meta?.status) {
        // Store the registration response
        setRegisterResponse(response);

        const storeId = response.data?.store_id;

        if (!storeId) {
          toast.error("Failed to get store ID from registration");
          return;
        }

        // Second API call - Update Store Details
        const storeResponse = await dispatch(
          updateSellerDetails(storeId, {
            name: formData.storeName,
            store_contact_number: formData.mobileNumber,
            store_email: formData.email,
            default_address: {
              address_line_1: formData.address,
              state: formData.state,
              city: formData.city,
              pin_code: formData.pinCode,
            },
            website: formData.storeWebsite || "",
          })
        );

        console.log("Store Update Response:", storeResponse);

        if (storeResponse?.meta?.status) {
          toast.success("Basic details saved successfully");
        } else {
          toast.error(
            storeResponse?.meta?.message || "Failed to update store details"
          );
        }
      } else {
        toast.error(response?.meta?.message || "Failed to register seller");
      }
    } catch (error: any) {
      console.error("Error saving basic details:", error);
      const errorMessage =
        error?.response?.data?.meta?.message ||
        error?.message ||
        "Failed to save basic details";
      toast.error(errorMessage);
    }
  };

  const handleGstDetailsSave = async () => {
    try {
      // Validate required fields
      const requiredFields = [
        { key: "gstNumber", label: "GST Number" },
        { key: "businessType", label: "Business Type" },
        { key: "signature", label: "Signature" },
      ];

      // Check if any required field is empty
      const emptyFields = requiredFields.filter(
        (field) => !formData[field.key as keyof typeof formData]
      );
      if (emptyFields.length > 0) {
        toast.error(
          `Please fill in ${emptyFields.map((f) => f.label).join(", ")}`
        );
        return;
      }

      // Validate GST number format (15 characters)
      const gstRegex = /^[0-9A-Z]{15}$/;
      if (!gstRegex.test(formData.gstNumber)) {
        toast.error("Please enter a valid 15-character GST number");
        return;
      }

      // Get store_id from the registration response stored in state or context
      const storeId = registerResponse?.data?.store_id;
      if (!storeId) {
        toast.error("Please save basic details first");
        return;
      }

      const response = await dispatch(
        updateBusinessSettings(storeId, {
          business_type_id: Number(formData.businessType),
          gstin: formData.gstNumber,
          signature: formData.signature,
          section_key: "BUSINESS_DETAILS",
        })
      );

      console.log("Business Settings Response:", response);

      if (response?.meta?.status) {
        toast.success("GST details saved successfully");
      } else {
        toast.error(response?.meta?.message || "Failed to save GST details");
      }
    } catch (error: any) {
      console.error("Error saving GST details:", error);
      const errorMessage =
        error?.response?.data?.meta?.message ||
        error?.message ||
        "Failed to save GST details";
      toast.error(errorMessage);
    }
  };

  const handleBankDetailsSave = async () => {
    try {
      // Validate required fields
      const requiredFields = [
        { key: "bankName", label: "Bank Name" },
        { key: "ifscCode", label: "IFSC Code" },
        { key: "accountNumber", label: "Account Number" },
        { key: "beneficiaryName", label: "Beneficiary Name" },
        { key: "cancelledCheque", label: "Cancelled Cheque" },
      ];

      // Check if any required field is empty
      const emptyFields = requiredFields.filter(
        (field) => !formData[field.key as keyof typeof formData]
      );
      if (emptyFields.length > 0) {
        toast.error(
          `Please fill in ${emptyFields.map((f) => f.label).join(", ")}`
        );
        return;
      }

      // Get store_id from the registration response
      const storeId = registerResponse?.data?.store_id;
      if (!storeId) {
        toast.error("Please save basic details first");
        return;
      }

      const response = await dispatch(
        updateBankDetails(storeId, {
          account_holder_name: formData.beneficiaryName,
          account_number: formData.accountNumber,
          canceller_cheque: formData.cancelledCheque,
          ifsc_code: formData.ifscCode,
          bank_name: formData.bankName,
          section_key: "BANK_DETAILS",
        })
      );

      console.log("Bank Details Response:", response);

      if (response?.meta?.status) {
        toast.success("Bank details saved successfully");
      } else {
        toast.error(response?.meta?.message);
      }
    } catch (error: any) {
      console.error("Error saving bank details:", error);
      const errorMessage =
        error?.response?.data?.meta?.message || error?.message;
      toast.error(errorMessage);
    }
    navigate("/dashboard/sellers");
  };

  // Add image handling function
  const handleImageLink = (id: string, link: string | null, index?: number) => {
    console.log("Image uploaded:", { id, link, index });
    setFormData((prev) => ({
      ...prev,
      [id]: link,
    }));
  };

  const formFields = [
    {
      title: "Seller Basics Details",
      description:
        "This information represents partner basic details which is useful for identification of a partner",
      fields: [
        {
          type: "select",
          key: "companyName",
          label: "Company Name",
          id: "company-select-add-seller",
          required: true,
          value: formData.companyName,
          placeholder: "Select company name",
          options: companyOptions,
          isLoading: companiesLoading,
        },
        {
          type: "select",
          key: "branchName",
          label: "Branch Name",
          id: "branch-select-add-seller",
          required: true,
          value: formData.branchName,
          placeholder: "Select branch name",
          options: branchOptions,
          isLoading: branchesLoading,
          // disabled: !formData.companyName
        },
        {
          type: "select",
          key: "partnerName",
          label: "Partner Name",
          required: true,
          id: "partner-select-add-seller",
          value: formData.partnerName,
          placeholder: "Select partner name",
          options: partnerOptions,
          isLoading: partnersLoading,
        },
        {
          type: "text",
          key: "sellerName",
          label: "Seller Name",
          id: "seller-name-add-seller",
          required: true,
          value: formData.sellerName,
          placeholder: "Enter seller name",
        },
        {
          type: "email",
          key: "email",
          label: "Email",
          id: "email-add-seller",
          required: true,
          value: formData.email,
          placeholder: "Enter email address",
        },
        {
          type: "text",
          key: "mobileNumber",
          label: "Mobile Number",
          id: "mobile-number-add-seller",
          required: true,
          value: formData.mobileNumber,
          placeholder: "Enter mobile number",
        },
        {
          type: "text",
          key: "storeName",
          label: "Store Name",
          id: "store-name-add-seller",
          required: true,
          value: formData.storeName,
          placeholder: "Enter store name",
        },
        {
          type: "text",
          key: "storeWebsite",
          label: "Store Website",
          id: "store-website-add-seller",
          value: formData.storeWebsite,
          placeholder: "Enter store website",
        },
        {
          type: "textarea",
          key: "address",
          label: "Address",
          id: "address-add-seller",
          required: true,
          value: formData.address,
          placeholder: "Enter complete address",
        },
        {
          type: "text",
          key: "state",
          label: "State",
          id: "state-add-seller",
          required: true,
          value: formData.state,
          placeholder: "Enter state",
        },
        {
          type: "text",
          key: "city",
          label: "City",
          id: "city-add-seller",
          required: true,
          value: formData.city,
          placeholder: "Enter city",
        },
        {
          type: "text",
          key: "pinCode",
          label: "Pin Code",
          id: "pin-code-add-seller",
          required: true,
          value: formData.pinCode,
          placeholder: "Enter pin code",
        },
      ],
    },
    {
      title: "GST PAN Details",
      description:
        "This information represents Company Contact Person details which is useful for further communication",
      fields: [
        {
          type: "text",
          key: "gstNumber",
          label: "GST Number",
          id: "gst-number-add-seller",
          required: true,
          value: formData.gstNumber,
          placeholder: "Enter GST Number",
        },
        {
          type: "radio",
          key: "businessType",
          label: "Business Type",
          id: "business-type-add-seller",
          required: true,
          value: formData.businessType,
          options: businessTypeOptions,
          isLoading: lookupLoading,
          onChange: (value: string) => handleInputChange("businessType", value),
          radioStyle: "grid grid-cols-1 gap-4 sm:grid-cols-2",
        },
        {
          type: "image",
          key: "govtAuthorizedProof",
          label: "Upload Government Authorized Id Proof",
          id: "govt-authorized-proof-add-seller",
          value: formData.govtAuthorizedProof,
          // required: true,
          description:
            "For the ID proof image, please ensure image is not blur or shine or has any light glare on it. Any Government Authorized ID proof will work. Like Aadhar Card, PAN Card, Voter ID Card etc.",
        },
        {
          type: "image",
          key: "signature",
          label: "Upload Your Signature",
          id: "signature-add-seller",
          value: formData.signature,
          required: true,
          description:
            "Upload your signature which is required for legal documentations.",
        },
      ],
    },
    {
      title: "Banking Details",
      description:
        "This information represents Company Banking details which is useful for payments of a Company",
      fields: [
        {
          type: "text",
          key: "bankName",
          label: "Bank Name",
          id: "bank-name-add-seller",
          required: true,
          value: formData.bankName,
          placeholder: "Enter bank name",
        },
        {
          type: "text",
          key: "ifscCode",
          label: "IFSC Code",
          id: "ifsc-code-add-seller",
          required: true,
          value: formData.ifscCode,
          placeholder: "Enter IFSC code",
        },
        {
          type: "text",
          key: "accountNumber",
          label: "Account Number",
          id: "account-number-add-seller",
          required: true,
          value: formData.accountNumber,
          placeholder: "Enter account number",
        },
        {
          type: "text",
          key: "beneficiaryName",
          label: "Name Of Beneficiary Account holder",
          id: "beneficiary-name-add-seller",
          required: true,
          value: formData.beneficiaryName,
          placeholder: "Enter beneficiary name",
        },
        {
          type: "image",
          key: "cancelledCheque",
          label: "Upload Bank Cheque",
          id: "cancelled-cheque-add-seller",
          value: formData.cancelledCheque,
          required: true,
          description:
            "Upload your cancelled Cheque which is required for banking verification and penny drop",
        },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          id="back-button-add-seller"
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft id="back-icon-add-seller" size={20} />
        </button>
        <h1 className="text-xl font-semibold">Create Seller</h1>
      </div>

      <div className="space-y-6">
        {formFields.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-2">{section.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{section.description}</p>
            <AddForm
              data={section.fields}
              handleInputonChange={handleInputChange}
              handleSelectonChange={handleSelectChange}
              handleImageLink={handleImageLink}
            />
            <div className="flex justify-end mt-4">
              <button
                id={`save-details-button-add-seller-${index}`}
                onClick={
                  index === 0
                    ? handleBasicDetailsSave
                    : index === 1
                    ? handleGstDetailsSave
                    : handleBankDetailsSave
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save {index === 0 ? "Basic" : index === 1 ? "GST" : "Banking"}{" "}
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddSeller;
