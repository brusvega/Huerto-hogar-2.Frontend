import axiosInstance from "./axiosConfig";
import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";

// GET (no necesita token)
export const obtenerProductos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST (sí necesita token)
export const crearProducto = async (formData) => {
  const response = await axiosInstance.post(API_URL, formData);
  return response.data;
};

// DELETE (sí necesita token)
export const eliminarProducto = async (id) => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};

// PUT (sí necesita token)
export const actualizarProducto = async (id, formData) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, formData);
  return response.data;
};
