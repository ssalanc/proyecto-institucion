'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0z-[100] flex items-center justify-center p-4">
      {/* FONDO CON BLUR */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onCancel}
      />
      
      {/* CAJA DEL MENSAJE */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}