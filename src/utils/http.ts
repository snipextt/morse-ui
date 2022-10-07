import axios from "axios";
import { Cookie } from "./cookie";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use((config) => {
  const token = Cookie.get("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
