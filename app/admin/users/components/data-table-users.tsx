import { Profile } from "@/lib/models/Profile";
import TabsMultiUser from "./tabs-multi-user";

interface DataTableUsersProps{
    profiles: Profile[]
}

export default function DataTableUsers({profiles}: DataTableUsersProps) {
    return (
        <>
            <TabsMultiUser profiles={profiles} />
        </>        
    )
}