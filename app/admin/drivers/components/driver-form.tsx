"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";
import { Driver } from "../models/Driver";
import { useState, useTransition, useEffect } from "react";
import { updateDriver } from "../services/UpdateDriver";
import { useRouter } from "next/navigation";

interface DriverFormProps {
    driver: Driver | null;
}

export default function DriverForm({ driver }: DriverFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(driver?.name || "");
    const [phone, setPhone] = useState(driver?.phone?.toString() || "");
    const [error, setError] = useState<string | null>(null);

    console.log("Driver in form:", driver);
    console.log("Name state:", name);
    console.log("Phone state:", phone);

    // Sincronizar el estado cuando cambian los datos del driver
    useEffect(() => {
        console.log("useEffect triggered with driver:", driver);
        if (driver) {
            setName(driver.name || "");
            setPhone(driver.phone?.toString() || "");
        }
    }, [driver]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!driver?.id) {
            setError("ID de conductor no válido");
            return;
        }

        if (!name.trim()) {
            setError("El nombre es requerido");
            return;
        }

        if (!phone.trim()) {
            setError("El teléfono es requerido");
            return;
        }

        const phoneNumber = parseInt(phone);
        if (isNaN(phoneNumber)) {
            setError("El teléfono debe ser un número válido");
            return;
        }

        setError(null);

        startTransition(async () => {
            const result = await updateDriver(driver.id, name, phoneNumber);
            
            if (result.success) {
                // Refresca los datos de la página
                router.refresh();
                alert("Conductor actualizado exitosamente");
            } else {
                setError(result.error || "Error al actualizar conductor");
            }
        });
    };

    if (!driver) {
        return (
            <Card>
                <CardContent className="p-8 text-center">
                    <p>No se encontró el conductor</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent className="flex flex-col p-2 gap-4"> 
                <Card>
                    <CardTitle className="px-5">
                        <FieldDescription className="flex gap-2 items-center">
                            <AlertCircle className="h-4 w-4"/>
                            Campos de solo lectura.
                        </FieldDescription>
                    </CardTitle>
                    <CardContent>
                        <div className="flex gap-6">
                            <Field className="gap-2">
                                <FieldLabel>
                                    Email
                                </FieldLabel>
                                <Input
                                    type="email"
                                    placeholder="email"
                                    value={driver.email}
                                    readOnly
                                />
                            </Field>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                                        {error}
                                    </div>
                                )}
                                
                                <Field>
                                    <FieldLabel>Nombre</FieldLabel>
                                    <Input
                                        type="text"
                                        placeholder="Nombre del conductor"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isPending}
                                        required
                                    />
                                </Field>
                                
                                <Field>
                                    <FieldLabel>Teléfono</FieldLabel>
                                    <Input
                                        type="tel"
                                        placeholder="Teléfono del conductor"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        disabled={isPending}
                                        required
                                    />
                                </Field>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button 
                            onClick={handleSubmit}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                "Guardar cambios"
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </CardContent>
        </Card>
            
      
    )
}