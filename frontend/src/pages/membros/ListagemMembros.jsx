// src/pages/membros/ListagemMembros.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { exportarCSV } from "../../utils/export";
import { formatarCPF, formatarTelefone } from "../../utils/validators";

/**
 * Componente de Listagem de Membros
 * 
 * Este componente exibe uma tabela com todos os membros cadastrados.
 * 
 * FUNCIONALIDADES:
 * - ✅ Listagem de membros da API
 * - ✅ Busca em tempo real
 * - ✅ Filtros (Status, Gênero, Ministério)
 * - ✅ Paginação
 * - ✅ Exportação CSV
 * - ✅ Exclusão de membros
 * - ✅ Navegação para edição
 * 
 * MUDANÇAS REALIZADAS:
 * - ❌ REMOVIDO: Uso de localStorage para buscar membros
 * - ✅ ADICIONADO: Integração com API backend via GET /api/membros/
 * - ✅ ADICIONADO: Funcionalidade de exclusão via DELETE /api/membros/{id}/
 * - ✅ ADICIONADO: Navegação para edição de membros
 * - ✅ ADICIONADO: Estados de loading e erro
 * - ✅ ADICIONADO: Atualização automática após exclusão
 * - ✅ ADICIONADO: Busca e filtros avançados
 * - ✅ ADICIONADO: Paginação de resultados
 * - ✅ ADICIONADO: Exportação para CSV
 * - ✅ MELHORADO: Exibição de mais informações (CPF, telefone, status)
 * 
 * @param {Function} onBack - Função callback para voltar ao menu anterior (opcional)
 */
