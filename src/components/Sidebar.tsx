import React, { useState } from "react";
 
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  CreditCard,
  Package,
  FileText,
  Store,
  HeadphonesIcon,
  LogOut,
  Menu,
  ChevronLeft,
  BookOpen,
  Building2,
  GitBranch,
  Truck,
} from "lucide-react";
import { Settings } from "lucide-react";
import adya from "../assests/adya.png";
import { navigationConfig, settingsConfig } from "../config/navigationConfig";
import GLOBAL_CONSTANTS from "../GlobalConstants";
import { UserRole } from "../types/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  
  // Get userRole from localStorage first, then fallback to GLOBAL_CONSTANTS
  const userRole = localStorage.getItem("userRole") || GLOBAL_CONSTANTS.userType;
  // console.log("Current User Role in Sidebar:", userRole);

  // Filter navigation items based on user role
  const filteredNavItems = navigationConfig.filter(item => 
    item.roles.includes(userRole as UserRole)
  );
  

  // Get settings items based on role
  const settingsItems = userRole === 'ADMIN' 
    ? settingsConfig.ADMIN 
    : userRole === 'SELLER' 
      ? settingsConfig.SELLER 
      : null;

  return (
    <div className="h-screen flex-shrink-0">
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 ease-in-out z-20
          border-r border-gray-100
          ${isOpen ? "w-72" : "w-20"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Header */}
          <div className="flex items-center p-6 border-b border-gray-100 relative">
            <div className="flex items-center">
              <img
                src={adya}
                alt="Adya Logo"
                className={`
                  transition-all duration-300 object-contain
                  ${isOpen ? "w-10 h-10 mr-3" : "w-12 h-12"}
                `}
              />
              <h1
                className={`
                  text-xl font-semibold text-gray-800 whitespace-nowrap
                  transition-all duration-300
                  ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
                `}
              >
                {userRole === 'ADMIN' ? "Admin Dashboard" : 
                 userRole === 'SELLER' ? "Seller Dashboard" :
                 userRole === 'AFFLIATE PARTNER' ? "Partner Dashboard" : 
                 "Dashboard"}
              </h1>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              p-2.5 rounded-full hover:bg-gray-50 absolute top-6 
              transition-all duration-300 bg-white shadow-lg
              hover:shadow-md active:scale-95
              ${isOpen ? "right-0 translate-x-1/2" : "-right-3 translate-x-full"}
            `}
          >
            {isOpen ? <ChevronLeft id="toggle-left-icon" size={18} /> : <Menu id="toggle-right-icon" size={18} />}
          </button>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4">
            <ul className="space-y-1.5">
              {/* Main Navigation Items */}
              {filteredNavItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    id={`nav-icon-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap
                      ${!isOpen && "justify-center"}
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                    title={!isOpen ? item.label : ""}
                  >
                    <div className={`flex-shrink-0 ${!isOpen ? "transform scale-110" : ""}`}>
                      {<item.icon size={20} />}
                    </div>
                    <span
                      className={`
                        transition-all duration-300 text-sm font-medium
                        ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
                      `}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}

              {/* Settings Navigation - Only for ADMIN and SELLER */}
              {/* {settingsItems && (
                <li>
                  <NavLink
                    to={userRole === 'ADMIN' ? '/dashboard/settings' : '/dashboard/seller-settings'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap
                      ${!isOpen && "justify-center"}
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <Settings size={20} />
                    <span
                      className={`
                        transition-all duration-300 text-sm font-medium
                        ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
                      `}
                    >
                      Settings
                    </span>
                  </NavLink>
                </li>
              )} */}
            </ul>
          </nav>

          {/* Logout Section */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                text-gray-600 hover:bg-gray-50 hover:text-gray-900
                transition-all duration-200
                ${!isOpen && "justify-center"}
              `}
            >
              <LogOut size={20} />
              <span
                className={`
                  text-sm font-medium transition-all duration-300
                  ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
                `}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className={`flex-shrink-0 transition-all duration-300 ${isOpen ? "w-72" : "w-20"}`} />
    </div>
  );
};

export default Sidebar;
