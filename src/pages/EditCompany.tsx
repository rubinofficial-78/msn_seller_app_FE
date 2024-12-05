import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { getCompanyById, updateCompany } from '../redux/Action/action';
import { RootState } from '../redux/types';
import { toast } from 'react-hot-toast';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-medium">Edit Company</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Basic Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">White Label URL</label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Person Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Contact Person Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person Name</label>
              <input
                type="text"
                name="contact_person_name"
                value={formData.contact_person_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person Email</label>
              <input
                type="email"
                name="contact_person_email"
                value={formData.contact_person_email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person Mobile</label>
              <input
                type="tel"
                name="contact_person_mobile"
                value={formData.contact_person_mobile}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Address Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Business Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">GST Number</label>
              <input
                type="text"
                name="gst_number"
                value={formData.gst_number}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">PAN Number</label>
              <input
                type="text"
                name="pan_number"
                value={formData.pan_number}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Aadhar Number</label>
              <input
                type="text"
                name="aadhar_number"
                value={formData.aadhar_number}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Banking Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Banking Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                name="bank_account_number"
                value={formData.bank_account_number}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
              <input
                type="text"
                name="bank_account_holder_name"
                value={formData.bank_account_holder_name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
              <input
                type="text"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Brand Settings */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Brand Settings</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Header Logo</label>
              <input
                type="text"
                name="header_logo"
                value={formData.header_logo}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Header Color</label>
              <input
                type="color"
                name="header_color"
                value={formData.header_color}
                onChange={handleInputChange}
                className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Activation Charges</label>
              <input
                type="text"
                name="seller_activation_min_charges"
                value={formData.seller_activation_min_charges}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Activation Charges</label>
              <input
                type="text"
                name="seller_activation_max_charges"
                value={formData.seller_activation_max_charges}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompany; 