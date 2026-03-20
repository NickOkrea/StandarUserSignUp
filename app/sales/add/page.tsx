'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signature from "@uiw/react-signature";
import { useRef } from "react";

export default function SalePage(){

    const $svg = useRef<any>(null);
    const handle = () => $svg.current?.clear();
    

    return (
        <div className="w-full h-screen flex flex-col items-center p-3">
            <Card className="w-full">
                <form action="">
                    <div className="flex flex-col gap-4 p-2">

                        <div className="flex flex-col gap-2">
                            <Badge>General</Badge>
                            <Card className="p-3 flex items-end">
                                    <div className="w-3/4 flex flex-col gap-2 lg:flex-row lg:w-1/2">
                                        <Field>
                                            <FieldLabel>Folio de venta</FieldLabel>
                                            <Input readOnly placeholder="No folio automatico"></Input>
                                        </Field>
                                        <Field>
                                            <FieldLabel>Fecha de venta</FieldLabel>
                                            <Input readOnly placeholder="Fecha de venta"></Input>
                                        </Field>
                                    </div>
                            </Card>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Badge>Cliente</Badge>
                            <Card className="p-3 flex flex-col gap-2 lg:flex-row">
                                <Field>
                                    <FieldLabel>Nombre del cliente</FieldLabel>
                                    <Input placeholder="Nombre Cliente"></Input>
                                </Field>
                                <Field>
                                    <FieldLabel>Telefono del cliente</FieldLabel>
                                    <Input placeholder="Telefono Cliente"></Input>
                                </Field>    
                            </Card>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Badge>Producto</Badge>
                            <Card className="p-3 flex flex-col gap-2">
                                <div className="flex flex-col gap-2 justify-evenly lg:flex-row">
                                    <Field> 
                                        <FieldLabel>Motocicleta</FieldLabel>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una motocicleta" />    
                                            </SelectTrigger>
                                        </Select>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Precio</FieldLabel>
                                        <Input readOnly placeholder="Precio"></Input>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Descuento</FieldLabel>
                                        <Input readOnly placeholder="Descuento"></Input>
                                    </Field>
                                </div>
                                <div className="flex justify-end">
                                    <Card className="w-3/4 flex flex-row justify-center lg:w-1/5">
                                        <div className="flex flex-col items-end">
                                            <h3>Subtotal:</h3>
                                            <h3>IVA:</h3>
                                            <h2>Total:</h2>
                                        </div>
                                        <div>
                                            <h3>11</h3>
                                            <h3>23</h3>
                                            <h2>34</h2>
                                        </div>
                                        
                                    </Card>
                                </div>
                            </Card>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Badge>Método de pago</Badge>
                            <Card className="flex flex-col gap-2">

                                <Tabs className="p-2">
                                    <TabsList className="grid grid-cols-2 flex-2 lg:grid-cols-4 w-full ">
                                        <TabsTrigger value="contado">Contado</TabsTrigger>
                                        <TabsTrigger value="apartado">Apartado</TabsTrigger>
                                        <TabsTrigger value="credito">Credito</TabsTrigger>
                                        <TabsTrigger value="financiado">Financiado</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="contado">
                                        <form action="">
                                                <div className="p-3 flex flex-col gap-2">
                                                    <Badge>Tipo de pago</Badge>
                                                    <div className="flex flex-col gap-2 lg:flex-row">
                                                        <Field className="w-1/2">
                                                            <FieldLabel>Tipo de pago</FieldLabel>
                                                            <Select>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecciona un tipo de pago" />    
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="efectivo">Efectivo</SelectItem>
                                                                    <SelectItem value="transferencia">Transferencia</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </Field>
                                                    </div>
                                                    
                                                </div>
                                        </form>
                                    </TabsContent>
                                    <TabsContent value="apartado">
                                            <form action="">
                                                <div className="p-3 flex flex-col gap-2">
                                                    <Badge>Datos de apartado</Badge>
                                                    <div className="flex flex-col gap-2 lg:flex-row">
                                                        <Field>
                                                            <FieldLabel>Monto apartado</FieldLabel>
                                                            <Input placeholder="Monto apartado"></Input>
                                                        </Field>
                                                        <Field>
                                                            <FieldLabel>Fecha limite de liquidación</FieldLabel>
                                                            <Input type="date" placeholder="Fecha limite de liquidación"></Input>
                                                        </Field>
                                                    </div>
                                                </div>

                                            </form>
                                    </TabsContent>
                                    <TabsContent value="credito">
                                        <form action="">
                                                <div className="p-3 flex flex-col gap-2">
                                                    <Badge>Entidad financiera</Badge>
                                                    <div className="flex flex-col gap-2 lg:flex-row">
                                                        <Field className="w-1/2">
                                                            <FieldLabel>Banco</FieldLabel>
                                                            <Select>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecciona un banco" />    
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="hsbc">HSBC</SelectItem>
                                                                    <SelectItem value="mercado_pago">Mercado Pago</SelectItem>
                                                                    <SelectItem value="otro">Otro</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </Field>         
                                                    </div>
                                                </div>

                                        </form>
                                    </TabsContent>
                                    <TabsContent value="financiado">
                                            <form action="">
                                                <div className="p-3 flex flex-col gap-2">
                                                    <Badge>Financiera</Badge>
                                                    <div className="flex flex-col gap-2 lg:flex-row">
                                                        <Field>
                                                            <FieldLabel>Nombre de la financiera</FieldLabel>
                                                            <Select>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecciona una financiera" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="maxicash">Maxicash</SelectItem>
                                                                    <SelectItem value="galgo">Galgo</SelectItem>
                                                                    <SelectItem value="azteca">Azteca</SelectItem>
                                                                    <SelectItem value="santander">Santander</SelectItem>
                                                                    <SelectItem value="bbva">BBVA</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </Field>
                                                        <Field>
                                                            <FieldLabel>Importe de financiera</FieldLabel>
                                                            <Input placeholder="Ingresa el importe"></Input>
                                                        </Field>
                                                    </div>
                                                </div>

                                            </form>
                                    </TabsContent>
                                </Tabs>

                                {/* <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">

                                    <Card className="p-4 shadow-2xs">
                                        <CardContent className="p-0 flex items-center space-x-4">
                                            <div>
                                                <dt className="text-sm font-medium text-foreground">Contado</dt>
                                                <dd className="text-sm text-muted-foreground">
                                                    Pago completo
                                                </dd>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="p-4 shadow-2xs">
                                        <CardContent className="p-0 flex items-center space-x-4">
                                            <div>
                                                <dt className="text-sm font-medium text-foreground">Apartado</dt>
                                                <dd className="text-sm text-muted-foreground">
                                                    Pago parcial
                                                </dd>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="p-4 shadow-2xs">
                                        <CardContent className="p-0 flex items-center space-x-4">
                                            <div>
                                                <dt className="text-sm font-medium text-foreground">Credito</dt>
                                                <dd className="text-sm text-muted-foreground">
                                                    Pago con tarjeta de credito
                                                </dd>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="p-4 shadow-2xs">
                                        <CardContent className="p-0 flex items-center space-x-4">
                                            <div>
                                                <dt className="text-sm font-medium text-foreground">Financiado</dt>
                                                <dd className="text-sm text-muted-foreground">
                                                    Pago con financiamiento
                                                </dd>
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div> */}

                            </Card>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Badge>Comision</Badge>
                            <Card className="p-3 flex flex-col gap-2">
                                <div className="flex flex-col gap-2">
                                    <Field className="flex flex-col items-center">
                                        <FieldLabel className="self-start">Firma del asesor</FieldLabel>
                                        <Signature 
                                            ref={$svg}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                border: '1px solid #ccc',
                                                borderRadius: '8px',
                                                backgroundColor: '#f9fafb'
                                            }}
                                        />
                                        <div className="flex gap-2">
                                        <Button  type="button" onClick={handle}>Limpiar</Button>
                                        <Button  type="submit">Continuar</Button>
                                        </div>    
                                    </Field>
                                    
                                </div>

                            </Card>
                        </div>

                    </div>
                </form>
            </Card>
        </div>
    )
}