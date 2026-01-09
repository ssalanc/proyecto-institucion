import { create } from 'zustand';

interface AppState {
  // Filtros de Modalidades
  modalidadEstadoFilter: boolean | null;
  modalidadSearchFilter: string;
  setModalidadEstadoFilter: (estado: boolean | null) => void;
  setModalidadSearchFilter: (search: string) => void;

  // Filtros de Carreras
  carreraEstadoFilter: boolean | null;
  carreraModalidadFilter: number | null;
  carreraSearchFilter: string;
  setCarreraEstadoFilter: (estado: boolean | null) => void;
  setCarreraModalidadFilter: (modalidad: number | null) => void;
  setCarreraSearchFilter: (search: string) => void;

  // UI State
  isModalOpen: boolean;
  modalType: 'create' | 'edit' | null;
  setModalOpen: (isOpen: boolean, type?: 'create' | 'edit') => void;
}

export const useStore = create<AppState>((set) => ({
  // Filtros de Modalidades
  modalidadEstadoFilter: null,
  modalidadSearchFilter: '',
  setModalidadEstadoFilter: (estado) => set({ modalidadEstadoFilter: estado }),
  setModalidadSearchFilter: (search) => set({ modalidadSearchFilter: search }),

  // Filtros de Carreras
  carreraEstadoFilter: null,
  carreraModalidadFilter: null,
  carreraSearchFilter: '',
  setCarreraEstadoFilter: (estado) => set({ carreraEstadoFilter: estado }),
  setCarreraModalidadFilter: (modalidad) =>
    set({ carreraModalidadFilter: modalidad }),
  setCarreraSearchFilter: (search) => set({ carreraSearchFilter: search }),

  // UI State
  isModalOpen: false,
  modalType: null,
  setModalOpen: (isOpen, type = undefined) =>
    set({ isModalOpen: isOpen, modalType: type }),
}));