import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface RegionState {
  [key: string]: boolean;
}

interface RegionGroup {
  name: string;
  states: string[];
}

const regionGroups: RegionGroup[] = [
  {
    name: "North",
    states: [
      "JAMMU AND KASHMIR",
      "HIMACHAL PRADESH",
      "PUNJAB",
      "UTTARAKHAND",
      "HARYANA",
      "DELHI",
      "RAJASTHAN",
      "CHANDIGARH",
      "UTTAR PRADESH"
    ]
  },
  {
    name: "East",
    states: [
      "BIHAR",
      "JHARKHAND",
      "ODISHA",
      "WEST BENGAL",
      "SIKKIM",
      "ANDAMAN AND NICOBAR ISLANDS"
    ]
  },
  {
    name: "West",
    states: [
      "MAHARASHTRA",
      "GUJARAT",
      "GOA",
      "DADRA AND NAGAR HAVELI",
      "DAMAN AND DIU"
    ]
  },
  {
    name: "South",
    states: [
      "KARNATAKA",
      "ANDHRA PRADESH",
      "TELANGANA",
      "TAMIL NADU",
      "KERALA"
    ]
  },
  {
    name: "North East",
    states: [
      "ASSAM",
      "ARUNACHAL PRADESH",
      "MANIPUR",
      "MEGHALAYA",
      "MIZORAM",
      "NAGALAND",
      "TRIPURA"
    ]
  },
  {
    name: "Central",
    states: [
      "CHHATTISGARH",
      "MADHYA PRADESH"
    ]
  },
  {
    name: "Union Territories",
    states: [
      "LAKSHADWEEP",
      "PUDUCHERRY",
      "ANDAMAN AND NICOBAR ISLANDS",
      "CHANDIGARH",
      "DADRA AND NAGAR HAVELI AND DAMAN AND DIU",
      "DELHI",
      "LADAKH"
    ]
  }
];

const options = {
  shippingType: ["ONDC Logistics", "Own Shipping"],
  category: ["F&B", "Fashion", "Electronics", "Beauty & Personal Care", "Home & Decor"],
  deliveryType: ["Standard Delivery", "Express Delivery", "Same Day Delivery"],
  preferences: ["Cheapest", "Fastest", "Most Reliable"],
};

const ShippingDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedStates, setSelectedStates] = useState<{ [key: string]: RegionState }>({});
  const [formData, setFormData] = useState<{
    [key: string]: {
      shippingType: string;
      category: string;
      deliveryType: string;
      preferences: string;
      transitTime: string;
      shippingFee: string;
    };
  }>({});

  const handleSelectAll = (regionName: string) => {
    const region = regionGroups.find(r => r.name === regionName);
    if (!region) return;

    const newStates: RegionState = {};
    const currentStates = selectedStates[regionName] || {};
    const areAllSelected = region.states.every(state => currentStates[state]);

    region.states.forEach(state => {
      newStates[state] = !areAllSelected;
    });

    setSelectedStates(prev => ({
      ...prev,
      [regionName]: newStates
    }));
  };

  const handleStateChange = (regionName: string, stateName: string) => {
    setSelectedStates(prev => ({
      ...prev,
      [regionName]: {
        ...(prev[regionName] || {}),
        [stateName]: !(prev[regionName]?.[stateName] || false)
      }
    }));
  };

  const isAllSelected = (regionName: string) => {
    const region = regionGroups.find(r => r.name === regionName);
    if (!region) return false;
    return region.states.every(state => selectedStates[regionName]?.[state]);
  };

  const handleFormChange = (regionName: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [regionName]: {
        ...(prev[regionName] || {}),
        [field]: value
      }
    }));
  };

  const handleSaveRegion = (regionName: string) => {
    const regionData = {
      states: selectedStates[regionName],
      ...formData[regionName]
    };
    console.log('Saving region:', regionName, regionData);
    // TODO: Implement API call to save region data
  };

  const handleDuplicateRegion = (regionName: string) => {
    const regionData = formData[regionName];
    const regionStates = selectedStates[regionName];
    
    setFormData(prev => ({
      ...prev,
      [`${regionName} Copy`]: { ...regionData }
    }));
    
    setSelectedStates(prev => ({
      ...prev,
      [`${regionName} Copy`]: { ...regionStates }
    }));
  };

  const handleDeleteRegion = (regionName: string) => {
    setFormData(prev => {
      const newData = { ...prev };
      delete newData[regionName];
      return newData;
    });

    setSelectedStates(prev => {
      const newStates = { ...prev };
      delete newStates[regionName];
      return newStates;
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Shipping Details</h1>
      </div>

      <div className="space-y-6">
        {regionGroups.map((region) => (
          <div key={region.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isAllSelected(region.name)}
                  onChange={() => handleSelectAll(region.name)}
                  className="rounded border-gray-300"
                />
                <span className="font-medium text-gray-900">{region.name}</span>
              </label>
            </div>

            <div className="grid grid-cols-3 gap-4 ml-6 mb-6">
              {region.states.map((state) => (
                <label key={state} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedStates[region.name]?.[state] || false}
                    onChange={() => handleStateChange(region.name, state)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{state}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 ml-6">
              {/* Shipping Type */}
              <select
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={formData[region.name]?.shippingType || ""}
                onChange={(e) => handleFormChange(region.name, 'shippingType', e.target.value)}
              >
                <option value="">Shipping Type</option>
                {options.shippingType.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Category */}
              <select
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={formData[region.name]?.category || ""}
                onChange={(e) => handleFormChange(region.name, 'category', e.target.value)}
              >
                <option value="">Category</option>
                {options.category.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Delivery Type */}
              <select
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={formData[region.name]?.deliveryType || ""}
                onChange={(e) => handleFormChange(region.name, 'deliveryType', e.target.value)}
              >
                <option value="">Delivery Type</option>
                {options.deliveryType.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Preferences */}
              <select
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={formData[region.name]?.preferences || ""}
                onChange={(e) => handleFormChange(region.name, 'preferences', e.target.value)}
              >
                <option value="">Preferences</option>
                {options.preferences.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Transit Time */}
              <input
                type="text"
                placeholder="Transit Time"
                className="border border-gray-300 rounded-lg px-3 py-2"
                value={formData[region.name]?.transitTime || ""}
                onChange={(e) => handleFormChange(region.name, 'transitTime', e.target.value)}
              />

              {/* Shipping Fee */}
              <div className="relative">
                <span className="absolute left-3 top-2.5">₹</span>
                <input
                  type="number"
                  placeholder="Shipping Fee"
                  className="border border-gray-300 rounded-lg px-3 py-2 pl-6"
                  value={formData[region.name]?.shippingFee || ""}
                  onChange={(e) => handleFormChange(region.name, 'shippingFee', e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveRegion(region.name)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDuplicateRegion(region.name)}
                  className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  Duplicate
                </button>
                <button
                  onClick={() => handleDeleteRegion(region.name)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
     
    </div>
  );
};

export default ShippingDetailsPage; 