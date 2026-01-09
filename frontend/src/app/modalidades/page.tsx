'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';
import {
  useModalidades,
  useCreateModalidad,
  useUpdateModalidad,
  useDeleteModalidad,
} from '@/hooks/useModalidades';
import ModalidadesTable from '@/components/ModalidadesTable';
import ModalidadForm from '@/components/ModalidadForm';
import ModalidadesFilters from '@/components/ModalidadesFilters';
import Pagination from '@/components/Pagination';
import { Modalidad } from '@/types';

export default function ModalidadesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingModalidad, setEditingModalidad] = useState<Modalidad | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Zustand store
  const {
    modalidadEstadoFilter,
    modalidadSearchFilter,
    setModalidadEstadoFilter,
    setModalidadSearchFilter,
  } = useStore();

  // React Query hooks
  const { data, isLoading } = useModalidades({
    estado: modalidadEstadoFilter,
    search: modalidadSearchFilter,
    page: currentPage,
  });

  const createMutation = useCreateModalidad();
  const updateMutation = useUpdateModalidad();
  const deleteMutation = useDeleteModalidad();

  // Handlers
  const handleCreate = () => {
    setEditingModalidad(null);
    setIsFormOpen(true);
  };

  const handleEdit = (modalidad: Modalidad) => {
    setEditingModalidad(modalidad);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (formData: Omit<Modalidad, 'id'>) => {
    if (editingModalidad) {
      updateMutation.mutate(
        { id: editingModalidad.id, data: formData },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingModalidad(null);
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
    setEditingModalidad(null);
  };

  // Pagination
  const totalPages = data ? Math.ceil(data.count / 10) : 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Modalidades</h1>
          <p className="text-gray-600 mt-1">
            Gestión de modalidades de estudio
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva Modalidad
        </button>
      </div>

      {/* Filters */}
      <ModalidadesFilters
        searchValue={modalidadSearchFilter}
        estadoValue={modalidadEstadoFilter}
        onSearchChange={setModalidadSearchFilter}
        onEstadoChange={setModalidadEstadoFilter}
      />

      {/* Stats */}
      {data && (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            Total de registros:{' '}
            <span className="font-semibold text-gray-900">{data.count}</span>
          </p>
        </div>
      )}

      {/* Table */}
      <ModalidadesTable
        modalidades={data?.results || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {data && data.count > 10 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          hasNext={!!data.next}
          hasPrevious={!!data.previous}
        />
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <ModalidadForm
          modalidad={editingModalidad}
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isSubmitting={
            createMutation.isPending || updateMutation.isPending
          }
        />
      )}
    </div>
  );
}