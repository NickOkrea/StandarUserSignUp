import DataTableDrivers from "./components/data-table-drivers";
import { getDrivers } from "./services/GetDrivers";
import { getCurrentUser, getCurrentProfile } from "@/lib/services/auth";

export default async function DriversPage() {
    // ✅ Obtener datos una sola vez (no dentro del servicio)
    const { data: { user } } = await getCurrentUser();
    
    if (!user) return <div>No autorizado</div>;
    
    const { data: profile } = await getCurrentProfile(user.id);
    const agencyId = profile?.agency_id || '';
    
    const drivers = await getDrivers(agencyId);

    return (
        <div className="p-3">
            <div className="flex items-center mb-6">
                <h1 className="text-3xl font-bold">Mecánicos</h1>
            </div>
            <DataTableDrivers drivers={drivers}/>
        </div>
    )
}