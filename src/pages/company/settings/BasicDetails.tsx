import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import AddForm from "../../../components/AddForm";
import { getCompanyById, updateCompany } from "../../../redux/Action/action";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { RootState } from "../../../redux/types";
import { toast } from "react-toastify";

const BasicDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: companyData, loading, error } = useSelector((state: RootState) => state.data.companyDetails);
  const [formData, setFormData] = useState({
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    aadharNumber: ''
  });

  useEffect(() => {
    if (GLOBAL_CONSTANTS.company_id) {
      dispatch(getCompanyById(GLOBAL_CONSTANTS.company_id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (companyData) {
      const partnerCompany = companyData.partner_company?.[0];
      setFormData({
        contactPerson: partnerCompany?.contact_person_name || '',
        contactEmail: partnerCompany?.contact_person_email || '',
        contactPhone: partnerCompany?.contact_person_mobile || '',
        aadharNumber: partnerCompany?.aadhar_number || ''
      });
    }
  }, [companyData]);

  const contactFormFields = [
    {
      type: "section",
      label: "Contact Details",
      description: "Update your company's contact information"
    },
    {
      type: "text",
      key: "contactPerson",
      label: "Contact Person Name",
      required: true,
      placeholder: "Enter contact person name",
      value: formData.contactPerson
    },
    {
      type: "email",
      key: "contactEmail",
      label: "Contact Email",
      required: true,
      placeholder: "Enter contact email",
      value: formData.contactEmail
    },
    {
      type: "text",
      key: "contactPhone",
      label: "Contact Phone",
      required: true,
      placeholder: "Enter contact phone number",
      value: formData.contactPhone
    },
    {
      type: "text",
      key: "aadharNumber",
      label: "Aadhar Number",
      required: true,
      placeholder: "Enter Aadhar number",
      value: formData.aadharNumber
    }
  ];

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!companyData) return;
      
      const partnerCompany = companyData.partner_company?.[0];
      const payload = {
        name: companyData.name,
        email: companyData.email,
        mobile_number: companyData.mobile_number,
        contact_person_name: formData.contactPerson,
        contact_person_email: formData.contactEmail,
        contact_person_mobile: formData.contactPhone,
        website: partnerCompany?.website || '',
        address: partnerCompany?.address || '',
        state: partnerCompany?.state || '',
        city: partnerCompany?.city || '',
        pincode: partnerCompany?.pincode || '',
        url: partnerCompany?.url || '',
        aadhar_number: formData.aadharNumber
      };

      await dispatch(updateCompany(GLOBAL_CONSTANTS.company_id, payload));
      toast.success('Contact details updated successfully');
      // Refresh company details
      dispatch(getCompanyById(GLOBAL_CONSTANTS.company_id));
    } catch (error) {
      toast.error('Failed to update contact details');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  const partnerCompany = companyData?.partner_company?.[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard/company-settings")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Company Partner Basic Details</h1>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <p className="text-gray-600 mb-6">
          This information represents partner basic details which is useful for identification of a partner
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <p className="mt-1 text-gray-900">{companyData?.name || '--'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">White Labeled Url</label>
              <p className="mt-1 text-gray-900">{partnerCompany?.url || '--'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <p className="mt-1 text-gray-900">{companyData?.mobile_number || '--'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <p className="mt-1 text-gray-900">{partnerCompany?.address || '--'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <p className="mt-1 text-gray-900">{partnerCompany?.pincode || '--'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <p className="mt-1 text-gray-900">{partnerCompany?.website || '--'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{companyData?.email || '--'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <p className="mt-1 text-gray-900">{partnerCompany?.state || '--'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <p className="mt-1 text-gray-900">{partnerCompany?.city || '--'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <AddForm
          data={contactFormFields}
          handleInputonChange={handleInputChange}
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails; 