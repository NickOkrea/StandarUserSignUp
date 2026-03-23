import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit3 } from "lucide-react";
import Link from "next/dist/client/link";

export default function MotorcycleTable() {

    const motorcycles = [
        {
            id: 1,
            category: "Deportiva",
            brand: "CFMOTO",
            model: "YZF-R3",
            price: 55000
        },
        {
            id: 2,
            category: "Scooter",
            brand: "Bajaj",
            model: "XMAX 300",
            price: 27000
        },
        {
            id: 3,
            category: "Ciudad",
            brand: "Suzuki",
            model: "GSX-R1000",
            price: 55000
        },
        {
            id: 4,
            category: "Ultra",
            brand: "CFMOTO",
            model: "PSX 300",
            price: 27000
        }
    ]

    return (

        <Card>
            <CardContent>
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead/>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {motorcycles.length === 0 ? (
                            <TableRow>
                                <TableCell>
                                    No hay motocicletas disponibles
                                </TableCell>
                            </TableRow>
                        ) : ( 
                        motorcycles.map((motorcycle) => (
                                <TableRow key={motorcycle.id}>
                                    <TableCell>
                                        <span>{motorcycle.category}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{motorcycle.brand || "Sin marca añadida"}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{motorcycle.model || "Sin modelo añadido"}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{motorcycle.price || "Sin precio añadido"}</span>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button title="Acciones" variant="ghost" className="flex size-8">
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/motorcycles/edit/${motorcycle.id}`}>
                                                    Editar motocicleta
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem variant="destructive">
                                                    Deshabilitar motocicleta
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )} 
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        
    )
}