// src/pages/Members.jsx
import React, { useState } from "react";
import ListagemMembros from "./membros/ListagemMembros";
import CadastroMembro from './pages/membros/CadastroMembro.jsx';

const Members = () => {
  const [view, setView] = useState("menu");

  return (
    <div className="p-6">
      {view === "menu" && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Membros</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setView("listar")}
              className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Consultar Membros
            </button>
            <button
              onClick={() => setView("cadastrar")}
              className="bg-green-600 text-white px-4 py-3 rounded-lg shadow hover:bg-green-700 transition"
            >
              Cadastrar Membro
            </button>
          </div>
        </div>
      )}

      {view === "listar" && <ListagemMembros onBack={() => setView("menu")} />}
      {view === "cadastrar" && <CadastroMembro onBack={() => setView("menu")} />}
    </div>
  );
};

export default Members;
