"use server"

import { createClient } from "@/lib/supabase/server";
import { Driver } from "../models/Driver";

export async function getDrivers(): Promise<Driver[]> {
    try{
        const supabase = await createClient();
        const {data, error} = await supabase
            .from('profiles')
            .select("*")
            .eq('rol', 'chofer')
            .order('email', { ascending: true })

            if(error){
                console.error("Error fetching drivers", error);
                return []
            }
            return data || [];
    }catch (error){
        console.error("Error in getDrivers", error);
        return [];
    }
}