import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddForm from '../../components/AddForm';
import adyaLogo from '../../assests/adya.png';

interface MapConfigurationForm {
  googleApiKey: string;
  googleMapsApi: string;
  googleGeoCodeApi: string;
}

const MapSettings = () => {
  const navigate = useNavigate();
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState<MapConfigurationForm>({
    googleApiKey: '',
    googleMapsApi: 'https://maps.googleapis.com/maps/api/js',
    googleGeoCodeApi: 'https://maps.googleapis.com/maps/api/geocode/json'
  });

  const formFields = [
    {
      type: 'text',
      key: 'googleApiKey',
      label: 'Google Api Key',
      required: true,
      placeholder: 'AlzaSyDeJ-PEkAUuSJs4-mwELg3jsLQBbIF9QpI',
      value: formData.googleApiKey
    },
    {
      type: 'text',
      key: 'googleMapsApi',
      label: 'Google Maps Api',
      required: true,
      placeholder: 'https://maps.googleapis.com/maps/api/js',
      value: formData.googleMapsApi
    },
    {
      type: 'text',
      key: 'googleGeoCodeApi',
      label: 'Google Geo Code Api',
      required: true,
      placeholder: 'https://maps.googleapis.com/maps/api/geocode/json',
      value: formData.googleGeoCodeApi
    }
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTestConfiguration = () => {
    setShowConfigDialog(true);
  };

  const handleVerify = () => {
    setShowConfigDialog(false);
  };

  // Provider List View
  if (!showDetails) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Maps Service providers</h1>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 mb-6">
            Integrate our developer-friendly MAPS API to send and receive text messages. 
            Our distributed carrier network and intelligent routing ensure the highest delivery and lowest latency.
          </p>

          {/* Active Provider */}
          <div className="border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 flex items-center justify-center bg-white rounded-lg border p-2 cursor-pointer"
                  onClick={() => setShowDetails(true)}
                >
                  <img src={adyaLogo} alt="Google Maps" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-green-500 text-sm font-medium">Active Now</div>
                </div>
              </div>
            </div>
          </div>

           
        </div>
      </div>
    );
  }

  // Details View
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowDetails(false)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Maps Service providers</h1>
              <div className="text-sm text-gray-600 mt-1">
                Maps Service providers / Google Maps DETAILS
              </div>
            </div>
            <button
              onClick={handleTestConfiguration}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md"
            >
              TESTCONFIGURATION
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="max-w-3xl">
          {/* Google Maps Logo and Title */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 flex items-center justify-center bg-white rounded-lg border p-4">
              <img 
                src="/google-maps-logo.png" 
                alt="Google Maps" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-blue-600">Google Maps</h2>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Build awesome apps with Google's knowledge of the real world
            </h3>
            <p className="text-gray-600">
              Google Maps is a web mapping platform and consumer application offered by Google.
              It offers satellite imagery, aerial photography, street maps, 360° interactive panoramic
              views of streets, real-time traffic conditions, and route planning for traveling by foot,
              car, bike, air and public transportation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Create Account Now
              <ExternalLink size={16} />
            </a>
            <a
              href="https://developers.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
            >
              Read Documentations
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Configuration Form */}
          <div className="space-y-6">
            <AddForm
              data={formFields}
              handleInputonChange={handleInputChange}
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border rounded-md text-sm"
              >
                CANCEL
              </button>
              <button
                onClick={() => {}}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm"
              >
                SAVE & UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Test Configuration Dialog */}
      {showConfigDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="text-green-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold">GOOGLE MAPS DETAILS</h3>
            </div>
            <p className="text-gray-600 mb-4">Google Maps location details</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter pincode"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfigDialog(false)}
                className="px-4 py-2 border rounded-md text-sm"
              >
                CANCEL
              </button>
              <button
                onClick={handleVerify}
                className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm"
              >
                VERIFY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSettings; 