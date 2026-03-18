import { Button } from "@/components/ui/button";
import { Logout } from "./components/Logout";
import Link from "next/link";
import { getCurrentUser, getCurrentProfile } from "@/lib/services/auth";
import { redirect } from "next/navigation";

export default async function DriverPanel(){
    const { data: { user } } = await getCurrentUser();

    // Verificar autenticación y rol
    if (!user) {
        redirect('/auth/login');
    }

    const { data: profile } = await getCurrentProfile(user.id);
    
    // Solo choferes pueden acceder
    if (profile?.rol !== 'chofer') {
        if (profile?.rol === 'administrador') {
            redirect('/admin');
        } else if (profile?.rol === 'vendedor') {
            redirect('/sales');
        } else {
            redirect('/auth/login');
        }
    }

    return (
        <div className="w-full h-screen flex flex-col gap-10 items-center justify-between p-4">
            Panel de taller
            <div className="">
                <Link href="/workshop/add">
                    <Button>
                        + Agregar moto a taller
                    </Button>
                </Link>
            </div>
            <div className="flex">
            <Logout/>
            </div>
        </div>
    )
}