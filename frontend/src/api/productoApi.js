import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";

export const obtenerProductos = () =>
  axios.get(API_URL).then(res => res.data);

export const crearProducto = (producto) =>
  axios.post(API_URL, producto).then(res => res.data);

export const actualizarProducto = (id, producto) =>
  axios.put(`${API_URL}/${id}`, producto).then(res => res.data);

export const eliminarProducto = (id) =>
  axios.delete(`${API_URL}/${id}`);
