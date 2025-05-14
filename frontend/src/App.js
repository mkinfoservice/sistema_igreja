import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CadastroMembro from './components/CadastroMembro';

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
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refreshToken,
      });

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

      const interval = setInterval(() => {
        refreshAccessToken();
      }, 4 * 60 * 1000); // a cada 4 minutos

      return () => clearInterval(interval);
    }
  }, []);

  const handleLoginSuccess = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isAuthenticated ? (
        <>
          <Dashboard onLogout={logout} />
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Cadastrar Novo Membro</h2>
            <CadastroMembro />
          </div>
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
} // ← Faltava este fechamento!

export default App;