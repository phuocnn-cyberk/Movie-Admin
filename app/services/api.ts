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

// Movies
export const getAllMovies = async () => {
  const res = await api.get("/api/movies");
  return res.data;
};

export const createMovie = async (movieData: any) => {
  const res = await api.post("/api/movies", movieData);
  return res.data;
};

export const updateMovie = async (id: number, movieData: any) => {
  const res = await api.put(`/api/movies/${id}`, movieData);
  return res.data;
};

export const deleteMovie = async (id: number) => {
  const res = await api.delete(`/api/movies/${id}`);
  return res.data;
};

// Genres
export const getAllGenres = async () => {
  const res = await api.get("/api/genres");
  return res.data;
};

export const addGenre = async (name: string) => {
  const res = await api.post("/api/genres", { name });
  return res.data;
};

export const updateGenre = async (id: number, name: string) => {
  const res = await api.put(`/api/genres/${id}`, { name });
  return res.data;
};

export const deleteGenre = async (id: number) => {
  const res = await api.delete(`/api/genres/${id}`);
  return res.data;
};

// MovieGenres
export const assignGenresToMovie = async (movieId: number, genreIds: number[]) => {
  const res = await api.post("/api/movie-genres/assign", { movieId, genreIds });
  return res.data;
};

export const getGenresByMovie = async (movieId: number) => {
  const res = await api.get(`/api/movie-genres/${movieId}/genres`);
  return res.data;
};

export { api };