import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import AddForm from "../../../components/AddForm";
import { getCompanyById, updateCompany } from "../../../redux/Action/action";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { RootState } from "../../../redux/types";
import { toast } from "react-toastify";

const BankingDetailsCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: companyData, loading, error } = useSelector((state: RootState) => state.data.companyDetails);
  const [formData, setFormData] = useState({
    gstNo: '',
    panNo: '',
    bankAccountNumber: '',
    bankName: '',
    ifscNo: '',
    accountHolderName: ''
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
        gstNo: partnerCompany?.gst_number || '',
        panNo: partnerCompany?.pan_number || '',
        bankAccountNumber: partnerCompany?.bank_account_number || '',
        bankName: partnerCompany?.bank_name || '',
        ifscNo: partnerCompany?.ifsc_code || '',
        accountHolderName: partnerCompany?.bank_account_holder_name || ''
      });
    }
  }, [companyData]);

  const bankingFormFields = [
    {
      type: "section",
      label: "Company Banking details",
      description: "This information represents Company Banking details which is useful for payments of a Company"
    },
    {
      type: "text",
      key: "gstNo",
      label: "GST No",
      required: true,
      value: formData.gstNo,
      placeholder: "Enter GST number"
    },
    {
      type: "text",
      key: "panNo",
      label: "PAN No",
      required: true,
      value: formData.panNo,
      placeholder: "Enter PAN number"
    },
    {
      type: "text",
      key: "bankAccountNumber",
      label: "Bank Account Number",
      required: true,
      value: formData.bankAccountNumber,
      placeholder: "Enter bank account number"
    },
    {
      type: "text",
      key: "bankName",
      label: "Bank Name",
      required: true,
      value: formData.bankName,
      placeholder: "Enter bank name"
    },
    {
      type: "text",
      key: "ifscNo",
      label: "IFSC No",
      required: true,
      value: formData.ifscNo,
      placeholder: "Enter IFSC code"
    },
    {
      type: "text",
      key: "accountHolderName",
      label: "Bank Account Holder Name",
      required: true,
      value: formData.accountHolderName,
      placeholder: "Enter account holder name"
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
        // Keep existing data
        name: companyData.name,
        email: companyData.email,
        mobile_number: companyData.mobile_number,
        contact_person_name: partnerCompany?.contact_person_name || '',
        contact_person_email: partnerCompany?.contact_person_email || '',
        contact_person_mobile: partnerCompany?.contact_person_mobile || '',
        website: partnerCompany?.website || '',
        address: partnerCompany?.address || '',
        state: partnerCompany?.state || '',
        city: partnerCompany?.city || '',
        pincode: partnerCompany?.pincode || '',
        url: partnerCompany?.url || '',
        aadhar_number: partnerCompany?.aadhar_number || '',
        
        // Update only banking related fields
        gst_number: formData.gstNo,
        pan_number: formData.panNo,
        bank_account_number: formData.bankAccountNumber,
        bank_name: formData.bankName,
        ifsc_code: formData.ifscNo,
        bank_account_holder_name: formData.accountHolderName
      };

      await dispatch(updateCompany(GLOBAL_CONSTANTS.company_id, payload));
      toast.success('Banking details updated successfully');
      // Refresh company details
      dispatch(getCompanyById(GLOBAL_CONSTANTS.company_id));
    } catch (error) {
      toast.error('Failed to update banking details');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard/company-settings")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Company Banking details</h1>
      </div>

      <div className="bg-white rounded-lg">
        <AddForm
          data={bankingFormFields}
          handleInputonChange={handleInputChange}
        />

        <div className="flex justify-end p-6">
          <button
            onClick={handleSubmit}
            className="bg-red-900 text-white px-8 py-2 rounded hover:bg-red-800"
            disabled={loading}
          >
            {loading ? 'SAVING...' : 'SAVE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankingDetailsCompany; 