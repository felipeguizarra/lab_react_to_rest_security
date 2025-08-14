import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi"; // supondo que o hook esteja aqui

export default function Home() {
  const { get } = useApi();
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    get("/users")
      .then(res => {
        setMensagem(res.data); // guarda a string retornada pelo backend
      })
      .catch(err => {
        console.error(err);
        setMensagem("Erro ao buscar dados.");
      });
  }, [get]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      backgroundColor: "#f5f5f5"
    }}>
      <h1>Bem-vindo ao Sistema</h1>
      <p>Este é um laboratório para cadastro e consulta .</p>

      <h2>Resposta do servidor:</h2>
      <p>{mensagem}</p>

       {/* Exibe o token */}
      <div style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "80%",
          maxWidth: "600px",
          wordWrap: "break-word",
          fontSize: "0.9em"
        }}>
    
        
      </div>

      <Link
        to="/form"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px"
        }}
      >
        Ir para o Formulário
      </Link>
    </div>
  );
}