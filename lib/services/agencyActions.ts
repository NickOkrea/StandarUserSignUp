"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function switchAgencyAction(agency_id: string): Promise<{ success: boolean; error?: string }> {
    if (!agency_id) {
        return { success: false, error: "agency_id is required" };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "User not found" };
    }

    const { data: updatedData, error } = await supabase
        .from('profiles')
        .update({ agency_id })
        .eq('id', user.id)
        .select();

    if (error) {
        return { success: false, error: error.message };
    }

    if (!updatedData || updatedData.length === 0) {
        return { success: false, error: "Update failed, row not found or RLS blocked" };
    }

    // Al usar revalidatePath automatizamos el refresco de los datos del servidor para toda la ruta de admin
    revalidatePath("/admin", "layout");

    return { success: true };
}