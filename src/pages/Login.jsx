import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        login: "",
        senha: ""    
    });

    const [erro, setErro] = useState(""); // para mensagem de erro
    const navigate = useNavigate(); // para mudar de página

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(""); // limpa mensagem anterior

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.login,
                    password: formData.senha
                })
            });
            if (!response.ok) throw new Error("Login ou senha inválidos");
            const data = await response.json();
            console.log("Resposta da API:", data);

            // 1️⃣ Salva o token na sessão
            sessionStorage.setItem("token", data.token);

            // 2️⃣ Redireciona para Home
            navigate("/home");

        } 
        catch (error) {
            // 3️⃣ Exibe mensagem de erro
            setErro(error.message || "Erro ao fazer login");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Login: </label>
                    <input
                        type="text"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                <label>Senha: </label>
                <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                />
                </div>
                <button type="submit" style={{ marginTop: "10px" }}>Entrar</button>
            </form>
             {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}
        </div>
    );    
}