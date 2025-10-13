import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, DollarSign, Award, Video } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const modules = [
    { path: '/dashboard', name: 'Dashboard', icon: Home, status: 'complete' },
    { path: '/MembrosPage', name: 'Membros', icon: Users, status: 'complete' },
    { path: '/financial', name: 'Financeiro', icon: DollarSign, status: 'complete' },
    { path: '/certificates', name: 'Certificados', icon: Award, status: 'upcoming' },
    { path: '/virtual-room', name: 'Sala Virtual', icon: Video, status: 'upcoming' },
  ];

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      pt-16 lg:pt-0
    `}>
      <nav className="p-4 space-y-2">
        {modules.map((module) => {
          const Icon = module.icon;
          const isUpcoming = module.status === 'upcoming';
          
          return (
            <NavLink
              key={module.path}
              to={module.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                ${isUpcoming ? 'opacity-50 pointer-events-none' : ''}
              `}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1">{module.name}</span>
              {module.status === 'complete' && (
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              )}
              {isUpcoming && (
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Em breve</span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;