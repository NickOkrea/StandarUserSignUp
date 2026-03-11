'use server'

import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/models/Profile";

// ✅ Recibe agencyId directamente - sin consultas duplicadas
export async function getProfiles(agencyId: string): Promise<Profile[]> {
    try{
        if (!agencyId) {
            console.error("No agency_id provided");
            return [];
        }

        const supabase = await createClient();

        // ✅ Una sola consulta - el agencyId ya viene del layout
        const {data, error} = await supabase
            .from('profiles')
            .select('*')
            .eq('agency_id', agencyId)
            .order('email', { ascending: true })

        if(error){
            console.error('❌ Error fetching profiles:', error);
            return []
        }
        return data || [];
    } catch (error){
        console.error('❌ Error in getProfiles:', error);
        return [];
    }
}