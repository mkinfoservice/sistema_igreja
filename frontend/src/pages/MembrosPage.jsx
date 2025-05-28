import React, { useEffect, useState } from "react";
import axios from "axios";  

const MembrosPage = () => {
  const [membros, setMembros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembros = async () => {
      const token = localStorage.getItem("access_token");
      console.log("Token usado:", token);
  
      try {
        const response = await fetch(`http://localhost:8000/api/membros/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro da API:", errorData);
          throw new Error("Erro ao buscar membros");
        }
  
        const data = await response.json();
        console.log("Dados recebidos:", data);
        setMembros(data);
      } catch (error) {
        console.error("Erro ao buscar membros:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMembros();
  }, []);    // Corrigido: useEffect agora fecha corretamente

  if (loading) {
    return <p>Carregando membros...</p>;
  }

  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de Membros</h1>
        {membros.length === 0 ? (
          <p>Nenhum membro encontrado.</p>
        ) : (
            <ul className="space-y-2">
                {membros.map((membro) => (

                    <li key={membro.id} className="p-4 border rounded shadow">
                        <p><strong>Nome:</strong> {membro.nome_completo}</p>
                        <p><strong>Email:</strong> {membro.email}</p>
                        <p><strong>Telefone:</strong> {membro.telefone}</p>
                        <p><strong>Data de Nascimento:</strong> {membro.data_nascimento}</p>
                        <p><strong>Endereço:</strong> {membro.endereco}</p>
                        <p><strong>Gênero:</strong> {membro.genero}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};


export default MembrosPage;