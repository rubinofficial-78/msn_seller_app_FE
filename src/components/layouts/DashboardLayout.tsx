import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Welcome Back!</h2>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 