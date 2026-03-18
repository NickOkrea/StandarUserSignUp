# Arquitectura de Base de Datos - Sistema de Usuarios

## 📋 Índice
- [Visión General](#visión-general)
- [Estructura de Tablas](#estructura-de-tablas)
- [Relaciones](#relaciones)
- [Flujo de Invitación](#flujo-de-invitación)
- [Agregar Nuevos Roles](#agregar-nuevos-roles)
- [Consultas Comunes](#consultas-comunes)

---

## 🎯 Visión General

Este sistema utiliza un **patrón de herencia de tabla** donde `profiles` actúa como la **tabla madre** que contiene los datos básicos de todos los usuarios, mientras que las tablas específicas por rol (`user_driver`, `user_admin`, etc.) contienen campos adicionales según el tipo de usuario.

### Principios de Diseño

1. **Tabla madre única**: Todos los usuarios tienen un registro en `profiles`
2. **Extensiones por rol**: Solo los roles que necesitan datos adicionales tienen tablas específicas
3. **Normalización**: Sin campos vacíos en la tabla principal
4. **Escalabilidad**: Agregar nuevos roles no afecta la estructura principal

---

## 🗄️ Estructura de Tablas

### `profiles` (Tabla Madre)

Contiene los datos comunes de **todos** los usuarios del sistema.

```sql
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  rol text NOT NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid | Identificador único (coincide con `auth.users.id`) |
| `email` | text | Email del usuario |
| `rol` | text | Rol del usuario (`administrador`, `chofer`, `vendedor`) |

### `user_driver` (Extensión para Choferes)

Contiene datos específicos de los usuarios con rol `chofer`.

```sql
CREATE TABLE public.user_driver (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
  phone smallint,
  profile_id uuid,
  CONSTRAINT user_driver_pkey PRIMARY KEY (id),
  CONSTRAINT user_driver_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | bigint | Identificador único de la tabla |
| `name` | text | Nombre completo del chofer |
| `phone` | smallint | Teléfono del chofer |
| `profile_id` | uuid | Referencia a `profiles.id` (FK) |

### `user_admin` (Extensión para Administradores)

Contiene datos específicos de los usuarios con rol `administrador`.

```sql
CREATE TABLE public.user_admin (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
  department text,
  profile_id uuid,
  CONSTRAINT user_admin_pkey PRIMARY KEY (id),
  CONSTRAINT user_admin_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | bigint | Identificador único de la tabla |
| `name` | text | Nombre completo del administrador |
| `department` | text | Departamento asignado |
| `profile_id` | uuid | Referencia a `profiles.id` (FK) |

---

## 🔗 Relaciones

```
┌─────────────────┐
│    profiles     │ ← TABLA MADRE
│─────────────────│
│ id (PK)         │
│ email           │
│ rol             │
└────────┬────────┘
         │
         │ 1:1 (opcional según rol)
         │
    ┌────┴────────────────────┬──────────────────┐
    │                         │                  │
    ▼                         ▼                  ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ user_driver  │    │  user_admin  │    │   usuario    │
│──────────────│    │──────────────│    │ (sin tabla)  │
│ profile_id   │    │ profile_id   │    └──────────────┘
│ name         │    │ name         │
│ phone        │    │ department   │
└──────────────┘    └──────────────┘
```

### Tipos de Relaciones

- **profiles → user_driver**: 1:1 (solo si `rol = 'chofer'`)
- **profiles → user_admin**: 1:1 (solo si `rol = 'administrador'`)
- **profiles con `rol = 'vendedor'`**: Sin tabla adicional

---

## 📨 Flujo de Invitación

### Paso 1: Administrador invita a un nuevo usuario

```typescript
// POST /api/profiles/invite
{
  "email": "nuevo@example.com",
  "rol": "chofer"
}
```

### Paso 2: Sistema crea registros automáticamente

1. **Se crea en `auth.users`** (Supabase Auth)
2. **Se crea en `profiles`** (trigger automático):
   ```sql
   INSERT INTO profiles (id, email, rol)
   VALUES ('uuid-generado', 'nuevo@example.com', 'chofer');
   ```

3. **Se crea en tabla específica** (según `ROLE_TABLES` en el código):
   ```sql
   -- Si rol = 'chofer'
   INSERT INTO user_driver (profile_id, name, phone)
   VALUES ('uuid-generado', NULL, NULL);
   
   -- O si rol = 'administrador'
   INSERT INTO user_admin (profile_id, name, department)
   VALUES ('uuid-generado', NULL, NULL);
   ```

### Paso 3: Usuario recibe email y activa cuenta

El usuario recibe un email de invitación y establece su contraseña.

### Paso 4: Administrador completa los datos

Desde el panel de administración, se completan los campos específicos:

```sql
-- Completar datos del chofer
UPDATE user_driver
SET name = 'Juan Pérez', phone = 123456789
WHERE profile_id = 'uuid-del-usuario';
```

---

## ➕ Agregar Nuevos Roles

### Ejemplo: Agregar rol "supervisor"

#### 1. Crear tabla en la base de datos

```sql
CREATE TABLE public.user_supervisor (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
  area text,
  level smallint,
  profile_id uuid,
  CONSTRAINT user_supervisor_pkey PRIMARY KEY (id),
  CONSTRAINT user_supervisor_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
```

#### 2. Actualizar tipo de rol (`lib/models/Profile.ts`)

```typescript
export type RolType = 'administrador' | 'chofer' | 'vendedor' | 'supervisor'
```

#### 3. Agregar configuración (`lib/services/invitation.ts`)

```typescript
const ROLE_TABLES: Record<RolType, { table: string; fields: Record<string, any> } | null> = {
  chofer: {
    table: 'user_driver',
    fields: { name: null, phone: null }
  },
  administrador: {
    table: 'user_admin',
    fields: { name: null, department: null }
  },
  supervisor: {
    table: 'user_supervisor',
    fields: { name: null, area: null, level: null }
  },
  usuario: null
}
```

#### 4. ¡Listo! El sistema automáticamente:
- ✅ Crea registros en `user_supervisor` cuando se invite a un supervisor
- ✅ Inicializa los campos definidos en `fields`
- ✅ Mantiene la consistencia con `profiles`

---

## 🔍 Consultas Comunes

### Obtener todos los usuarios

```sql
SELECT id, email, rol 
FROM profiles
ORDER BY email;
```

### Obtener choferes con sus datos completos

```sql
SELECT 
  p.id,
  p.email,
  p.rol,
  ud.name,
  ud.phone
FROM profiles p
LEFT JOIN user_driver ud ON p.id = ud.profile_id
WHERE p.rol = 'chofer';
```

### Obtener administradores con sus datos completos

```sql
SELECT 
  p.id,
  p.email,
  p.rol,
  ua.name,
  ua.department
FROM profiles p
LEFT JOIN user_admin ua ON p.id = ua.profile_id
WHERE p.rol = 'administrador';
```

### Obtener todos los usuarios con sus datos específicos (si existen)

```sql
SELECT 
  p.id,
  p.email,
  p.rol,
  ud.name as driver_name,
  ud.phone as driver_phone,
  ua.name as admin_name,
  ua.department as admin_department
FROM profiles p
LEFT JOIN user_driver ud ON p.id = ud.profile_id AND p.rol = 'chofer'
LEFT JOIN user_admin ua ON p.id = ua.profile_id AND p.rol = 'administrador'
ORDER BY p.email;
```

### Verificar consistencia de datos

```sql
-- Choferes sin registro en user_driver
SELECT p.* 
FROM profiles p
LEFT JOIN user_driver ud ON p.id = ud.profile_id
WHERE p.rol = 'chofer' AND ud.id IS NULL;

-- Administradores sin registro en user_admin
SELECT p.* 
FROM profiles p
LEFT JOIN user_admin ua ON p.id = ua.profile_id
WHERE p.rol = 'administrador' AND ua.id IS NULL;
```

---

## 🛠️ Mantenimiento

### Cambiar el rol de un usuario

```sql
-- 1. Actualizar el rol en profiles
UPDATE profiles 
SET rol = 'administrador'
WHERE id = 'uuid-del-usuario';

-- 2. Eliminar registro anterior (si existe)
DELETE FROM user_driver 
WHERE profile_id = 'uuid-del-usuario';

-- 3. Crear nuevo registro en la tabla correspondiente
INSERT INTO user_admin (profile_id, name, department)
VALUES ('uuid-del-usuario', NULL, NULL);
```

### Eliminar un usuario completamente

```sql
-- El CASCADE eliminará automáticamente los registros relacionados
DELETE FROM profiles WHERE id = 'uuid-del-usuario';
```

> **Nota**: Asegúrate de tener la configuración `ON DELETE CASCADE` en las foreign keys o elimina manualmente primero las tablas dependientes.

---

## 📚 Archivos Relacionados

- **Modelo de datos**: [`lib/models/Profile.ts`](lib/models/Profile.ts)
- **Servicio de invitación**: [`lib/services/invitation.ts`](lib/services/invitation.ts)
- **API de invitación**: [`app/api/profiles/invite/route.ts`](app/api/profiles/invite/route.ts)
- **Modelo de chofer**: [`app/admin/drivers/models/Driver.ts`](app/admin/drivers/models/Driver.ts)

---

## ✅ Ventajas de esta Arquitectura

| Ventaja | Descripción |
|---------|-------------|
| **Centralización** | Todos los usuarios en una tabla (`profiles`) |
| **Normalización** | Sin campos NULL innecesarios en la tabla principal |
| **Escalabilidad** | Agregar roles no afecta la estructura existente |
| **Consultas simples** | Fácil obtener listado completo de usuarios |
| **Datos específicos separados** | Cada rol tiene solo los campos que necesita |
| **Mantenibilidad** | Cambios en un rol no afectan a otros |
| **Flexibilidad** | Algunos roles pueden no tener tabla adicional |

---

**Fecha de última actualización**: Marzo 2026  
**Mantenido por**: Equipo de Desarrollo
