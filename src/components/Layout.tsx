import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  Building2,
  GitBranch,
  Users,
  UserCheck,
  ShoppingBag,
  ClipboardList,
  Wallet,
  Headphones,
  Truck,
  BarChart3,
  Menu,
  X,
  Bell,
  User,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/master-catalog', icon: Box, label: 'Master Catalog' },
  { path: '/companies', icon: Building2, label: 'Companies' },
  { path: '/branches', icon: GitBranch, label: 'Branches' },
  { path: '/partners', icon: Users, label: 'Partners' },
  { path: '/sellers', icon: UserCheck, label: 'Sellers' },
  { path: '/products', icon: ShoppingBag, label: 'Products' },
  { path: '/orders', icon: ClipboardList, label: 'Orders' },
  { path: '/payouts', icon: Wallet, label: 'Payouts' },
  { path: '/support', icon: Headphones, label: 'Support' },
  { path: '/logistics', icon: Truck, label: 'Logistics' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
];

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={toggleSidebar}
                className="lg:hidden px-4 text-gray-600"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800">
                  {isAdmin ? "MSN Seller Admin" : "MSN Seller"}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header (Navigation) */}
      <div className="lg:hidden bg-white shadow-sm mt-16 overflow-x-auto">
        <nav className="flex space-x-4 px-4 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:static lg:block mt-16`}
      >
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`lg:ml-64 min-h-screen pt-16 ${
          isSidebarOpen ? 'brightness-50 lg:brightness-100' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Layout;