"use server"

import { createClient } from "@/lib/supabase/server";

export async function updateDriver(profile_id: string, name: string, phone: number): Promise<{ success: boolean; error?: string }> {
    try {
        const supabase = await createClient();
        
        const { data, error } = await supabase
            .from('user_driver')
            .upsert({ 
                profile_id,
                name,
                phone
            }, {
                onConflict: 'profile_id'
            })
            .select()
            .single();

        if (error) {
            console.error('Error updating driver:', error);
            return { success: false, error: error.message };
        }

        return { success: true };

    } catch (error) {
        console.error('Error in updateDriver:', error);
        return { success: false, error: 'Error inesperado al actualizar conductor' };
    }
}