import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');
      try {
        const response = await axios.get('http://localhost:8000/api/dashboard/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados da dashboard:', err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <p>Carregando...</p>;

  const generoData = {
    labels: data.por_genero.map(g => g.gender || 'Não informado'),
    datasets: [{
      label: 'Por Gênero',
      data: data.por_genero.map(g => g.total),
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
    }]
  };

  const faixaEtariaData = {
    labels: Object.keys(data.por_faixa_etaria),
    datasets: [{
      label: 'Faixa Etária',
      data: Object.values(data.por_faixa_etaria),
      backgroundColor: '#4BC0C0'
    }]
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
        <div><strong>Total:</strong> {data.total}</div>
        <div><strong>Ativos:</strong> {data.ativos}</div>
        <div><strong>Inativos:</strong> {data.inativos}</div>
      </div>
      <div style={{ maxWidth: 600 }}>
        <h4>Distribuição por Gênero</h4>
        <Pie data={generoData} />
      </div>
      <div style={{ maxWidth: 600, marginTop: 40 }}>
        <h4>Distribuição por Faixa Etária</h4>
        <Bar data={faixaEtariaData} />
      </div>
    </div>
  );
}

export default Dashboard;