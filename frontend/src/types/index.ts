export interface Modalidad {
  id: number;
  nombre: string;
  estado: boolean;
}

export interface Carrera {
  id: number;
  nombre: string;
  modalidad: number;
  modalidad_nombre: string;
  estado: boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiError {
  nombre?: string[];
  modalidad?: string[];
  error?: string;
  detail?: string;
}