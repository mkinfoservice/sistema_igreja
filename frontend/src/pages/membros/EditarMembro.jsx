import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Card } from '../../components/ui/Card';

const EditarMembro = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [membro, setMembro] = useState({
        nome: "",
        funcao: "",
        idade: "",
        genero: "",
        data_batismo: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);

    // Configuração do Axios para incluir o token em todas as requisições
axios.interceptors.request.use(config => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } return config;
});
    useEffect(() => {
        const fetchMembro = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/membros/${id}/`);
                //Formata a data para o input type = "date" (YYYY-MM-DD)
                if (response.data.data_batismo) {
                    response.data.data_batismo = new Date(response.data.data_batismo).toISOString().split("T")[0];
                }
                setMembro(response.data);
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar membro:", err);
                setError("Erro ao buscar membro. Por favor, tente novamente mais tarde.");
                if (err.response?.status === 401){
                    navigate("/login");
                }
            } finally {
                setIsFetching(false);
            }
        }
        fetchMembro();
    }, [id, navigate]);

    const handleChange = (e) => {
        setMembro({...membro, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
         axios.put(`http://localhost:8000/api/membros/${id}/`, membro)
            .then(() => navigate("/membros"))
            .catch(err => console.error("Erro ao atualizar membro:", err))
            .finally(() => setIsLoading(false));
    };
    if (isFetching) {
        return (
            <div className="p-4 max-w-xl mx-auto flex justify-center">
                <p>Carregando membro...</p>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Editar Membro</h2>
            <Card className="p-4 space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ... (seus campos de formulário permanecem os mesmos) ... */}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default EditarMembro;