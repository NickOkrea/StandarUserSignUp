import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit3 } from "lucide-react";
import Link from "next/dist/client/link";

export default function SalesAgentTable() {
	const salesAgents = [
		{
			id: 1,
            name: "Juan Pérez",
            phone: "123-456-7890",
            email: "juan.perez@example.com",
		},
		{
			id: 2,
            name: "María López",
            phone: "987-654-3210",
            email: "maria.lopez@example.com",
		},
        {
			id: 3,
            name: "Carlos Sánchez",
            phone: "456-789-0123",
            email: "carlos.sanchez@example.com",
		},
		{
			id: 4,
            name: "Ana Gómez",
            phone: "321-654-0987",
            email: "ana.gomez@example.com",
		}
	];
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
                        {salesAgents.length === 0 ? (
                            <TableRow>
                                <TableCell>
                                    No hay agentes de ventas disponibles
                                </TableCell>
                            </TableRow>
                        ) : ( 
                        salesAgents.map((agent) => (
                                <TableRow key={agent.id}>
                                    <TableCell>
                                        <span>{agent.name}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{agent.phone || "Sin marca añadida"}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{agent.email || "Sin modelo añadido"}</span>
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
                                                    <Link href={`/admin/sales-agent/edit/`}>
                                                    Editar agente de ventas
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem variant="destructive">
                                                    Deshabilitar agente de ventas
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
		