import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  Truck
} from 'lucide-react';
import adya from '../assests/adya.png'
import { useAuth } from '../contexts/AuthContext';

const sellerAdminNavItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <BookOpen size={20} />, label: 'Master Catalog', path: '/dashboard/master-catalog' },
  { icon: <Building2 size={20} />, label: 'Companies', path: '/dashboard/companies' },
  { icon: <GitBranch size={20} />, label: 'Branches', path: '/dashboard/branches' },
  { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/dashboard/orders' },
  { icon: <Users size={20} />, label: 'Partners', path: '/dashboard/partners' },
  { icon: <CreditCard size={20} />, label: 'Payouts', path: '/dashboard/payouts' },
  { icon: <Package size={20} />, label: 'Products', path: '/dashboard/products' },
  { icon: <FileText size={20} />, label: 'Reports', path: '/dashboard/reports' },
  { icon: <Store size={20} />, label: 'Sellers', path: '/dashboard/sellers' },
  { icon: <HeadphonesIcon size={20} />, label: 'Support', path: '/dashboard/support' },
  { icon: <Truck size={20} />, label: 'Logistics', path: '/dashboard/logistics' },
];

const sellerNavItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Package size={20} />, label: 'My Listings', path: '/dashboard/my-listings' },
  { icon: <ShoppingCart size={20} />, label: 'My Orders', path: '/dashboard/my-orders' },
  { icon: <HeadphonesIcon size={20} />, label: 'Support', path: '/dashboard/support' },
  { icon: <Truck size={20} />, label: 'Logistics', path: '/dashboard/logistics' },
];

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = user?.role === 'SELLER_ADMIN' ? sellerAdminNavItems : sellerNavItems;

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/');
  };

  return (
    <div className="h-screen flex-shrink-0">
      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-20
          border-r border-primary-100
          ${isOpen ? 'w-64' : 'w-20'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Toggle */}
          <div className="flex items-center p-4 border-b relative">
            <div className="flex items-center">
              <img 
                src={adya} 
                alt="Adya Logo" 
                className={`
                  transition-all duration-300
                  ${isOpen ? 'w-8 h-8 mr-3' : 'w-10 h-10'}
                `}
              />
              <h1 
                className={`
                  text-xl font-bold text-blue-600 whitespace-nowrap
                  transition-all duration-300
                  ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                `}
              >
                Seller Admin
              </h1>
            </div>
          </div>

          {/* Toggle Button - Moved outside the header */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              p-2 rounded-full hover:bg-gray-100 absolute top-4 z-30
              transition-all duration-300 bg-white shadow-md
              ${isOpen ? 'right-0 translate-x-1/2' : '-right-3 translate-x-full'}
            `}
          >
            {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                      ${!isOpen && 'justify-center'}
                      ${isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-secondary-500 hover:bg-primary-50 hover:text-primary-600'
                      }`
                    }
                    title={!isOpen ? item.label : ''}
                  >
                    <div className={`${!isOpen && 'transform scale-110'}`}>
                      {item.icon}
                    </div>
                    <span 
                      className={`
                        transition-all duration-300
                        ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
                      `}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

         
        </div>
      </div>

      {/* Spacer div */}
      <div className={`flex-shrink-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`} />
    </div>
  );
};

export default Sidebar; 