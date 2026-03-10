"use server"

import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

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

    // Buscamos si el usuario ya tiene su rol guardado en los metadatos
    let rol = data.user.user_metadata?.rol;

    // Si no lo tiene cargado, lo buscamos en BD y lo inyectamos al JWT
    if (!rol) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("rol")
            .eq("id", data.user.id)
            .single();
        
        if (profile?.rol) {
            rol = profile.rol;
            // Guardamos el rol permanentemente dentro del usuario (Token de sesión)
            await supabase.auth.updateUser({
                data: { rol: profile.rol }
            });
        }
    }

    // Redirigir según el rol
    if (rol === "administrador") {
        redirect('/admin')
    } else if (rol === "chofer") {
        redirect('/driver')
    } else {
        redirect('/dashboard')
    }
}