
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Painel() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      axios.get('http://localhost:8000/api/usuario/me/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setUsuario(res.data))
      .catch(err => console.error(err));
    }
  }, []);

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Painel do Usuário</h2>
      <p><strong>ID:</strong> {usuario.id}</p>
      <p><strong>Usuário:</strong> {usuario.username}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Admin:</strong> {usuario.is_superuser ? 'Sim' : 'Não'}</p>
    </div>
  );
}

export default Painel;
