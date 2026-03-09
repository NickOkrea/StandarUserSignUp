import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableComponent from "./table-component";
import { Profile } from "@/lib/models/Profile";
import { Car } from "lucide-react";

interface TabsMultiUserProps{
    profiles: Profile[]
}

export default function TabsMultiUser({profiles}: TabsMultiUserProps) {

    const admins = profiles.filter(profile => profile.rol === 'administrador');
    const drivers = profiles.filter(profile => profile.rol === 'chofer');

    return (
        <div className="w-full flex justify-between flex-col lg:flex-row gap-2">
        <Tabs className="w-full" defaultValue='administrador'>
            <div className=" flex flex-col lg:flex-row justify-between gap-2 mb-4">
            <TabsList >
                <TabsTrigger value='administrador'>Administradores</TabsTrigger>
                <TabsTrigger value='chofer'>Conductores</TabsTrigger>
            </TabsList>
            <Input className="w-1/2 lg:w-1/4" placeholder="Buscar..." />
            </div>
            <TabsContent value='administrador'>
                <Card>
                    <CardContent>
                        <TableComponent profiles={admins}/>
                    </CardContent>
                </Card>       
            </TabsContent>
            <TabsContent value='chofer'>
                <Card>
                    <CardContent>
                        <TableComponent profiles={drivers}/>
                    </CardContent>
                </Card>
            </TabsContent>
            
        </Tabs>
        </div>
    )
}