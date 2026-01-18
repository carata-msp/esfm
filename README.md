# Gestión de Códigos y Contraseñas

Proyecto Next.js para gestionar códigos y contraseñas usando Supabase como base de datos.

## Características

- ✅ Listar códigos y contraseñas
- ✅ Agregar nuevos códigos
- ✅ API REST endpoints
- ✅ Integración con Supabase (PostgreSQL)
- ✅ Interfaz moderna con Tailwind CSS

## Configuración

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno en `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://pjzfrnhnczoqcmehsmzm.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_57vojYhoXEo0NxI8E0HWqw_nXifv6a
```

3. Crear las tablas en la base de datos:

```bash
node setup-db.js
```

## Iniciar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## API Endpoints

### GET /api/codes
Obtiene todos los códigos guardados.

### POST /api/codes
Agrega un nuevo código.

**Body:**
```json
{
  "code": "mi_codigo",
  "password": "mi_contraseña"
}
```

## Tecnologías

- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- React 19

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
