import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";

// -------------------- OBTENER TODOS --------------------
export const obtenerProductos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// -------------------- CREAR PRODUCTO --------------------
export const crearProducto = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  });

  return res.data;
};

// -------------------- ACTUALIZAR PRODUCTO --------------------
export const actualizarProducto = async (id, formData) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  });

  return res.data;
};

// -------------------- ELIMINAR PRODUCTO --------------------
export const eliminarProducto = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

  return res.data;
};
