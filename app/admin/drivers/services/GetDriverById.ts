"use server"

import { createClient } from "@/lib/supabase/server";
import { Driver } from "../models/Driver";

export async function getDriverById(id: string): Promise<Driver | null> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('profiles')
            .select(`
                id,
                email,
                rol,
                user_driver (
                    name,
                    phone
                )
            `)
            .eq('id', id)
            .eq('rol', 'chofer')
            .single(); // .single() para obtener UN solo registro
        

        if (error) {
            console.error('Error fetching driver by id:', error);
            return null;
        }

        if (!data) return null;

        // Con UNIQUE constraint, Supabase retorna user_driver como array
        const userDriverData = Array.isArray(data.user_driver) ? data.user_driver[0] : data.user_driver;
        console.log("userDriverData extracted:", userDriverData);

        // Construimos el objeto Driver aplanando los datos
        const driver: Driver = {
            id: data.id,
            email: data.email,
            rol: data.rol,
            name: userDriverData?.name,
            phone: userDriverData?.phone,
        };

        
        return driver;
    } catch (error) {
        console.error('Error in getDriverById:', error);
        return null;
    }
}