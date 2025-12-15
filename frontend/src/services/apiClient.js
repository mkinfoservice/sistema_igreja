import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_URL,
});

// Controle para evitar múltiplos refresh em paralelo
let isRefreshing = false;
let refreshPromise = null;

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

function setAccessToken(token) {
  localStorage.setItem("access_token", token);
}

function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

// Anexa access token automaticamente
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Tenta refresh automaticamente se tomar 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Se não tem response, é erro de rede (ERR_CONNECTION_*)
    // Aqui NÃO adianta refresh. Só repassa o erro.
    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Evita loop infinito
    if (original._retry) {
      clearTokens();
      return Promise.reject(error);
    }
    original._retry = true;

    const refresh = getRefreshToken();
    if (!refresh) {
      clearTokens();
      return Promise.reject(error);
    }

    // Lock do refresh
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = api
        .post("/api/token/refresh/", { refresh })
        .then((r) => {
          setAccessToken(r.data.access);
          return r.data.access;
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    const newAccess = await refreshPromise;
    original.headers.Authorization = `Bearer ${newAccess}`;
    return api(original);
  }
);
