"use server"

import { createClient } from "../supabase/server";

export async function Login(_prevState: unknown, formData: FormData) {
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = await createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error){
        return { error: error.message }
    }

    // ✅ Obtener el rol directamente de la BD (mucho más rápido)
    const { data: profile } = await supabase
        .from("profiles")
        .select("rol")
        .eq("id", data.user.id)
        .single();
    
    const rol = profile?.rol;

    // 🚀 Guardar el rol en user_metadata para acceso rápido en el middleware
    // Esto elimina la necesidad de consultas adicionales a la BD en cada request
    if (rol) {
        await supabase.auth.updateUser({
            data: { rol }
        });
    }

    // ✅ Devolver la ruta en lugar de hacer redirect
    // Esto evita esperar a que el layout del admin se cargue
    let redirectTo = '/dashboard';
    if (rol === "administrador") {
        redirectTo = '/admin';
    } else if (rol === "chofer") {
        redirectTo = '/workshop';
    } else if (rol === "vendedor") {
        redirectTo = '/sales';
    }

    return { success: true, redirectTo };
}