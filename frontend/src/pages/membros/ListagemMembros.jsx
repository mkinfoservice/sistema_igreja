// src/pages/membros/ListagemMembros.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { exportarCSV } from "../../utils/export";
import { formatarCPF, formatarTelefone } from "../../utils/validators";
import CadastroMembro from "./CadastroMembro.jsx";

// ✅ ALTERAÇÃO: padroniza chamadas de API com o client (axios)
import { api } from "../../services/apiClient";

// ✅ ALTERAÇÃO: padroniza parse de erros DRF (cpf/email/telefone/detail)
import { parseApiErrors } from "../../utils/parseApiErrors";

const ListagemMembros = ({ onBack }) => {
  const [membros, setMembros] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [excluindo, setExcluindo] = useState(null);

  const [busca, setBusca] = useState("");
  const [view, setView] = useState("lista");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [filtroMinisterio, setFiltroMinisterio] = useState("todos");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;

  const navigate = useNavigate();

  const fetchMembros = async () => {
    setLoading(true);
    setErro(null);

    try {
      // ✅ ALTERAÇÃO: se não tiver token, já falha cedo com mensagem clara
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Você precisa estar autenticado para visualizar membros.");
      }

      // ✅ ALTERAÇÃO: usa axios client, sem URL hardcoded
      const resp = await api.get("/api/membros/");
      setMembros(resp.data);
    } catch (err) {
      console.error("Erro ao buscar membros:", err);

      // ✅ ALTERAÇÃO: parseApiErrors pega 'detail' do DRF (ex: "As credenciais..."
      const { globalError } = parseApiErrors(err);

      // ✅ fallback para mensagens genéricas
      setErro(globalError || err.message || "Erro ao carregar membros. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este membro? Esta ação não pode ser desfeita."
    );
    if (!confirmar) return;

    setExcluindo(id);

    try {
      // ✅ ALTERAÇÃO: token check (melhor UX em caso de sessão perdida)
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Você precisa estar autenticado para excluir membros.");
      }

      // ✅ ALTERAÇÃO: usa axios client, sem URL hardcoded
      await api.delete(`/api/membros/${id}/`);

      // Mantém seu comportamento (otimização local)
      setMembros((prev) => prev.filter((m) => m.id !== id));

      alert("Membro excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir membro:", err);

      // ✅ ALTERAÇÃO: tenta mostrar mensagem real do backend (DRF detail)
      const { globalError } = parseApiErrors(err);
      alert(globalError || err.message || "Erro ao excluir membro. Tente novamente.");
    } finally {
      setExcluindo(null);
    }
  };

  const handleEditar = (id) => {
    navigate(`/membros/editar/${id}`);
  };

  const handleCadastrar = () => {
    setView("cadastrar");
  };

  const membrosFiltrados = useMemo(() => {
    return membros.filter((membro) => {
      const buscaLower = busca.toLowerCase();
      const matchBusca =
        !busca ||
        membro.nome_completo?.toLowerCase().includes(buscaLower) ||
        membro.email?.toLowerCase().includes(buscaLower) ||
        membro.cpf?.includes(busca) ||
        membro.telefone?.includes(busca);

      const matchStatus =
        filtroStatus === "todos" ||
        (filtroStatus === "ativo" && membro.ativo) ||
        (filtroStatus === "inativo" && !membro.ativo);

      const matchGenero = filtroGenero === "todos" || membro.genero === filtroGenero;

      const matchMinisterio =
        filtroMinisterio === "todos" || membro.ministerio === filtroMinisterio;

      return matchBusca && matchStatus && matchGenero && matchMinisterio;
    });
  }, [membros, busca, filtroStatus, filtroGenero, filtroMinisterio]);

  const membrosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return membrosFiltrados.slice(inicio, fim);
  }, [membrosFiltrados, paginaAtual, itensPorPagina]);

  const totalPaginas = useMemo(() => {
    return Math.ceil(membrosFiltrados.length / itensPorPagina);
  }, [membrosFiltrados.length, itensPorPagina]);

  const obterMinisteriosUnicos = () => {
    const ministerios = membros
      .map((m) => m.ministerio)
      .filter((m) => m && m.trim() !== "");
    return [...new Set(ministerios)].sort();
  };

  // ✅ ALTERAÇÃO: fetch inicial mantendo sua lógica
  useEffect(() => {
    fetchMembros();
  }, []);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca, filtroStatus, filtroGenero, filtroMinisterio]);

  const handleExportarCSV = () => {
    exportarCSV(membrosFiltrados, "membros", {
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
    });
  };

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

  if (view === "cadastrar") {
    return <CadastroMembro onBack={() => setView("lista")} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Membros Cadastrados ({membrosFiltrados.length} de {membros.length})
        </h2>
        <div className="flex gap-2">
          <button
              onClick={handleCadastrar}
              className="bg-green-600 text-white px-4 py-3 rounded-lg shadow hover:bg-green-700 transition"
            >
              Cadastrar Membro
            </button>
          <button
            onClick={handleExportarCSV}
            disabled={membrosFiltrados.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            title="Exportar para CSV"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>

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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div>
            <label className="block text-sm text-gray-600 mb-1">Ministério</label>
            <select
              value={filtroMinisterio}
              onChange={(e) => setFiltroMinisterio(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="todos">Todos</option>
              {obterMinisteriosUnicos().map((ministerio) => (
                <option key={ministerio} value={ministerio}>
                  {ministerio}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      

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
                    <tr key={membro.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{membro.nome_completo}</div>
                        {membro.ministerio && (
                          <div className="text-xs text-gray-500">{membro.ministerio}</div>
                        )}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {membro.cpf ? formatarCPF(membro.cpf) : "-"}
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{membro.email || "-"}</div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {membro.telefone ? formatarTelefone(membro.telefone) : "-"}
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            membro.ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {membro.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEditar(membro.id)}
                            className="text-blue-600 hover:text-blue-900 hover:underline transition"
                            title="Editar membro"
                          >
                            Editar
                          </button>

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

          {totalPaginas > 1 && (
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
              <div className="text-sm text-gray-700">
                Mostrando {((paginaAtual - 1) * itensPorPagina) + 1} a{" "}
                {Math.min(paginaAtual * itensPorPagina, membrosFiltrados.length)} de{" "}
                {membrosFiltrados.length} membros
              </div>

              <div className="flex items-center gap-2">
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

                <span className="text-sm text-gray-700">
                  Página {paginaAtual} de {totalPaginas}
                </span>

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
