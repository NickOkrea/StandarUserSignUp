'use client'

import { Profile } from "@/lib/models/Profile";
import TabsMultiUser from "./tabs-multi-user";
import { useEffect, useState } from "react";

interface DataTableUsersProps{
    profiles: Profile[]
}

export default function DataTableUsers({profiles}: DataTableUsersProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <TabsMultiUser profiles={profiles} />
        </>        
    )
}