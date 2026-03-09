import { Driver } from "../models/Driver";
import TableComponent from "./table-component";

interface DataTableDriversProps {
    drivers: Driver[]
}


export default function DataTableDrivers({ drivers }: DataTableDriversProps) {



    return (
        <div>
            <TableComponent drivers={drivers}/>
        </div>
    )
}