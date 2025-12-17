import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard';
import Members from './pages/MembrosPage.jsx';
import Financial from './pages/Financial';
import Certificates from './pages/Certificates';
import VirtualRoom from './pages/VirtualRoom';
import Login from './pages/Login';
import CadastroMembro from './pages/membros/CadastroMembro.jsx';
import EditarMembro from './pages/membros/EditarMembro.jsx';
import { api } from './services/apiClient';
import MembrosPage from './pages/MembrosPage.jsx';
import ListagemMembros from './pages/membros/ListagemMembros.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Só checa se existe token; requests vão validar e refreshar via interceptor
    const accessToken = localStorage.getItem('access_token');
    setIsAuthenticated(!!accessToken);
  }, []);

  const handleLoginSuccess = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setIsAuthenticated(true);
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard onLogout={logout} />} />
          <Route path="membros" element={<ListagemMembros />} />
          <Route path="membros/editar/:id" element={<EditarMembro />} />
          <Route path="cadastro" element={<CadastroMembro />} />
          <Route path="financial" element={<Financial />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="virtual-room" element={<VirtualRoom />} />
        </Route>

        <Route path="*" element={<div className="p-8 text-center">Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
