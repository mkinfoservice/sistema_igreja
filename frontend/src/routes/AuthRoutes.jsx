import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import CadastroMembro from "../pages/membros/CadastroMembro";
import EditarMembro from "../pages/membros/EditarMembro";
import ListagemMembros from "../pages/membros/ListagemMembros";

// Placeholder temporário
const EmBreve = ({ titulo }) => (
  <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
    {titulo} — Em breve 🚧
  </div>
);

export const AuthRoutes = ({ logout }) => (
  <Routes>
    {/* Rotas principais */}
    <Route path="/dashboard" element={<Dashboard onLogout={logout} />} />
    <Route path="/membros" element={<Members />} />
    <Route path="/membros/cadastrar" element={<CadastroMembro />} />
    <Route path="/membros/editar/:id" element={<EditarMembro />} />
    <Route path="/membros/listagem" element={<ListagemMembros />} />

    {/* Outros módulos */}
    <Route path="/financeiro" element={<EmBreve titulo="Financeiro" />} />
    <Route path="/certificados" element={<EmBreve titulo="Certificados" />} />
    <Route path="/sala-virtual" element={<EmBreve titulo="Sala Virtual" />} />

    {/* Redirecionar / para /dashboard */}
    <Route path="/" element={<Navigate to="/dashboard" />} />
    <Route path="*" element={<Navigate to="/dashboard" />} />
  </Routes>
);
