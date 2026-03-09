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

    // Obtener el rol del usuario para redirigir correctamente
    const { data: profile } = await supabase
        .from("profiles")
        .select("rol")
        .eq("id", data.user.id)
        .single();

    // Redirigir según el rol
    if (profile?.rol === "administrador") {
        redirect('/admin')
    } else if (profile?.rol === "chofer") {
        redirect('/driver')
    } else {
        redirect('/dashboard')
    }
}