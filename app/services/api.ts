import { useAuthStore } from "~/stores/auth.store";
import axios from "axios";
import type { SupportReplyPayload } from "~/types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authState = useAuthStore.getState();
    if (authState.accessToken) {
      config.headers.Authorization = `Bearer ${authState.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signIn = async (email: string, password: string) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const getAllSupport = async () => {
  const response = await api.get("/api/supports")
  return response.data
}

export const replySupport = async (payload: SupportReplyPayload) => {
  const response = await api.post("/api/supports/reply", payload);
  return response.data;
};
export { api };