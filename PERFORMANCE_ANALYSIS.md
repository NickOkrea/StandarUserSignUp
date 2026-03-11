# 🔍 Análisis de Problemas de Rendimiento

## 📊 Métricas Actuales

| Endpoint | Tiempo | Render | Problema Principal |
|----------|--------|--------|-------------------|
| POST /auth/login | 3.4s | 3.4s | ❌ updateUser() en Supabase Auth |
| GET /admin/users | 1.5s | 976ms | ❌ Consultas duplicadas a BD |
| GET /admin/drivers | 1.1s | 650ms | ❌ Consultas duplicadas a BD |
| POST /admin/drivers (cambio agencia) | 1.3s | 1038ms | ❌ Revalidación completa del layout |

---

## 🐛 PROBLEMA #1: Login Lento (3.4s)

### 📂 Archivo: [lib/login/actions.ts](lib/login/actions.ts)

### ❌ Código Problemático:
```typescript
// Si no tiene el rol en metadata, lo busca y ACTUALIZA TODO EL TOKEN
if (!rol) {
    const { data: profile } = await supabase
        .from("profiles")
        .select("rol")
        .eq("id", data.user.id)
        .single();
    
    if (profile?.rol) {
        rol = profile.rol;
        // 🚨 ESTO ES MUY LENTO - actualiza el JWT completo
        await supabase.auth.updateUser({
            data: { rol: profile.rol }
        });
    }
}
```

### 💡 Causa:
- `updateUser()` es una operación COSTOSA en Supabase Auth (actualiza JWT, cookies, sesión)
- Se ejecuta en CADA login la primera vez
- Añade 1-2 segundos al proceso de login

### ✅ SOLUCIÓN:

**Opción A: Eliminar updateUser (RECOMENDADO)**
```typescript
// El rol se puede obtener siempre de la BD sin guardarlo en el token
const { data: profile } = await supabase
    .from("profiles")
    .select("rol")
    .eq("id", data.user.id)
    .single();

rol = profile?.rol;

// ✅ Sin updateUser - mucho más rápido
// Si necesitas el rol en otras partes, usa getCurrentProfile()
```

**Opción B: Hacer updateUser asíncrono (si realmente necesitas el rol en el token)**
```typescript
// No esperar la actualización - dejar que pase en background
if (profile?.rol) {
    rol = profile.rol;
    supabase.auth.updateUser({ data: { rol: profile.rol } })
        .catch(err => console.error('Error updating user metadata:', err));
}
// Hacer redirect inmediatamente sin esperar
```

### 📈 Mejora esperada: **3.4s → 0.5-0.8s** (reducción de ~2.5s)

---

## 🐛 PROBLEMA #2: Consultas Duplicadas (Users & Drivers lentos)

### 📂 Archivos afectados:
- [app/admin/layout.tsx](app/admin/layout.tsx)
- [app/admin/users/services/GetProfiles.ts](app/admin/users/services/GetProfiles.ts)
- [app/admin/drivers/services/GetDrivers.ts](app/admin/drivers/services/GetDrivers.ts)

### ❌ Problema:
```
LAYOUT ejecuta:
    ├── getCurrentUser()          // ← Llamada #1
    └── getCurrentProfile()        // ← Llamada #2

PÁGINA (Users/Drivers) ejecuta:
    ├── getCurrentUser()          // ← Llamada #3 (DUPLICADA)
    └── getCurrentProfile()        // ← Llamada #4 (DUPLICADA)
```

**Resultado**: 4 consultas a BD cuando solo se necesitan 2

### 💡 Causa:
Cada Server Action (getProfiles, getDrivers) llama a `getCurrentUser()` y `getCurrentProfile()` de nuevo, aunque el layout ya lo hizo.

### ✅ SOLUCIÓN: Pasar datos del layout a las páginas

#### 1️⃣ Modificar [app/admin/layout.tsx](app/admin/layout.tsx):
```typescript
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: { user } } = await getCurrentUser();
    
    if (!user) {
        redirect('/auth/login');
    }

    const [agencies, { data: profile }] = await Promise.all([
        getAgencies(),
        getCurrentProfile(user.id)
    ]);

    const currentAgencyId = profile?.agency_id || "";

    return (
        <SidebarProvider>
            <div className="relative flex h-screen w-full">
                <AppSidebar agencies={agencies} currentAgencyId={currentAgencyId} />
                <SidebarInset>
                    <header>...</header>
                    {/* ✅ Pasamos user y agencyId como contexto */}
                    <AdminContext.Provider value={{ user, agencyId: currentAgencyId }}>
                        {children}
                    </AdminContext.Provider>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
```

