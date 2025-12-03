import React, { useState, useEffect } from "react";
import "../../styles/Admin.css";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../../services/usuariosService";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    correo: "",
    password: "",
    rol: "cliente",
  });
  const [modoEditar, setModoEditar] = useState(false);

  // -------------------- Cargar usuarios --------------------
  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // -------------------- Cambios formulario --------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------- Crear / Editar --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.correo) {
      alert("Nombre y correo son obligatorios");
      return;
    }

    try {
      if (modoEditar) {
        // Contraseña SOLO se envía si el usuario escribió una nueva
        const payload = {
          nombre: form.nombre,
          email: form.correo,
          rol: form.rol,
        };

        if (form.password.trim() !== "") {
          payload.password = form.password;
        }

        await actualizarUsuario(form.id, payload);
        alert("Usuario actualizado");
      } else {
        // Crear usuario requiere contraseña
        if (!form.password) {
          alert("La contraseña es obligatoria para crear usuario");
          return;
        }

        await crearUsuario({
          nombre: form.nombre,
          email: form.correo,
          password: form.password,
          rol: form.rol,
        });

        alert("Usuario creado");
      }

      setForm({
        id: null,
        nombre: "",
        correo: "",
        password: "",
        rol: "cliente",
      });

      setModoEditar(false);
      cargarUsuarios();
    } catch (err) {
      console.error("Error guardando usuario:", err);
      alert("Error al guardar usuario");
    }
  };

  // -------------------- Editar --------------------
  const handleEditar = (u) => {
    setForm({
      id: u.id,
      nombre: u.nombre,
      correo: u.email,
      password: "", // vacío para seguridad
      rol: u.rol,
    });
    setModoEditar(true);
  };

  // -------------------- Eliminar --------------------
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await eliminarUsuario(id);
      alert("Usuario eliminado");
      cargarUsuarios();
    } catch (err) {
      console.error("Error eliminando usuario:", err);
      alert("No se pudo eliminar usuario");
    }
  };

  return (
    <div className="admin-page">
      <h2>Gestión de Usuarios</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder={
            modoEditar
              ? "Nueva contraseña (opcional)"
              : "Contraseña (obligatoria)"
          }
          value={form.password}
          onChange={handleChange}
        />

        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">
          {modoEditar ? "Guardar cambios" : "Agregar usuario"}
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button onClick={() => handleEditar(u)}>✏️</button>
                <button onClick={() => handleEliminar(u.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
