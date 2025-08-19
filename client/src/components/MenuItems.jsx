import React from 'react'
import { menuItemsData } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const MenuItems = ({ setSidebarOpen }) => {
  return (
    <div className="flex flex-col space-y-1 font-medium p-2">
      {menuItemsData.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onClick={() => setSidebarOpen(true)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-xl transition-colors w-full ${
              isActive
                ? 'bg-sky-500/30 text-white'
                : 'text-gray-400 hover:bg-sky-500/20 hover:text-white'
            }`
          }
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default MenuItems
