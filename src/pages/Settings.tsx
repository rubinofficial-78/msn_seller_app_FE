import React from "react";
import {
  ArrowLeft,
  CreditCard,
  Settings as SettingsIcon,
  Mail,
  Map,
  Database,
  Eye,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    switch (title) {
      case "Account Details":
        navigate("/dashboard/settings/account-details");
        break;
      case "Banking & Business Details":
        navigate("/dashboard/settings/banking-details");
        break;
      case "Locations & Serviceability":
        navigate("/dashboard/settings/location-services");
        break;
      case "UI configuration":
        navigate("/dashboard/settings/ui-config");
        break;
      // Add other cases for different settings cards as needed
      default:
        break;
    }
  };

  const settings = [
    {
      icon: <CreditCard size={24} />,
      title: "Account Details",
      description:
        "This information will help us to setup your account in our seller application and ensure smooth running.",
    },
    {
      icon: <Database size={24} />,
      title: "Banking & Business Details",
      description:
        "This information will help us to setup your Bank accounts in our seller application and ensure smooth running of funds from different network participants.",
    },
    {
      icon: <SettingsIcon size={24} />,
      title: "Access Management",
      description:
        "This information will help us to setup your account in our seller application and ensure smooth running.",
    },
    {
      icon: <Mail size={24} />,
      title: "Email & SMS Services",
      description:
        "Business information will help us to verify your business so the store at ONDC works smoothly and help us in smoother interactions.",
    },
    {
      icon: <Map size={24} />,
      title: "Maps Services",
      description:
        "This information will help us to setup your account in our seller application and ensure smooth running.",
    },
    {
      icon: <Eye size={24} />,
      title: "UI configuration",
      description:
        "This information will help you customize the look and feel of the platform. Change your brand Colors, CTA colors and tables and Data's visual look and feel",
    },
    {
      icon: <MapPin size={24} />,
      title: "Locations & Serviceability",
      description:
        "This information will help us to setup your account in our seller application and ensure smooth running.",
    },
  ];

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
        <h1 className="text-2xl font-bold">Application Settings</h1>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((setting, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(setting.title)}
            className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="text-blue-500">{setting.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {setting.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
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

export default Settings;
