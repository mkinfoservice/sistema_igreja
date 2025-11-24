import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Award, Video, TrendingUp, UserCheck, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

/**
 * Componente Dashboard
 * 
 * Exibe métricas e estatísticas da igreja usando dados reais da API.
 * 
 * FUNCIONALIDADES:
 * - ✅ Cards de estatísticas com dados reais
 * - ✅ Gráfico de pizza (distribuição por gênero)
 * - ✅ Gráfico de barras (faixas etárias)
 * - ✅ Loading states
 * - ✅ Tratamento de erros
 * 
 * MUDANÇAS REALIZADAS:
 * - ❌ REMOVIDO: Dados hardcoded nos cards
 * - ✅ ADICIONADO: Uso de dados reais da API /api/dashboard/
 * - ✅ ADICIONADO: Gráficos com Chart.js
 * - ✅ ADICIONADO: Estados de loading e erro
 * - ✅ MELHORADO: Visualização de dados
 * 
 * @param {Function} onLogout - Função callback para logout (opcional)
 */

// Registra componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ onLogout }) => {
  // Estado para armazenar dados do dashboard
  const [data, setData] = useState(null);
  
  // Estados de controle da UI
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Hook do React Router para navegação
  const navigate = useNavigate();

  /**
   * Função: fetchDashboardData
   * 
   * Busca dados do dashboard da API backend.
   * 
   * MUDANÇAS:
   * - ✅ MANTIDO: Lógica básica de requisição
   * - ✅ MELHORADO: Tratamento de erros
   * - ✅ ADICIONADO: Estados de loading
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setErro(null);

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
        setErro('Erro ao carregar dados do dashboard. Tente novamente.');
        if (err.response?.status === 401 && typeof onLogout === 'function') {
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [onLogout]);

  /**
   * Função: handleCadastroClick
   * 
   * Navega para a página de cadastro de membros.
   */
  const handleCadastroClick = () => {
    navigate('/membros');
  };

  // Configuração do gráfico de pizza (distribuição por gênero)
  const graficoGenero = data?.por_genero ? {
    labels: data.por_genero.map(item => item.genero),
    datasets: [
      {
        label: 'Membros por Gênero',
        data: data.por_genero.map(item => item.total),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',  // Azul - Masculino
          'rgba(236, 72, 153, 0.8)',  // Rosa - Feminino
          'rgba(139, 92, 246, 0.8)',  // Roxo - Outro
          'rgba(156, 163, 175, 0.8)', // Cinza - Prefere não informar
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 2,
      },
    ],
  } : null;

  // Configuração do gráfico de barras (faixas etárias)
  const graficoFaixaEtaria = data?.por_faixa_etaria ? {
    labels: Object.keys(data.por_faixa_etaria),
    datasets: [
      {
        label: 'Membros por Faixa Etária',
        data: Object.values(data.por_faixa_etaria),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
    ],
  } : null;

  // Opções do gráfico de pizza
  const opcoesPizza = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Distribuição por Gênero',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  // Opções do gráfico de barras
  const opcoesBarras = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Distribuição por Faixa Etária',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Renderização: Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }

  // Renderização: Erro
  if (erro) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-medium">Erro ao carregar dashboard</p>
        <p className="text-sm mt-1">{erro}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  // Renderização: Sem dados
  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Nenhum dado disponível.</p>
      </div>
    );
  }

  // Renderização principal
  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de Membros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Membros</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.membros?.total || 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {data.membros?.recentes_30_dias || 0} novos nos últimos 30 dias
          </p>
        </div>

        {/* Membros Ativos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Membros Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.membros?.ativos || 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {data.membros?.inativos || 0} inativos
          </p>
        </div>

        {/* Membros Batizados */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Membros Batizados</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.membros?.batizados || 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {data.membros?.total > 0
              ? Math.round((data.membros.batizados / data.membros.total) * 100)
              : 0}% do total
          </p>
        </div>

        {/* Total de Usuários (Sistema) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Usuários do Sistema</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.usuarios?.total || 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {data.usuarios?.ativos || 0} ativos
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pizza - Distribuição por Gênero */}
        {graficoGenero && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div style={{ height: '300px' }}>
              <Doughnut data={graficoGenero} options={opcoesPizza} />
            </div>
          </div>
        )}

        {/* Gráfico de Barras - Faixas Etárias */}
        {graficoFaixaEtaria && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div style={{ height: '300px' }}>
              <Bar data={graficoFaixaEtaria} options={opcoesBarras} />
            </div>
          </div>
        )}
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleCadastroClick}
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

      {/* Tabela de Ministérios (se houver dados) */}
      {data.por_ministerio && data.por_ministerio.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Membros por Ministério</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ministério
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Total de Membros
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.por_ministerio.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{item.ministerio}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
