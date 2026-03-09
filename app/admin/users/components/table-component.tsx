import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Profile } from "@/lib/models/Profile";
import { MoreVertical } from "lucide-react";

interface TableComponentProps{
    profiles: Profile[]
}

export default function TableComponent({profiles}: TableComponentProps) {

    return (
        <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {profiles.length === 0 ? (
                    <TableRow>
                        <TableCell>
                            No hay perfiles con este rol
                        </TableCell>
                    </TableRow>

                ):(
                    profiles.map((profile) => (
                        <TableRow key={profile.id}>
                            <TableCell>
                                <span>{profile.email}</span>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex size-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            Cambiar rol
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                        </TableRow>

                    ))

                )}
            </TableBody>
        </Table>
    )
}