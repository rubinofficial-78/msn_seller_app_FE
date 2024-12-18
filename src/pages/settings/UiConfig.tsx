import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { getUiConfig, updateEmailProvider } from '../../redux/Action/action';
import { RootState } from '../../redux/types';

interface ColorConfig {
  headerBackground: string;
  headerText: string;
  buttonBackground: string;
  buttonText: string;
  tableHeader: string;
  tableHeaderText: string;
}

const UiConfig = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: uiConfigData, loading, error } = useSelector(
    (state: RootState) => state.data.uiConfig
  );
  const [colors, setColors] = useState<ColorConfig>({
    headerBackground: '#1F2937',
    headerText: '#FFFFFF',
    buttonBackground: '#1D4ED8',
    buttonText: '#FFFFFF',
    tableHeader: '#E5E7EB',
    tableHeaderText: '#000000',
  });
  const [uploadedImages, setUploadedImages] = useState({
    logo: '',
    favicon: ''
  });
  const [currentImages, setCurrentImages] = useState({
    logo: '',
    favicon: ''
  });

  useEffect(() => {
    dispatch(getUiConfig());
  }, [dispatch]);

  useEffect(() => {
    if (uiConfigData) {
      // Find the brand colors section
      const brandColors = uiConfigData.sections.find(
        section => section.section_key === 'brand_colors'
      );

      if (brandColors) {
        const newColors = {
          headerBackground: brandColors.fields.find(f => f.field_key === 'background_color')?.value?.value || '#1F2937',
          headerText: brandColors.fields.find(f => f.field_key === 'text_color')?.value?.value || '#FFFFFF',
          buttonBackground: brandColors.fields.find(f => f.field_key === 'button_bg_color')?.value?.value || '#1D4ED8',
          buttonText: brandColors.fields.find(f => f.field_key === 'button_text_color')?.value?.value || '#FFFFFF',
          tableHeader: brandColors.fields.find(f => f.field_key === 'table_header_color')?.value?.value || '#E5E7EB',
          tableHeaderText: brandColors.fields.find(f => f.field_key === 'table_header_text_color')?.value?.value || '#000000',
        };
        setColors(newColors);
      }

      // Handle images
      const uiConfig = uiConfigData.sections.find(
        section => section.section_key === 'ui_configuration'
      );

      console.log('Full UI Config Data:', uiConfigData);
      console.log('UI Config Section:', uiConfig);
      
      if (uiConfig?.fields) {
        console.log('UI Config Fields:', uiConfig.fields);
        
        const logoField = uiConfig.fields.find(f => f.field_key === 'U');
        const faviconField = uiConfig.fields.find(f => f.field_key === 'B');
        
        console.log('Logo Field:', logoField);
        console.log('Favicon Field:', faviconField);
        
        const logoValue = logoField?.value;
        const faviconValue = faviconField?.value;
        
        console.log('Raw Logo Value:', logoValue);
        console.log('Raw Favicon Value:', faviconValue);

        setCurrentImages({
          logo: typeof logoValue === 'string' ? logoValue : logoValue?.value || '',
          favicon: typeof faviconValue === 'string' ? faviconValue : faviconValue?.value || ''
        });
      }
    }
  }, [uiConfigData]);

  // Add this to track currentImages changes
  useEffect(() => {
    console.log('Current Images State:', currentImages);
  }, [currentImages]);

  const handleColorChange = (key: keyof ColorConfig, value: string) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImageUpload = (type: 'logo' | 'favicon', file: string) => {
    setUploadedImages(prev => ({
      ...prev,
      [type]: file
    }));
    setCurrentImages(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const handleSubmit = async () => {
    if (!uiConfigData) return;

    try {
      const updatedSections = uiConfigData.sections.map(section => {
        if (section.section_key === 'brand_colors') {
          // Update color values
          return {
            section_key: section.section_key,
            section_name: section.section_name,
            section_sequence: section.section_sequence,
            section_description: section.section_description,
            fields: section.fields.map(field => ({
              env_key: field.env_key,
              field_key: field.field_key,
              field_name: field.field_name,
              field_type: field.field_type,
              is_editable: field.is_editable,
              placeholder: field.placeholder,
              is_mandatory: field.is_mandatory,
              allowed_values: field.allowed_values,
              field_sequence: field.field_sequence,
              attributes: field.attributes,
              value: {
                value: field.field_key === 'background_color' ? colors.headerBackground :
                       field.field_key === 'text_color' ? colors.headerText :
                       field.field_key === 'button_bg_color' ? colors.buttonBackground :
                       field.field_key === 'button_text_color' ? colors.buttonText :
                       field.field_key === 'table_header_color' ? colors.tableHeader :
                       field.field_key === 'table_header_text_color' ? colors.tableHeaderText :
                       field.value.value
              }
            }))
          };
        } else if (section.section_key === 'ui_configuration') {
          // Update image values
          return {
            section_key: section.section_key,
            section_name: section.section_name,
            section_sequence: section.section_sequence,
            section_description: section.section_description,
            fields: section.fields.map(field => ({
              env_key: field.env_key,
              field_key: field.field_key,
              field_name: field.field_name,
              field_type: field.field_type,
              is_editable: field.is_editable,
              placeholder: field.placeholder,
              is_mandatory: field.is_mandatory,
              allowed_values: field.allowed_values,
              field_sequence: field.field_sequence,
              attributes: field.attributes,
              value: {
                value: field.field_key === 'U' && uploadedImages.logo ? uploadedImages.logo :
                       field.field_key === 'B' && uploadedImages.favicon ? uploadedImages.favicon :
                       field.value.value
              }
            }))
          };
        }
        return section;
      });

      // Send sections directly as an array
      await dispatch(updateEmailProvider(uiConfigData.id, updatedSections));
      dispatch(getUiConfig()); // Refresh the UI config data
    } catch (error) {
      console.error('Failed to update UI configuration:', error);
    }
  };

  const ColorInput = ({ 
    label, 
    colorKey, 
    value 
  }: { 
    label: string; 
    colorKey: keyof ColorConfig; 
    value: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            id="color-input"
            type="color"
            value={value || '#000000'}
            onChange={(e) => handleColorChange(colorKey, e.target.value)}
            className="w-12 h-12 rounded cursor-pointer border p-1"
          />
        </div>
        <input 
          id="color-input-text"
          type="text"
          value={(value || '#000000').toUpperCase()}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="border rounded px-3 py-2 w-32 text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );

  const handleImageLink = (id: string, imageUrl: string, index?: number) => {
    if (id === 'logo-image-upload') {
      setCurrentImages(prev => ({
        ...prev,
        logo: imageUrl
      }));
    } else if (id === 'favicon-image-upload') {
      setCurrentImages(prev => ({
        ...prev,
        favicon: imageUrl
      }));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-4">
        <button
          id="back-button"
          onClick={() => navigate('/dashboard/settings')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">UI Configuration</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Upload Your Logo</h2>
            <div className="flex gap-4 items-start">
              <ImageUpload
                id="logo-image-upload"
                value={currentImages.logo}
                label="Upload Your Logo"
                handleImageLink={handleImageLink}
                showLable={false}
                text="For the logo image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, SVG."
              />
      
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Browser Favicon Image</h2>
            <div className="flex gap-4 items-start">
              <ImageUpload
                id="favicon-image-upload"
                value={currentImages.favicon}
                label="Browser Favicon Image"
                handleImageLink={handleImageLink}
                showLable={false}
                text="For the logo image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, SVG."
              />
              
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Choose Your Brand Colors</h2>
          
          <div className="space-y-6">
            {/* Header Colors */}
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">Header Colors</h3>
              <div className="space-y-4">
                <ColorInput 
                  id="header-background-color-input"
                  label="Background Color" 
                  colorKey="headerBackground" 
                  value={colors.headerBackground} 
                />
                <ColorInput 
                  id="header-text-color-input"
                  label="Text Color" 
                  colorKey="headerText" 
                  value={colors.headerText} 
                />
              </div>
            </div>

            {/* Button Colors */}
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">Button Colors</h3>
              <div className="space-y-4">
                <ColorInput 
                  id="button-background-color-input"
                  label="Background Color" 
                  colorKey="buttonBackground" 
                  value={colors.buttonBackground} 
                />
                <ColorInput 
                  id="button-text-color-input"
                  label="Text Color" 
                  colorKey="buttonText" 
                  value={colors.buttonText} 
                />
              </div>
            </div>

            {/* Table Colors */}
            <div className="p-4 bg-white rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">Table Colors</h3>
              <div className="space-y-4">
                <ColorInput 
                  id="table-header-background-color-input"
                  label="Header Background" 
                  colorKey="tableHeader" 
                  value={colors.tableHeader} 
                />
                <ColorInput 
                  id="table-header-text-color-input"
                  label="Header Text" 
                  colorKey="tableHeaderText" 
                  value={colors.tableHeaderText} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          id="update-button"
          onClick={handleSubmit}
          className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default UiConfig; 