// authService.js
import axios from "axios";

const apiBase = (
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL
) || "http://localhost:8080/api";

const AUTH_PATH = `${apiBase}/auth`;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${AUTH_PATH}/login`, { email, password });
    const data = response.data || {};

    const token = data.token || data.accessToken || data.jwt || data.tokenJwt;
    const rol = data.rol || data.role || (Array.isArray(data.roles) ? data.roles[0] : undefined);

    if (token) localStorage.setItem("token", token);
    if (rol) localStorage.setItem("rol", rol);

    return { token, rol, ...data };
  } catch (error) {
    throw new Error("Error de autenticación");
  }
};

export const register = async (nombre, email, password) => {
  return axios.post(`${AUTH_PATH}/register`, { nombre, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
};
