import React from 'react';

function Painel() {
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Painel!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </div>
  );
}

export default Painel;