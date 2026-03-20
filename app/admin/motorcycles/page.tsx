import AddNewMotorcycle from "./components/AddNewMotorcycle"

export default function MotorcyclesPage(){
    return (
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
            <AddNewMotorcycle/>
            <p>Motorcycles Page</p>
        </div>
    )
}