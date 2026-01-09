'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  useCarreras,
  useCreateCarrera,
  useUpdateCarrera,
  useDeleteCarrera,
} from '@/hooks/useCarreras';
import CarrerasTable from '@/components/CarrerasTable';
import CarreraForm from '@/components/CarreraForm';
import CarrerasFilters from '@/components/CarrerasFilters';
import Pagination from '@/components/Pagination';
import { Carrera } from '@/types';

export default function CarrerasPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCarrera, setEditingCarrera] = useState<Carrera | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Zustand store
  const {
    carreraEstadoFilter,
    carreraModalidadFilter,
    carreraSearchFilter,
    setCarreraEstadoFilter,
    setCarreraModalidadFilter,
    setCarreraSearchFilter,
  } = useStore();

  // Funciones que resetean la página
  const handleSearchChange = (value: string) => {
    setCarreraSearchFilter(value);
    setCurrentPage(1);
  };

  const handleEstadoChange = (value: boolean | null) => {
    setCarreraEstadoFilter(value);
    setCurrentPage(1);
  };

  const handleModalidadChange = (value: number | null) => {
    setCarreraModalidadFilter(value);
    setCurrentPage(1);
  };

  // React Query hooks
  const { data, isLoading } = useCarreras({
    estado: carreraEstadoFilter,
    modalidad: carreraModalidadFilter,
    search: carreraSearchFilter,
    page: currentPage,
  });

  const createMutation = useCreateCarrera();
  const updateMutation = useUpdateCarrera();
  const deleteMutation = useDeleteCarrera();

  // Handlers
  const handleCreate = () => {
    setEditingCarrera(null);
    setIsFormOpen(true);
  };

  const handleEdit = (carrera: Carrera) => {
    setEditingCarrera(carrera);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (formData: Omit<Carrera, 'id' | 'modalidad_nombre'>) => {
    if (editingCarrera) {
      updateMutation.mutate(
        { id: editingCarrera.id, data: formData },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingCarrera(null);
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          setIsFormOpen(false);
        },
      });
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCarrera(null);
  };

  // Pagination
  const totalPages = data ? Math.ceil(data.count / 10) : 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Carreras</h1>
          <p className="text-gray-600 mt-1">Gestión de carreras profesionales</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva Carrera
        </button>
      </div>

      {/* Filters */}
      <CarrerasFilters
        searchValue={carreraSearchFilter}
        estadoValue={carreraEstadoFilter}
        modalidadValue={carreraModalidadFilter}
        onSearchChange={handleSearchChange}
        onEstadoChange={handleEstadoChange}
        onModalidadChange={handleModalidadChange}
      />

      {/* Stats */}
      {data && (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            {data.count > 0 ? (
              <>
                Mostrando {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, data.count)} de {data.count} registros
                {data.count > 10 && ` (Página ${currentPage} de ${totalPages})`}
              </>
            ) : (
              'Mostrando 0 de 0 registros'
            )}
          </p>
        </div>
      )}

      {/* Table */}
      <CarrerasTable
        carreras={data?.results || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        currentPage={currentPage}
      />

      {/* Pagination */}
      {data && data.count > 10 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          hasNext={!!data.next}
          hasPrevious={!!data.previous}
        />
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <CarreraForm
          carrera={editingCarrera}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}