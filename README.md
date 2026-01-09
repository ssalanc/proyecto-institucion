# Sistema de Gestión Académica

Sistema completo de gestión académica con backend en Django + DRF y frontend en Next.js con React Query y Zustand.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Criterios de Evaluación](#criterios-de-evaluación)

## ✨ Características

### Backend (Django + DRF)
- ✅ API REST completa con CRUD
- ✅ Validaciones de campos obligatorios
- ✅ Prevención de nombres duplicados
- ✅ Filtrado por estado y búsqueda
- ✅ Paginación automática
- ✅ CORS habilitado para frontend
- ✅ ModelViewSet con DefaultRouter

### Frontend (Next.js + React)
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Gestión de estado con Zustand
- ✅ React Query para data fetching
- ✅ Formularios con validación
- ✅ Filtros avanzados y búsqueda
- ✅ Paginación de resultados
- ✅ Mensajes de éxito/error con toast
- ✅ Sin recarga de página (SPA)

## 🚀 Stack Tecnológico

### Backend
- Python 3.10+
- Django 5.0
- Django REST Framework 3.14
- PostgreSQL 15
- django-cors-headers
- django-filter

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- TanStack Query (React Query)
- Zustand
- Axios
- Tailwind CSS
- Lucide React (iconos)
- React Hot Toast

## 📦 Requisitos Previos

- Python 3.10 o superior
- Node.js 18 o superior
- PostgreSQL 15 o superior
- Git

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/proyecto-institucion.git
cd proyecto-institucion
```

### 2. Configurar Backend

```bash
# Crear y activar entorno virtual
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Crear base de datos PostgreSQL
# En PostgreSQL:
# CREATE DATABASE institucion_db;
# CREATE USER institucion_user WITH PASSWORD 'tu_password';
# GRANT ALL PRIVILEGES ON DATABASE institucion_db TO institucion_user;

# Configurar variables de entorno (opcional, ver Configuración)
# Editar institucion/settings.py con tus credenciales de PostgreSQL

# Ejecutar migraciones
python manage.py makemigrations
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# (Opcional) Cargar datos de prueba
python manage.py seed_data

# Iniciar servidor de desarrollo
python manage.py runserver
```

El backend estará disponible en: `http://127.0.0.1:8000`

### 3. Configurar Frontend

```bash
# En otra terminal, navegar a la carpeta del frontend
cd frontend-institucion

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env.local (ver Configuración)

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:3000`

## ⚙️ Configuración

### Backend - Base de Datos (institucion/settings.py)

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'institucion_db',
        'USER': 'institucion_user',
        'PASSWORD': 'tu_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Frontend - Variables de Entorno (.env.local)

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

## 💻 Uso

### Acceder a las aplicaciones

1. **Frontend**: http://localhost:3000
   - Página principal: Lista de módulos
   - Modalidades: http://localhost:3000/modalidades
   - Carreras: http://localhost:3000/carreras

2. **Backend API**: http://127.0.0.1:8000/api/
   - Modalidades: http://127.0.0.1:8000/api/modalidades/
   - Carreras: http://127.0.0.1:8000/api/carreras/

3. **Django Admin**: http://127.0.0.1:8000/admin/
   - Usuario: (el que creaste con createsuperuser)
   - Contraseña: (la que estableciste)

### Funcionalidades Principales

#### Modalidades
- **Crear**: Click en "Nueva Modalidad"
- **Editar**: Click en "Editar" en la tabla
- **Eliminar**: Click en "Eliminar" (con confirmación)
- **Filtrar**: Por estado (Activo/Inactivo)
- **Buscar**: Por nombre

#### Carreras
- **Crear**: Click en "Nueva Carrera"
- **Editar**: Click en "Editar" en la tabla
- **Eliminar**: Click en "Eliminar" (con confirmación)
- **Filtrar**: Por estado, por modalidad
- **Buscar**: Por nombre o modalidad

## 🌐 API Endpoints

### Modalidades

```
GET    /api/modalidades/          - Listar todas las modalidades
GET    /api/modalidades/{id}/     - Obtener una modalidad
POST   /api/modalidades/          - Crear modalidad
PATCH  /api/modalidades/{id}/     - Actualizar modalidad
DELETE /api/modalidades/{id}/     - Eliminar modalidad
```

**Filtros disponibles:**
- `?estado=true` - Filtrar por activos
- `?estado=false` - Filtrar por inactivos
- `?search=presencial` - Buscar por nombre

**Ejemplo de petición POST:**
```json
{
  "nombre": "Presencial",
  "estado": true
}
```

### Carreras

```
GET    /api/carreras/          - Listar todas las carreras
GET    /api/carreras/{id}/     - Obtener una carrera
POST   /api/carreras/          - Crear carrera
PATCH  /api/carreras/{id}/     - Actualizar carrera
DELETE /api/carreras/{id}/     - Eliminar carrera
```

**Filtros disponibles:**
- `?estado=true` - Filtrar por activos
- `?modalidad=1` - Filtrar por modalidad
- `?search=ingenieria` - Buscar por nombre

**Ejemplo de petición POST:**
```json
{
  "nombre": "Ingeniería de Sistemas",
  "modalidad": 1,
  "estado": true
}
```

### Respuestas Paginadas

```json
{
  "count": 25,
  "next": "http://127.0.0.1:8000/api/carreras/?page=2",
  "previous": null,
  "results": [...]
}
```

## 📁 Estructura del Proyecto

```
proyecto-institucion/
├── backend/
│   ├── institucion/              # Proyecto Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── academico/                # App principal
│   │   ├── models.py            # Modelos Modalidad y Carrera
│   │   ├── serializers.py       # Serializadores DRF
│   │   ├── views.py             # ViewSets
│   │   ├── urls.py              # Rutas de la API
│   │   ├── filters.py           # Filtros personalizados
│   │   └── admin.py
│   ├── manage.py
│   └── requirements.txt
│
└── frontend-institucion/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx       # Layout principal
    │   │   ├── page.tsx         # Página de inicio
    │   │   ├── modalidades/
    │   │   │   └── page.tsx
    │   │   └── carreras/
    │   │       └── page.tsx
    │   ├── components/
    │   │   ├── Navigation.tsx
    │   │   ├── ModalidadesTable.tsx
    │   │   ├── ModalidadForm.tsx
    │   │   ├── ModalidadesFilters.tsx
    │   │   ├── CarrerasTable.tsx
    │   │   ├── CarreraForm.tsx
    │   │   ├── CarrerasFilters.tsx
    │   │   └── Pagination.tsx
    │   ├── hooks/
    │   │   ├── useModalidades.ts
    │   │   └── useCarreras.ts
    │   ├── providers/
    │   │   └── QueryProvider.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── store/
    │   │   └── useStore.ts
    │   └── types/
    │       └── index.ts
    ├── package.json
    ├── tailwind.config.ts
    └── tsconfig.json
```

## 🐛 Solución de Problemas

### Error de CORS
- Verificar que `django-cors-headers` esté instalado
- Confirmar que `http://localhost:3000` esté en `CORS_ALLOWED_ORIGINS`

### Error de conexión a PostgreSQL
- Verificar que PostgreSQL esté corriendo
- Confirmar credenciales en `settings.py`
- Verificar que la base de datos exista

### Error 404 en API
- Verificar que el servidor Django esté corriendo
- Confirmar la URL base en `.env.local`
- Revisar que las rutas estén correctamente configuradas

## 📝 Notas Adicionales

- El sistema usa paginación de 10 registros por página
- Las validaciones impiden nombres duplicados
- No se pueden eliminar modalidades con carreras asociadas (a menos que se configure CASCADE)
- Los filtros se aplican en tiempo real
- El estado de los filtros se mantiene en Zustand

