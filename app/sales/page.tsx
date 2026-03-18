import { Button } from "@/components/ui/button";
import { getCurrentUser, getCurrentProfile } from "@/lib/services/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logout } from "../workshop/components/Logout";

export default async function SalesPanel(){
    const { data: { user } } = await getCurrentUser();

    // Verificar autenticación y rol
    if (!user) {
        redirect('/auth/login');
    }

    const { data: profile } = await getCurrentProfile(user.id);
    
    // Solo vendedores pueden acceder
    if (profile?.rol !== 'vendedor') {
        if (profile?.rol === 'administrador') {
            redirect('/admin');
        } else if (profile?.rol === 'chofer') {
            redirect('/driver');
        } else {
            redirect('/auth/login');
        }
    }

    return (
        <div className="w-full h-screen flex flex-col gap-10 items-center justify-between p-4">
            Panel de ventas
            <div className="">
                <Link href="/sales/add">
                    <Button>
                        + Agregar venta
                    </Button>
                </Link>
            </div>
            <div className="flex">
                <Logout/>
            </div>
        </div>
    )
}