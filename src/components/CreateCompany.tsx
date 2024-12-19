import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../redux/Action/action";
import AddForm from "./AddForm";
import { ArrowLeft } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { AppDispatch } from "../redux/store";

interface CompanyFormData {
  companyName: string;
  whiteLabeledUrl: string;
  website: string;
  mobileNumber: string;
  email: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  contactPersonName: string;
  contactPersonNumber: string;
  contactPersonEmail: string;
  contactPersonAadhar: string;
  gstNo: string;
  panNo: string;
  bankAccountNumber: string;
  bankName: string;
  ifscNo: string;
  accountHolderName: string;
  minActivationCharges: string;
  maxActivationCharges: string;
  headerLogo: string;
  headerColor: string;
}

const CreateCompany: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CompanyFormData>(
    {} as CompanyFormData
  );
  const [headerColor, setHeaderColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      "companyName",
      "whiteLabeledUrl",
      "mobileNumber",
      "email",
      "address",
      "state",
      "city",
      "pincode",
      "contactPersonName",
      "contactPersonNumber",
      "contactPersonEmail",
      "gstNo",
      "panNo",
      "bankAccountNumber",
      "bankName",
      "ifscNo",
      "accountHolderName",
      "minActivationCharges",
      "maxActivationCharges",
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof CompanyFormData]
    );

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return false;
    }

    // Validate company name length
    if (formData.companyName.length > 50) {
      toast.error("Company name should not exceed 50 characters");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Validate mobile number
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }

    // Validate Aadhar number (if provided)
    if (formData.contactPersonAadhar) {
      const aadharRegex = /^\d{12}$/;
      if (!aadharRegex.test(formData.contactPersonAadhar)) {
        toast.error("Please enter a valid 12-digit Aadhar number");
        return false;
      }
    }

    // Validate GST number (15 characters)
    const gstRegex = /^[0-9A-Z]{15}$/;
    if (!gstRegex.test(formData.gstNo)) {
      toast.error("Please enter a valid 15-character GST number");
      return false;
    }

    // Validate PAN number (10 characters)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.panNo)) {
      toast.error("Please enter a valid 10-character PAN number");
      return false;
    }

    // Validate pincode
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode (should not start with 0)");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const payload = {
        name: formData.companyName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        company_images: formData.headerLogo ? [formData.headerLogo] : [],
        contact_person_name: formData.contactPersonName,
        contact_person_email: formData.contactPersonEmail,
        contact_person_mobile: formData.contactPersonNumber,
        website: formData.website,
        address: formData.address,
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        gst_number: formData.gstNo,
        pan_number: formData.panNo,
        bank_account_number: formData.bankAccountNumber,
        bank_account_holder_name: formData.accountHolderName,
        bank_name: formData.bankName,
        ifsc_code: formData.ifscNo,
        header_color: headerColor,
        url: formData.whiteLabeledUrl,
        aadhar_number: formData.contactPersonAadhar,
        header_style: {
          logo: formData.headerLogo,
          background_color: headerColor,
        },
        seller_activation_min_charges: formData.minActivationCharges,
        seller_activation_max_charges: formData.maxActivationCharges,
      };

      const response = await dispatch(createCompany(payload));

      if (response?.meta?.status) {
        toast.success("Company created successfully!");

        setTimeout(() => {
          navigate("/dashboard/companies", {
            state: { refresh: true },
          });
        }, 1000);
      } else {
        toast.error(response?.meta?.message || "Failed to create company");
      }
    } catch (error) {
      toast.error(
        "Failed to create company: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const ColorPickerField = () => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Header Colour
        </label>
        <div className="relative">
          <div
            className="w-full h-12 border rounded-lg cursor-pointer flex items-center px-4"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <div className="flex items-center gap-4 w-full">
              <div
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: headerColor }}
              />
              <span className="text-gray-700">{headerColor.toUpperCase()}</span>
            </div>
          </div>

          {showColorPicker && (
            <div className="absolute z-10 mt-2">
              <div
                className="fixed inset-0"
                onClick={() => setShowColorPicker(false)}
              />
              <div className="relative">
                <HexColorPicker
                  color={headerColor}
                  onChange={setHeaderColor}
                  style={{
                    width: "320px",
                    height: "200px",
                  }}
                />
                <div className="mt-2 p-2 bg-white border rounded-lg shadow-lg">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        id="header-color-input"
                        type="text"
                        value={headerColor}
                        onChange={(e) => setHeaderColor(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                      {[
                        "#FF0000",
                        "#FFA500",
                        "#FFFF00",
                        "#008000",
                        "#0000FF",
                        "#800080",
                        "#000000",
                        "#808080",
                        "#FFFFFF",
                      ].map((color) => (
                        <div
                          key={color}
                          className="w-6 h-6 rounded cursor-pointer border"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setHeaderColor(color);
                            setShowColorPicker(false);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="mt-2 p-4 rounded-lg"
          style={{ backgroundColor: headerColor }}
        >
          <p className="text-white text-center">Preview</p>
        </div>
      </div>
    );
  };

  const formFields = [
    {
      title: "Company Partner Basics Details",
      description:
        "This information represents partner basic details which is useful for identification of a partner",
      fields: [
        {
          type: "text",
          key: "companyName",
          label: "Company Name",
          required: true,
          value: formData.companyName,
          placeholder: "Enter company name",
          id: "company-name-input",
        },
        {
          type: "text",
          key: "whiteLabeledUrl",
          label: "White Labeled Url",
          required: true,
          placeholder: "E.g. seller.zionmar.in",
          value: formData.whiteLabeledUrl,
          id: "white-labeled-url-input",
        },
        {
          type: "text",
          key: "website",
          label: "Website",
          value: formData.website,
          placeholder: "Enter website URL",
          id: "website-input",
        },
        {
          type: "text",
          key: "mobileNumber",
          label: "Mobile Number",
          required: true,
          value: formData.mobileNumber,
          placeholder: "Enter mobile number",
          id: "mobile-number-input",
        },
        {
          type: "email",
          key: "email",
          label: "Email",
          required: true,
          value: formData.email,
          placeholder: "Enter email address",
          id: "email-input",
        },
        {
          type: "textarea",
          key: "address",
          label: "Address",
          required: true,
          value: formData.address,
          placeholder: "Enter complete address",
          id: "address-input",
        },
        {
          type: "text",
          key: "state",
          label: "State",
          required: true,
          value: formData.state,
          placeholder: "Enter state",
          id: "state-input",
        },
        {
          type: "text",
          key: "city",
          label: "City",
          required: true,
          value: formData.city,
          placeholder: "Enter city",
          id: "city-input",
        },
        {
          type: "text",
          key: "pincode",
          label: "Pincode",
          required: true,
          value: formData.pincode,
          placeholder: "Enter pincode",
          id: "pincode-input",
        },
      ],
    },
    {
      title: "Company Contact Person Details",
      description:
        "This information represents Company Contact Person details which is useful for further communication",
      fields: [
        {
          type: "text",
          key: "contactPersonName",
          label: "Contact Person Name",
          required: true,
          value: formData.contactPersonName,
          placeholder: "Enter contact person name",
          id: "contact-person-name-input",
        },
        {
          type: "text",
          key: "contactPersonNumber",
          label: "Contact Person Number",
          required: true,
          value: formData.contactPersonNumber,
          placeholder: "Enter contact person number",
          id: "contact-person-number-input",
        },
        {
          type: "email",
          key: "contactPersonEmail",
          label: "Contact Person Email",
          required: true,
          value: formData.contactPersonEmail,
          placeholder: "Enter contact person email",
          id: "contact-person-email-input",
        },
        {
          type: "text",
          key: "contactPersonAadhar",
          label: "Contact Person Aadhar Number",
          value: formData.contactPersonAadhar,
          placeholder: "Enter Aadhar number",
          id: "contact-person-aadhar-input",
        },
      ],
    },
    {
      title: "Company Banking details",
      description:
        "This information represents Company Banking details which is useful for payments of a Company",
      fields: [
        {
          type: "text",
          key: "gstNo",
          label: "GST No",
          required: true,
          value: formData.gstNo,
          placeholder: "Enter GST number",
          id: "gst-number-input",
        },
        {
          type: "text",
          key: "panNo",
          label: "PAN No",
          required: true,
          value: formData.panNo,
          placeholder: "Enter PAN number",
          id: "pan-number-input",
        },
        {
          type: "text",
          key: "bankAccountNumber",
          label: "Bank Account Number",
          required: true,
          value: formData.bankAccountNumber,
          placeholder: "Enter bank account number",
          id: "bank-account-number-input",
        },
        {
          type: "text",
          key: "bankName",
          label: "Bank Name",
          required: true,
          value: formData.bankName,
          placeholder: "Enter bank name",
          id: "bank-name-input",
        },
        {
          type: "text",
          key: "ifscNo",
          label: "IFSC No",
          required: true,
          value: formData.ifscNo,
          placeholder: "Enter IFSC code",
          id: "ifsc-code-input",
        },
        {
          type: "text",
          key: "accountHolderName",
          label: "Bank Account Holder Name",
          required: true,
          value: formData.accountHolderName,
          placeholder: "Enter account holder name",
          id: "beneficiary-name-input",
        },
      ],
    },
    {
      title: "Company Brand Settings",
      description:
        "This information represents Company Brand Settings which is useful for styling and lookout",
      fields: [
        {
          type: "text",
          key: "minActivationCharges",
          label: "Seller Minimum Activation Charges",
          required: true,
          value: formData.minActivationCharges,
          placeholder: "Enter minimum activation charges",
          id: "min-activation-charges-input",
        },
        {
          type: "text",
          key: "maxActivationCharges",
          label: "Seller Maximum Activation Charges",
          required: true,
          value: formData.maxActivationCharges,
          placeholder: "Enter maximum activation charges",
          id: "max-activation-charges-input",
        },
        {
          type: "image",
          key: "headerLogo",
          label: "Header Logo",
          required: true,
          value: formData.headerLogo,
          placeholder: "Upload or drag and drop logo image",
          id: "header-logo-input",
        },
        {
          type: "custom",
          key: "headerColor",
          component: <ColorPickerField />,
        }
      ],
    },
  ];

  return (
    <>
      {/* Add the Toaster component */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
            id="back-button-company"
          >
            <ArrowLeft id="back-button-company-icon" size={20} />
          </button>
          <h1 className="text-xl font-semibold">Create Company Partners</h1>
        </div>

        {/* Form Sections */}
        <div className="space-y-8">
          {formFields.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-2">{section.title}</h2>
              <p className="text-sm text-gray-500 mb-6">
                {section.description}
              </p>
              <AddForm
                data={section.fields}
                handleInputonChange={handleInputChange}
                handleImageLink={(value) =>
                  handleInputChange("headerLogo", value)
                }
              />
            </div>
          ))}
        </div>

        {/* Update Save Button */}
        <div className="flex justify-end">
          <button
            id="save-button-company"
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "SAVING..." : "SAVE"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateCompany;
