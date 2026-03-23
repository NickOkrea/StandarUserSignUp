
import AddNewMotorcycle from "./components/AddNewMotorcycle"
import MotorcycleTable from "./components/table-motorcycle"

export default function MotorcyclesPage(){
    return (
        <div className="w-full min-h-screen flex flex-col gap-4 items-center p-4 bg-transparent">
            <div className="w-full flex justify-end">
                <AddNewMotorcycle/>
            </div>
            <div className="w-full">
                <MotorcycleTable />
            </div>
        </div>
    )
}