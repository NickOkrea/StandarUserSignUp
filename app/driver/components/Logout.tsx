"use client";

import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";



export function Logout(){

    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    }
    return (
        <div className="flex flex-row gap-2" onClick={handleLogout}>
            <LogOut className="h-6 w-6" />
             Logout
        </div>
    )
}