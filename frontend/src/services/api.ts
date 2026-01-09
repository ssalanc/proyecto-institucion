import axios from 'axios';
import { Modalidad, Carrera, PaginatedResponse } from '@/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      // Rechazar con los datos de error del servidor
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      return Promise.reject({ error: 'No se pudo conectar con el servidor' });
    } else {
      // Algo pasó al configurar la petición
      return Promise.reject({ error: error.message });
    }
  }
);

// MODALIDADES
export const modalidadesApi = {
  getAll: (params?: { estado?: boolean; search?: string; page?: number }) =>
    api.get<PaginatedResponse<Modalidad>>('/modalidades/', { params }),

  getById: (id: number) => api.get<Modalidad>(`/modalidades/${id}/`),

  create: (data: Omit<Modalidad, 'id'>) =>
    api.post<Modalidad>('/modalidades/', data),

  update: (id: number, data: Partial<Modalidad>) =>
    api.patch<Modalidad>(`/modalidades/${id}/`, data),

  delete: (id: number) => api.delete(`/modalidades/${id}/`),
};

// CARRERAS
export const carrerasApi = {
  getAll: (params?: {
    estado?: boolean;
    modalidad?: number;
    search?: string;
    page?: number;
  }) => api.get<PaginatedResponse<Carrera>>('/carreras/', { params }),

  getById: (id: number) => api.get<Carrera>(`/carreras/${id}/`),

  create: (data: Omit<Carrera, 'id' | 'modalidad_nombre'>) =>
    api.post<Carrera>('/carreras/', data),

  update: (id: number, data: Partial<Omit<Carrera, 'modalidad_nombre'>>) =>
    api.patch<Carrera>(`/carreras/${id}/`, data),

  delete: (id: number) => api.delete(`/carreras/${id}/`),
};

export default api;