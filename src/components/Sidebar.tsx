import React from 'react';
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
  LogOut
} from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/dashboard/orders' },
  { icon: <Users size={20} />, label: 'Partners', path: '/dashboard/partners' },
  { icon: <CreditCard size={20} />, label: 'Payouts', path: '/dashboard/payouts' },
  { icon: <Package size={20} />, label: 'Products', path: '/dashboard/products' },
  { icon: <FileText size={20} />, label: 'Reports', path: '/dashboard/reports' },
  { icon: <Store size={20} />, label: 'Sellers', path: '/dashboard/sellers' },
  { icon: <HeadphonesIcon size={20} />, label: 'Support', path: '/dashboard/support' },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/');
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Seller Dashboard</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 