const ListagemMembros = ({ onBack }) => {
  // Estado para armazenar a lista completa de membros (da API)
  const [membros, setMembros] = useState([]);
  
  // Estados de controle da UI
  const [loading, setLoading] = useState(true);        // Controla carregamento inicial
  const [erro, setErro] = useState(null);             // Mensagem de erro
  const [excluindo, setExcluindo] = useState(null);    // ID do membro sendo excluído

  // Estados para busca e filtros
  const [busca, setBusca] = useState("");             // Texto de busca
  const [filtroStatus, setFiltroStatus] = useState("todos"); // Filtro: todos, ativo, inativo
  const [filtroGenero, setFiltroGenero] = useState("todos"); // Filtro: todos, M, F, O, N
  const [filtroMinisterio, setFiltroMinisterio] = useState("todos"); // Filtro por ministério

  // Estados para paginação
  const [paginaAtual, setPaginaAtual] = useState(1);  // Página atual
  const itensPorPagina = 10;                           // Itens por página

  // Hook do React Router para navegação
  const navigate = useNavigate();

  /**
   * Função: fetchMembros
   * 
   * Busca todos os membros da API backend.
   * 
   * MUDANÇAS:
   * - ❌ REMOVIDO: JSON.parse(localStorage.getItem("membros"))
   * - ✅ ADICIONADO: Requisição GET para /api/membros/
   * - ✅ ADICIONADO: Autenticação JWT via header Authorization
   * - ✅ ADICIONADO: Tratamento de erros
   * 
   * @returns {Promise<void>}
   */
  const fetchMembros = async () => {
    setLoading(true);
    setErro(null);

    try {
      // Obtém o token JWT do localStorage
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        throw new Error("Você precisa estar autenticado para visualizar membros.");
      }

      // Faz a requisição GET para buscar todos os membros
      const response = await fetch("http://localhost:8000/api/membros/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Token JWT para autenticação
        },
      });

      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro ao buscar membros: ${response.status} ${response.statusText}`);
      }

      // Converte a resposta JSON em array de membros
      const dados = await response.json();
      setMembros(dados);

    } catch (err) {
      // Trata erros de rede, autenticação ou servidor
      console.error("Erro ao buscar membros:", err);
      setErro(err.message || "Erro ao carregar membros. Tente novamente.");
    } finally {
      // Sempre desativa o loading, mesmo em caso de erro
      setLoading(false);
    }
  };

  /**
   * Função: handleExcluir
   * 
   * Exclui um membro do banco de dados via API.
   * 
   * MUDANÇAS:
   * - ❌ REMOVIDO: Filtro local e localStorage.setItem
   * - ✅ ADICIONADO: Requisição DELETE para /api/membros/{id}/
   * - ✅ ADICIONADO: Confirmação antes de excluir
   * - ✅ ADICIONADO: Atualização automática da lista após exclusão
   * - ✅ ADICIONADO: Feedback visual durante exclusão
   * 
   * @param {number} id - ID do membro a ser excluído
   */
  const handleExcluir = async (id) => {
    // Confirmação antes de excluir
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este membro? Esta ação não pode ser desfeita."
    );

    if (!confirmar) {
      return; // Cancela a exclusão se o usuário não confirmar
    }

    // Marca o membro como sendo excluído (para feedback visual)
    setExcluindo(id);

    try {
      // Obtém o token JWT do localStorage
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        throw new Error("Você precisa estar autenticado para excluir membros.");
      }

      // Faz a requisição DELETE para excluir o membro
      const response = await fetch(`http://localhost:8000/api/membros/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Token JWT para autenticação
        },
      });

      // Verifica se a exclusão foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro ao excluir membro: ${response.status} ${response.statusText}`);
      }

      // Remove o membro da lista local (otimização - evita nova requisição)
      setMembros((membrosAnteriores) =>
        membrosAnteriores.filter((membro) => membro.id !== id)
      );

      // Feedback de sucesso
      alert("Membro excluído com sucesso!");

    } catch (err) {
      // Trata erros de rede, autenticação ou servidor
      console.error("Erro ao excluir membro:", err);
      alert(err.message || "Erro ao excluir membro. Tente novamente.");
    } finally {
      // Sempre remove o estado de exclusão
      setExcluindo(null);
    }
  };

  /**
   * Função: handleEditar
   * 
   * Navega para a página de edição do membro.
   * 
   * NOVO:
   * - ✅ ADICIONADO: Navegação para página de edição
   * 
   * @param {number} id - ID do membro a ser editado
   */
  const handleEditar = (id) => {
    // Navega para a rota de edição (definida no App.js)
    navigate(`/membros/editar/${id}`);
  };

  /**
   * Função: handleExportarCSV
   * 
   * Exporta os membros filtrados para um arquivo CSV.
   * 
   * NOVO:
   * - ✅ ADICIONADO: Exportação para CSV usando utilitário export.js
   * 
   */
  const handleExportarCSV = () => {
    // Usa os membros filtrados (não todos)
    exportarCSV(
      membrosFiltrados,
      "membros",
      {
        nome_completo: "Nome Completo",
        cpf: "CPF",
        rg: "RG",
        data_nascimento: "Data de Nascimento",
        endereco: "Endereço",
        telefone: "Telefone",
        email: "Email",
        batizado: "Batizado",
        data_batismo: "Data de Batismo",
        ministerio: "Ministério",
        ativo: "Status",
        genero: "Gênero",
        idade: "Idade",
      }
    );
  };

  /**
   * useMemo: membrosFiltrados
   * 
   * Filtra e busca membros baseado nos critérios selecionados.
   * 
   * NOVO:
   * - ✅ ADICIONADO: Filtragem em tempo real usando useMemo
   * 
   * Filtros aplicados:
   * 1. Busca por texto (nome, email, CPF, telefone)
   * 2. Filtro de status (ativo/inativo)
   * 3. Filtro de gênero
   * 4. Filtro de ministério
   * 
   * @returns {Array} - Array de membros filtrados
   */
  const membrosFiltrados = useMemo(() => {
    return membros.filter((membro) => {
      // Filtro de busca (nome, email, CPF, telefone)
      const buscaLower = busca.toLowerCase();
      const matchBusca =
        !busca ||
        membro.nome_completo?.toLowerCase().includes(buscaLower) ||
        membro.email?.toLowerCase().includes(buscaLower) ||
        membro.cpf?.includes(busca) ||
        membro.telefone?.includes(busca);

      // Filtro de status
      const matchStatus =
        filtroStatus === "todos" ||
        (filtroStatus === "ativo" && membro.ativo) ||
        (filtroStatus === "inativo" && !membro.ativo);

      // Filtro de gênero
      const matchGenero =
        filtroGenero === "todos" || membro.genero === filtroGenero;

      // Filtro de ministério
      const matchMinisterio =
        filtroMinisterio === "todos" ||
        membro.ministerio === filtroMinisterio;

      return matchBusca && matchStatus && matchGenero && matchMinisterio;
    });
  }, [membros, busca, filtroStatus, filtroGenero, filtroMinisterio]);

  /**
   * useMemo: membrosPaginados
   * 
   * Aplica paginação aos membros filtrados.
   * 
   * NOVO:
   * - ✅ ADICIONADO: Paginação usando useMemo
   * 
   * @returns {Array} - Array de membros da página atual
   */
  const membrosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return membrosFiltrados.slice(inicio, fim);
  }, [membrosFiltrados, paginaAtual, itensPorPagina]);

  /**
   * useMemo: totalPaginas
   * 
   * Calcula o total de páginas baseado nos membros filtrados.
   * 
   * NOVO:
   * - ✅ ADICIONADO: Cálculo de páginas totais
   * 
   * @returns {number} - Total de páginas
   */
  const totalPaginas = useMemo(() => {
    return Math.ceil(membrosFiltrados.length / itensPorPagina);
  }, [membrosFiltrados.length, itensPorPagina]);

  /**
   * Função: obterMinistériosUnicos
   * 
   * Extrai lista única de ministérios dos membros para o filtro.
   * 
   * NOVO:
   * - ✅ ADICIONADO: Extração de ministérios únicos
   * 
   * @returns {Array} - Array de ministérios únicos
   */
  const obterMinistériosUnicos = () => {
    const ministérios = membros
      .map((m) => m.ministerio)
      .filter((m) => m && m.trim() !== "");
    return [...new Set(ministérios)].sort();
  };

  /**
   * useEffect: Carrega membros ao montar o componente
   * 
   * MUDANÇAS:
   * - ❌ REMOVIDO: Leitura de localStorage
   * - ✅ ADICIONADO: Chamada para fetchMembros() que busca da API
   */
  useEffect(() => {
    fetchMembros();
  }, []); // Array vazio = executa apenas uma vez ao montar o componente

  /**
   * useEffect: Resetar página quando filtros mudarem
   * 
   * NOVO:
   * - ✅ ADICIONADO: Reset automático da página ao mudar filtros
   */
  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroStatus, filtroGenero, filtroMinisterio]);

  // Renderização condicional: Loading
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Membros Cadastrados</h2>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Voltar
            </button>
          )}
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-600">Carregando membros...</div>
        </div>
      </div>
    );
  }

  // Renderização condicional: Erro
  if (erro) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Membros Cadastrados</h2>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Voltar
            </button>
          )}
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {erro}
        </div>
        <button
          onClick={fetchMembros}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  // Renderização principal: Tabela de membros
  return (
    <div className="space-y-6">
      {/* Cabeçalho com título e botões */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Membros Cadastrados ({membrosFiltrados.length} de {membros.length})
        </h2>
        <div className="flex gap-2">
          {/* Botão para exportar CSV */}
          <button
            onClick={handleExportarCSV}
            disabled={membrosFiltrados.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            title="Exportar para CSV"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>
          {/* Botão para atualizar a lista */}
          <button
            onClick={fetchMembros}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            title="Atualizar lista"
          >
            Atualizar
          </button>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Voltar
            </button>
          )}
        </div>
      </div>

      {/* Barra de busca e filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, email, CPF ou telefone..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro de Status */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>

          {/* Filtro de Gênero */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Gênero</label>
            <select
              value={filtroGenero}
              onChange={(e) => setFiltroGenero(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="todos">Todos</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
              <option value="N">Prefere não informar</option>
            </select>
          </div>

          {/* Filtro de Ministério */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Ministério</label>
            <select
              value={filtroMinisterio}
              onChange={(e) => setFiltroMinisterio(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="todos">Todos</option>
              {obterMinistériosUnicos().map((ministerio) => (
                <option key={ministerio} value={ministerio}>
                  {ministerio}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mensagem quando não há membros */}
      {membrosFiltrados.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-600 text-lg">
            {membros.length === 0
              ? "Nenhum membro cadastrado."
              : "Nenhum membro encontrado com os filtros selecionados."}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {membros.length === 0
              ? 'Clique em "Cadastrar Membro" para adicionar o primeiro membro.'
              : "Tente ajustar os filtros de busca."}
          </p>
        </div>
      ) : (
        <>
          {/* Tabela de membros */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CPF
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {membrosPaginados.map((membro) => (
                    <tr
                      key={membro.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Nome Completo */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {membro.nome_completo}
                        </div>
                        {membro.ministerio && (
                          <div className="text-xs text-gray-500">
                            {membro.ministerio}
                          </div>
                        )}
                      </td>

                      {/* CPF */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {membro.cpf ? formatarCPF(membro.cpf) : "-"}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{membro.email || "-"}</div>
                      </td>

                      {/* Telefone */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {membro.telefone ? formatarTelefone(membro.telefone) : "-"}
                        </div>
                      </td>

                      {/* Status (Ativo/Inativo) */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            membro.ativo
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {membro.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </td>

                      {/* Ações (Editar e Excluir) */}
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-3">
                          {/* Botão Editar */}
                          <button
                            onClick={() => handleEditar(membro.id)}
                            className="text-blue-600 hover:text-blue-900 hover:underline transition"
                            title="Editar membro"
                          >
                            Editar
                          </button>

                          {/* Botão Excluir */}
                          <button
                            onClick={() => handleExcluir(membro.id)}
                            disabled={excluindo === membro.id}
                            className={`transition ${
                              excluindo === membro.id
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-red-600 hover:text-red-900 hover:underline"
                            }`}
                            title="Excluir membro"
                          >
                            {excluindo === membro.id ? "Excluindo..." : "Excluir"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
              <div className="text-sm text-gray-700">
                Mostrando {((paginaAtual - 1) * itensPorPagina) + 1} a{" "}
                {Math.min(paginaAtual * itensPorPagina, membrosFiltrados.length)} de{" "}
                {membrosFiltrados.length} membros
              </div>
              <div className="flex items-center gap-2">
                {/* Botão Anterior */}
                <button
                  onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                  disabled={paginaAtual === 1}
                  className={`px-3 py-1 rounded-lg border transition ${
                    paginaAtual === 1
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Indicador de página */}
                <span className="text-sm text-gray-700">
                  Página {paginaAtual} de {totalPaginas}
                </span>

                {/* Botão Próximo */}
                <button
                  onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                  disabled={paginaAtual === totalPaginas}
                  className={`px-3 py-1 rounded-lg border transition ${
                    paginaAtual === totalPaginas
                      ? "border-gray-300 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListagemMembros;
