# Gestión de Códigos y Contraseñas - Next.js

## ⚠️ Configuración Importante

### Credenciales de Supabase

Para que el proyecto funcione correctamente, necesitas configurar las variables de entorno en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pjzfrnhnczoqcmehsmzm.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_57vojYhoXEo0NxI8E0HWqw_nXifv6a
```

**NOTA IMPORTANTE:** La clave `sb_publishable_*` es una clave pública limitada. Para operaciones del servidor (API routes), Supabase requiere:

1. **Service Role Key** (para operaciones desde el servidor)
2. O habilitar **Row Level Security (RLS)** en la tabla

### Opciones para solucionar el error 500:

#### Opción 1: Obtener Service Role Key
1. Ve a [console.supabase.co](https://console.supabase.co)
2. Selecciona tu proyecto
3. Ve a Settings > API
4. Copia la **service_role key** (¡Mantenla segura!)
5. Agrégala al `.env.local`:
```env
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

#### Opción 2: Deshabilitar RLS (solo para desarrollo/testing)
Ejecuta en el SQL Editor de Supabase:
```sql
ALTER TABLE codes DISABLE ROW LEVEL SECURITY;
```

**⚠️ ADVERTENCIA:** Esto permite acceso público completo a la tabla. Solo usar en desarrollo.

#### Opción 3: Configurar políticas RLS (recomendado para producción)
```sql
-- Habilitar RLS
ALTER TABLE codes ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública
CREATE POLICY "Permitir lectura pública" ON codes
FOR SELECT
USING (true);

-- Permitir inserción pública
CREATE POLICY "Permitir inserción pública" ON codes
FOR INSERT
WITH CHECK (true);
```

## 🚀 Instalación y Uso

1. **Instalar dependencias:**
```bash
npm install
```

2. **Crear las tablas en la base de datos:**
```bash
node setup-db.js
```

3. **Configurar `.env.local`** (ver arriba)

4. **Iniciar el servidor:**
```bash
npm run dev
```

5. **Abrir en el navegador:**
```
http://localhost:3000
```

## 📡 API Endpoints

### GET /api/codes
Obtiene todos los códigos.

**Respuesta:**
```json
[
  {
    "id": 1,
    "code": "codigo123",
    "password": "pass123",
    "created_at": "2026-01-18T10:00:00Z",
    "updated_at": "2026-01-18T10:00:00Z"
  }
]
```

### POST /api/codes
Agrega un nuevo código.

**Body:**
```json
{
  "code": "mi_codigo",
  "password": "mi_password"
}
```

**Respuesta:**
```json
{
  "id": 2,
  "code": "mi_codigo",
  "password": "mi_password",
  "created_at": "2026-01-18T10:00:00Z",
  "updated_at": "2026-01-18T10:00:00Z"
}
```

## 🛠️ Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Supabase** - Base de datos PostgreSQL
- **React 19** - Biblioteca UI

## 📁 Estructura del Proyecto

```
codigos/
├── app/
│   ├── api/
│   │   └── codes/
│   │       └── route.ts          # API endpoints
│   ├── page.tsx                   # Página principal
│   └── layout.tsx
├── lib/
│   └── prisma.ts                  # Cliente Supabase
├── setup.sql                      # Script SQL
├── setup-db.js                    # Script de configuración
└── .env.local                     # Variables de entorno
```

## 🔧 Solución de Problemas

### Error 500 en /api/codes
- Verifica que las variables de entorno estén configuradas
- Asegúrate de que RLS esté deshabilitado o configurado correctamente
- Revisa los logs del servidor en la terminal

### La tabla no existe
- Ejecuta `node setup-db.js` para crear la tabla

### No se guardan los datos
- Verifica la conexión a Supabase
- Revisa las políticas de RLS si están habilitadas
