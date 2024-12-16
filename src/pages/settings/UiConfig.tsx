import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';

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
  const [colors, setColors] = useState<ColorConfig>({
    headerBackground: '#1F2937',
    headerText: '#FFFFFF',
    buttonBackground: '#1D4ED8',
    buttonText: '#FFFFFF',
    tableHeader: '#E5E7EB',
    tableHeaderText: '#000000',
  });

  const handleColorChange = (key: keyof ColorConfig, value: string) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    // TODO: Implement API call to save UI configuration
    console.log('Saving UI configuration:', colors);
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
            value={value}
            onChange={(e) => handleColorChange(colorKey, e.target.value)}
            className="w-12 h-12 rounded cursor-pointer border p-1"
          />
        </div>
        <input 
          id="color-input-text"
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="border rounded px-3 py-2 w-32 text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );

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
            <ImageUpload
              id="logo-image-upload"
              onImageUpload={(file) => console.log('Logo uploaded:', file)}
              accept="image/png,image/svg+xml"
              maxSize={10}
              helpText="For the logo image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, SVG."
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Browser Favicon Image</h2>
            <ImageUpload
              id="favicon-image-upload"
              onImageUpload={(file) => console.log('Favicon uploaded:', file)}
              accept="image/png,image/svg+xml"
              maxSize={10}
              helpText="For the logo image, please ensure it has a transparent background. Additionally, the file size should not exceed 10 megabytes. Accepted formats include PNG, SVG."
            />
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