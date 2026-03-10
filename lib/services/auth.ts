import { cache } from 'react';
import { createClient } from "@/lib/supabase/server";

export const getCurrentUser = cache(async () => {
    const supabase = await createClient();
    return supabase.auth.getUser();
});

export const getCurrentProfile = cache(async (userId: string) => {
    const supabase = await createClient();
    return supabase
        .from('profiles')
        .select('agency_id, rol')
        .eq('id', userId)
        .single();
});
