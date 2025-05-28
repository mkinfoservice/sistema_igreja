import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const ListagemMembros = () => {
    const [membros, setMembros] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        const fetchMembros = async () => {
            const token = localStorage.getItem("acess_token");

            try {
                const response = await fetch("http://localhost:8000/api/membros/", {
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
    }, []);

    const handleDelete = async (membroId) => {
        const confirmar = window.confirm("Tem certeza que deseja excluir este membro?");
        if (!confirmar) return;

        const token = localStorage.getItem("acess_token");

        try {
            const response = await fetch(`http://localhost:8000/api/membros/${membroId}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir membro");
            }

            setMembros(prevMembros => prevMembros.filter(m => m.id !== membroId));
            alert("Membro excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir membro:", error.message);
            alert("Erro ao excluir o membro.");
        }
    };

    const membrosFiltrados = membros.filter((membro) =>
        membro.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        membro.funcao?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Membros Cadastrados</h2>
                <Button onClick={() => window.location.href = "/membros/cadastrar"}>+ Novo Membro</Button>
            </div>

            <Input
                placeholder="Buscar membro por nome ou função..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full md:w-1/2"
            />

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
                                <td className="p-4 flex gap-2">
                                    <Button onClick={() => window.location.href = `/membros/editar/${membro.id}`} className="bg-blue-500 hover:bg-blue-600">
                                        Editar
                                    </Button>
                                    <Button onClick={() => handleDelete(membro.id)} className="bg-red-500 hover:bg-red-600">
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ListagemMembros;
