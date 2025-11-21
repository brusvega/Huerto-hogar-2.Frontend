import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();

  // Estado para los campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Lista de usuarios simulados
  const usuarios = [
    { email: "bruno@duocuc.cl", rol: "admin" },
    { email: "paulina@duocuc.cl", rol: "admin" },
    { email: "cliente@gmail.com", rol: "cliente" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Buscar si el correo existe
    const usuario = usuarios.find((u) => u.email === email);

    if (!usuario) {
      setError("Correo no registrado.");
      return;
    }

    // Aquí podrías validar contraseña si quisieras
    if (usuario.rol === "admin") {
      navigate("/admin/productos"); // 🔑 Redirige al panel admin
    } else {
      navigate("/"); // Cliente común → Home
    }
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger mt-2">{error}</p>}

          <button type="submit" className="btn btn-success w-100 mt-3">
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}
