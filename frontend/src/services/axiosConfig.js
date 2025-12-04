import axios from "axios";

const apiBase = (
  typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL
) || "http://localhost:8080/api";

const axiosInstance = axios.create({ baseURL: apiBase });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

