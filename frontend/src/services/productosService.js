import api from "./axiosConfig";

const BASE_PATH = "/productos";

export const obtenerProductos = async () => {
  const res = await api.get(BASE_PATH);
  return res.data;
};

export const crearProducto = async (formData) => {
  const res = await api.post(BASE_PATH, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const actualizarProducto = async (id, formData) => {
  const res = await api.put(`${BASE_PATH}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const eliminarProducto = async (id) => {
  const res = await api.delete(`${BASE_PATH}/${id}`);
  return res.data;
};
