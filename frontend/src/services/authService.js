import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  // Guardar token y rol
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("rol", response.data.rol);

  return response.data;
};

export const register = async (nombre, email, password) => {
  return axios.post(`${API_URL}/register`, {
    nombre,
    email,
    password,
  });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
};
