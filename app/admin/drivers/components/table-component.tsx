"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit3 } from "lucide-react";
import { Driver } from "../models/Driver";
import Link from "next/link";

interface TableComponentProps{
    drivers: Driver[]
}

export default function TableComponent({ drivers }: TableComponentProps) {

    return (
        
        <Card>
            <CardContent>
                <Table>
                    <TableHeader className="bg-muted sticky top-0 z-10">
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead/>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {drivers.length === 0 ? (
                            <TableRow>
                                <TableCell>
                                    No hay conductores disponibles
                                </TableCell>
                            </TableRow>
                        ) : ( 
                        drivers.map((driver) => (
                                <TableRow key={driver.id}>
                                    <TableCell>
                                        <span>{driver.email}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span>{driver.name || "Sin nombre añadido"}</span>
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
                                                    <Link href={`/admin/drivers/edit/${driver.id}`}>
                                                    Editar conductor
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem variant="destructive">
                                                    Deshabilitar conductor
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