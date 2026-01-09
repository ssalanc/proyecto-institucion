'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, BookOpen, Home } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">
                Sistema Académico
              </span>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              href="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Link>

            <Link
              href="/modalidades"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/modalidades')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Modalidades
            </Link>

            <Link
              href="/carreras"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive('/carreras')
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Carreras
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}