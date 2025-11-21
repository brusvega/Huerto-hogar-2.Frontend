import React, { useState } from "react";
import "../../styles/Admin.css";

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Eduardo", correo: "bruno@duocuc.cl", rol: "admin" },
    { id: 2, nombre: "Paulina", correo: "paulina@duocuc.cl", rol: "admin" },
  ]);

  const [form, setForm] = useState({ id: null, nombre: "", correo: "", rol: "cliente" });
  const [modoEditar, setModoEditar] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo) return;

    if (modoEditar) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === form.id ? { ...u, ...form } : u))
      );
    } else {
      const nuevo = { ...form, id: Date.now() };
      setUsuarios([...usuarios, nuevo]);
    }

    setForm({ id: null, nombre: "", correo: "", rol: "cliente" });
    setModoEditar(false);
  };

  const handleEditar = (u) => {
    setForm(u);
    setModoEditar(true);
  };

  const handleEliminar = (id) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
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
              <td>{u.correo}</td>
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
