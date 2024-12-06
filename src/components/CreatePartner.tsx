import React, { useState, useEffect } from 'react';
import AddForm from '../components/AddForm';
import { ArrowLeft } from 'lucide-react';
import { createPartnerBasic, createPartnerBanking, createPartnerAffiliate ,getCompanyDropdown, getBranchDropdown, getAffiliateUrl} from '../redux/Action/action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { RootState } from '../redux/types';

interface PartnerFormData {
  companyName: string | number;
  branchName: string | number;
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

const CreatePartner: React.FC = () => {
  const [formData, setFormData] = useState<PartnerFormData>({} as PartnerFormData);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<number | null>(null);
  const [basicCompleted, setBasicCompleted] = useState(false);
  const [bankingCompleted, setBankingCompleted] = useState(false);

  // Get companies and branches from Redux store
  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  const { data: branches = [] } = useSelector(
    (state: RootState) => state.data.branchDropdown || {}
  );

  // Fetch companies and branches on mount
  useEffect(() => {
    dispatch(getCompanyDropdown());
    dispatch(getBranchDropdown());
  }, [dispatch]);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleBasicSave = async () => {
    try {
      const basicData = {
        first_name: formData.partnerName,
        name: formData.partnerName,
        email: formData.email,
        mobile_number: formData.mobileNumber,
        website: formData.website,
        aadhaar_number: formData.aadhaarNumber,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        created_by_id: formData.branchName.value,
        parent_company_id: formData.companyName.value
      };

      const response = await dispatch(createPartnerBasic(basicData));
      if (response?.meta?.status) {
        toast.success('Partner basic details saved successfully');
        const newUserId = response.data.id;
        setUserId(newUserId);
        setBasicCompleted(true);

        // Fetch and set affiliate URL
        try {
          const affiliateUrlResponse = await dispatch(getAffiliateUrl(newUserId));
          console.log('Affiliate URL API Response:', {
            fullResponse: affiliateUrlResponse,
            url: affiliateUrlResponse?.dynamic_affiliate_url
          });
          
          if (affiliateUrlResponse) {
            setFormData(prev => ({
              ...prev,
              dynamicAffiliateUrl: affiliateUrlResponse.dynamic_affiliate_url || ''
            }));
          }
        } catch (error) {
          console.error('Error fetching affiliate URL:', error);
          toast.error('Failed to fetch affiliate URL');
        }
      }
    } catch (error) {
      toast.error('Failed to save partner basic details');
      console.error(error);
    }
  };

  const handleBankingSave = async () => {
    if (!userId) {
      toast.error('Please save basic details first');
      return;
    }

    try {
      const bankingData = {
        bank_account_number: formData.bankAccountNumber,
        gst_number: formData.gstNo,
        pan_number: formData.panNo,
        bank_name: formData.bankName,
        ifsc_code: formData.ifscNo,
        bank_account_holder_name: formData.bankAccountHolderName,
        core_user_id: userId
      };

      const response = await dispatch(createPartnerBanking(bankingData));
      if (response?.meta?.status) {
        toast.success('Partner banking details saved successfully');
        setBankingCompleted(true);
      }
    } catch (error) {
      toast.error('Failed to save banking details');
      console.error(error);
    }
  };

  const handleAffiliateSave = async () => {
    if (!userId || !bankingCompleted) {
      toast.error('Please complete basic and banking details first');
      return;
    }

    try {
      const categories = [
        { type: 'New Seller OnBoarding', key: 'newSeller', moduleLinked: 'Seller Profile' },
        { type: 'Fashion', key: 'fashion' },
        { type: 'F&B', key: 'fnb' },
        { type: 'Groceries', key: 'groceries' },
        { type: 'Beauty & Personal Care', key: 'beauty' },
        { type: 'Electronics', key: 'electronics' },
        { type: 'Pharma', key: 'pharma' },
        { type: 'Home & Decor', key: 'homeDecor' }
      ];

      const affiliateSettings = categories.map(category => ({
        dynamic_affiliate_url: formData.dynamicAffiliateUrl,
        category_type: category.type,
        module_linked: category.moduleLinked || 'Order Module (On Completed Order Only)',
        commission_type: formData[`${category.key}CommissionType.value`],
        value: formData[`${category.key}CommissionValue`] ? Number(formData[`${category.key}CommissionValue`]) : null,
        core_user_id: userId
      }));

      console.log('Affiliate Settings Payload:', affiliateSettings);

      const response = await dispatch(createPartnerAffiliate(affiliateSettings));
      if (response?.meta?.status) {
        toast.success('Affiliate settings saved successfully');
      }
    } catch (error) {
      toast.error('Failed to save affiliate settings');
      console.error(error);
    }
  };

  // Modify the form fields based on completion status
  const getAffiliateFields = () => {
    if (!bankingCompleted) {
      return [
        {
          type: 'text',
          key: 'dynamicAffiliateUrl',
          label: 'Dynamic Affiliate Url',
          value: formData.dynamicAffiliateUrl,
          placeholder: 'Enter dynamic affiliate URL'
        }
      ];
    }

    const categories = [
      {
        name: 'New Seller OnBoarding',
        key: 'newSeller',
        moduleLinked: 'Seller Profile'
      },
      {
        name: 'Fashion',
        key: 'fashion',
        moduleLinked: 'Order Module (On Completed Order Only)'
      },
      {
        name: 'F&B',
        key: 'fnb',
        moduleLinked: 'Order Module (On Completed Order Only)'
      },
      {
        name: 'Groceries',
        key: 'groceries',
        moduleLinked: 'Order Module (On Completed Order Only)'
      },
      {
        name: 'Beauty & Personal Care',
        key: 'beauty',
        moduleLinked: 'Order Module (On Completed Order Only)'
      },
      {
        name: 'Electronics',
        key: 'electronics',
        moduleLinked: 'Order Module (On Completed Order Only)'
      },
      {
        name: 'Pharma',
        key: 'pharma',
        moduleLinked: 'Order Module (On Completed Order Only)'
      },
      {
        name: 'Home & Decor',
        key: 'homeDecor',
        moduleLinked: 'Order Module (On Completed Order Only)'
      }
    ];

    return [
      {
        type: 'text',
        key: 'dynamicAffiliateUrl',
        label: 'Dynamic Affiliate Url',
        value: formData.dynamicAffiliateUrl,
        placeholder: 'Enter dynamic affiliate URL'
      },
      ...categories.flatMap(category => [
        {
          type: 'label',
          key: `${category.key}Label`,
          label: category.name,
          subLabel: category.moduleLinked,
          className: 'mt-4'
        },
        {
          type: 'select',
          key: `${category.key}CommissionType`,
          label: 'Type',
          value: formData[`${category.key}CommissionType`],
          options: [
            { label: 'Flat', value: 'Flat' },
            { label: 'Percentage', value: 'Percentage' }
          ]
        },
        {
          type: 'text',
          key: `${category.key}CommissionValue`,
          label: 'Affiliate Commission',
          value: formData[`${category.key}CommissionValue`],
          placeholder: 'Enter commission value'
        }
      ])
    ];
  };

  const formFields = [
    {
      title: 'Partner Basics',
      description: 'This information represents partner basic details which is useful for identification of a partner',
      fields: [
        {
          type: 'select',
          key: 'companyName',
          label: 'Company Name',
          id: 'company-name-input',
          required: true,
          value: formData.companyName,
          options: companies.map(company => ({
            label: company.name,
            value: company.id
          })),
          placeholder: 'Select company'
        },
        {
          type: 'select',
          key: 'branchName',
          label: 'Branch Name',
          required: true,
          id: 'branch-name-input',
          value: formData.branchName,
          options: branches.map(branch => ({
            label: branch.name,
            value: branch.id
          })),
          placeholder: 'Select branch'
        },
        {
          type: 'text',
          key: 'partnerName',
          label: 'Partner Name',
          required: true,
          value: formData.partnerName,
          placeholder: 'Enter partner name',
          id: 'partner-name-input'
        },
        {
          type: 'email',
          key: 'email',
          label: 'Email',
          required: true,
          value: formData.email,
          placeholder: 'Enter email address',
          id: 'email-input'
        },
        {
          type: 'text',
          key: 'mobileNumber',
          label: 'Mobile Number',
          required: true,
          value: formData.mobileNumber,
          placeholder: 'Enter mobile number',
          id: 'mobile-number-input'
        },
        {
          type: 'text',
          key: 'website',
          label: 'Website',
          value: formData.website,
          placeholder: 'Enter website URL',
          id: 'website-input'
        },
        {
          type: 'text',
          key: 'aadhaarNumber',
          label: 'Aadhaar Number',
          required: true,
          value: formData.aadhaarNumber,
          placeholder: 'Enter Aadhaar number',
          id: 'aadhaar-number-input'
        },
        {
          type: 'textarea',
          key: 'address',
          label: 'Address',
          required: true,
          value: formData.address,
          placeholder: 'Enter complete address',
          id: 'address-input'
        },
        {
          type: 'text',
          key: 'city',
          label: 'City',
          required: true,
          value: formData.city,
          placeholder: 'Enter city',
          id: 'city-input'
        },
        {
          type: 'text',
          key: 'state',
          label: 'State',
          required: true,
          value: formData.state,
          placeholder: 'Enter state',
          id: 'state-input'
        },
        {
          type: 'text',
          key: 'pincode',
          label: 'Pincode',
          required: true,
          value: formData.pincode,
          placeholder: 'Enter pincode',
          id: 'pincode-input'
        }
      ],
      isEnabled: true
    },
    {
      title: 'Partner Banking details',
      description: 'This information represents partner Banking details which is useful for payments of a partner',
      fields: [
        {
          type: 'text',
          key: 'gstNo',
          label: 'GST No',
          required: true,
          value: formData.gstNo,
          placeholder: 'Enter GST number',
          id: 'gst-number-input'
        },
        {
          type: 'text',
          key: 'panNo',
          label: 'PAN No',
          required: true,
          value: formData.panNo,
          placeholder: 'Enter PAN number',
          id: 'pan-number-input'
        },
        {
          type: 'text',
          key: 'bankAccountNumber',
          label: 'Bank Account Number',
          required: true,
          value: formData.bankAccountNumber,
          placeholder: 'Enter bank account number',
          id: 'bank-account-number-input'
        },
        {
          type: 'text',
          key: 'bankName',
          label: 'Bank Name',
          required: true,
          value: formData.bankName,
          placeholder: 'Enter bank name',
          id: 'bank-name-input'
        },
        {
          type: 'text',
          key: 'ifscNo',
          label: 'IFSC No',
          required: true,
          value: formData.ifscNo,
          placeholder: 'Enter IFSC code',
          id: 'ifsc-code-input'
        },
        {
          type: 'text',
          key: 'bankAccountHolderName',
          label: 'Bank Account Holder Name',
          required: true,
          value: formData.bankAccountHolderName,
          placeholder: 'Enter account holder name',
          id: 'beneficiary-name-input'
        }
      ],
      isEnabled: basicCompleted
    },
    {
      title: 'Affiliate Settings and details',
      description: 'This information is important to grant affiliate URL and other important details for the partner.',
      fields: getAffiliateFields(),
      isEnabled: basicCompleted
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          id="back-button-partner"
          onClick={() => window.history.back()} 
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft id="back-button-partner-icon" size={20} />
        </button>
        <h1 className="text-xl font-semibold">Create Partners</h1>
      </div>

      {/* Form Sections */}
      <div className="space-y-8">
        {formFields.map((section, index) => (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-lg shadow-sm ${!section.isEnabled ? 'opacity-50 pointer-events-none' : ''}`}
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
                id="save-button"
                onClick={() => {
                  if (index === 0) handleBasicSave();
                  else if (index === 1) handleBankingSave();
                  else if (index === 2) handleAffiliateSave();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={!section.isEnabled}
              >
                Save {section.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePartner;