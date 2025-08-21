import React from 'react';
import { assets } from '../assets/assets';
import MenuItems from './MenuItems';
import { CirclePlus, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { dummyUserData } from '../assets/assets.js';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const user = dummyUserData;

  return (
    <div
      className={`
        w-60 xl:w-72 h-screen bg-sky-900 border-r border-gray-200 
    flex flex-col justify-between items-center
    fixed top-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    sm:translate-x-0 sm:relative
      `}
    >
      <div className="w-full">
        {/* Logo */}
        <div className="my-4 ml-7 text-xl font-bold text-white cursor-pointer select-none">
          PIXEO
        </div>
        <hr className="border-gray-300 mb-8 w-full" />

        {/* Menu Items */}
        <MenuItems setSidebarOpen={setSidebarOpen} />

        <Link
          to="/createPost"
          className="flex items-center justify-center gap-2 py-2 mt-6 mx-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 active:scale-95 transition cursor-pointer text-white font-medium"
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      <div className="w-full flex items-center justify-between border-t border-gray-300 pt-4 px-7 py-4">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserButton />
          <div className="flex flex-col">
            <div className="text-sm font-medium">{user.full_name}</div>
            <div className="text-xs text-gray-500 pt-1">@{user.username}</div>
          </div>
        </div>
        <LogOut className="w-5 h-5 text-gray-400 hover:text-gray-700 transition cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
