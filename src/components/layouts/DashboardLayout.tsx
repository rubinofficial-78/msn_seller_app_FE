import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add your sidebar/header navigation here */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout; 