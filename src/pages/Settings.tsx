import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Settings as SettingsIcon,
  Mail,
  Map,
  Eye,
  Users,
  Bell,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the main settings page
  const isMainPage = location.pathname === "/dashboard/settings";

  const settings = [
    {
      icon: <CreditCard id="account-details" size={24} />,
      title: "Account Details",
      description: "This information will help us to setup your account in our application and ensure smooth running.",
      path: "account-details"
    },
    {
      icon: <CreditCard id="banking-details" size={24} />,
      title: "Banking & Business Details",
      description: "This information will help us to setup your Bank accounts and ensure smooth running of funds.",
      path: "banking-details"
    },
    {
      icon: <Users id="access-management" size={24} />,
      title: "Access Management",
      description: "Manage user access and roles for different modules in the application.",
      path: "access-management"
    },
    
    {
      icon: <Bell id="notification-settings" size={24} />,
      title: "Notification Settings",
      description: "Configure notification preferences and settings.",
      path: "notification-settings"
    },
    {
      icon: <Map id="map-settings" size={24} />,
      title: "Maps Settings",
      description: "Configure map service providers and settings.",
      path: "map-settings"
    },
    {
      icon: <Eye id="ui-config" size={24} />,
      title: "UI Configuration",
      description: "Customize the look and feel of the platform.",
      path: "ui-config"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          id="back-button"
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Application Settings</h1>
      </div>

      {isMainPage ? (
        // Show settings grid on main settings page
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settings.map((setting, index) => (
            <div
              key={index}
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
      ) : (
        // Show nested route content
        <div className="bg-white rounded-lg shadow-sm">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Settings;
