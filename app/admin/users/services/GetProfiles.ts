'use server'

import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/models/Profile";
import { getCurrentUser, getCurrentProfile } from "@/lib/services/auth";

export async function getProfiles(): Promise<Profile[]> {
    try{
        const [supabase, { data: { user } }] = await Promise.all([
            createClient(),
            getCurrentUser()
        ]);

        if (!user) return [];

        // 2. Obtener a qué agencia pertenece actualmente el admin
        const { data: adminProfile, error: profileError } = await getCurrentProfile(user.id);

        if (profileError || !adminProfile?.agency_id) {
            console.error("Admin doesn't have an agency_id or error fetching profile");
            return [];
        }

        // 3. Obtener los perfiles (usuarios) que pertenezcan a esa misma agencia
        const {data, error} = await supabase
            .from('profiles')
            .select('*')
            .eq('agency_id', adminProfile.agency_id)
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