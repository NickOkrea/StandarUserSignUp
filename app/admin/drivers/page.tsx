import DataTableDrivers from "./components/data-table-drivers";
import { getDrivers } from "./services/GetDrivers";

export default async function DriversPage() {

    const drivers = await getDrivers();


    return (
        <div className="p-3">
            <div className="flex items-center mb-6">
                <h1 className="text-3xl font-bold">Conductores</h1>
            </div>
            <DataTableDrivers drivers={drivers}/>
        </div>
    )
}