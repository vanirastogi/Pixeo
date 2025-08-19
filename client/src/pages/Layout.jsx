import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { dummyUserData } from '../assets/assets.js';
import Loading from '../components/Loading';

const Layout = () => {
  const user = dummyUserData;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return user ? (
    <div className="w-full h-screen flex relative">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Toggle Buttons (Small screens only) */}
      <div className="sm:hidden absolute top-3 right-3 z-50">
        {sidebarOpen ? (
          <X
            className="bg-white rounded-md shadow p-2 text-gray-600 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        ) : (
          <Menu
            className="bg-white rounded-md shadow p-2 text-gray-600 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Layout;