#### 2️⃣ Crear Context (nuevo archivo: [app/admin/admin-context.tsx](app/admin/admin-context.tsx)):
```typescript
"use client"
import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';

interface AdminContextType {
    user: User;
    agencyId: string;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function useAdminContext() {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdminContext must be used within AdminLayout');
    return context;
}

export { AdminContext };
```

#### 3️⃣ Modificar [app/admin/users/services/GetProfiles.ts](app/admin/users/services/GetProfiles.ts):
```typescript
'use server'

import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/models/Profile";

// ✅ Recibe userId y agencyId directamente - sin consultas duplicadas
export async function getProfiles(userId: string, agencyId: string): Promise<Profile[]> {
    try {
        if (!agencyId) {
            console.error("No agency_id provided");
            return [];
        }

        const supabase = await createClient();

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('agency_id', agencyId)
            .order('email', { ascending: true })

        if (error) {
            console.error('❌ Error fetching profiles:', error);
            return []
        }
        return data || [];
    } catch (error) {
        console.error('❌ Error in getProfiles:', error);
        return [];
    }
}
```

#### 4️⃣ Modificar [app/admin/users/page.tsx](app/admin/users/page.tsx):
```typescript
import { getCurrentUser, getCurrentProfile } from '@/lib/services/auth'
import { InviteUserModal } from './add/invite-user-modal'
import DataTableUsers from './components/data-table-users'
import { getProfiles } from './services/GetProfiles'

export default async function UserPage() {
    // ✅ Obtener datos una sola vez
    const { data: { user } } = await getCurrentUser();
    const { data: profile } = await getCurrentProfile(user!.id);
    
    const profiles = await getProfiles(user!.id, profile!.agency_id);

    return (
        <div className="p-3">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Perfiles</h1>
                <InviteUserModal />
            </div>
            <DataTableUsers profiles={profiles} />
        </div>
    )
}
```

#### 5️⃣ Hacer lo mismo para [app/admin/drivers/services/GetDrivers.ts](app/admin/drivers/services/GetDrivers.ts) y [app/admin/drivers/page.tsx](app/admin/drivers/page.tsx)

### 📈 Mejora esperada:
- Users: **1.5s → 0.4-0.6s** (reducción de ~1s)
- Drivers: **1.1s → 0.3-0.5s** (reducción de ~0.6s)

---

## 🐛 PROBLEMA #3: Cambio de Agencia Lento (1.3s)

### 📂 Archivo: [lib/services/agencyActions.ts](lib/services/agencyActions.ts)

### ❌ Código Problemático:
```typescript
// 🚨 Revalida TODO el layout completo
revalidatePath("/admin", "layout");
```

### 💡 Causa:
- Revalida TODO: layout, sidebar, getAgencies(), getCurrentUser(), getCurrentProfile()
- El navegador recarga completamente la página
- No es necesario recargar el sidebar completo

### ✅ SOLUCIÓN: Revalidación más específica

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/services/auth";
import { revalidatePath } from "next/cache";

export async function switchAgencyAction(agency_id: string): Promise<{ success: boolean; error?: string }> {
    if (!agency_id) {
        return { success: false, error: "agency_id is required" };
    }

    const [supabase, { data: { user } }] = await Promise.all([
        createClient(),
        getCurrentUser()
    ]);

    if (!user) {
        return { success: false, error: "User not found" };
    }

    const { error } = await supabase
        .from('profiles')
        .update({ agency_id })
        .eq('id', user.id);

    if (error) {
        return { success: false, error: error.message };
    }

    // ✅ Solo revalidar las páginas específicas, no el layout
    revalidatePath("/admin/users", "page");
    revalidatePath("/admin/drivers", "page");

    return { success: true };
}
```

### Modificar [components/sidebar/team-switcher.tsx](components/sidebar/team-switcher.tsx):
```typescript
"use client"

import { useRouter } from "next/navigation"

