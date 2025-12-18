import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard';
import Financial from './pages/Financial';
import Certificates from './pages/Certificates';
import VirtualRoom from './pages/VirtualRoom';
import Login from './pages/Login';
import CadastroMembro from './pages/membros/CadastroMembro.jsx';
import EditarMembro from './pages/membros/EditarMembro.jsx';
import ListagemMembros from './pages/membros/ListagemMembros.jsx';

import { getAccessToken, clearAuthTokens, setOnLogout } from './services/apiClient.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getAccessToken());

    // Se o refresh falhar lá no apiCçlient, ele chama essa função para deslogar o usuário
    setOnLogout(() => {
      setIsAuthenticated(false);
    });

  }, []);

  const handleLoginSuccess = (access, refresh) => {
    // Login.js vai chamar setAuthTokens diretamente
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAuthTokens();
    setIsAuthenticated(false);
  };

  const PrivateRoute = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/login" replace />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout onLogout={logout} />
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
