import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formatarCPF,
  limparCPF,
  validarCPF,
  formatarTelefone,
  limparTelefone,
  validarTelefone,
  validarEmail,
} from "../../utils/validators";

import { api } from "../../services/apiClient";
import { parseApiErrors } from "../../utils/parseApiErrors";

/**
 * Componente de Cadastro de Membros
 */
const CadastroMembro = ({ onBack }) => {
  // Estado do formulário
  const [form, setForm] = useState({
    nome_completo: "",
    cpf: "",
    rg: "",
    data_nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    batizado: false,
    data_batismo: "",
    ministerio: "",
    genero: "N",
    ativo: true,
  });

  // ✅ ALTERAÇÃO: estado específico para erros por campo (DRF retorna assim: {cpf: ["..."]})
  const [fieldErrors, setFieldErrors] = useState({});

  // Estados de controle da UI
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let valorFormatado = value;

    if (name === "cpf") {
      valorFormatado = formatarCPF(value);
      if (valorFormatado.length > 14) valorFormatado = valorFormatado.slice(0, 14);

      // ✅ ALTERAÇÃO: limpa erro do backend do campo quando o usuário começa a editar
      setFieldErrors((prev) => ({ ...prev, cpf: undefined }));
    } else if (name === "telefone") {
      valorFormatado = formatarTelefone(value);
      if (valorFormatado.length > 15) valorFormatado = valorFormatado.slice(0, 15);

      // ✅ ALTERAÇÃO: limpa erro do backend do campo quando o usuário começa a editar
      setFieldErrors((prev) => ({ ...prev, telefone: undefined }));
    } else if (name === "email") {
      // ✅ ALTERAÇÃO: limpa erro do backend do campo quando o usuário começa a editar
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    } else if (name === "nome_completo") {
      setFieldErrors((prev) => ({ ...prev, nome_completo: undefined }));
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : valorFormatado,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ALTERAÇÃO: limpar erros/mensagens NO INÍCIO do submit (antes estava fora do componente, o que quebra o React)
    setMensagem("");
    setErro(null);
    setFieldErrors({});
    setLoading(true);

    try {
      // ✅ ALTERAÇÃO: não precisa checar token manualmente aqui se seu apiClient injeta Authorization.
      // Mas manter a checagem dá uma mensagem melhor para o usuário em caso de sessão perdida.
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Você precisa estar autenticado para cadastrar membros.");
      }

      // ======= Validações Front (UX) =======
      const cpfLimpo = limparCPF(form.cpf);
      if (!cpfLimpo || cpfLimpo.length !== 11) {
        throw new Error("CPF deve ter 11 dígitos.");
      }
      if (!validarCPF(cpfLimpo)) {
        throw new Error("CPF inválido. Verifique os dígitos informados.");
      }

      if (form.telefone) {
        const telefoneLimpo = limparTelefone(form.telefone);
        if (!validarTelefone(telefoneLimpo)) {
          throw new Error("Telefone inválido. Deve ter 10 ou 11 dígitos.");
        }
      }

      if (form.email && !validarEmail(form.email)) {
        throw new Error("Email inválido. Verifique o formato informado.");
      }

      // ✅ ALTERAÇÃO: montar payload limpo e consistente (você tinha duplicidade de cpf no payload)
      const dadosParaEnvio = {
        nome_completo: form.nome_completo,
        cpf: cpfLimpo,
        data_nascimento: form.data_nascimento,
        genero: form.genero,
        ativo: form.ativo,
        batizado: form.batizado,

        ...(form.rg && { rg: form.rg }),
        ...(form.endereco && { endereco: form.endereco }),
        ...(form.telefone && { telefone: limparTelefone(form.telefone) }),
        ...(form.email && { email: form.email }),
        ...(form.data_batismo && { data_batismo: form.data_batismo }),
        ...(form.ministerio && { ministerio: form.ministerio }),
      };

      // ✅ ALTERAÇÃO: usa api (axios) com endpoint correto /api/membros/
      const resp = await api.post("/api/membros/", dadosParaEnvio);
      const novoMembro = resp.data; // se quiser usar depois

      // ✅ Limpa o formulário após sucesso
      setForm({
        nome_completo: "",
        cpf: "",
        rg: "",
        data_nascimento: "",
        endereco: "",
        telefone: "",
        email: "",
        batizado: false,
        data_batismo: "",
        ministerio: "",
        genero: "N",
        ativo: true,
      });

      setMensagem("✅ Membro cadastrado com sucesso!");

      setTimeout(() => {
        if (onBack) onBack();
        else navigate("/membros");
      }, 1500);
    } catch (err) {
      console.error("Erro ao cadastrar membro:", err);

      // ✅ ALTERAÇÃO: parseApiErrors funciona com axios (err.response.data)
      // e também se você lançar um objeto {data: ...}
      const { fieldErrors: fe, globalError } = parseApiErrors(err);

      // ✅ salva erros por campo para exibir embaixo dos inputs
      if (fe && Object.keys(fe).length) {
        setFieldErrors(fe);

        // ✅ opcional: também mostra o primeiro erro como mensagem global no banner
        const first = Object.values(fe).find(Boolean);
        setErro(first || globalError || "Erro ao cadastrar membro.");
        return;
      }

      setErro(globalError || err.message || "Erro ao cadastrar membro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ALTERAÇÃO: validação visual do CPF/telefone usando o valor LIMPO (máscara não atrapalha)
  const cpfValidoVisual = !form.cpf || validarCPF(limparCPF(form.cpf));
  const telefoneValidoVisual = !form.telefone || validarTelefone(limparTelefone(form.telefone));
  const emailValidoVisual = !form.email || validarEmail(form.email);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Cadastrar Novo Membro</h2>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Voltar
          </button>
        )}
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {erro}
        </div>
      )}
      {mensagem && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {mensagem}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        {/* Nome Completo */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nome completo *</label>
          <input
            type="text"
            name="nome_completo"
            value={form.nome_completo}
            onChange={handleChange}
            required
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${
              fieldErrors.nome_completo ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Digite o nome completo"
          />
          {/* ✅ ALTERAÇÃO: erro do backend por campo */}
          {fieldErrors.nome_completo && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.nome_completo}</p>
          )}
        </div>

        {/* CPF */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">CPF *</label>
          <input
            type="text"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${
              fieldErrors.cpf || !cpfValidoVisual
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="000.000.000-00"
            maxLength="14"
          />

          {/* ✅ ALTERAÇÃO: prioridade pro erro do backend (CPF duplicado, etc.) */}
          {fieldErrors.cpf ? (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.cpf}</p>
          ) : (
            form.cpf &&
            !cpfValidoVisual && (
              <p className="text-xs text-red-600 mt-1">CPF inválido. Verifique os dígitos informados.</p>
            )
          )}
        </div>

        {/* RG */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">RG</label>
          <input
            type="text"
            name="rg"
            value={form.rg}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Digite o RG"
          />
        </div>

        {/* Data de Nascimento */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Data de Nascimento *</label>
          <input
            type="date"
            name="data_nascimento"
            value={form.data_nascimento}
            onChange={handleChange}
            required
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${
              fieldErrors.data_nascimento ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {fieldErrors.data_nascimento && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.data_nascimento}</p>
          )}
        </div>

        {/* Gênero */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Gênero</label>
          <select
            name="genero"
            value={form.genero}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
            <option value="N">Prefere não informar</option>
          </select>
        </div>

        {/* Endereço */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Rua, número, bairro, cidade"
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${
              fieldErrors.telefone || !telefoneValidoVisual
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="(00) 00000-0000"
            maxLength="15"
          />

          {fieldErrors.telefone ? (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.telefone}</p>
          ) : (
            form.telefone &&
            !telefoneValidoVisual && (
              <p className="text-xs text-red-600 mt-1">Telefone inválido. Deve ter 10 ou 11 dígitos.</p>
            )
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 outline-none ${
              fieldErrors.email || !emailValidoVisual
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="email@exemplo.com"
          />

          {fieldErrors.email ? (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
          ) : (
            form.email &&
            !emailValidoVisual && (
              <p className="text-xs text-red-600 mt-1">Email inválido. Verifique o formato informado.</p>
            )
          )}
        </div>

        {/* Ministério */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Ministério</label>
          <input
            type="text"
            name="ministerio"
            value={form.ministerio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: Louvor, Jovens, Crianças"
          />
        </div>

        {/* Batizado */}
        <div className="md:col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="batizado"
              checked={form.batizado}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Membro é batizado</span>
          </label>
        </div>

        {/* Data Batismo */}
        {form.batizado && (
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Data de Batismo</label>
            <input
              type="date"
              name="data_batismo"
              value={form.data_batismo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            )}
            {loading ? "Salvando..." : "Salvar Membro"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroMembro;
