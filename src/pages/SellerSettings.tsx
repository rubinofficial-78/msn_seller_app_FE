import React from "react";
import {
  ArrowLeft,
  CreditCard,
  Database,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerSettings = () => {
  const navigate = useNavigate();

  const settings = [
    {
      icon: <CreditCard size={24} />,
      title: "Account Details",
      path: "account-details",
      description:
        "This information will help us to setup your account in our seller application and ensure smooth running.",
    },
    {
      icon: <Database size={24} />,
      title: "Banking & Business Details",
      path: "banking-details",
      description:
        "This information will help us to setup your Bank accounts in our seller application and ensure smooth running of funds.",
    },
    {
      icon: <MapPin size={24} />,
      title: "Locations & Serviceability",
      path: "location-services",
      description:
        "This information will help us to setup your account in our seller application and ensure smooth running.",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Seller Settings</h1>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((setting) => (
          <div
            key={setting.path}
            onClick={() => navigate(setting.path)}
            className="bg-white rounded-lg p-6 hover:shadow-md transition-all duration-200 
                     cursor-pointer border border-gray-200 hover:border-blue-200 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600 
                            group-hover:bg-blue-100 transition-colors">
                {setting.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 
                             group-hover:text-blue-600 transition-colors">
                  {setting.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {setting.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerSettings;
