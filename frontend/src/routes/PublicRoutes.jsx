import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";

export const PublicRoutes = ({ onLoginSuccess }) => (
  <Routes>
    <Route path="/" element={<Login onLoginSuccess={onLoginSuccess} />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
