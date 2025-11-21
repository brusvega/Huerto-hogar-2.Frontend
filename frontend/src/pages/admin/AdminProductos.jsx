
import React, { useState } from "react";
import "../../styles/AdminProductos.css";

export default function AdminProductos() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Naranjas Valencia", precio: 1000, stock: 10 },
    { id: 2, nombre: "Manzanas Fuji", precio: 1200, stock: 8 },
  ]);

  const [form, setForm] = useState({ id: null, nombre: "", precio: "", stock: "" });
  const [modoEditar, setModoEditar] = useState(false);

  // --- Funciones CRUD ---
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.stock) return;

    if (modoEditar) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === form.id
            ? { ...p, nombre: form.nombre, precio: Number(form.precio), stock: Number(form.stock) }
            : p
        )
      );
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: form.nombre,
        precio: Number(form.precio),
        stock: Number(form.stock),
      };
      setProductos([...productos, nuevo]);
    }

    setForm({ id: null, nombre: "", precio: "", stock: "" });
    setModoEditar(false);
  };

  const handleEditar = (prod) => {
    setForm(prod);
    setModoEditar(true);
  };

  const handleEliminar = (id) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="admin-page">
      <h2>Gestión de Productos</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
        <button type="submit">
          {modoEditar ? "Guardar cambios" : "Agregar producto"}
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio.toLocaleString("es-CL")}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEditar(p)}>✏️</button>
                <button onClick={() => handleEliminar(p.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
