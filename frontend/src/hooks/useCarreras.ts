import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carrerasApi } from '@/services/api';
import { Carrera } from '@/types';
import toast from 'react-hot-toast';

export function useCarreras(params?: {
  estado?: boolean | null;
  modalidad?: number | null;
  search?: string;
  page?: number;
}) {
  return useQuery({
    queryKey: ['carreras', params],
    queryFn: async () => {
      const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, v]) => v !== null && v !== '')
      );
      const response = await carrerasApi.getAll(filteredParams);
      return response.data;
    },
  });
}

export function useCreateCarrera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Carrera, 'id' | 'modalidad_nombre'>) =>
      carrerasApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carreras'] });
      toast.success('Carrera creada exitosamente');
    },
    onError: (error: any) => {
      let message = 'Error al crear carrera';
      
      // Ahora error.nombre viene correctamente del interceptor
      if (error?.nombre) {
        // Es un array, tomar el primer elemento
        message = Array.isArray(error.nombre) ? error.nombre[0] : error.nombre;
      } else if (error?.modalidad) {
        message = Array.isArray(error.modalidad) ? error.modalidad[0] : error.modalidad;
      } else if (error?.error) {
        message = error.error;
      } else if (error?.detail) {
        message = error.detail;
      }
      
      toast.error(message);
    },
  });
}

export function useUpdateCarrera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Omit<Carrera, 'modalidad_nombre'>>;
    }) => carrerasApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carreras'] });
      queryClient.invalidateQueries({ queryKey: ['modalidades'] });
      toast.success('Carrera actualizada exitosamente');
    },
    onError: (error: any) => {
      let message = 'Error al actualizar carrera';
      
      if (error?.nombre) {
        message = Array.isArray(error.nombre) ? error.nombre[0] : error.nombre;
      } else if (error?.modalidad) {
        message = Array.isArray(error.modalidad) ? error.modalidad[0] : error.modalidad;
      } else if (error?.error) {
        message = error.error;
      }
      
      toast.error(message);
    },
  });
}

export function useDeleteCarrera() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => carrerasApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carreras'] });
      toast.success('Carrera eliminada exitosamente');
    },
    onError: (error: any) => {
      const message = error?.error || error?.detail || 'Error al eliminar carrera';
      toast.error(message);
    },
  });
}