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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Membros</h2>
        <input
          type="text"
          placeholder="Buscar membros..."
          className="p-2 border rounded"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {membrosFiltrados.length === 0 ? (
        <p className="p-4">Nenhum membro encontrado</p>
      ) : (
        <div className="space-y-3">
          {membrosFiltrados.map(membro => (
            <div key={membro.id} className="p-4 border rounded shadow">
              <p><strong>Nome:</strong> {membro.nome_completo}</p>
              <p><strong>Email:</strong> {membro.email}</p>
              <p><strong>Telefone:</strong> {membro.telefone}</p>
              <p><strong>CPF:</strong> {membro.cpf}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate(`/membros/editar/${membro.id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(membro.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembrosPage;