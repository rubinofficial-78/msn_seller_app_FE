import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import AddForm from "../../components/AddForm";
import { getBankingDetails, updateBankingDetails } from '../../redux/Action/action';
import { RootState } from '../../redux/types';
import { toast } from 'react-hot-toast';

const BankingDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: bankingData, loading } = useSelector((state: RootState) => state.data.bankingDetails);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(getBankingDetails());
  }, [dispatch]);

  useEffect(() => {
    if (bankingData?.sections) {
      const initialValues: Record<string, any> = {};
      bankingData.sections.forEach(section => {
        section.fields.forEach(field => {
          initialValues[field.field_key] = field.value;
        });
      });
      setFormValues(initialValues);
    }
  }, [bankingData]);

  const handleInputonChange = (key: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const updatedData = {
        ...bankingData,
        sections: bankingData.sections.map(section => ({
          ...section,
          fields: section.fields.map(field => ({
            ...field,
            value: formValues[field.field_key] || field.value
          }))
        }))
      };

      const id = bankingData?.id;
      if (!id) {
        throw new Error('Banking Details ID not found');
      }

      await dispatch(updateBankingDetails(id, updatedData));
      toast.success('Banking details updated successfully');
    } catch (error) {
      console.error('Error updating banking details:', error);
      toast.error('Failed to update banking details');
    } finally {
      setIsSaving(false);
    }
  };

  const transformFieldsToFormData = () => {
    const formFields: any[] = [];
    
    bankingData?.sections?.forEach(section => {
      section.fields.forEach(field => {
        formFields.push({
          type: field.field_type,
          key: field.field_key,
          label: field.field_name,
          value: formValues[field.field_key] || field.value,
          required: field.is_mandatory,
          disabled: false,
          placeholder: field.placeholder,
        });
      });
    });

    return formFields;
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
              <h1 className="text-2xl font-bold">GST, PAN and Bank Settings</h1>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {bankingData?.sections?.map((section) => (
            <div key={section.section_key} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">{section.section_name}</h2>
              <AddForm
                data={transformFieldsToFormData().filter(field => 
                  section.fields.some(sectionField => sectionField.field_key === field.key)
                )}
                handleInputonChange={handleInputonChange}
                edit={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
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

export default BankingDetailsPage; 