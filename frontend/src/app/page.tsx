import Link from 'next/link';
import { GraduationCap, BookOpen, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Sistema de Gestión Académica
        </h1>
        <p className="text-xl text-gray-600">
          Administración de Modalidades y Carreras
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {/* Modalidades Card */}
        <Link
          href="/modalidades"
          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-8 border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-4 rounded-lg group-hover:bg-blue-200 transition">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Modalidades
          </h2>
          <p className="text-gray-600">
            Gestiona las modalidades de estudio disponibles en la institución
            (Presencial, Virtual, Híbrida, etc.)
          </p>
          <div className="mt-4 text-blue-600 font-medium group-hover:underline">
            Ver modalidades →
          </div>
        </Link>

        {/* Carreras Card */}
        <Link
          href="/carreras"
          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-8 border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-4 rounded-lg group-hover:bg-green-200 transition">
              <GraduationCap className="w-8 h-8 text-green-600" />
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Carreras</h2>
          <p className="text-gray-600">
            Administra las carreras profesionales ofrecidas y asígnalas a sus
            modalidades correspondientes.
          </p>
          <div className="mt-4 text-green-600 font-medium group-hover:underline">
            Ver carreras →
          </div>
        </Link>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-md p-8 mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Características del Sistema
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-blue-600 font-semibold mb-2">
              ✓ CRUD Completo
            </div>
            <p className="text-gray-600 text-sm">
              Crear, leer, actualizar y eliminar registros sin recargar la
              página
            </p>
          </div>
          <div>
            <div className="text-blue-600 font-semibold mb-2">
              ✓ Filtros Avanzados
            </div>
            <p className="text-gray-600 text-sm">
              Búsqueda y filtrado por estado, modalidad y más
            </p>
          </div>
          <div>
            <div className="text-blue-600 font-semibold mb-2">
              ✓ Validaciones
            </div>
            <p className="text-gray-600 text-sm">
              Validación de campos requeridos y nombres duplicados
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
          Stack Tecnológico
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow">
            Next.js 14
          </span>
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow">
            React Query
          </span>
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow">
            Zustand
          </span>
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow">
            Tailwind CSS
          </span>
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow">
            TypeScript
          </span>
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow">
            Django REST
          </span>
        </div>
      </div>
    </div>
  );
}