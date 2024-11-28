import React from "react";
import {
  ArrowLeft,
  CreditCard,
  Settings as SettingsIcon,
  Mail,
  Map,
  Eye,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Settings = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const adminSettings = [
    {
      icon: <CreditCard size={24} />,
      title: "Account Details",
      description: "This information will help us to setup your account in our seller application and ensure smooth running.",
      path: "/dashboard/settings/account-details"
    },
    {
      icon: <CreditCard size={24} />,
      title: "Banking & Business Details",
      description: "This information will help us to setup your Bank accounts in our seller application and ensure smooth running of funds from different network participants.",
      path: "/dashboard/settings/banking-details"
    },
    {
      icon: <SettingsIcon size={24} />,
      title: "Access Management",
      description: "Manage user access and roles for different modules in the application.",
      path: "/dashboard/settings/access-management"
    },
    {
      icon: <Mail size={24} />,
      title: "Email & SMS Services",
      description: "Configure email and SMS notification settings for the platform.",
      path: "/dashboard/settings/email-sms"
    },
    {
      icon: <Map size={24} />,
      title: "Maps Services",
      description: "Configure map service providers and settings.",
      path: "/dashboard/settings/maps"
    },
    {
      icon: <Eye size={24} />,
      title: "UI configuration",
      description: "Customize the look and feel of the platform. Change your brand Colors, CTA colors and tables and Data's visual look and feel",
      path: "/dashboard/settings/ui-config"
    }
  ];

  const sellerSettings = [
    {
      icon: <CreditCard size={24} />,
      title: "Account Details",
      description: "This information will help us to setup your account in our seller application and ensure smooth running.",
      path: "/dashboard/seller-settings/account-details"
    },
    {
      icon: <CreditCard size={24} />,
      title: "Banking & Business Details",
      description: "This information will help us to setup your Bank accounts in our seller application and ensure smooth running of funds from different network participants.",
      path: "/dashboard/seller-settings/banking-details"
    },
    {
      icon: <SettingsIcon size={24} />,
      title: "Access Management",
      description: "Manage user access and roles for different modules in the application.",
      path: "/dashboard/seller-settings/access-management"
    },
    {
      icon: <Mail size={24} />,
      title: "Email & SMS Services",
      description: "Configure email and SMS notification settings for your store.",
      path: "/dashboard/seller-settings/email-sms"
    },
    {
      icon: <Map size={24} />,
      title: "Maps Services",
      description: "Configure map service providers and settings.",
      path: "/dashboard/seller-settings/maps"
    },
    {
      icon: <Eye size={24} />,
      title: "UI configuration",
      description: "Customize the look and feel of your store. Change your brand Colors, CTA colors and tables and Data's visual look and feel",
      path: "/dashboard/seller-settings/ui-config"
    },
    {
      icon: <MapPin size={24} />,
      title: "Locations & Serviceability",
      description: "Manage your store locations and delivery serviceability areas.",
      path: "/dashboard/seller-settings/location-services"
    }
  ];

  const settings = isAdmin ? adminSettings : sellerSettings;

  const handleCardClick = (path: string) => {
    navigate(path);
  };

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
            onClick={() => handleCardClick(setting.path)}
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
