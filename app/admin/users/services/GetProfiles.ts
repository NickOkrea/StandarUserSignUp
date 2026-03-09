'use server'

import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/lib/models/Profile";

export async function getProfiles(): Promise<Profile[]> {
    try{
        const supabase = await createClient();
        const {data, error} = await supabase
            .from('profiles')
            .select('*')
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