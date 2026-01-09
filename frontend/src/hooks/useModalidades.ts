import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { modalidadesApi } from '@/services/api';
import { Modalidad } from '@/types';
import toast from 'react-hot-toast';

export function useModalidades(params?: {
  estado?: boolean | null;
  search?: string;
  page?: number;
}) {
  return useQuery({
    queryKey: ['modalidades', params],
    queryFn: async () => {
      const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, v]) => v !== null && v !== '')
      );
      const response = await modalidadesApi.getAll(filteredParams);
      return response.data;
    },
  });
}

export function useCreateModalidad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Modalidad, 'id'>) => modalidadesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modalidades'] });
      toast.success('Modalidad creada exitosamente');
    },
    onError: (error: any) => {
      const message =
        error?.nombre?.[0] || error?.error || 'Error al crear modalidad';
      toast.error(message);
    },
  });
}

export function useUpdateModalidad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Modalidad> }) =>
      modalidadesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modalidades'] });
      toast.success('Modalidad actualizada exitosamente');
    },
    onError: (error: any) => {
      const message =
        error?.nombre?.[0] || error?.error || 'Error al actualizar modalidad';
      toast.error(message);
    },
  });
}

export function useDeleteModalidad() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => modalidadesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modalidades'] });
      queryClient.invalidateQueries({ queryKey: ['carreras'] });
      toast.success('Modalidad eliminada exitosamente');
    },
    onError: (error: any) => {
      const message = error?.error || 'Error al eliminar modalidad';
      toast.error(message);
    },
  });
}