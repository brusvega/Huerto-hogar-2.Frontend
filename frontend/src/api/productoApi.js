import api from "../services/axiosConfig";

const BASE_PATH = "/productos";

export const obtenerProductos = () =>
  api.get(BASE_PATH).then(res => res.data);

export const crearProducto = (producto) =>
  api.post(BASE_PATH, producto).then(res => res.data);

export const actualizarProducto = (id, producto) =>
  api.put(`${BASE_PATH}/${id}`, producto).then(res => res.data);

export const eliminarProducto = (id) =>
  api.delete(`${BASE_PATH}/${id}`);
