import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MembrosPage = () => {
  const [membros, setMembros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembros = async () => {
      const token = localStorage.getItem("access_token");
      
      try {
        const response = await fetch(`http://localhost:8000/api/membros/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`Erro ${response.status}`);
        
        const data = await response.json();
        setMembros(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembros();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;
    
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:8000/api/membros/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Falha ao excluir");
      
      setMembros(membros.filter(m => m.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const membrosFiltrados = membros.filter(membro => 
    membro.nome_completo?.toLowerCase().includes(busca.toLowerCase()) ||
    membro.email?.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) return <p className="p-4">Carregando...</p>;
  if (error) return <p className="p-4 text-red-500">Erro: {error}</p>;

  return (
    <div>
     

      
    </div> 
  );
};

export default MembrosPage;