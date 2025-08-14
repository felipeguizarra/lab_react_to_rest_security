import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />      
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Formulario />} />
      </Routes>
    </Router>
  );
}