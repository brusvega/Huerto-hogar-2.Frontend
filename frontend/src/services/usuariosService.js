import axios from "axios";

const API_URL = "http://localhost:8080/api/usuarios";

export const obtenerUsuarios = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const crearUsuario = async (usuario) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(API_URL, usuario, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const actualizarUsuario = async (id, usuario) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API_URL}/${id}`, usuario, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const eliminarUsuario = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
