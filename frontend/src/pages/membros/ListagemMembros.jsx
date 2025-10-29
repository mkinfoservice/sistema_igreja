// src/pages/membros/ListagemMembros.jsx
import React, { useEffect, useState } from "react";

const ListagemMembros = ({ onBack }) => {
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("membros")) || [];
    setMembros(stored);
  }, []);

  const handleExcluir = (id) => {
    const updated = membros.filter((m) => m.id !== id);
    setMembros(updated);
    localStorage.setItem("membros", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Membros Cadastrados</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Voltar
        </button>
      </div>

      {membros.length === 0 ? (
        <p className="text-gray-600">Nenhum membro cadastrado.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {membros.map((membro) => (
              <tr key={membro.id} className="border-t">
                <td className="px-4 py-2">{membro.nome}</td>
                <td className="px-4 py-2">{membro.email}</td>
                <td className="px-4 py-2 flex justify-center space-x-3">
                  <button className="text-blue-600 hover:underline">Editar</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleExcluir(membro.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListagemMembros;
