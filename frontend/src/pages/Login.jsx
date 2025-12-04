// Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Usamos useNavigate para redirigir
import { login } from "../services/authService";  // Importamos el servicio de login

export default function Login() {
  const [email, setEmail] = useState("");  // Estado para el email
  const [password, setPassword] = useState("");  // Estado para la contraseña
  const navigate = useNavigate();  // Usamos useNavigate para redirigir

  const handleLogin = async (e) => {
    e.preventDefault();  // Evita que el formulario se recargue

    if (!email || !password) {
      alert("Por favor ingresa ambos campos.");
      return;
    }

    try {
      // Llamamos al servicio de login
      const data = await login(email, password);
      console.log("RESPUESTA LOGIN:", data);

      // Redirigir según el rol
      if (data.rol === "ROLE_ADMIN") {
        navigate("/admin/productos");  // Redirige al área de administrador
      } else {
        navigate("/");  // Redirige al área principal del usuario
      }

    } catch (error) {
      console.error(error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-page">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
