import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import CadastroMembro from "../pages/membros/CadastroMembro";
import EditarMembro from "../pages/membros/EditarMembro";
import ListagemMembros from "../pages/membros/ListagemMembros";

// Páginas placeholder temporárias
const EmBreve = ({ titulo }) => (
  <div className="flex items-center justify-center h-screen text-gray-600 text-xl">
    {titulo} — Em breve 🚧
  </div>
);

export const AuthRoutes = ({ logout }) => (
  <Routes>
    <Route path="/" element={<Dashboard onLogout={logout} />} />

    {/* Módulo de Membros */}
    <Route path="/membros" element={<Members />} />
    <Route path="/membros/cadastrar" element={<CadastroMembro />} />
    <Route path="/membros/editar/:id" element={<EditarMembro />} />

    {/* Placeholders dos módulos futuros */}
    <Route path="/financeiro" element={<EmBreve titulo="Financeiro" />} />
    <Route path="/certificados" element={<EmBreve titulo="Certificados" />} />
    <Route path="/sala-virtual" element={<EmBreve titulo="Sala Virtual" />} />

    {/* Redirecionamento padrão */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
