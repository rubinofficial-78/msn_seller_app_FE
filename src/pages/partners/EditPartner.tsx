import React, { useState, useEffect } from "react";
import AddForm from "../../components/AddForm";
import { ArrowLeft } from "lucide-react";
import {
  getPartners,
  updatePartner,
  getCompanyDropdown,
  getBranchDropdown,
  getAffiliateUrl,
} from "../../redux/Action/action";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RootState } from "../../redux/types";
import { useNavigate, useParams } from "react-router-dom";

interface PartnerFormData {
  companyName: {
    value: string | number;
    label: string;
  };
  branchName: {
    value: string | number;
    label: string;
  };
  partnerName: string;
  email: string;
  mobileNumber: string;
  website: string;
  aadhaarNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNo: string;
  panNo: string;
  bankAccountNumber: string;
  bankName: string;
  ifscNo: string;
  bankAccountHolderName: string;
  dynamicAffiliateUrl: string;
  newSellerCommissionType: string;
  newSellerCommissionValue: string;
  fashionCommissionType: string;
  fashionCommissionValue: string;
  fnbCommissionType: string;
  fnbCommissionValue: string;
  groceriesCommissionType: string;
  groceriesCommissionValue: string;
  beautyCommissionType: string;
  beautyCommissionValue: string;
  electronicsCommissionType: string;
  electronicsCommissionValue: string;
  pharmaCommissionType: string;
  pharmaCommissionValue: string;
  homeDecorCommissionType: string;
  homeDecorCommissionValue: string;
}

