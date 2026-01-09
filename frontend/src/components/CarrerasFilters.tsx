'use client';

import { Search, Filter } from 'lucide-react';
import { useModalidades } from '@/hooks/useModalidades';
import { Modalidad } from '@/types';

interface CarrerasFiltersProps {
  searchValue: string;
  estadoValue: boolean | null;
  modalidadValue: number | null;
  onSearchChange: (value: string) => void;
  onEstadoChange: (value: boolean | null) => void;
  onModalidadChange: (value: number | null) => void;
}

export default function CarrerasFilters({
  searchValue,
  estadoValue,
  modalidadValue,
  onSearchChange,
  onEstadoChange,
  onModalidadChange,
}: CarrerasFiltersProps) {
  const { data: modalidadesData, isLoading: loadingModalidades } =
    useModalidades({ estado: true });

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Búsqueda */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Buscar
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar por nombre..."
            />
          </div>
        </div>

        {/* Modalidad */}
        <div>
          <label
            htmlFor="modalidad"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Modalidad
          </label>
          <select
            id="modalidad"
            value={modalidadValue === null ? '' : modalidadValue}
            onChange={(e) => {
              const value = e.target.value;
              onModalidadChange(value === '' ? null : parseInt(value));
            }}
            className="block w-full px-3 py-2 border text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loadingModalidades}
          >
            <option value="">Todas</option>
            {modalidadesData?.results.map((modalidad: Modalidad) => (
              <option key={modalidad.id} value={modalidad.id}>
                {modalidad.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Estado
          </label>
          <select
            id="estado"
            value={estadoValue === null ? '' : estadoValue.toString()}
            onChange={(e) => {
              const value = e.target.value;
              onEstadoChange(value === '' ? null : value === 'true');
            }}
            className="block w-full px-3 py-2 border text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
      </div>
    </div>
  );
}