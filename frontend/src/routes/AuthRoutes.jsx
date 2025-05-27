import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CadastroMembro from "../pages/membros/CadastroMembro";
import EditarMembro from "../pages/membros/EditarMembro";
import ListagemMembros from "../pages/membros/ListagemMembros";

export const AuthRoutes = ({ logout }) => (
  <Routes>
    <Route path="/" element={<Dashboard onLogout={logout} />} />
    <Route path="/membros" element={<ListagemMembros />} />
    <Route path="/membros/cadastrar" element={<CadastroMembro />} />
    <Route path="/membros/editar/:id" element={<EditarMembro />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
