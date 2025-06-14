import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Card } from '../../components/ui/Card';

function CadastroMembro() {
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

    // corrige data_batismo se vier vazia
    const payload = {
      ...formData,
      data_batismo: formData.data_batismo === '' ? null : formData.data_batismo,
    };

    try {
      await axios.post('http://localhost:8000/api/membros/', payload);
      alert('Membro cadastrado com sucesso!');
      setFormData({
        nome_completo: '', cpf: '', rg: '', data_nascimento: '', endereco: '', telefone: '',
        email: '', batizado: false, data_batismo: '', ministerio: '', ativo: true, genero: 'N', idade: ''
      });
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
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-xl font-bold mb-4">Cadastro de Membro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nome_completo" value={formData.nome_completo} onChange={handleChange} placeholder="Nome completo" className="w-full border p-2 rounded" required />
        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" className="w-full border p-2 rounded" required />
        <input type="text" name="rg" value={formData.rg} onChange={handleChange} placeholder="RG" className="w-full border p-2 rounded" />
        <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} placeholder="Endereço" className="w-full border p-2 rounded" />
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" className="w-full border p-2 rounded" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
        <label className="flex items-center">
          <input type="checkbox" name="batizado" checked={formData.batizado} onChange={handleChange} className="mr-2" /> Batizado
        </label>
        <input type="date" name="data_batismo" value={formData.data_batismo} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="ministerio" value={formData.ministerio} onChange={handleChange} placeholder="Ministério" className="w-full border p-2 rounded" />
        <select name="genero" value={formData.genero} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <input type="number" name="idade" value={formData.idade} onChange={handleChange} placeholder="Idade" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroMembro;
