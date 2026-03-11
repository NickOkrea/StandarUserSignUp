"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/services/auth";
import { revalidatePath } from "next/cache";

export async function switchAgencyAction(agency_id: string): Promise<{ success: boolean; error?: string }> {
    if (!agency_id) {
        return { success: false, error: "agency_id is required" };
    }

    const [supabase, { data: { user } }] = await Promise.all([
        createClient(),
        getCurrentUser()
    ]);

    if (!user) {
        return { success: false, error: "User not found" };
    }

    const { error } = await supabase
        .from('profiles')
        .update({ agency_id })
        .eq('id', user.id);

    if (error) {
        return { success: false, error: error.message };
    }

    // ✅ Revalidar solo las páginas específicas que dependen de agency_id
    // No revalidamos el layout para evitar recargar getAgencies() innecesariamente
    revalidatePath("/admin/users", "page");
    revalidatePath("/admin/drivers", "page");

    return { success: true };
}