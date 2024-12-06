import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { getPartnerById } from '../../redux/Action/action';
import { toast } from 'react-hot-toast';

interface PartnerData {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  website: string;
  parent: {
    name: string;
  };
  parent_company: {
    name: string;
  };
  affiliate_partners_basic_details: [{
    aadhaar_number: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    partner_unique_id: string;
  }];
  affiliate_partners_banking_details: [{
    bank_account_number: string;
    gst_number: string;
    pan_number: string;
    bank_name: string;
    ifsc_code: string;
    bank_account_holder_name: string;
  }];
  seller_counts: number;
  status: {
    lookup_code: string;
    display_name: string;
  };
  affiliate_partners_affiliate_settings: [{
    category_type: string;
    commission_type: string;
    value: string | number;
    dynamic_affiliate_url: string;
  }];
}

const ViewPartner: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        if (id) {
          const response = await dispatch(getPartnerById(parseInt(id)));
          if (response?.meta?.status) {
            setPartnerData(response.data);
          } else {
            toast.error('Failed to fetch partner details');
          }
        }
      } catch (error) {
        console.error('Error fetching partner details:', error);
        toast.error('Failed to fetch partner details');
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, [dispatch, id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!partnerData) {
    return <div className="p-6">No partner data found</div>;
  }

  const basicDetails = partnerData.affiliate_partners_basic_details[0] || {};
  const bankingDetails = partnerData.affiliate_partners_banking_details[0] || {};

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            id="back-button-partner"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft id="back-icon-partner" size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">View Partner</h1>
            <p className="text-sm text-gray-600">Partner ID: {basicDetails.partner_unique_id}</p>
          </div>
        </div>
        
        {/* Add Edit Button */}
        <button
          id="edit-button-partner"
          onClick={() => navigate(`/dashboard/partners/edit/${id}`)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Edit id="edit-icon-partner" size={18} />
          <span>Edit Partner</span>
        </button>
      </div>

      {/* Partner Details */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Partner Name</label>
                <p className="mt-1">{partnerData.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Branch Name</label>
                <p className="mt-1">{partnerData.parent?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Company Name</label>
                <p className="mt-1">{partnerData.parent_company?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Website</label>
                <p className="mt-1">{partnerData.website}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Contact Information</label>
                <p className="mt-1">Email: {partnerData.email}</p>
                <p className="mt-1">Phone: {partnerData.mobile_number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Address</label>
                <p className="mt-1">{basicDetails.address}</p>
                <p className="mt-1">{basicDetails.city}, {basicDetails.state} - {basicDetails.pincode}</p>
              </div>
            
            </div>
          </div>

          {/* Banking Information */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Banking Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">GST Number</label>
                <p className="mt-1">{bankingDetails.gst_number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">PAN Number</label>
                <p className="mt-1">{bankingDetails.pan_number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Bank Account Number</label>
                <p className="mt-1">{bankingDetails.bank_account_number}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Bank Name</label>
                <p className="mt-1">{bankingDetails.bank_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">IFSC Code</label>
                <p className="mt-1">{bankingDetails.ifsc_code}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Account Holder Name</label>
                <p className="mt-1">{bankingDetails.bank_account_holder_name}</p>
              </div>
            </div>
          </div>

          {/* Affiliate Settings */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Affiliate Settings and Details</h2>
            
            {/* Dynamic Affiliate URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Dynamic Affiliate URL</label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-900">{partnerData.website}</p>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </button>
              </div>
            </div>

            {/* Commission Settings Table */}
            <div className="mt-6">
              <div className="grid grid-cols-3 gap-4 px-4 py-2 bg-gray-50 rounded-t-lg">
                <div className="text-sm font-medium text-gray-600">Select Categories</div>
                <div className="text-sm font-medium text-gray-600">Affiliate Commission</div>
                <div className="text-sm font-medium text-gray-600">Commission Type</div>
              </div>

              <div className="space-y-4 mt-2">
                {[
                  'Electronics',
                  'Pharma',
                  'Home & Decor',
                  'New Seller OnBoarding',
                  'Fashion',
                  'F&B',
                  'Groceries',
                  'Beauty & Personal Care'
                ].map((category) => {
                  const setting = partnerData.affiliate_partners_affiliate_settings?.find(
                    s => s.category_type === category
                  );

                  return (
                    <div key={category} className="grid grid-cols-3 gap-4 px-4 py-2 border-b">
                      <div>
                        <div className="font-medium text-gray-900">{category}</div>
                        <div className="text-sm text-gray-500">
                          {category === 'New Seller OnBoarding' 
                            ? 'Seller Profile'
                            : 'Order Module (On Completed Order Only)'}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {setting ? (
                          <span className="text-gray-900">{setting.value}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        {setting ? (
                          <span className="text-gray-900">{setting.commission_type}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPartner; 