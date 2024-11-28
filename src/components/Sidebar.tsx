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
import adya from "../assests/adya.png";
import { useAuth } from "../contexts/AuthContext";

const sellerAdminNavItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <BookOpen size={20} />,
    label: "Master Catalog",
    path: "/dashboard/master-catalog",
  },
  {
    icon: <Building2 size={20} />,
    label: "Companies",
    path: "/dashboard/companies",
  },
  {
    icon: <GitBranch size={20} />,
    label: "Branches",
    path: "/dashboard/branches",
  },
  {
    icon: <ShoppingCart size={20} />,
    label: "Orders",
    path: "/dashboard/orders",
  },
  { icon: <Users size={20} />, label: "Partners", path: "/dashboard/partners" },
  {
    icon: <CreditCard size={20} />,
    label: "Payouts",
    path: "/dashboard/payouts",
  },
  {
    icon: <Package size={20} />,
    label: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <FileText size={20} />,
    label: "Reports",
    path: "/dashboard/reports",
  },
  { icon: <Store size={20} />, label: "Sellers", path: "/dashboard/sellers" },
  {
    icon: <HeadphonesIcon size={20} />,
    label: "Support",
    path: "/dashboard/support",
  },
  {
    icon: <Truck size={20} />,
    label: "Logistics",
    path: "/dashboard/logistics",
  },
];

const sellerNavItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <Package size={20} className="flex-shrink-0" />,
    label: "My Listings",
    path: "/dashboard/my-listings",
  },
  {
    icon: <ShoppingCart size={20} />,
    label: "My Orders",
    path: "/dashboard/my-orders",
  },
  {
    icon: <HeadphonesIcon size={20} />,
    label: "Support",
    path: "/dashboard/support",
  },
  {
    icon: <Truck size={20} />,
    label: "Logistics",
    path: "/dashboard/logistics",
  },
];

const Sidebar = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // Check if we're in the onboarding flow
  const isOnboarding = location.pathname.includes('/onboarding');

  // Determine which nav items to show
  const navItems = isAdmin 
    ? sellerAdminNavItems 
    : isOnboarding 
      ? sellerNavItems.slice(0, 5) // Only show first 5 items during onboarding
      : sellerNavItems;

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/");
  };

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
          {/* Enhanced Logo and Header */}
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
                {isAdmin ? "Seller Admin" : "Seller"}
              </h1>
            </div>
          </div>

          {/* Improved Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              p-2.5 rounded-full hover:bg-gray-50 absolute top-6 
              transition-all duration-300 bg-white shadow-lg
              hover:shadow-md active:scale-95
              ${isOpen ? "right-0 translate-x-1/2" : "-right-3 translate-x-full"}
            `}
          >
            {isOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>

          {/* Enhanced Navigation */}
          <nav className="flex-1 py-6 px-4">
            <ul className="space-y-1.5">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
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
                    <div className={`flex-shrink-0 ${!isOpen ? "transform scale-110" : ""} transition-transform duration-200`}>
                      {item.icon}
                    </div>
                    <span
                      className={`
                        transition-all duration-300 text-sm font-medium truncate
                        ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}
                      `}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Add Logout Button at Bottom */}
          <div className={`p-4 border-t border-gray-100`}>
            <button
              onClick={handleLogout}
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

      {/* Spacer div */}
      <div
        className={`flex-shrink-0 transition-all duration-300 ${
          isOpen ? "w-72" : "w-20"
        }`}
      />
    </div>
  );
};

export default Sidebar;
