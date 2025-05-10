import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password
      });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      navigate('/painel');
    } catch (err) {
      setErro('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full mb-6 p-3 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;