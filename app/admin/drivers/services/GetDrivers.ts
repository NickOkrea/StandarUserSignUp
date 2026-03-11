"use server"

import { createClient } from "@/lib/supabase/server";
import { Driver } from "../models/Driver";

// ✅ Recibe agencyId directamente - sin consultas duplicadas
export async function getDrivers(agencyId: string): Promise<Driver[]> {
    try{
        if (!agencyId) {
            console.error("No agency_id provided");
            return [];
        }

        const supabase = await createClient();

        // ✅ Una sola consulta - el agencyId ya viene del layout
        const {data, error} = await supabase
            .from('profiles')
            .select(`
                id,
                email,
                rol,
                user_driver: user_driver!profile_id(name, phone)
            `)
            .eq('rol', 'chofer')
            .eq('agency_id', agencyId)
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