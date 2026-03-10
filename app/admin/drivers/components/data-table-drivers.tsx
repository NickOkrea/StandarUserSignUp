"use client"

import { useEffect, useState } from "react";
import { Driver } from "../models/Driver";
import TableComponent from "./table-component";

interface DataTableDriversProps {
    drivers: Driver[]
}

export default function DataTableDrivers({ drivers }: DataTableDriversProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <TableComponent drivers={drivers}/>
        </div>
    )
}