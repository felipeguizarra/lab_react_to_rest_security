import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi"; // hook
export default function Home() {
  const { get } = useApi();
  const [usuarios, setUsuarios] = useState([]); //lista json

  useEffect(() => {
    get("/users")
      .then(res => {
        setUsuarios(res.data); // guarda a string retornada pelo backend
      })
      .catch(err => {
        console.error(err);
        setUsuarios([]);
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
      <h1>Usuários cadastrados</h1>
      <p>Lista</p>      

      {usuarios.length === 0 ? (
        <p> Sem usuários para listar </p>
      ) : ( 
      <ul style={{ listStyle: "none", padding: 0 }}>
        {usuarios.map(user => (
          <li key={user.id} style={{
            backgroundColor: "#fff",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </li>
          ))}
      </ul>
      )}

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