import axios from "axios";
const node_env = import.meta.env.VITE_NODE_ENV;
const api = axios.create({
  withCredentials: true,
  baseURL:
    node_env == "production" ?
      import.meta.env.VITE_API_URL
    : "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;