import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Card } from '../../components/ui/Card';

const ListagemMembros = () => {
    const [membros, setMembros] = useState([]);
    const [busca, setBusca] = useState("");

    // CORRIGIDO
    useEffect(() => {
       const fetchMembros = async () => {
        const token = localStorage.getItem("acess_token");

        try {
            const response = await fetch("http://localhost:8000/api/membros/${id}/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        if (!response.ok) {
            throw new Error("Erro ao buscar membros");
        }
        const data = await response.json();
        setMembros(data);
        } catch (error) {
            console.error("Erro ao buscar membros:", error.message);
        }
    };
    fetchMembros();
    }, []); // ← Agora está correto: fecha a arrow function E o `useEffect`

    const membrosFiltrados = membros.filter((membro) =>
  membro.nome?.toLowerCase().includes(busca.toLowerCase()) ||
  membro.funcao?.toLowerCase().includes(busca.toLowerCase())
);

    return (
        <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2x1 font-bold">Membros Cadastrados</h2>
        <button onClick={() => window.location.href = "/membros/cadastrar"}>+ Novo Membro
        </button>
        </div>

        <input
            placeholder="Buscar membro por nome ou função..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full md:w-1/2"/>

        <Card className="overflow-x-auto">
            <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="p-4">Nome</th>
                    <th className="p-4">Função</th>
                    <th className="p-4">Gênero</th>
                    <th className="p-4">Idade</th>
                    <th className="p-4">Data de Batismo</th>
                    <th className="p-4">Ações</th>
                </tr>
            </thead>
            <tbody>
                {membrosFiltrados.map((membro) => (
                <tr key={membro.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{membro.nome}</td>
                    <td className="p-4">{membro.funcao}</td>
                    <td className="p-4">{membro.genero}</td>
                    <td className="p-4">{membro.idade}</td>
                    <td className="p-4">{membro.data_batismo}</td>
                    <td className="p-4">
                        <Button onClick={() => window.location.href = `/membros/editar/${membro.id}`}>Editar</Button>
                        <Button onClick={() => window.location.href = `/membros/${membro.id}`}>Excluir</Button>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Card>
</div>
);
                }
export default ListagemMembros;