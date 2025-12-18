import axios from "axios";

const API_URL =
  (process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "http://localhost:8000");

// Se API_URL já é ".../api", então use só "token/..."
const TOKEN_OBTAIN_ENDPOINT = "api/token/";
const TOKEN_REFRESH_ENDPOINT = "api/token/refresh/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==== Token Helpers ====
export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export const setAuthTokens = (access, refresh) => {
  if (access) localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
};

export function clearAuthTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

// Permite o app registrar um callback de logout (ex: para redirecionar o usuário)
let onLogoutCallback = null;
export function setOnLogout(callback) {
  onLogoutCallback = callback;
}

function forceLogout() {
  clearAuthTokens();
  sessionStorage.setItem(
    "auth_error", "Sua sessão expirou. Por favor, faça login novamente."
  );

  if (typeof onLogoutCallback === "function") 
    onLogoutCallback();
 }

// ==== Interceptor para adicionar token de autenticação ====
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh logic com fila de requests
let isRefreshing = false;
let refreshQueue = [];

function processQueue(error, newAccessToken = null) {
  refreshQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(newAccessToken);
  });
  refreshQueue = [];
}

async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("Sem refresh_token");

  // usar axios "cru" aqui para evitar interceptor loop
  const response = await axios.post(
    `${API_URL}/${TOKEN_REFRESH_ENDPOINT}`,
    { refresh },
    { headers: { "Content-Type": "application/json" } }
  );

  // SimpleJWT normalmente retorna: { access: "..." }
  const newAccess = response.data?.access;
  if (!newAccess) throw new Error("Refresh não retornou access_token");

  // mantém seu storage key "access_token"
  setAuthTokens(newAccess, refresh);
  return newAccess;
}

// Interceptor para lidar com 401 e tentar refresh do token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    const status = error.response.status;

    if (status !== 401) return Promise.reject(error);
    if (originalRequest?._retry) return Promise.reject(error);

    // Não tenta refresh ao chamar o próprio endpoint de refresh
    if (originalRequest?.url?.includes(TOKEN_REFRESH_ENDPOINT)) {
      forceLogout();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const newAccess = await refreshAccessToken();
      processQueue(null, newAccess);

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      forceLogout();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
