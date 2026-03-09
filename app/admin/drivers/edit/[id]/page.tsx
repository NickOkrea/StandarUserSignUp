import DriverForm from "../../components/driver-form";
import { getDriverById } from "../../services/GetDriverById";

interface EditDriverPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditDriverPage({ params }: EditDriverPageProps) {

    const { id } = await params;
    const driver = await getDriverById(id);

    return (
        <div className="p-3">
            <div className="flex items-center mb-6">
                <h1 className="text-3xl font-bold">Editar Conductor</h1>
            </div>
            <DriverForm driver={driver}/>
        </div>
    )
}