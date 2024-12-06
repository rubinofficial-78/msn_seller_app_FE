import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit } from 'lucide-react';
import { getCompanyById } from '../redux/Action/action';
import { RootState } from '../redux/types';
import { AppDispatch } from '../redux/store';
import { toast } from 'react-hot-toast';

const ViewCompany: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  
  const { data: company, loading, error } = useSelector(
    (state: RootState) => state.data.companyDetails
  );

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

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!company) {
    return <div className="text-center">No company details found</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            id="back-button-view-company"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft id="back-icon-view-company" className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium">View Company</h1>
        </div>
        <button
          id="edit-button-view-company"
          onClick={() => navigate(`/dashboard/companies/edit/${id}`)}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Edit id="edit-icon-view-company" size={20} />
          Edit
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Company Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-gray-500">Company Name</h3>
              <p className="mt-1">{company.name}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="mt-1">{company.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Mobile Number</h3>
              <p className="mt-1">{company.mobile_number}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Created Date</h3>
              <p className="mt-1">{new Date(company.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Partner Company Details */}
        {company.partner_company?.[0] && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Partner Company Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-500">Contact Person</h3>
                <p className="mt-1">{company.partner_company[0].contact_person_name}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Contact Email</h3>
                <p className="mt-1">{company.partner_company[0].contact_person_email}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Contact Mobile</h3>
                <p className="mt-1">{company.partner_company[0].contact_person_mobile}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Address</h3>
                <p className="mt-1">{company.partner_company[0].address}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">GST Number</h3>
                <p className="mt-1">{company.partner_company[0].gst_number}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">PAN Number</h3>
                <p className="mt-1">{company.partner_company[0].pan_number}</p>
              </div>
            </div>
          </div>
        )}

        {/* Banking Details */}
        {company.partner_company?.[0] && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Banking Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-500">Bank Name</h3>
                <p className="mt-1">{company.partner_company[0].bank_name}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Account Number</h3>
                <p className="mt-1">{company.partner_company[0].bank_account_number}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Account Holder Name</h3>
                <p className="mt-1">{company.partner_company[0].bank_account_holder_name}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">IFSC Code</h3>
                <p className="mt-1">{company.partner_company[0].ifsc_code}</p>
              </div>
            </div>
          </div>
        )}

        {/* Brand Settings */}
        {company.partner_company?.[0] && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Brand Settings</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-500 mb-2">Company Logo</h3>
                {company.partner_company[0].header_style?.logo ? (
                  <img 
                    src={company.partner_company[0].header_style.logo}
                    alt="Company Logo"
                    className="h-20 w-auto object-contain border rounded-lg p-2"
                  />
                ) : (
                  <p className="text-gray-400">No logo uploaded</p>
                )}
              </div>

              <div>
                <h3 className="text-sm text-gray-500">White Label URL</h3>
                <p className="mt-1">{company.partner_company[0].url}</p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">Header Color</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div 
                    className="w-10 h-10 rounded-lg border"
                    style={{ 
                      backgroundColor: company.partner_company[0].header_style?.background_color || '#000000'
                    }}
                  />
                  <span className="text-sm text-gray-600">
                    {company.partner_company[0].header_style?.background_color || '#000000'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-500">Seller Activation Charges</h3>
                <div className="mt-1 space-y-1">
                  <p className="text-sm">
                    Min: ₹{company.seller_activation_min_charges || '0'}
                  </p>
                  <p className="text-sm">
                    Max: ₹{company.seller_activation_max_charges || '0'}
                  </p>
                </div>
              </div>

              {company.partner_company[0].favicon_icon && (
                <div>
                  <h3 className="text-sm text-gray-500 mb-2">Favicon</h3>
                  <img 
                    src={company.partner_company[0].favicon_icon}
                    alt="Favicon"
                    className="h-8 w-8 object-contain border rounded-lg p-1"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Details */}
        {company.partner_company?.[0] && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Additional Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-500">State</h3>
                <p className="mt-1">{company.partner_company[0].state}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">City</h3>
                <p className="mt-1">{company.partner_company[0].city}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Pincode</h3>
                <p className="mt-1">{company.partner_company[0].pincode}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Aadhar Number</h3>
                <p className="mt-1">{company.partner_company[0].aadhar_number}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCompany; 