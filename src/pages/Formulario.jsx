import { useState } from "react";

export default function Formulario() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando dados:", formData);

    try {
      const response = await fetch("http://localhost:8080/curriculos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Erro na requisição");

      const data = await response.json();
      console.log("Resposta da API:", data);
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome: </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Telefone: </label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Enviar</button>
      </form>
    </div>
  );
}