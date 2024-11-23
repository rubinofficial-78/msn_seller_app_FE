import React, { useState } from 'react';
import AddForm from './AddForm';
import { ArrowLeft } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

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
  const [formData, setFormData] = useState<CompanyFormData>({} as CompanyFormData);
  const [headerColor, setHeaderColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Implement save logic
    console.log('Form data:', formData);
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
                    width: '320px',
                    height: '200px'
                  }}
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
                    <div className="grid grid-cols-6 gap-1">
                      {['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#800080', 
                        '#000000', '#808080', '#FFFFFF'].map((color) => (
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
      title: 'Company Partner Basics Details',
      description: 'This information represents partner basic details which is useful for identification of a partner',
      fields: [
        {
          type: 'text',
          key: 'companyName',
          label: 'Company Name',
          required: true,
          value: formData.companyName,
          placeholder: 'Enter company name'
        },
        {
          type: 'text',
          key: 'whiteLabeledUrl',
          label: 'White Labeled Url',
          required: true,
          placeholder: 'E.g. seller.zionmar.in',
          value: formData.whiteLabeledUrl
        },
        {
          type: 'text',
          key: 'website',
          label: 'Website',
          value: formData.website,
          placeholder: 'Enter website URL'
        },
        {
          type: 'text',
          key: 'mobileNumber',
          label: 'Mobile Number',
          required: true,
          value: formData.mobileNumber,
          placeholder: 'Enter mobile number'
        },
        {
          type: 'email',
          key: 'email',
          label: 'Email',
          required: true,
          value: formData.email,
          placeholder: 'Enter email address'
        },
        {
          type: 'textarea',
          key: 'address',
          label: 'Address',
          required: true,
          value: formData.address,
          placeholder: 'Enter complete address'
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
          key: 'pincode',
          label: 'Pincode',
          required: true,
          value: formData.pincode,
          placeholder: 'Enter pincode'
        }
      ]
    },
    {
      title: 'Company Contact Person Details',
      description: 'This information represents Company Contact Person details which is useful for further communication',
      fields: [
        {
          type: 'text',
          key: 'contactPersonName',
          label: 'Contact Person Name',
          required: true,
          value: formData.contactPersonName,
          placeholder: 'Enter contact person name'
        },
        {
          type: 'text',
          key: 'contactPersonNumber',
          label: 'Contact Person Number',
          required: true,
          value: formData.contactPersonNumber,
          placeholder: 'Enter contact person number'
        },
        {
          type: 'email',
          key: 'contactPersonEmail',
          label: 'Contact Person Email',
          required: true,
          value: formData.contactPersonEmail,
          placeholder: 'Enter contact person email'
        },
        {
          type: 'text',
          key: 'contactPersonAadhar',
          label: 'Contact Person Aadhar Number',
          value: formData.contactPersonAadhar,
          placeholder: 'Enter Aadhar number'
        }
      ]
    },
    {
      title: 'Company Banking details',
      description: 'This information represents Company Banking details which is useful for payments of a Company',
      fields: [
        {
          type: 'text',
          key: 'gstNo',
          label: 'GST No',
          required: true,
          value: formData.gstNo,
          placeholder: 'Enter GST number'
        },
        {
          type: 'text',
          key: 'panNo',
          label: 'PAN No',
          required: true,
          value: formData.panNo,
          placeholder: 'Enter PAN number'
        },
        {
          type: 'text',
          key: 'bankAccountNumber',
          label: 'Bank Account Number',
          required: true,
          value: formData.bankAccountNumber,
          placeholder: 'Enter bank account number'
        },
        {
          type: 'text',
          key: 'bankName',
          label: 'Bank Name',
          required: true,
          value: formData.bankName,
          placeholder: 'Enter bank name'
        },
        {
          type: 'text',
          key: 'ifscNo',
          label: 'IFSC No',
          required: true,
          value: formData.ifscNo,
          placeholder: 'Enter IFSC code'
        },
        {
          type: 'text',
          key: 'accountHolderName',
          label: 'Bank Account Holder Name',
          required: true,
          value: formData.accountHolderName,
          placeholder: 'Enter account holder name'
        }
      ]
    },
    {
      title: 'Company Brand Settings',
      description: 'This information represents Company Brand Settings which is useful for styling and lookout',
      fields: [
        {
          type: 'text',
          key: 'minActivationCharges',
          label: 'Seller Minimum Activation Charges',
          required: true,
          value: formData.minActivationCharges,
          placeholder: 'Enter minimum activation charges'
        },
        {
          type: 'text',
          key: 'maxActivationCharges',
          label: 'Seller Maximum Activation Charges',
          required: true,
          value: formData.maxActivationCharges,
          placeholder: 'Enter maximum activation charges'
        },
        {
          type: 'image',
          key: 'headerLogo',
          label: 'Header Logo',
          value: formData.headerLogo,
          placeholder: 'Upload or drag and drop logo image'
        },
        {
          type: 'custom',
          key: 'headerColor',
          component: <ColorPickerField />
        }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Create Company Partners</h1>
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
              handleImageLink={(value) => handleInputChange('headerLogo', value)}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default CreateCompany; 