'use client';

import { useState } from 'react'; // Importamos useState
import { Carrera } from '@/types';
import { Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface CarrerasTableProps {
  carreras: Carrera[];
  onEdit: (carrera: Carrera) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
  currentPage: number;
}

export default function CarrerasTable({
  carreras,
  onEdit,
  onDelete,
  isLoading,
  currentPage,
}: CarrerasTableProps) {
  // Estado para el modal de confirmación personalizado
  const [confirmDelete, setConfirmDelete] = useState<{show: boolean, id: number | null}>({
    show: false,
    id: null
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!carreras || carreras.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">No hay carreras registradas</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modalidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {carreras.map((carrera, index) => (
              <tr key={carrera.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-50 border-r border-gray-200">
                  {(currentPage - 1) * 10 + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {carrera.nombre}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {carrera.modalidad_nombre}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      carrera.estado
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {carrera.estado ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Activo
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Inactivo
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(carrera)}
                    className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={() => setConfirmDelete({show: true, id: carrera.id})}
                    className="text-red-600 hover:text-red-900 inline-flex items-center"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE CONFIRMACIÓN CON FONDO BLURRED Y CENTRADO */}
      {confirmDelete.show && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Capa de fondo con Blur */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setConfirmDelete({show: false, id: null})}
          />
          
          {/* Caja del mensaje centrada */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center border border-gray-100">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">¿Estás seguro?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Esta acción eliminará la carrera de forma permanente.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setConfirmDelete({show: false, id: null})}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (confirmDelete.id) onDelete(confirmDelete.id);
                  setConfirmDelete({show: false, id: null});
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}