const EditPartner: React.FC = () => {
  const [formData, setFormData] = useState<PartnerFormData>({
    companyName: { value: "", label: "" },
    branchName: { value: "", label: "" },
    partnerName: "",
    email: "",
    mobileNumber: "",
    website: "",
    aadhaarNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNo: "",
    panNo: "",
    bankAccountNumber: "",
    bankName: "",
    ifscNo: "",
    bankAccountHolderName: "",
    dynamicAffiliateUrl: "",
    newSellerCommissionType: "",
    newSellerCommissionValue: "",
    fashionCommissionType: "",
    fashionCommissionValue: "",
    fnbCommissionType: "",
    fnbCommissionValue: "",
    groceriesCommissionType: "",
    groceriesCommissionValue: "",
    beautyCommissionType: "",
    beautyCommissionValue: "",
    electronicsCommissionType: "",
    electronicsCommissionValue: "",
    pharmaCommissionType: "",
    pharmaCommissionValue: "",
    homeDecorCommissionType: "",
    homeDecorCommissionValue: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [basicCompleted, setBasicCompleted] = useState(true);
  const [bankingCompleted, setBankingCompleted] = useState(true);
  const [basicDetailsId, setBasicDetailsId] = useState<number | null>(null);
  const [bankingDetailsId, setBankingDetailsId] = useState<number | null>(null);
  const [affiliateSettingsId, setAffiliateSettingsId] = useState<number | null>(
    null
  );

  // Get companies and branches from Redux store
  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  const { data: branches = [] } = useSelector(
    (state: RootState) => state.data.branchDropdown || {}
  );

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch dropdowns
        await dispatch(getCompanyDropdown());
        await dispatch(getBranchDropdown());

        if (id) {
          const response = await dispatch(
            getPartners({
              page_no: 1,
              per_page: 10,
              id: parseInt(id),
            })
          );

          if (response?.meta?.status) {
            const partnerData = response.data[0];
            if (partnerData) {
              const basicDetails =
                partnerData.affiliate_partners_basic_details[0] || {};
              const bankingDetails =
                partnerData.affiliate_partners_banking_details[0] || {};
              const affiliateSettings =
                partnerData.affiliate_partners_setting_details || [];

              // Store the section IDs
              setBasicDetailsId(basicDetails.id || null);
              setBankingDetailsId(bankingDetails.id || null);
              setAffiliateSettingsId(affiliateSettings[0]?.id || null);

              // Helper function to find commission settings by type
              const findCommissionSetting = (type: string) => {
                const setting = affiliateSettings.find(
                  (s: any) => s.category_type === type
                );
                return {
                  type: setting?.commission_type || "",
                  value: setting?.value?.toString() || "",
                };
              };

              // Get commission settings for each category
              const newSellerSetting = findCommissionSetting(
                "New Seller OnBoarding"
              );
              const fashionSetting = findCommissionSetting("Fashion");
              const fnbSetting = findCommissionSetting("F&B");
              const groceriesSetting = findCommissionSetting("Groceries");
              const beautySetting = findCommissionSetting(
                "Beauty & Personal Care"
              );
              const electronicsSetting = findCommissionSetting("Electronics");
              const pharmaSetting = findCommissionSetting("Pharma");
              const homeDecorSetting = findCommissionSetting("Home & Decor");

              setFormData({
                companyName: {
                  value: partnerData.parent_company?.id || "",
                  label: partnerData.parent_company?.name || "",
                },
                branchName: {
                  value: partnerData.parent?.id || "",
                  label: partnerData.parent?.name || "",
                },
                partnerName: partnerData.name || "",
                email: partnerData.email || "",
                mobileNumber: partnerData.mobile_number || "",
                website: partnerData.website || "",
                aadhaarNumber: basicDetails.aadhaar_number || "",
                address: basicDetails.address || "",
                city: basicDetails.city || "",
                state: basicDetails.state || "",
                pincode: basicDetails.pincode || "",
                gstNo: bankingDetails.gst_number || "",
                panNo: bankingDetails.pan_number || "",
                bankAccountNumber: bankingDetails.bank_account_number || "",
                bankName: bankingDetails.bank_name || "",
                ifscNo: bankingDetails.ifsc_code || "",
                bankAccountHolderName:
                  bankingDetails.bank_account_holder_name || "",
                dynamicAffiliateUrl: "", // Will be updated from getAffiliateUrl
                // Commission settings
                newSellerCommissionType: newSellerSetting.type,
                newSellerCommissionValue: newSellerSetting.value,
                fashionCommissionType: fashionSetting.type,
                fashionCommissionValue: fashionSetting.value,
                fnbCommissionType: fnbSetting.type,
                fnbCommissionValue: fnbSetting.value,
                groceriesCommissionType: groceriesSetting.type,
                groceriesCommissionValue: groceriesSetting.value,
                beautyCommissionType: beautySetting.type,
                beautyCommissionValue: beautySetting.value,
                electronicsCommissionType: electronicsSetting.type,
                electronicsCommissionValue: electronicsSetting.value,
                pharmaCommissionType: pharmaSetting.type,
                pharmaCommissionValue: pharmaSetting.value,
                homeDecorCommissionType: homeDecorSetting.type,
                homeDecorCommissionValue: homeDecorSetting.value,
              });

              // Fetch and set affiliate URL
              try {
                const affiliateUrlResponse = await dispatch(
                  getAffiliateUrl(parseInt(id))
                );
                if (affiliateUrlResponse) {
                  setFormData((prev) => ({
                    ...prev,
                    dynamicAffiliateUrl:
                      affiliateUrlResponse.dynamic_affiliate_url || "",
                  }));
                }
              } catch (error) {
                console.error("Error fetching affiliate URL:", error);
                toast.error("Failed to fetch affiliate URL");
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching partner details:", error);
        toast.error("Failed to fetch partner details");
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key: string, value: any) => {
    if (key === "companyName" || key === "branchName") {
      const selectedOption =
        key === "companyName"
          ? companies.find((company) => company.id === value)
          : branches.find((branch) => branch.id === value);

      setFormData((prev) => ({
        ...prev,
        [key]: {
          value: value,
          label: selectedOption?.name || "",
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Handle save functions
  const handleBasicSave = async () => {
    try {
      if (!basicDetailsId) {
        toast.error("Basic details ID not found");
        return;
      }

      // Only include fields that have values and are editable
      const basicData: { [key: string]: any } = {};

      // Only include editable fields
      if (formData.website) {
        basicData.website = formData.website;
      }
      if (formData.aadhaarNumber) {
        basicData.aadhaar_number = formData.aadhaarNumber;
      }
      if (formData.address) {
        basicData.address = formData.address;
      }
      if (formData.city) {
        basicData.city = formData.city;
      }
      if (formData.state) {
        basicData.state = formData.state;
      }
      if (formData.pincode) {
        basicData.pincode = formData.pincode;
      }

      // Only make the API call if there are fields to update
      if (Object.keys(basicData).length > 0) {
        const response = await dispatch(
          updatePartner(basicDetailsId, basicData)
        );
        if (response?.meta?.status) {
          toast.success("Partner basic details updated successfully");
        }
      } else {
        toast.info("No changes to update");
      }
    } catch (error) {
      toast.error("Failed to update partner basic details");
      console.error(error);
    }
  };

  // Update the formFields definition to include all fields
  const formFields = [
    {
      title: "Partner Basics",
      description:
        "This information represents partner basic details which is useful for identification of a partner",
      fields: [
        {
          type: "select",
          key: "companyName",
          label: "Company Name",
          required: true,
          value: formData?.companyName?.value || "",
          options: companies.map((company) => ({
            label: company.name,
            value: company.id,
          })),
          placeholder: "Select company",
          disabled: true,
        },
        {
          type: "select",
          key: "branchName",
          label: "Branch Name",
          required: true,
          value: formData?.branchName?.value || "",
          options: branches.map((branch) => ({
            label: branch.name,
            value: branch.id,
          })),
          placeholder: "Select branch",
          disabled: true,
        },
        {
          type: "text",
          key: "partnerName",
          label: "Partner Name",
          required: true,
          value: formData.partnerName,
          placeholder: "Enter partner name",
          disabled: true,
        },
        {
          type: "email",
          key: "email",
          label: "Email",
          required: true,
          value: formData.email,
          placeholder: "Enter email address",
          disabled: true,
        },
        {
          type: "text",
          key: "mobileNumber",
          label: "Mobile Number",
          required: true,
          value: formData.mobileNumber,
          placeholder: "Enter mobile number",
          disabled: true,
        },
        {
          type: "text",
          key: "website",
          label: "Website",
          value: formData.website,
          placeholder: "Enter website URL",
        },
        {
          type: "text",
          key: "aadhaarNumber",
          label: "Aadhaar Number",
          required: true,
          value: formData.aadhaarNumber,
          placeholder: "Enter Aadhaar number",
        },
        {
          type: "textarea",
          key: "address",
          label: "Address",
          required: true,
          value: formData.address,
          placeholder: "Enter complete address",
        },
        {
          type: "text",
          key: "city",
          label: "City",
          required: true,
          value: formData.city,
          placeholder: "Enter city",
        },
        {
          type: "text",
          key: "state",
          label: "State",
          required: true,
          value: formData.state,
          placeholder: "Enter state",
        },
        {
          type: "text",
          key: "pincode",
          label: "Pincode",
          required: true,
          value: formData.pincode,
          placeholder: "Enter pincode",
        },
      ],
      isEnabled: true,
    },
    {
      title: "Partner Banking details",
      description:
        "This information represents partner Banking details which is useful for payments of a partner",
      fields: [
        {
          type: "text",
          key: "gstNo",
          label: "GST No",
          required: true,
          value: formData.gstNo,
          placeholder: "Enter GST number",
        },
        {
          type: "text",
          key: "panNo",
          label: "PAN No",
          required: true,
          value: formData.panNo,
          placeholder: "Enter PAN number",
        },
        {
          type: "text",
          key: "bankAccountNumber",
          label: "Bank Account Number",
          required: true,
          value: formData.bankAccountNumber,
          placeholder: "Enter bank account number",
        },
        {
          type: "text",
          key: "bankName",
          label: "Bank Name",
          required: true,
          value: formData.bankName,
          placeholder: "Enter bank name",
        },
        {
          type: "text",
          key: "ifscNo",
          label: "IFSC No",
          required: true,
          value: formData.ifscNo,
          placeholder: "Enter IFSC code",
        },
        {
          type: "text",
          key: "bankAccountHolderName",
          label: "Bank Account Holder Name",
          required: true,
          value: formData.bankAccountHolderName,
          placeholder: "Enter account holder name",
        },
      ],
      isEnabled: basicCompleted,
    },
    {
      title: "Affiliate Settings and details",
      description:
        "This information is important to grant affiliate URL and other important details for the partner.",
      fields: [
        {
          type: "text",
          key: "dynamicAffiliateUrl",
          label: "Dynamic Affiliate Url",
          value: formData.dynamicAffiliateUrl,
          placeholder: "Enter dynamic affiliate URL",
        },
        // New Seller OnBoarding
        {
          type: "label",
          key: "newSellerLabel",
          label: "New Seller OnBoarding",
          subLabel: "Seller Profile",
          className: "mt-4",
        },
        {
          type: "select",
          key: "newSellerCommissionType",
          label: "Type",
          value: formData.newSellerCommissionType,
          options: [
            { label: "Flat", value: "Flat" },
            { label: "Percentage", value: "Percentage" },
          ],
        },
        {
          type: "text",
          key: "newSellerCommissionValue",
          label: "Affiliate Commission",
          value: formData.newSellerCommissionValue,
          placeholder: "Enter commission value",
        },
        // Fashion
        {
          type: "label",
          key: "fashionLabel",
          label: "Fashion",
          subLabel: "Order Module (On Completed Order Only)",
          className: "mt-4",
        },
        {
          type: "select",
          key: "fashionCommissionType",
          label: "Type",
          value: formData.fashionCommissionType,
          options: [
            { label: "Flat", value: "Flat" },
            { label: "Percentage", value: "Percentage" },
          ],
        },
        {
          type: "text",
          key: "fashionCommissionValue",
          label: "Affiliate Commission",
          value: formData.fashionCommissionValue,
          placeholder: "Enter commission value",
        },
        // F&B
        {
          type: "label",
          key: "fnbLabel",
          label: "F&B",
          subLabel: "Order Module (On Completed Order Only)",
          className: "mt-4",
        },
        {
          type: "select",
          key: "fnbCommissionType",
          label: "Type",
          value: formData.fnbCommissionType,
          options: [
            { label: "Flat", value: "Flat" },
            { label: "Percentage", value: "Percentage" },
          ],
        },
        {
          type: "text",
          key: "fnbCommissionValue",
          label: "Affiliate Commission",
          value: formData.fnbCommissionValue,
          placeholder: "Enter commission value",
        },
        // Groceries
        {
          type: "label",
          key: "groceriesLabel",
          label: "Groceries",
          subLabel: "Order Module (On Completed Order Only)",
          className: "mt-4",
        },
        {
          type: "select",
          key: "groceriesCommissionType",
          label: "Type",
          value: formData.groceriesCommissionType,
          options: [
            { label: "Flat", value: "Flat" },
            { label: "Percentage", value: "Percentage" },
          ],
        },
        {
          type: "text",
          key: "groceriesCommissionValue",
          label: "Affiliate Commission",
          value: formData.groceriesCommissionValue,
          placeholder: "Enter commission value",
        },
        // Beauty & Personal Care
        {
          type: "label",
          key: "beautyLabel",
          label: "Beauty & Personal Care",
          subLabel: "Order Module (On Completed Order Only)",
          className: "mt-4",
        },
        {
          type: "select",
          key: "beautyCommissionType",
          label: "Type",
          value: formData.beautyCommissionType,
          options: [
            { label: "Flat", value: "Flat" },
            { label: "Percentage", value: "Percentage" },
          ],
        },
        {
          type: "text",
          key: "beautyCommissionValue",
          label: "Affiliate Commission",
          value: formData.beautyCommissionValue,
          placeholder: "Enter commission value",
        },
        // Electronics
        {
          type: "label",
          key: "electronicsLabel",
          label: "Electronics",
          subLabel: "Order Module (On Completed Order Only)",
          className: "mt-4",
        },
        {
          type: "select",
          key: "electronicsCommissionType",
          label: "Type",
          value: formData.electronicsCommissionType,
          options: [
            { label: "Flat", value: "Flat" },
            { label: "Percentage", value: "Percentage" },
          ],
        },
        {
          type: "text",
          key: "electronicsCommissionValue",
          label: "Affiliate Commission",
          value: formData.electronicsCommissionValue,
          placeholder: "Enter commission value",
        },
        // Pharma
        {
          type: "label",
          key: "pharmaLabel",
          label: "Pharma",
          subLabel: "Order Module (On Completed Order Only)",
          className: "mt-4",
        },
        {
          type: "select",
          key: "pharmaCommissionType",
          label: "Type",
          value: formData.pharmaCommissionType,
          options: [
            { label: "Flat", value: "Flat" },
            { label: "Percentage", value: "Percentage" },
          ],
        },
        {
          type: "text",
          key: "pharmaCommissionValue",
          label: "Affiliate Commission",
          value: formData.pharmaCommissionValue,
          placeholder: "Enter commission value",
        },
        // Home & Decor
        {
          type: "label",
          key: "homeDecorLabel",
          label: "Home & Decor",
          subLabel: "Order Module (On Completed Order Only)",
          className: "mt-4",
        },
        {
          type: "select",
          key: "homeDecorCommissionType",
          label: "Type",
          value: formData.homeDecorCommissionType,
          options: [
            { label: "Flat", value: "Flat" },
            { label: "Percentage", value: "Percentage" },
          ],
        },
        {
          type: "text",
          key: "homeDecorCommissionValue",
          label: "Affiliate Commission",
          value: formData.homeDecorCommissionValue,
          placeholder: "Enter commission value",
        },
      ],
      isEnabled: bankingCompleted,
    },
  ];

  // Add handlers for banking and affiliate sections
  const handleBankingSave = async () => {
    try {
      if (!bankingDetailsId) {
        toast.error("Banking details ID not found");
        return;
      }

      const bankingData = {
        bank_account_number: formData.bankAccountNumber,
        gst_number: formData.gstNo,
        pan_number: formData.panNo,
        bank_name: formData.bankName,
        ifsc_code: formData.ifscNo,
        bank_account_holder_name: formData.bankAccountHolderName,
        core_user_id: parseInt(id!),
      };

      const response = await dispatch(
        updatePartner(bankingDetailsId, bankingData)
      );
      if (response?.meta?.status) {
        toast.success("Partner banking details updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update banking details");
      console.error(error);
    }
  };

  const handleAffiliateSave = async () => {
    try {
      if (!affiliateSettingsId || !id) {
        toast.error("Required IDs not found");
        return;
      }

      // Create array of settings with proper structure
      const affiliateSettings = [
        {
          id: affiliateSettingsId,
          dynamic_affiliate_url: formData.dynamicAffiliateUrl,
          core_user_id: parseInt(id),
          category_type: "New Seller OnBoarding",
          module_linked: "Seller Profile",
          commission_type: formData.newSellerCommissionType || null,
          value: formData.newSellerCommissionValue
            ? Number(formData.newSellerCommissionValue)
            : null,
        },
        {
          id: affiliateSettingsId + 1,
          dynamic_affiliate_url: formData.dynamicAffiliateUrl,
          core_user_id: parseInt(id),
          category_type: "Fashion",
          module_linked: "Order Module (On Completed Order Only)",
          commission_type: formData.fashionCommissionType || null,
          value: formData.fashionCommissionValue
            ? Number(formData.fashionCommissionValue)
            : null,
        },
        {
          id: affiliateSettingsId + 2,
          dynamic_affiliate_url: formData.dynamicAffiliateUrl,
          core_user_id: parseInt(id),
          category_type: "F&B",
          module_linked: "Order Module (On Completed Order Only)",
          commission_type: formData.fnbCommissionType || null,
          value: formData.fnbCommissionValue
            ? Number(formData.fnbCommissionValue)
            : null,
        },
        {
          id: affiliateSettingsId + 3,
          dynamic_affiliate_url: formData.dynamicAffiliateUrl,
          core_user_id: parseInt(id),
          category_type: "Groceries",
          module_linked: "Order Module (On Completed Order Only)",
          commission_type: formData.groceriesCommissionType || null,
          value: formData.groceriesCommissionValue
            ? Number(formData.groceriesCommissionValue)
            : null,
        },
        {
          id: affiliateSettingsId + 4,
          dynamic_affiliate_url: formData.dynamicAffiliateUrl,
          core_user_id: parseInt(id),
          category_type: "Beauty & Personal Care",
          module_linked: "Order Module (On Completed Order Only)",
          commission_type: formData.beautyCommissionType || null,
          value: formData.beautyCommissionValue
            ? Number(formData.beautyCommissionValue)
            : null,
        },
        {
          id: affiliateSettingsId + 5,
          dynamic_affiliate_url: formData.dynamicAffiliateUrl,
          core_user_id: parseInt(id),
          category_type: "Electronics",
          module_linked: "Order Module (On Completed Order Only)",
          commission_type: formData.electronicsCommissionType || null,
          value: formData.electronicsCommissionValue
            ? Number(formData.electronicsCommissionValue)
            : null,
        },
        {
          id: affiliateSettingsId + 6,
          dynamic_affiliate_url: formData.dynamicAffiliateUrl,
          core_user_id: parseInt(id),
          category_type: "Pharma",
          module_linked: "Order Module (On Completed Order Only)",
          commission_type: formData.pharmaCommissionType || null,
          value: formData.pharmaCommissionValue
            ? Number(formData.pharmaCommissionValue)
            : null,
        },
        {
          id: affiliateSettingsId + 7,
          dynamic_affiliate_url: formData.dynamicAffiliateUrl,
          core_user_id: parseInt(id),
          category_type: "Home & Decor",
          module_linked: "Order Module (On Completed Order Only)",
          commission_type: formData.homeDecorCommissionType || null,
          value: formData.homeDecorCommissionValue
            ? Number(formData.homeDecorCommissionValue)
            : null,
        },
      ];

      const response = await dispatch(
        updatePartner(affiliateSettingsId, affiliateSettings)
      );
      if (response?.meta?.status) {
        toast.success("Affiliate settings updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update affiliate settings");
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Edit Partner</h1>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {formFields.map((section, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-sm ${
              !section.isEnabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <h2 className="text-lg font-medium mb-2">{section.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{section.description}</p>
            <AddForm
              data={section.fields}
              handleInputonChange={handleInputChange}
              handleSelectonChange={handleSelectChange}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  if (index === 0) handleBasicSave();
                  else if (index === 1) handleBankingSave();
                  else if (index === 2) handleAffiliateSave();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!section.isEnabled}
              >
                Update {section.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPartner;
