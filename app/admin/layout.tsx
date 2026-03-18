import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { getAgencies } from "@/lib/services/agency";
import { getCurrentUser, getCurrentProfile } from "@/lib/services/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const [agencies, { data: { user } }] = await Promise.all([
        getAgencies(),
        getCurrentUser()
    ]);

    // Verificar autenticación y rol
    if (!user) {
        redirect('/auth/login');
    }

    const { data: profile } = await getCurrentProfile(user.id);
    
    // Solo administradores pueden acceder
    if (profile?.rol !== 'administrador') {
        if (profile?.rol === 'vendedor') {
            redirect('/sales');
        } else if (profile?.rol === 'chofer') {
            redirect('/driver');
        } else {
            redirect('/auth/login');
        }
    }

    let currentAgencyId = "";
    if (profile?.agency_id) {
        currentAgencyId = profile.agency_id;
    }

    return (
        <>
            <SidebarProvider>
                <div className="relative flex h-screen w-full">
                    <AppSidebar agencies={agencies} currentAgencyId={currentAgencyId} />
                    <SidebarInset>
                        <header className="flex h-16  shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-4"
                                />
                                <h1 className="text-lg font-semibold">Panel Administrativo</h1>
                            </div>

                            
                            <ThemeSwitcher />

                            
                        </header>
                            {children}
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </>
    )
}