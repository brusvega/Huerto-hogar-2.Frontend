import api from "./axiosConfig";

const BASE_PATH = "/usuarios";

export const obtenerUsuarios = async () => {
  const res = await api.get(BASE_PATH);
  return res.data;
};

export const crearUsuario = async (usuario) => {
  const res = await api.post(BASE_PATH, usuario);
  return res.data;
};

export const actualizarUsuario = async (id, usuario) => {
  const res = await api.put(`${BASE_PATH}/${id}`, usuario);
  return res.data;
};

export const eliminarUsuario = async (id) => {
  const res = await api.delete(`${BASE_PATH}/${id}`);
  return res.data;
};
