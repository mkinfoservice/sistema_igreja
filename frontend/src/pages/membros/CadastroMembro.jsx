import React, { useState } from "react";

const CadastroMembro = ({ onBack }) => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    dataEntrada: "",
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    // Simula um pequeno delay de salvamento
    setTimeout(() => {
      const membros = JSON.parse(localStorage.getItem("membros")) || [];
      const novoMembro = { id: Date.now(), ...form };
      localStorage.setItem("membros", JSON.stringify([...membros, novoMembro]));

      setForm({
        nome: "",
        email: "",
        telefone: "",
        cargo: "",
        dataEntrada: "",
      });
      setLoading(false);
      setMensagem("✅ Membro cadastrado com sucesso!");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Cadastrar Novo Membro</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Voltar
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nome completo *</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">E-mail *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Telefone *</label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Cargo / Função</label>
          <select
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Selecione...</option>
            <option value="Membro">Membro</option>
            <option value="Líder">Líder</option>
            <option value="Pastor">Pastor</option>
            <option value="Visitante">Visitante</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Data de Entrada</label>
          <input
            type="date"
            name="dataEntrada"
            value={form.dataEntrada}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

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

      {mensagem && (
        <div className="text-green-600 font-medium text-sm">{mensagem}</div>
      )}
    </div>
  );
};

export default CadastroMembro;
