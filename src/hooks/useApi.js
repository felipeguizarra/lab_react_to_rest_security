import { useCallback } from "react";
import axios from "axios";

export default function useApi() {
  const api = axios.create({
    baseURL: "http://localhost:8080",
  });

  // Adiciona o token no header antes de cada requisição
  api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Intercepta respostas para lidar com token expirado
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        console.warn("Token expirado, tentando renovar...");

        try {
          const refreshToken = sessionStorage.getItem("refresh_token");
          if (!refreshToken) {
            throw new Error("Sem refresh token");
          }

          const res = await axios.post("http://localhost:8080/refresh", {
            refreshToken
          });

          // Atualiza tokens
          sessionStorage.setItem("token", res.data.access_token);
          sessionStorage.setItem("refresh_token", res.data.refresh_token);

          // Refaz a requisição original com o novo token
          error.config.headers.Authorization = `Bearer ${res.data.access_token}`;
          return axios(error.config);
        } catch (refreshError) {
          console.error("Não foi possível renovar o token", refreshError);
          sessionStorage.clear();
          //window.location.href = "/"; // Redireciona para login
        }
      }

      return Promise.reject(error);
    }
  );

  // Atalho para GET
  const get = useCallback((url) => api.get(url), [api]);

  // Atalho para POST
  const post = useCallback((url, data) => api.post(url, data), [api]);

  return { get, post };
}
