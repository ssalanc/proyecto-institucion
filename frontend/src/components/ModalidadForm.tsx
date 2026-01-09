'use client';

import { useState, useEffect } from 'react';
import { Modalidad } from '@/types';
import { X } from 'lucide-react';

interface ModalidadFormProps {
  modalidad?: Modalidad | null;
  onSubmit: (data: Omit<Modalidad, 'id'>) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function ModalidadForm({
  modalidad,
  onSubmit,
  onClose,
  isSubmitting,
}: ModalidadFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    estado: true,
  });

  const [errors, setErrors] = useState<{ nombre?: string }>({});

  useEffect(() => {
    if (modalidad) {
      setFormData({
        nombre: modalidad.nombre,
        estado: modalidad.estado,
      });
    }
  }, [modalidad]);

  const validate = () => {
    const newErrors: { nombre?: string } = {};
    const nombreTrimmed = formData.nombre.trim();

    if (!nombreTrimmed) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (nombreTrimmed.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/.test(nombreTrimmed)) {
      newErrors.nombre = 'Solo se permiten letras y guiones. No se permiten números ni símbolos especiales';
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
            {modalidad ? 'Editar Modalidad' : 'Nueva Modalidad'}
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
              className="block text-sm font-medium text-gray-900 mb-1"
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
              className={`w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 text-gray-900 ${
                errors.nombre 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Ej: Presencial"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
            )}
          </div>

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
            <label htmlFor="estado" className="ml-2 block text-sm text-gray-900">
              Activo
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md transition disabled:bg-blue-400"
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