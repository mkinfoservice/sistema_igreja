import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Award, Video } from 'lucide-react';
import CadastroMembro from '../pages/membros/CadastroMembro';

const Dashboard = ({ onLogout }) => {
  const [data, setData] = useState(null);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        if (typeof onLogout === 'function') {
          onLogout();
        }
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/dashboard/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados da dashboard:', err);
        if (typeof onLogout === 'function') {
          onLogout();
        }
      }
    };
    fetchData();
  }, [onLogout]);

  const stats = [
    { label: 'Total de Membros', value: '1,234', change: '+12%', color: 'blue' },
    { label: 'Eventos Ativos', value: '8', change: '+2', color: 'green' },
    { label: 'Certificados Emitidos', value: '456', change: '+23%', color: 'purple' },
    { label: 'Arrecadação (mês)', value: 'R$ 45,2k', change: '+8%', color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      {!mostrarCadastro && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}
                  >
                    <div className={`text-${stat.color}-600 text-xl font-bold`}>↑</div>
                  </div>
                </div>
                <p className="text-sm text-green-600 mt-2 font-medium">
                  {stat.change} vs mês anterior
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setMostrarCadastro(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Cadastrar Membro</span>
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Emitir Certificado</span>
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 font-medium transition-colors flex items-center justify-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Criar Evento</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Cadastro de Membro */}
      {mostrarCadastro && (
        <div className="mt-6">
          <CadastroMembro onClose={() => setMostrarCadastro(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
