import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import AddForm from "../../components/AddForm";
import { getAccountDetails, uploadFile, updateAccountDetails } from '../../redux/Action/action';
import { RootState } from '../../redux/types';
import { toast } from 'react-hot-toast';

const AccountDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: accountData, loading } = useSelector((state: RootState) => state.data.accountDetails);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(getAccountDetails());
  }, [dispatch]);

  useEffect(() => {
    if (accountData?.sections) {
      const initialValues: Record<string, any> = {};
      accountData.sections.forEach(section => {
        section.fields.forEach(field => {
          initialValues[field.field_key] = field.value;
        });
      });
      setFormValues(initialValues);
    }
  }, [accountData]);

  const handleInputonChange = (key: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImageLink = (id: string, imageUrl: string | null) => {
    setFormValues(prev => ({
      ...prev,
      [id]: imageUrl
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Transform the current form values back into the API format
      const updatedData = {
        ...accountData,
        sections: accountData.sections.map(section => ({
          ...section,
          fields: section.fields.map(field => ({
            ...field,
            value: formValues[field.field_key] || field.value
          }))
        }))
      };

      const id = accountData?.id;
      if (!id) {
        throw new Error('Account ID not found');
      }

      await dispatch(updateAccountDetails(id, updatedData));
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setIsSaving(false);
    }
  };

  const transformFieldsToFormData = () => {
    const formFields: any[] = [];
    
    accountData?.sections?.forEach(section => {
      // Add fields for this section without section header
      section.fields.forEach(field => {
        formFields.push({
          type: getFieldType(field.field_type),
          key: field.field_key,
          label: field.field_name,
          value: formValues[field.field_key] || field.value,
          required: field.is_mandatory,
          disabled: false, // Set to false to make fields editable
          placeholder: field.placeholder,
          description: field.field_type === 'image' 
            ? "For the logo image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, SVG." 
            : undefined,
          accept: field.field_type === 'image' ? "image/*" : undefined,
          attributes: field.attributes,
          maxLength: field.field_type === 'textarea' ? 1000 : undefined,
        });
      });
    });

    return formFields;
  };

  const getFieldType = (apiFieldType: string): string => {
    switch (apiFieldType) {
      case 'mobile_number':
        return 'text';
      case 'textarea':
        return 'textarea';
      case 'image':
        return 'image';
      case 'email':
        return 'text';
      default:
        return 'text';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen pb-20">
      <div className="space-y-8 p-6 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard/settings')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-sm text-gray-600">Application Settings</h2>
              <h1 className="text-2xl font-bold">Company Settings</h1>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {accountData?.sections?.map((section) => (
            <div key={section.section_key} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">{section.section_name}</h2>
              <AddForm
                data={transformFieldsToFormData().filter(field => 
                  section.fields.some(sectionField => sectionField.field_key === field.key)
                )}
                handleInputonChange={handleInputonChange}
                handleImageLink={handleImageLink}
                edit={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button - Now positioned within the content flow */}
      <div className="sticky bottom-0 bg-white border-t shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-blue-400"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