export function TeamSwitcher({agencies, currentAgencyId}: TeamSwitcherProps) { 
  const router = useRouter()
  // ... resto del código

  <DropdownMenuItem
    key={agency.id}
    onClick={async () => {
      setActiveTeam(agency);
      const res = await switchAgencyAction(agency.id);
      if (res.success) {
        // ✅ Refresh solo actualiza los datos, no recarga toda la página
        router.refresh();
      } else {
        console.error("Error switching agency:", res.error);
      }
    }}
  >
```

### 📈 Mejora esperada: **1.3s → 0.3-0.5s** (reducción de ~0.8s)

---

## 🐛 PROBLEMA #4: Componentes Cliente Innecesarios

### 📂 Archivos:
- [app/admin/users/components/data-table-users.tsx](app/admin/users/components/data-table-users.tsx)
- [app/admin/drivers/components/data-table-drivers.tsx](app/admin/drivers/components/data-table-drivers.tsx)

### ❌ Código Problemático:
```typescript
'use client'  // ← Innecesario
import { useEffect, useState } from "react";

export default function DataTableUsers({profiles}: DataTableUsersProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);  // ← Anti-patrón en Next.js 14+
    }, []);

    if (!isMounted) {
        return null;  // ← Causa flash de contenido
    }
    // ...
}
```

### 💡 Causa:
- El check `isMounted` es un anti-patrón viejo de Next.js
- Causa hidratación doble (servidor + cliente)
- Los componentes NO necesitan ser cliente

### ✅ SOLUCIÓN: Convertir a Server Components

#### [app/admin/users/components/data-table-users.tsx](app/admin/users/components/data-table-users.tsx):
```typescript
// ✅ Remover 'use client'
import { Profile } from "@/lib/models/Profile";
import TabsMultiUser from "./tabs-multi-user";

interface DataTableUsersProps {
    profiles: Profile[]
}

export default function DataTableUsers({profiles}: DataTableUsersProps) {
    return <TabsMultiUser profiles={profiles} />
}
```

#### [app/admin/drivers/components/data-table-drivers.tsx](app/admin/drivers/components/data-table-drivers.tsx):
```typescript
// ✅ Remover 'use client'
import { Driver } from "../models/Driver";
import TableComponent from "./table-component";

interface DataTableDriversProps {
    drivers: Driver[]
}

export default function DataTableDrivers({ drivers }: DataTableDriversProps) {
    return <TableComponent drivers={drivers}/>
}
```

### 📈 Mejora esperada: **50-200ms menos** en tiempo de hidratación

---

## 🐛 PROBLEMA #5: Falta de Índices en Base de Datos

### 💡 Causa:
Las consultas filtran por `agency_id` pero puede que no haya índice en esa columna.

### ✅ SOLUCIÓN: Crear índices

Ejecutar en Supabase SQL Editor:

```sql
-- Índice para filtrar profiles por agency_id
CREATE INDEX IF NOT EXISTS idx_profiles_agency_id 
ON profiles(agency_id);

-- Índice compuesto para filtrar por rol y agencia
CREATE INDEX IF NOT EXISTS idx_profiles_rol_agency 
ON profiles(rol, agency_id);

-- Índice para user_driver.profile_id (para el JOIN)
CREATE INDEX IF NOT EXISTS idx_user_driver_profile_id 
ON user_driver(profile_id);
```

### 📈 Mejora esperada: **100-300ms menos** en consultas a BD

---

## 📊 Resultados Esperados Después de Todas las Optimizaciones

| Endpoint | Antes | Después | Mejora |
|----------|-------|---------|--------|
| POST /auth/login | 3.4s | **0.5-0.8s** | ✅ 2.5s más rápido |
| GET /admin/users | 1.5s | **0.4-0.6s** | ✅ 1s más rápido |
| GET /admin/drivers | 1.1s | **0.3-0.5s** | ✅ 0.6s más rápido |
| Cambio de agencia | 1.3s | **0.3-0.5s** | ✅ 0.8s más rápido |

---

## 🎯 Plan de Implementación (Orden Recomendado)

### Fase 1: Quick Wins (30 minutos)
1. ✅ Crear índices en BD (PROBLEMA #5) - Impacto inmediato
2. ✅ Remover `isMounted` de componentes (PROBLEMA #4) - Cambio simple

### Fase 2: Optimización de Login (45 minutos)
3. ✅ Modificar [lib/login/actions.ts](lib/login/actions.ts) (PROBLEMA #1)

### Fase 3: Eliminar Consultas Duplicadas (1-2 horas)
4. ✅ Modificar layout y servicios (PROBLEMA #2)
   - Modificar GetProfiles.ts
   - Modificar GetDrivers.ts
   - Modificar páginas users y drivers

### Fase 4: Optimizar Cambio de Agencia (30 minutos)
5. ✅ Modificar switchAgencyAction (PROBLEMA #3)

---

## 🔍 Monitoreo Post-Implementación

Después de implementar, verificar con:
```bash
# En el navegador (Network tab)
# O en la terminal de Next.js
```

Deberías ver:
- Login: < 1 segundo
- Carga de páginas: < 500ms
- Cambio de agencia: < 500ms

---

## 💡 Optimizaciones Adicionales (Opcional)

### A. Implementar React Query / SWR para caché en cliente
### B. Usar Suspense boundaries para loading states
### C. Implementar paginación en tablas grandes
### D. Considerar usar Edge Runtime para auth
