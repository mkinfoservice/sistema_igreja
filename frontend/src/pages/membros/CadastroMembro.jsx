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

/**
 * Componente de Cadastro de Membros
 * 
 * Este componente permite cadastrar novos membros na igreja.
 * 
 * MUDANÇAS REALIZADAS:
 * - ❌ REMOVIDO: Uso de localStorage para salvar membros
 * - ✅ ADICIONADO: Integração com API backend via POST /api/membros/
 * - ✅ ATUALIZADO: Campos do formulário para corresponder ao modelo Membro do backend
 * - ✅ ADICIONADO: Tratamento de erros da API
 * - ✅ ADICIONADO: Navegação automática após cadastro bem-sucedido
 * 
 * @param {Function} onBack - Função callback para voltar ao menu anterior (opcional)
 */
const CadastroMembro = ({ onBack }) => {
  // Estado do formulário - campos correspondem ao modelo Membro do backend
  const [form, setForm] = useState({
    nome_completo: "",        // Campo obrigatório
    cpf: "",                  // Campo obrigatório, único no banco
    rg: "",                   // Opcional
    data_nascimento: "",      // Campo obrigatório
    endereco: "",             // Opcional
    telefone: "",             // Opcional
    email: "",                // Opcional
    batizado: false,          // Boolean, padrão false
    data_batismo: "",         // Opcional, só aparece se batizado = true
    ministerio: "",           // Opcional
    genero: "N",              // Padrão: "Prefere não informar"
    idade: "",                // Opcional
    ativo: true,              // Padrão: true (membro ativo)
  });

  // Estados de controle da UI
  const [loading, setLoading] = useState(false);           // Controla estado de carregamento
  const [mensagem, setMensagem] = useState("");          // Mensagem de sucesso/erro
  const [erro, setErro] = useState(null);                // Mensagem de erro específica

  // Hook do React Router para navegação
  const navigate = useNavigate();

  /**
   * Função: handleChange
   * 
   * Atualiza o estado do formulário quando o usuário digita nos campos.
   * 
   * MUDANÇAS:
   * - ✅ MANTIDO: Lógica básica de atualização de estado
   * - ✅ MELHORADO: Suporte para diferentes tipos de input (text, checkbox, date)
   * - ✅ ADICIONADO: Aplicação automática de máscaras (CPF, telefone)
   * - ✅ ADICIONADO: Validação em tempo real de CPF
   * 
   * @param {Event} e - Evento do input (onChange)
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let valorFormatado = value;

    // Aplica máscaras automaticamente conforme o campo
    if (name === "cpf") {
      // Aplica máscara de CPF (000.000.000-00)
      valorFormatado = formatarCPF(value);
      // Limita a 14 caracteres (11 dígitos + 3 caracteres de formatação)
      if (valorFormatado.length > 14) {
        valorFormatado = valorFormatado.slice(0, 14);
      }
    } else if (name === "telefone") {
      // Aplica máscara de telefone ((00) 00000-0000)
      valorFormatado = formatarTelefone(value);
      // Limita a 15 caracteres
      if (valorFormatado.length > 15) {
        valorFormatado = valorFormatado.slice(0, 15);
      }
    }

    // Se for checkbox, usa o valor checked, senão usa o valor formatado
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : valorFormatado,
    }));
  };

  /**
   * Função: handleSubmit
   * 
   * Envia os dados do formulário para a API backend.
   * 
   * MUDANÇAS REALIZADAS:
   * - ❌ REMOVIDO: setTimeout e localStorage.setItem
   * - ✅ ADICIONADO: Requisição POST para /api/membros/
   * - ✅ ADICIONADO: Autenticação JWT via header Authorization
   * - ✅ ADICIONADO: Tratamento de erros da API
   * - ✅ ADICIONADO: Validação de campos obrigatórios
   * - ✅ ADICIONADO: Navegação automática após sucesso
   * 
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne recarregamento da página
    
    // Limpa mensagens anteriores
    setMensagem("");
    setErro(null);
    setLoading(true);

    try {
      // Obtém o token JWT do localStorage (armazenado no login)
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        throw new Error("Você precisa estar autenticado para cadastrar membros.");
      }

      // VALIDAÇÕES ANTES DE ENVIAR
      // Valida CPF (obrigatório e deve ser válido)
      const cpfLimpo = limparCPF(form.cpf);
      if (!cpfLimpo || cpfLimpo.length !== 11) {
        throw new Error("CPF deve ter 11 dígitos.");
      }
      if (!validarCPF(cpfLimpo)) {
        throw new Error("CPF inválido. Verifique os dígitos informados.");
      }

      // Valida telefone (se preenchido, deve ser válido)
      if (form.telefone) {
        const telefoneLimpo = limparTelefone(form.telefone);
        if (!validarTelefone(telefoneLimpo)) {
          throw new Error("Telefone inválido. Deve ter 10 ou 11 dígitos.");
        }
      }

      // Valida email (se preenchido, deve ser válido)
      if (form.email && !validarEmail(form.email)) {
        throw new Error("Email inválido. Verifique o formato informado.");
      }

      // Prepara os dados para envio
      // Remove campos vazios opcionais para não enviar null/undefined
      // IMPORTANTE: Envia CPF e telefone sem formatação (apenas números)
      const dadosParaEnvio = {
        nome_completo: form.nome_completo,
        cpf: cpfLimpo, // CPF sem formatação (apenas números)
        data_nascimento: form.data_nascimento,
        genero: form.genero,
        ativo: form.ativo,
        batizado: form.batizado,
        // Campos opcionais - só envia se tiver valor
        ...(form.rg && { rg: form.rg }),
        ...(form.endereco && { endereco: form.endereco }),
        ...(form.telefone && { telefone: limparTelefone(form.telefone) }), // Telefone sem formatação
        ...(form.email && { email: form.email }),
        ...(form.data_batismo && { data_batismo: form.data_batismo }),
        ...(form.ministerio && { ministerio: form.ministerio }),
        ...(form.idade && { idade: parseInt(form.idade) }),
      };

      // Faz a requisição POST para criar o membro
      const response = await fetch("http://localhost:8000/api/membros/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token JWT para autenticação
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      // Verifica se a requisição foi bem-sucedida
      if (!response.ok) {
        // Tenta obter mensagem de erro da API
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || 
          errorData.message || 
          `Erro ao cadastrar membro: ${response.status} ${response.statusText}`
        );
      }

      // Se chegou aqui, o cadastro foi bem-sucedido
      const novoMembro = await response.json();
      
      // Limpa o formulário
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
        idade: "",
        ativo: true,
      });

      // Mostra mensagem de sucesso
      setMensagem("✅ Membro cadastrado com sucesso!");

      // Se houver callback onBack, chama após 1.5 segundos
      // Caso contrário, navega para a listagem de membros
      setTimeout(() => {
        if (onBack) {
          onBack();
        } else {
          navigate("/membros");
        }
      }, 1500);

    } catch (err) {
      // Trata erros de rede, validação ou autenticação
      console.error("Erro ao cadastrar membro:", err);
      setErro(err.message || "Erro ao cadastrar membro. Tente novamente.");
    } finally {
      // Sempre desativa o loading, mesmo em caso de erro
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com título e botão voltar */}
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

      {/* Mensagens de erro e sucesso */}
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

      {/* Formulário de cadastro */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        {/* Nome Completo - OBRIGATÓRIO */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Nome completo *
          </label>
          <input
            type="text"
            name="nome_completo"
            value={form.nome_completo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Digite o nome completo"
          />
        </div>

        {/* CPF - OBRIGATÓRIO */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">CPF *</label>
          <input
            type="text"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
              form.cpf && !validarCPF(form.cpf)
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="000.000.000-00"
            maxLength="14"
          />
          {form.cpf && !validarCPF(form.cpf) && (
            <p className="text-xs text-red-600 mt-1">
              CPF inválido. Verifique os dígitos informados.
            </p>
          )}
        </div>

        {/* RG - OPCIONAL */}
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

        {/* Data de Nascimento - OBRIGATÓRIO */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Data de Nascimento *
          </label>
          <input
            type="date"
            name="data_nascimento"
            value={form.data_nascimento}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
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

        {/* Idade - OPCIONAL */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Idade</label>
          <input
            type="number"
            name="idade"
            value={form.idade}
            onChange={handleChange}
            min="0"
            max="150"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Idade"
          />
        </div>

        {/* Endereço - OPCIONAL */}
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

        {/* Telefone - OPCIONAL */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
              form.telefone && !validarTelefone(form.telefone)
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="(00) 00000-0000"
            maxLength="15"
          />
          {form.telefone && !validarTelefone(form.telefone) && (
            <p className="text-xs text-red-600 mt-1">
              Telefone inválido. Deve ter 10 ou 11 dígitos.
            </p>
          )}
        </div>

        {/* E-mail - OPCIONAL */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
              form.email && !validarEmail(form.email)
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="email@exemplo.com"
          />
          {form.email && !validarEmail(form.email) && (
            <p className="text-xs text-red-600 mt-1">
              Email inválido. Verifique o formato informado.
            </p>
          )}
        </div>

        {/* Ministério - OPCIONAL */}
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

        {/* Batizado - CHECKBOX */}
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

        {/* Data de Batismo - Só aparece se batizado = true */}
        {form.batizado && (
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">
              Data de Batismo
            </label>
            <input
              type="date"
              name="data_batismo"
              value={form.data_batismo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}

        {/* Botão de Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {/* Spinner de loading */}
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
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
