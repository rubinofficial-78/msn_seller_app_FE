import React, { useState } from 'react';
import AddForm from './AddForm';
import { Check } from 'lucide-react';

const SellerOnboarding = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    // Seller Store Information
    sellerName: '',
    mobileNumber: '',
    email: '',
    storeName: '',
    storeWebsite: '',
    address: '',
    state: '',
    city: '',
    pinCode: '',
    // GST Details
    gstNumber: '',
    businessType: '',
    govtAuthorizedProof: '',
    signature: '',
    // Banking Details
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    beneficiaryName: '',
    cancelledCheque: ''
  });

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFileUpload = (key: string, file: File) => {
    setFormData(prev => ({
      ...prev,
      [key]: file
    }));
  };

  const steps = [
    { number: 1, title: 'SELLER STORE INFORMATION', icon: 'check' },
    { number: 2, title: 'GST PAN DETAILS', icon: 'number' },
    { number: 3, title: 'BANKING DETAILS', icon: 'number' }
  ];

  const sellerStoreFields = [
    {
      title: 'Seller Information',
      fields: [
        {
          type: 'text',
          key: 'sellerName',
          label: 'Seller Name',
          required: true,
          value: formData.sellerName,
          placeholder: 'Enter seller name'
        },
        {
          type: 'text',
          key: 'mobileNumber',
          label: 'Mobile Number',
          required: true,
          value: formData.mobileNumber,
          placeholder: '9638527419'
        },
        {
          type: 'email',
          key: 'email',
          label: 'Email',
          required: true,
          value: formData.email,
          placeholder: 'sellerapp_admin@adya.ai'
        }
      ]
    },
    {
      title: 'Store Information',
      fields: [
        {
          type: 'text',
          key: 'storeName',
          label: 'Store Name',
          required: true,
          value: formData.storeName,
          placeholder: 'Enter store name'
        },
        {
          type: 'text',
          key: 'storeWebsite',
          label: 'Store Website',
          value: formData.storeWebsite,
          placeholder: 'Enter store website'
        }
      ]
    },
    {
      title: 'Store Location',
      fields: [
        {
          type: 'textarea',
          key: 'address',
          label: 'Address',
          required: true,
          value: formData.address,
          placeholder: 'Enter address'
        },
        {
          type: 'text',
          key: 'state',
          label: 'State',
          required: true,
          value: formData.state,
          placeholder: 'Enter state'
        },
        {
          type: 'text',
          key: 'city',
          label: 'City',
          required: true,
          value: formData.city,
          placeholder: 'Enter city'
        },
        {
          type: 'text',
          key: 'pinCode',
          label: 'Pin Code',
          required: true,
          value: formData.pinCode,
          placeholder: 'Enter pin code'
        }
      ]
    }
  ];

  const gstPanFields = [
    {
      title: 'GST, PAN & TAN Information',
      className: 'bg-[#F8FAFC] p-6 rounded-lg',
      fields: [
        {
          type: 'text',
          key: 'gstNumber',
          label: 'GST Number',
          required: true,
          value: formData.gstNumber,
          placeholder: 'Enter GST Number',
          hasVerifyButton: true,
          verifyButtonStyle: 'bg-[#1B2B65] text-white px-4 py-2 rounded absolute right-2 top-1/2 transform -translate-y-1/2'
        },
        {
          type: 'radio',
          key: 'businessType',
          label: 'Business Type',
          required: true,
          value: formData.businessType,
          options: [
            { label: 'Sole Proprietorship', value: 'sole_proprietorship' },
            { label: 'Private Limited Company', value: 'private_limited' },
            { label: 'Partnerships', value: 'partnerships' }
          ],
          radioStyle: 'flex flex-col space-y-3'
        }
      ]
    }
  ];

  const bankingFields = [
    {
      title: 'Banking Details',
      className: 'bg-[#F8FAFC] p-6 rounded-lg',
      fields: [
        {
          type: 'text',
          key: 'bankName',
          label: 'Bank Name',
          required: true,
          value: formData.bankName,
          placeholder: 'Bank Name'
        },
        {
          type: 'text',
          key: 'ifscCode',
          label: 'IFSC Code',
          required: true,
          value: formData.ifscCode,
          placeholder: 'IFSC Code'
        },
        {
          type: 'text',
          key: 'accountNumber',
          label: 'Account Number',
          required: true,
          value: formData.accountNumber,
          placeholder: 'Account number'
        },
        {
          type: 'text',
          key: 'beneficiaryName',
          label: 'Name Of Beneficiary Account holder',
          required: true,
          value: formData.beneficiaryName,
          placeholder: 'Name Of Beneficiary Account holder'
        }
      ]
    }
  ];

  const bankingUploadFields = [
    {
      title: 'Upload Blank Cheque',
      description: 'Upload your cancelled Cheque which is required for banking verifications and penny drop',
      uploadDescription: 'PNG, SVG up to 10MB',
      fields: [
        {
          type: 'file',
          key: 'cancelledCheque',
          label: 'Upload a file',
          required: true,
          value: formData.cancelledCheque,
          accept: '.png,.svg,.jpg',
          maxSize: '10MB',
          uploadBoxStyle: 'border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500',
          uploadText: 'Upload a file',
          uploadDescription: 'PNG, SVG up to 10MB'
        }
      ]
    }
  ];

  const handleNext = () => {
    setCompletedSteps(prev => [...prev, activeStep]);
    setActiveStep(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Steps Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex items-center ${
                completedSteps.includes(step.number) 
                  ? 'text-blue-600' 
                  : activeStep === step.number 
                    ? 'text-blue-600' 
                    : 'text-gray-400'
              }`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center mr-2
                ${completedSteps.includes(step.number)
                  ? 'bg-blue-600 text-white'
                  : activeStep === step.number
                    ? 'border-2 border-blue-600'
                    : 'bg-gray-200'
                }
              `}>
                {completedSteps.includes(step.number) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span className="font-medium">{step.title}</span>
            </div>
          ))}
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ 
                width: `${(completedSteps.length / (steps.length - 1)) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeStep === 1 && (
          <div className="space-y-8">
            {sellerStoreFields.map((section, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium mb-4">{section.title}</h2>
                <AddForm
                  data={section.fields}
                  handleInputonChange={handleInputChange}
                />
              </div>
            ))}
          </div>
        )}
        {activeStep === 2 && (
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              {gstPanFields.map((section, index) => (
                <div key={index} className={section.className}>
                  <h2 className="text-[#1E293B] text-lg font-medium mb-6">{section.title}</h2>
                  <AddForm
                    data={section.fields}
                    handleInputonChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {bankingUploadFields.map((section, index) => (
                <div key={index}>
                  <h2 className="text-[#1E293B] text-lg font-medium mb-2">{section.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                  <AddForm
                    data={section.fields}
                    handleInputonChange={handleFileUpload}
                  />
                  <p className="text-xs text-gray-500 mt-2">{section.uploadDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeStep === 3 && (
          <div className="grid grid-cols-2 gap-x-8">
            <div>
              {bankingFields.map((section, index) => (
                <div key={index} className={section.className}>
                  <h2 className="text-[#1E293B] text-lg font-medium mb-6">{section.title}</h2>
                  <AddForm
                    data={section.fields}
                    handleInputonChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {bankingUploadFields.map((section, index) => (
                <div key={index}>
                  <h2 className="text-[#1E293B] text-lg font-medium mb-2">{section.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                  <AddForm
                    data={section.fields}
                    handleInputonChange={handleFileUpload}
                  />
                  <p className="text-xs text-gray-500 mt-2">{section.uploadDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setActiveStep(prev => prev - 1)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          disabled={activeStep === 1}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SellerOnboarding; 