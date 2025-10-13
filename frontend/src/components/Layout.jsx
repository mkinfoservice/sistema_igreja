import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Members from './pages/CadastroMembros';
import Financial from './pages/Financial';
import Certificates from './pages/Certificates';
import VirtualRoom from './pages/VirtualRoom';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
      localStorage.setItem('access_token', response.data.access);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Erro ao renovar token:', err);
      logout();
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setIsAuthenticated(true);

      const interval = setInterval(refreshAccessToken, 4 * 60 * 1000); // 4 min
      return () => clearInterval(interval);
    }
  }, []);

  const handleLoginSuccess = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    setIsAuthenticated(true);
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

        {/* Rotas Protegidas */}
        <Route path="/" element={
          <PrivateRoute>
            <MainLayout onLogout={logout} />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="financial" element={<Financial />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="virtual-room" element={<VirtualRoom />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div className="p-8 text-center">Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
