import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { getCompanyById, updateCompany } from '../redux/Action/action';
import { RootState } from '../redux/types';
import { toast } from 'react-hot-toast';
import AddForm from '../components/AddForm';
import { HexColorPicker } from "react-colorful";

interface CompanyFormData {
  // Basic Details
  name: string;
  email: string;
  mobile_number: string;
  url: string;
  website: string;
  
  // Contact Person Details
  contact_person_name: string;
  contact_person_email: string;
  contact_person_mobile: string;
  
  // Address Details
  address: string;
  state: string;
  city: string;
  pincode: string;
  
  // Business Details
  gst_number: string;
  pan_number: string;
  aadhar_number: string;
  
  // Banking Details
  bank_name: string;
  bank_account_number: string;
  bank_account_holder_name: string;
  ifsc_code: string;
  
  // Brand Settings
  header_logo: string;
  header_color: string;
  seller_activation_min_charges: string;
  seller_activation_max_charges: string;
}

const EditCompany: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [headerColor, setHeaderColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const { data: company, loading } = useSelector(
    (state: RootState) => state.data.companyDetails
  );

  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    email: '',
    mobile_number: '',
    url: '',
    website: '',
    contact_person_name: '',
    contact_person_email: '',
    contact_person_mobile: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    gst_number: '',
    pan_number: '',
    aadhar_number: '',
    bank_name: '',
    bank_account_number: '',
    bank_account_holder_name: '',
    ifsc_code: '',
    header_logo: '',
    header_color: '#000000',
    seller_activation_min_charges: '50',
    seller_activation_max_charges: '70'
  });

  // Fetch company details on mount
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        await dispatch(getCompanyById(Number(id)));
      } catch (error) {
        toast.error('Failed to fetch company details');
      }
    };

    if (id) {
      fetchCompanyDetails();
    }
  }, [dispatch, id]);

  // Update form data when company details are loaded
  useEffect(() => {
    if (company && company.partner_company?.[0]) {
      const partnerCompany = company.partner_company[0];
      setFormData({
        name: company.name || '',
        email: company.email || '',
        mobile_number: company.mobile_number || '',
        url: partnerCompany.url || '',
        website: partnerCompany.website || '',
        contact_person_name: partnerCompany.contact_person_name || '',
        contact_person_email: partnerCompany.contact_person_email || '',
        contact_person_mobile: partnerCompany.contact_person_mobile || '',
        address: partnerCompany.address || '',
        state: partnerCompany.state || '',
        city: partnerCompany.city || '',
        pincode: partnerCompany.pincode || '',
        gst_number: partnerCompany.gst_number || '',
        pan_number: partnerCompany.pan_number || '',
        aadhar_number: partnerCompany.aadhar_number || '',
        bank_name: partnerCompany.bank_name || '',
        bank_account_number: partnerCompany.bank_account_number || '',
        bank_account_holder_name: partnerCompany.bank_account_holder_name || '',
        ifsc_code: partnerCompany.ifsc_code || '',
        header_logo: partnerCompany.header_style?.logo || '',
        header_color: partnerCompany.header_style?.background_color || '#000000',
        seller_activation_min_charges: company.seller_activation_min_charges || '50',
        seller_activation_max_charges: company.seller_activation_max_charges || '70'
      });
    }
  }, [company]);

  // Add validation function
  const validateForm = (): boolean => {
    // Company name validation
    if (formData.name.length > 50) {
      toast.error("Company name should not exceed 50 characters");
      return false;
    }

    // Pincode validation
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(formData.pincode)) {
      toast.error("Please enter a valid 6-digit pincode (should not start with 0)");
      return false;
    }

    // Aadhar validation
    if (formData.aadhar_number) {
      const aadharRegex = /^\d{12}$/;
      if (!aadharRegex.test(formData.aadhar_number)) {
        toast.error("Please enter a valid 12-digit Aadhar number");
        return false;
      }
    }

    // GST validation
    const gstRegex = /^[0-9A-Z]{15}$/;
    if (!gstRegex.test(formData.gst_number)) {
      toast.error("Please enter a valid 15-character GST number");
      return false;
    }

    // PAN validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan_number)) {
      toast.error("Please enter a valid 10-character PAN number");
      return false;
    }

    // Header Logo validation
    if (!formData.header_logo) {
      toast.error("Header Logo is mandatory");
      return false;
    }

    return true;
  };

  // Update handleSubmit to include validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile_number: formData.mobile_number,
        partner_company: [{
          url: formData.url,
          website: formData.website,
          contact_person_name: formData.contact_person_name,
          contact_person_email: formData.contact_person_email,
          contact_person_mobile: formData.contact_person_mobile,
          address: formData.address,
          state: formData.state,
          city: formData.city,
          pincode: formData.pincode,
          gst_number: formData.gst_number,
          pan_number: formData.pan_number,
          aadhar_number: formData.aadhar_number,
          bank_name: formData.bank_name,
          bank_account_number: formData.bank_account_number,
          bank_account_holder_name: formData.bank_account_holder_name,
          ifsc_code: formData.ifsc_code,
          header_style: {
            logo: formData.header_logo,
            background_color: formData.header_color
          }
        }],
        seller_activation_min_charges: formData.seller_activation_min_charges,
        seller_activation_max_charges: formData.seller_activation_max_charges
      };

      const response = await dispatch(updateCompany(Number(id), payload));
      
      if (response?.meta?.status) {
        toast.success('Company updated successfully');
        navigate('/dashboard/companies');
      } else {
        throw new Error(response?.meta?.message || 'Failed to update company');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update company');
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
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
                  style={{ width: "320px", height: "200px" }}
                />
                <div className="mt-2 p-2 bg-white border rounded-lg shadow-lg">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={headerColor}
                        onChange={(e) => setHeaderColor(e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </div>
                    {/* Color presets */}
                    <div className="grid grid-cols-6 gap-1">
                      {[
                        "#FF0000", "#FFA500", "#FFFF00",
                        "#008000", "#0000FF", "#800080",
                        "#000000", "#808080", "#FFFFFF",
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
      description: "This information represents partner basic details which is useful for identification of a partner",
      fields: [
        {
          type: "text",
          key: "name",
          label: "Company Name",
          required: true,
          value: formData.name,
          placeholder: "Enter company name",
          id: "company-name-input",
        },
        {
          type: "text",
          key: "url",
          label: "White Labeled Url",
          required: true,
          value: formData.url,
          placeholder: "E.g. seller.zionmar.in",
          id: "white-labeled-url-input",
          disabled: true,
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
          key: "mobile_number",
          label: "Mobile Number",
          required: true,
          value: formData.mobile_number,
          placeholder: "Enter mobile number",
          id: "mobile-number-input",
          disabled: true,
        },
        {
          type: "email",
          key: "email",
          label: "Email",
          required: true,
          value: formData.email,
          placeholder: "Enter email address",
          id: "email-input",
          disabled: true,
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
      description: "This information represents Company Contact Person details which is useful for further communication",
      fields: [
        {
          type: "text",
          key: "contact_person_name",
          label: "Contact Person Name",
          required: true,
          value: formData.contact_person_name,
          placeholder: "Enter contact person name",
          id: "contact-person-name-input",
        },
        {
          type: "text",
          key: "contact_person_mobile",
          label: "Contact Person Number",
          required: true,
          value: formData.contact_person_mobile,
          placeholder: "Enter contact person number",
          id: "contact-person-number-input",
        },
        {
          type: "email",
          key: "contact_person_email",
          label: "Contact Person Email",
          required: true,
          value: formData.contact_person_email,
          placeholder: "Enter contact person email",
          id: "contact-person-email-input",
        },
        {
          type: "text",
          key: "aadhar_number",
          label: "Contact Person Aadhar Number",
          value: formData.aadhar_number,
          placeholder: "Enter Aadhar number",
          id: "contact-person-aadhar-input",
        },
      ],
    },
    {
      title: "Company Banking details",
      description: "This information represents Company Banking details which is useful for payments of a Company",
      fields: [
        {
          type: "text",
          key: "gst_number",
          label: "GST No",
          required: true,
          value: formData.gst_number,
          placeholder: "Enter GST number",
          id: "gst-number-input",
        },
        {
          type: "text",
          key: "pan_number",
          label: "PAN No",
          required: true,
          value: formData.pan_number,
          placeholder: "Enter PAN number",
          id: "pan-number-input",
        },
        {
          type: "text",
          key: "bank_account_number",
          label: "Bank Account Number",
          required: true,
          value: formData.bank_account_number,
          placeholder: "Enter bank account number",
          id: "bank-account-number-input",
        },
        {
          type: "text",
          key: "bank_name",
          label: "Bank Name",
          required: true,
          value: formData.bank_name,
          placeholder: "Enter bank name",
          id: "bank-name-input",
        },
        {
          type: "text",
          key: "ifsc_code",
          label: "IFSC No",
          required: true,
          value: formData.ifsc_code,
          placeholder: "Enter IFSC code",
          id: "ifsc-code-input",
        },
        {
          type: "text",
          key: "bank_account_holder_name",
          label: "Bank Account Holder Name",
          required: true,
          value: formData.bank_account_holder_name,
          placeholder: "Enter account holder name",
          id: "beneficiary-name-input",
        },
      ],
    },
    {
      title: "Company Brand Settings",
      description: "This information represents Company Brand Settings which is useful for styling and lookout",
      fields: [
        {
          type: "text",
          key: "seller_activation_min_charges",
          label: "Seller Minimum Activation Charges",
          required: true,
          value: formData.seller_activation_min_charges,
          placeholder: "Enter minimum activation charges",
          id: "min-activation-charges-input",
        },
        {
          type: "text",
          key: "seller_activation_max_charges",
          label: "Seller Maximum Activation Charges",
          required: true,
          value: formData.seller_activation_max_charges,
          placeholder: "Enter maximum activation charges",
          id: "max-activation-charges-input",
        },
        {
          type: "image",
          key: "header_logo",
          label: "Header Logo",
          required: true,
          value: formData.header_logo,
          placeholder: "Upload or drag and drop logo image",
          id: "header-logo-input",
        },
        {
          type: "custom",
          key: "headerColor",
          component: <ColorPickerField />,
        },
      ],
    },
  ];

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

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
        <h1 className="text-xl font-semibold">Edit Company Partners</h1>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {formFields.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-2">{section.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{section.description}</p>
            <AddForm
              data={section.fields}
              handleInputonChange={handleInputChange}
              handleImageLink={(value) => handleInputChange("header_logo", value)}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCompany; 