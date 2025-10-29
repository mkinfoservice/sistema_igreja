// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X, Bell, ChevronDown, LogOut, Home, Users, DollarSign, Award, Video } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const modules = [
    { path: '/dashboard', name: 'Dashboard', icon: Home, status: 'complete' },
    { path: '/membros', name: 'Membros', icon: Users, status: 'complete' },
    { path: '/financial', name: 'Financeiro', icon: DollarSign, status: 'upcoming' },
    { path: '/certificates', name: 'Certificados', icon: Award, status: 'upcoming' },
    { path: '/virtual-room', name: 'Sala Virtual', icon: Video, status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⛪</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">Igreja Digital</h1>
                <p className="text-xs text-gray-600">Sistema de Gestão</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">AD</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-600">Administrador</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Perfil
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Configurações
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out
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
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      Em breve
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;