"use server"

import { createClient } from "@/lib/supabase/server";
import { Driver } from "../models/Driver";

export async function getDrivers(): Promise<Driver[]> {
    try{
        const supabase = await createClient();

        // 1. Obtener quién es el administrador actual
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        // 2. Obtener a qué agencia pertenece actualmente el admin
        const { data: adminProfile, error: profileError } = await supabase
            .from('profiles')
            .select('agency_id')
            .eq('id', user.id)
            .single();

        if (profileError || !adminProfile?.agency_id) {
            console.error("Admin doesn't have an agency_id or error fetching profile");
            return [];
        }

        // 3. Obtener solo los choferes que pertenezcan a esa misma agencia
        const {data, error} = await supabase
            .from('profiles')
            .select(`
                id,
                email,
                rol,
                user_driver: user_driver!profile_id(name, phone)
            `)
            .eq('rol', 'chofer')
            .eq('agency_id', adminProfile.agency_id) // <- Filtro clave aquí
            .order('email', { ascending: true })

            if(error){
                console.error("Error fetching drivers", error);
                return []
            }

            // Transformar los datos para aplanar user_driver
            const drivers: Driver[] = (data || []).map((item: any) => {
                const userDriverData = Array.isArray(item.user_driver) 
                    ? item.user_driver[0] 
                    : item.user_driver;
                
                return {
                    id: item.id,
                    email: item.email,
                    rol: item.rol,
                    name: userDriverData?.name,
                    phone: userDriverData?.phone,
                };
            });

            return drivers;
    }catch (error){
        console.error("Error in getDrivers", error);
        return [];
    }
}