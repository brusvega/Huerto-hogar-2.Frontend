import React, { useState, useEffect } from "react";
import "../../styles/AdminProductos.css";

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../services/productosService";

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    precio: "",
    stock: "",
  });

  const [modoEditar, setModoEditar] = useState(false);

  // Imagen
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  // ---------------------------------------
  // Cargar productos desde la BD al iniciar
  // ---------------------------------------
  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ---------------------------------------
  // Manejar cambios en inputs de texto
  // ---------------------------------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ---------------------------------------
  // Manejar subida de imagen
  // ---------------------------------------
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setArchivoImagen(file);
    setImagenPreview(file ? URL.createObjectURL(file) : null);
  };

  // ---------------------------------------
  // Crear o actualizar producto
  // ---------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio || !form.stock) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    try {
      if (modoEditar) {
        await actualizarProducto(form.id, form);
        alert("Producto actualizado");
      } else {
        await crearProducto(form, archivoImagen);
        alert("Producto creado");
      }

      // Limpiar
      setForm({ id: null, nombre: "", precio: "", stock: "" });
      setArchivoImagen(null);
      setImagenPreview(null);
      setModoEditar(false);

      cargarProductos();

    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar producto");
    }
  };

  // ---------------------------------------
  // Cargar datos para edición
  // ---------------------------------------
  const handleEditar = (p) => {
    setForm(p);
    setModoEditar(true);
    setImagenPreview(p.imagenUrl || null); // si existe imagen se muestra
  };

  // ---------------------------------------
  // Eliminar producto
  // ---------------------------------------
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      await eliminarProducto(id);
      alert("Producto eliminado");
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar");
    }
  };

  return (
    <div className="admin-page">
      <h2>Gestión de Productos</h2>

      {/* ---------------- FORMULARIO ---------------- */}
      <form className="admin-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
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

        <input 
          type="file" 
          accept="image/*"
          onChange={handleImagenChange}
        />

        {imagenPreview && (
          <img 
            src={imagenPreview} 
            alt="preview" 
            className="preview-img"
          />
        )}

        <button type="submit">
          {modoEditar ? "Guardar cambios" : "Agregar producto"}
        </button>

      </form>

      {/* ---------------- TABLA ---------------- */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>
                {p.imagenUrl ? (
                  <img src={p.imagenUrl} className="mini-img" />
                ) : (
                  <span>Sin imagen</span>
                )}
              </td>

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
