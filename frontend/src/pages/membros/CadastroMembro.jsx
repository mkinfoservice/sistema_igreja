import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ← IMPORTA
import { ArrowLeft } from 'lucide-react'; // ← IMPORTA ÍCONE

function CadastroMembro() {
  const navigate = useNavigate(); // ← CRIA O NAVIGATE
  
  const [formData, setFormData] = useState({
    nome_completo: '',
    cpf: '',
    rg: '',
    data_nascimento: '',
    endereco: '',
    telefone: '',
    email: '',
    batizado: false,
    data_batismo: '',
    ministerio: '',
    ativo: true,
    genero: 'N',
    idade: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      data_batismo: formData.data_batismo === '' ? null : formData.data_batismo,
    };

    try {
      await axios.post('http://localhost:8000/api/membros/', payload);
      alert('Membro cadastrado com sucesso!');
      navigate('/dashboard'); // ← VOLTA PARA O DASHBOARD
    } catch (error) {
      if (error.response) {
        console.error('Erro ao cadastrar membro:', error.response.data);
        alert('Erro ao cadastrar membro: ' + JSON.stringify(error.response.data));
      } else {
        console.error('Erro ao cadastrar membro:', error.message);
        alert('Erro desconhecido ao cadastrar membro: ');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Cabeçalho com botão Voltar */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar ao Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Cadastro de Membro</h1>
      </div>

      {/* Formulário */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
            <input 
              type="text" 
              name="nome_completo" 
              value={formData.nome_completo} 
              onChange={handleChange} 
              placeholder="Nome completo" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
              <input 
                type="text" 
                name="cpf" 
                value={formData.cpf} 
                onChange={handleChange} 
                placeholder="000.000.000-00" 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
              <input 
                type="text" 
                name="rg" 
                value={formData.rg} 
                onChange={handleChange} 
                placeholder="00.000.000-0" 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
              <input 
                type="date" 
                name="data_nascimento" 
                value={formData.data_nascimento} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
              <select 
                name="genero" 
                value={formData.genero} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <input 
              type="text" 
              name="endereco" 
              value={formData.endereco} 
              onChange={handleChange} 
              placeholder="Rua, número, bairro, cidade" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input 
                type="text" 
                name="telefone" 
                value={formData.telefone} 
                onChange={handleChange} 
                placeholder="(00) 00000-0000" 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="email@exemplo.com" 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="batizado" 
                checked={formData.batizado} 
                onChange={handleChange} 
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
              />
              <span className="text-sm font-medium text-gray-700">Batizado</span>
            </label>
          </div>

          {formData.batizado && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data do Batismo</label>
              <input 
                type="date" 
                name="data_batismo" 
                value={formData.data_batismo} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ministério</label>
            <input 
              type="text" 
              name="ministerio" 
              value={formData.ministerio} 
              onChange={handleChange} 
              placeholder="Ex: Louvor, Intercessão, Jovens" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
            <input 
              type="number" 
              name="idade" 
              value={formData.idade} 
              onChange={handleChange} 
              placeholder="Idade" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4 border-t">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Cadastrar Membro
            </button>
            <button 
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroMembro;