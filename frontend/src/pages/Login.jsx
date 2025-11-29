import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      console.log("RESPUESTA LOGIN:", data);


      //  GUARDAR TOKEN Y ROL
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);

      alert("Login exitoso: " + data.rol);

      //  REDIRIGIR SEGÚN EL ROL
      if (data.rol === "ROLE_ADMIN") {
        window.location.href = "/admin/productos";
      } else {
        window.location.href = "/";
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
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
