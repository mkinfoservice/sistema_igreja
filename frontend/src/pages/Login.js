import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api, setAuthTokens } from '../services/apiClient.js';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('null');
  const navigate = useNavigate();

  useEffect(() => {
    const msg = sessionStorage.getItem("auth_error");
    if (msg) {
      setErro(msg);
      sessionStorage.removeItem("auth_error");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);

    try {
      const res = await api.post('api/token/', {
        username,
        password: senha,
      });

      setAuthTokens(res.data.access, res.data.refresh);
      onLoginSuccess(res.data.access, res.data.refresh);
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Erro no login. Verifique suas credenciais.';
      setErro(msg);
      console.error(err);
    }
    }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}
        <div className="mb-4">
          <label className="block mb-1">Usuário</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Senha</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
