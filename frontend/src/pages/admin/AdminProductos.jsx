import React, { useState, useEffect } from "react";
import "../../styles/AdminProductos.css";
import { obtenerProductos, crearProducto, actualizarProducto } from "../../services/productosService";  // Asegúrate de que estas funciones existan

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);

  // -------------------- Cargar productos al inicio --------------------
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

  // -------------------- Función para manejar cambios en los inputs --------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------- Función para manejar la subida de imagen --------------------
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setArchivoImagen(file);
    setImagenPreview(file ? URL.createObjectURL(file) : null);
  };

  // -------------------- Función de manejo del envío del formulario (crear o editar producto) --------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio || !form.stock || !form.descripcion) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    // Crear FormData para enviar los datos al backend
    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("descripcion", form.descripcion);
    formData.append("precio", form.precio);
    formData.append("stock", form.stock);
    if (archivoImagen) formData.append("imagen", archivoImagen);

    try {
      // Si estamos en modo editar
      if (modoEditar) {
        await actualizarProducto(form.id, formData);
        alert("Producto actualizado");
      } else {
        // Si estamos creando un nuevo producto
        await crearProducto(formData);
        alert("Producto creado");
      }

      // Limpiar el formulario después de agregar o editar el producto
      setForm({ id: null, nombre: "", descripcion: "", precio: "", stock: "" });
      setArchivoImagen(null);
      setImagenPreview(null);
      setModoEditar(false);

      cargarProductos();  // Recargar los productos
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Error al guardar el producto");
    }
  };

  // -------------------- Función para editar un producto --------------------
  const handleEditar = (p) => {
    setForm(p);
    setModoEditar(true);
    setImagenPreview(p.imagenUrl || null); // Si existe imagen se muestra
  };

  // -------------------- Función para eliminar un producto --------------------
  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      
      await eliminarProducto(id);
      alert("Producto eliminado");
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="admin-page">
      <h2>Gestión de Productos</h2>
      {/* -------------------- FORMULARIO -------------------- */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción del producto"
          value={form.descripcion}
          onChange={handleChange}
          rows="4"
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
          <img src={imagenPreview} alt="preview" className="preview-img" />
        )}
        <button type="submit">
          {modoEditar ? "Guardar cambios" : "Agregar producto"}
        </button>
      </form>

      {/* -------------------- TABLA DE PRODUCTOS -------------------- */}
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
                  <img src={p.imagenUrl} className="mini-img" alt="Producto" />
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
