import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { api } from "../../services/apiClient";
import { parseApiErrors } from "../../utils/parseApiErrors";

const EditarMembro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_completo: "",
    cpf: "",
    rg: "",
    data_nascimento: "",
    endereco: "",
    telefone: "",
    email: "",
    batizado: false,
    data_batismo: "",
    ministerio: "",
    ativo: true,
    genero: "N",
    idade: ""
  });

  const [fieldErrors, setFieldErrors] = useState({}); // Erros por campo
  const [error, setError] = useState(null); // Erro global
  const [isLoading, setIsLoading] = useState(false);

  // Busca os dados do membro ao carregar o componente
  useEffect(() => {
    const fetchMembro = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`http://localhost:8000/api/membros/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do membro");
        }

        const data = await response.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar dados do membro.");
      }
    };

    fetchMembro();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Limpar o erro específico do campo quando o usuário começa a digitar
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({}); // Limpar os erros

    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`http://localhost:8000/api/membros/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar alterações");
      }

      alert("Alterações salvas com sucesso!");
      navigate("/membros");
    } catch (err) {
      console.error(err);
      
      // Usar a função parseApiErrors para processar os erros da API
      const { fieldErrors: fe, globalError } = parseApiErrors(err);
      if (fe && Object.keys(fe).length) {
        setFieldErrors(fe); // Exibe os erros nos campos
        setError(globalError || "Erro ao salvar alterações."); // Exibe erro global
      } else {
        setError(globalError || "Erro ao salvar alterações."); // Caso não tenha erro específico
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Membro</h2>
      <Card className="p-4 space-y-4">
        {error && <p className="text-red-500">{error}</p>} {/* Erro global */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="nome_completo"
            value={formData.nome_completo}
            onChange={handleChange}
            placeholder="Nome completo"
            required
            className={fieldErrors.nome_completo ? "border-red-500" : ""}
          />
          {fieldErrors.nome_completo && (
            <p className="text-xs text-red-600">{fieldErrors.nome_completo}</p>
          )}

          <Input
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="CPF"
            required
            className={fieldErrors.cpf ? "border-red-500" : ""}
          />
          {fieldErrors.cpf && (
            <p className="text-xs text-red-600">{fieldErrors.cpf}</p>
          )}

          <Input
            name="rg"
            value={formData.rg}
            onChange={handleChange}
            placeholder="RG"
          />
          {fieldErrors.rg && (
            <p className="text-xs text-red-600">{fieldErrors.rg}</p>
          )}

          <Input
            type="date"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            required
          />
          {fieldErrors.data_nascimento && (
            <p className="text-xs text-red-600">{fieldErrors.data_nascimento}</p>
          )}

          <Input
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Endereço"
          />
          {fieldErrors.endereco && (
            <p className="text-xs text-red-600">{fieldErrors.endereco}</p>
          )}

          <Input
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Telefone"
          />
          {fieldErrors.telefone && (
            <p className="text-xs text-red-600">{fieldErrors.telefone}</p>
          )}

          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-600">{fieldErrors.email}</p>
          )}

          <label className="flex items-center">
            <input
              type="checkbox"
              name="batizado"
              checked={formData.batizado}
              onChange={handleChange}
              className="mr-2"
            />
            Batizado
          </label>

          <Input
            type="date"
            name="data_batismo"
            value={formData.data_batismo || ""}
            onChange={handleChange}
          />
          {fieldErrors.data_batismo && (
            <p className="text-xs text-red-600">{fieldErrors.data_batismo}</p>
          )}

          <Input
            name="ministerio"
            value={formData.ministerio}
            onChange={handleChange}
            placeholder="Ministério"
          />

          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
          </select>

          <Input
            type="number"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            placeholder="Idade"
          />
          {fieldErrors.idade && (
            <p className="text-xs text-red-600">{fieldErrors.idade}</p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EditarMembro;
