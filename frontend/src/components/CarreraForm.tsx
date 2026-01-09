'use client';

import { useState, useEffect } from 'react';
import { Carrera, Modalidad } from '@/types';
import { X } from 'lucide-react';
import { useModalidades } from '@/hooks/useModalidades';

interface CarreraFormProps {
  carrera?: Carrera | null;
  onSubmit: (data: Omit<Carrera, 'id' | 'modalidad_nombre'>) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function CarreraForm({
  carrera,
  onSubmit,
  onClose,
  isSubmitting,
}: CarreraFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    modalidad: 0,
    estado: true,
  });

  const [errors, setErrors] = useState<{
    nombre?: string;
    modalidad?: string;
  }>({});

  // Obtener modalidades activas para el select
  const { data: modalidadesData, isLoading: loadingModalidades } =
    useModalidades({ estado: true });

  useEffect(() => {
    if (carrera) {
      setFormData({
        nombre: carrera.nombre,
        modalidad: carrera.modalidad,
        estado: carrera.estado,
      });
    }
  }, [carrera]);

  const validate = () => {
    const newErrors: { nombre?: string; modalidad?: string } = {};
    const nombreTrimmed = formData.nombre.trim();

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    else if (nombreTrimmed.length < 3) {
    newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
  } 
  // Validar caracteres permitidos
  else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/.test(nombreTrimmed)) {
    newErrors.nombre = 'Solo se permiten letras. No se permiten números ni símbolos especiales';
  }

    if (!formData.modalidad || formData.modalidad === 0) {
      newErrors.modalidad = 'Debe seleccionar una modalidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {carrera ? 'Editar Carrera' : 'Nueva Carrera'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm  text-gray-900 mb-1" // Más fuerte
            >
              Nombre <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              // CAMBIO AQUÍ: Usamos text-gray-900 y border-2
              className={`w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
                errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-400'
              }`}
              placeholder="Ej: Ingeniería de Sistemas"
            />
            {errors.nombre && (
              // Mensaje de error más visible
              <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="modalidad"
              className="block text-sm  text-gray-900 mb-1"
            >
              Modalidad <span className="text-red-600">*</span>
            </label>
            <select
              id="modalidad"
              value={formData.modalidad}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  modalidad: parseInt(e.target.value),
                })
              }
              // CAMBIO AQUÍ: Igual que el input anterior
              className={`w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500 ${
                errors.modalidad ? 'border-red-500 bg-red-50' : 'border-gray-400'
              }`}
              disabled={loadingModalidades}
            >
              <option value={0}>Seleccione una modalidad</option>
              {modalidadesData?.results.map((modalidad: Modalidad) => (
                <option key={modalidad.id} value={modalidad.id}>
                  {modalidad.nombre}
                </option>
              ))}
            </select>
            {errors.modalidad && (
              <p className="mt-1 text-sm text-red-600">{errors.modalidad}</p>
            )}
          </div>

          {/* ... resto del formulario (checkbox y botones) */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="estado"
              checked={formData.estado}
              onChange={(e) =>
                setFormData({ ...formData, estado: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="estado" className="ml-2 block text-sm  text-gray-900">
              Activo
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border-2 border-gray-400 rounded-md text-gray-900 hover:bg-gray-100 transition"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 shadow-md transition disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}