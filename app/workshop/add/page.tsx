"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Signature from "@uiw/react-signature";
import { useRef } from "react";





export default function WorkshopPage(){


    const fuelOptions = [
        { value: "vacio", label: "Vacío", img: "/tanquevacio.png", selected: "bg-red-800" },
        { value: "1/4", label: "1/4", img: "/tanque1-4.png" },
        { value: "1/2", label: "1/2", img: "/tanque1-2.png" },
        { value: "3/4", label: "3/4", img: "/tanque3-4.png" },
        { value: "lleno", label: "Lleno", img: "/tanquelleno.png" },
    ];

    const $svg1 = useRef<any>(null);
    const handle1 = () => $svg1.current?.clear();

    const $svg2 = useRef<any>(null);
    const handle2 = () => $svg2.current?.clear();

    return (
        <div className="w-full h-screen flex flex-col gap-10 items-center p-3">
            <Card className="w-full">
                <Tabs className="p-2" defaultValue="client">
                    <TabsList className="grid grid-cols-4 flex-2 lg:grid-cols-7">
                        <TabsTrigger value="client">Cliente</TabsTrigger>
                        <TabsTrigger value="motorcycle-condition">Condiciones</TabsTrigger>
                        <TabsTrigger value="parts">Piezas</TabsTrigger>
                        <TabsTrigger value="approval">Aprobación</TabsTrigger>
                        <TabsTrigger value="status">Estados</TabsTrigger>
                        <TabsTrigger className="col-span-2" value="end-delivery">Finaliza entrega</TabsTrigger>
                    </TabsList>

                      

                    <div className="max-h-[90vh] overflow-y-scroll">
                    <TabsContent value="client">
                        <form action="">

                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Folio</Badge>
                                    <Card className="bg-white/50 dark:bg-black/50 p-3 flex flex-row justify-end">   
                                        <Field className="w-full lg:w-1/3">
                                            <Input placeholder="No folio automatico" readOnly/>
                                        </Field>   
                                    </Card>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Cliente</Badge>
                                    <Card className="bg-white/50 dark:bg-black/50 p-3 flex flex-col gap-2 lg:flex-row">
                                        <Field>
                                            <FieldLabel>Nombre</FieldLabel>
                                            <Input placeholder="nombre del cliente"></Input>
                                        </Field>
                                        <Field>
                                            <FieldLabel>Telefono</FieldLabel>
                                            <Input placeholder="telefono del cliente"></Input>
                                        </Field> 
                                    </Card>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Moto</Badge>
                                    <Card className="bg-white/50 dark:bg-black/50 p-3 flex flex-col gap-2 lg:flex-row">
                                        <Field>
                                            <FieldLabel>Color</FieldLabel>
                                            <Input placeholder="color de la moto"></Input>
                                        </Field>
                                        <Field>
                                            <FieldLabel>Serie</FieldLabel>
                                            <Input placeholder="numero de serie"></Input>
                                        </Field>
                                        <Field>
                                            <FieldLabel>Motor</FieldLabel>
                                            <Input placeholder="numero de motor"></Input>
                                        </Field>
                                    </Card>
                                </div>

                            </div>  
                        </form>
                    </TabsContent>
                    <TabsContent value="motorcycle-condition">
                        <form action="">

                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Inventario</Badge>
                                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">

                                        <Card className="bg-white/50 dark:bg-black/50 p-3 col-span-3 lg:col-span-1 gap-3">
                                            <Field orientation="horizontal">
                                                <FieldLabel>Espejos</FieldLabel>

                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>  

                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Stop trasero</FieldLabel>

                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Cubiertas</FieldLabel>

                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Tacometros</FieldLabel>

                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Claxon</FieldLabel>

                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                        </Card>

                                        <Card className="bg-white/50 dark:bg-black/50 p-3 col-span-3 lg:col-span-1 gap-3">
                                            <Field orientation="horizontal">
                                                <FieldLabel>Asientos</FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Direccionales</FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Tapon de gasolina</FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Pedales</FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Llaves</FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>
                                        </Card>

                                        <Card className="bg-white/50 dark:bg-black/50 p-3 col-span-3 lg:col-span-1 gap-3">

                                            <Field orientation="horizontal" className="justify-between">
                                                <FieldLabel>Faro delantero</FieldLabel>
                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal" className="justify-between">
                                                <FieldLabel>Tapon de aceite</FieldLabel>

                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal" className="justify-between">
                                                <FieldLabel>Parabrisas</FieldLabel>

                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>

                                            <Field orientation="horizontal" className="justify-between">
                                                <FieldLabel>Bateria</FieldLabel>

                                                <Select>
                                                    <SelectTrigger className="w-[140px]">
                                                        <SelectValue placeholder="Seleccionar"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="si">Si</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                        <SelectItem value="dañado">Dañado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                
                                            </Field>
                                            
                                        </Card>

                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">     
                                    <Badge variant="secondary">Gasolina</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="bg-white/50 dark:bg-black/50 p-3">
                                            <Field>
                                                <FieldLabel>Nivel de gasolina del tanque</FieldLabel>
            
                                                <RadioGroup className="grid grid-cols-5">
                                                    {fuelOptions.map((option) => (
                                                        <Label
                                                            key={option.value}
                                                            className="cursor-pointer flex justify-center"
                                                        >
                                                            <RadioGroupItem
                                                                value={option.value}
                                                                className="peer invisible absolute"
                                                            />
                                                            <div className="flex flex-col items-center justify-center w-full h-24 lg:w-24 border rounded-md 
                                                                            peer-data-[state=checked]:bg-primary/20">
                                                                <span>{option.label}</span>
                                                                <img src={option.img} alt={option.label} className="w-14 h-14 object-contain" />
                                                            </div>
                                                        </Label>
                                                    ))}
                                                    </RadioGroup>
                                            </Field>
                                        </Card>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Observaciones</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="bg-white/50 dark:bg-black/50 p-3">
                                            <Field>
                                                <FieldLabel>Observaciones</FieldLabel>
                                                <Input placeholder="observaciones estado de la moto"></Input>
                                            </Field>
                                        </Card>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Diagnostico</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="bg-white/50 dark:bg-black/50 p-3">
                                            <Field>
                                                <FieldLabel>Reparación Solicitado</FieldLabel>
                                                <Textarea placeholder="reparacion solicitada por el cliente"></Textarea>
                                            </Field>
                                        </Card>
                                    </div>
                                </div>

                            </div>

                        </form>
                    </TabsContent>
                    <TabsContent value="parts">
                        <form>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Piezas</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="bg-white/50 dark:bg-black/50 p-3">
                                            <Field>
                                                <FieldLabel>Piezas solicitadas</FieldLabel>
                                                <Textarea placeholder="piezas solicitadas para la reparación"></Textarea>
                                            </Field>
                                        </Card>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Autorización</Badge>
                                    <div className="flex gap-2 justify-center">
                                        <Field className="flex flex-row justify-center w-auto">
                                            <FieldLabel>¿El cliente autorizo?</FieldLabel>
                                            <Switch id="autorizacion"/>
                                        </Field>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Revisión</Badge>
                                    <div className="flex flex-col gap-2">
                                        <Card className="bg-white/50 dark:bg-black/50 p-3">
                                            <Field>
                                                <FieldLabel>Costo de la revisión</FieldLabel>
                                                <Input placeholder="costo revisión"></Input>
                                            </Field>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="approval">
                        <form>
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Fechas</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="bg-white/50 dark:bg-black/50 p-3 flex flex-col lg:flex-row">
                                            <Field className="lg:w-1/2">
                                                <FieldLabel>Fecha recepcion de moto</FieldLabel>
                                                <Input placeholder="fecha de recepcion de moto automatica"></Input>
                                            </Field>
                                        </Card>
                                    </div>
                                </div> 

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Aprobación</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="bg-white/50 dark:bg-black/50 p-3 flex flex-col lg:flex-row">
                                            <Field>
                                                <FieldLabel>Firma prestador servicio</FieldLabel>
                                                <Signature
                                                    ref={$svg1}
                                                    style={{
                                                        width: '100%',
                                                        height: '200px',
                                                        border: '1px solid #000',
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f9fafb',
                                                    }}
                                                />
                                                <Button type="button"  variant="outline" onClick={handle1} className="mt-2">
                                                    Limpiar firma
                                                </Button>
                                            </Field>
                                            <Field>
                                                <FieldLabel>Firma cliente</FieldLabel>
                                                <Signature
                                                    ref={$svg2}
                                                    style={{
                                                        width: '100%',
                                                        height: '200px',
                                                        border: '1px solid #000',
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f9fafb',
                                                    }}
                                                />
                                                <Button type="button"  variant="outline" onClick={handle2} className="mt-2">
                                                    Limpiar firma
                                                </Button>
                                            </Field>
                                        </Card>
                                    </div>
                                </div> 
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="status">
                        <div className="flex items-center justify-center w-full">
                            <form className="w-full">
                                <Card className="bg-white/50 dark:bg-black/50 p-5">
                                <dl className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                                    <div className="p-[1.5px] scale-105 rounded-xl bg-gradient-to-l dark:from-green-800 from-green-300 to-transparent">
                                        <Card className="p-6 relative dark:bg-zinc-900/85 bg-zinc-900/5 backdrop-blur-2xl border dark:border-zinc-800/50 border-zinc-800/5">
                                            <dt className="text-sm font-medium text-muted-foreground">Recepción de moto</dt>
                                            <dd className="text-2xl font-semibold text-foreground">Moto recibida</dd>
                                            <div className="mt-6 flex justify-center">
                                            <Button>Enviar a reparación</Button>
                                            </div>
                                        </Card>
                                    </div>
                                    
                                    <div className="p-[1.5px] rounded-xl bg-gradient-to-r dark:from-red-900 from-red-300 to-transparent">
                                        <Card className="p-6 relative dark:bg-zinc-900/85 bg-zinc-900/5 backdrop-blur-2xl border dark:border-zinc-800/50 border-zinc-800/5">
                                            <dt className="text-sm font-medium text-muted-foreground">Proceso de reparación</dt>
                                            <dd className="tabular-nums tabular-nums text-2xl font-semibold text-foreground">En reparación</dd>
                                            <div className="group relative mt-6 flex items-center justify-center rounded">
                                                <div className="flex items-center">
                                                    <Button>Marcar como lista</Button>
                                                </div>
                                            </div>    
                                        </Card>
                                    </div>

                                    <div className="p-[1.5px] rounded-xl bg-gradient-to-r dark:from-red-900 from-red-300 to-transparent">
                                        <Card className="p-6 relative h-full dark:bg-zinc-900/85 bg-zinc-900/5 backdrop-blur-2xl border dark:border-zinc-800/50 border-zinc-800/5">
                                            <dt className="text-sm font-medium text-muted-foreground">Lista para entrega</dt>
                                            <dd className="tabular-nums tabular-nums text-2xl font-semibold text-foreground">Por entregar</dd>
                                            <div className="group relative mt-6 flex items-center justify-center rounded">
                                                <div className="flex items-center">
                                                    <Button>Confirmar entrega</Button>
                                                </div>
                                            </div>    
                                        </Card>
                                    </div>

                                    <div className="p-[1.5px] rounded-xl bg-gradient-to-r dark:from-red-900 from-red-300 to-transparent">
                                        <Card className="p-6 relative h-full dark:bg-zinc-900/85 bg-zinc-900/5 backdrop-blur-2xl border dark:border-zinc-800/50 border-zinc-800/5">
                                            <dt className="text-sm font-medium text-muted-foreground">Entregada finalizada</dt>
                                            <dd className="tabular-nums tabular-nums text-2xl font-semibold text-foreground">Moto entregada</dd>
                                        </Card>
                                    </div>
                                </dl>
                                </Card>
                            </form>
                        </div>

                    </TabsContent>

                    <TabsContent value="end-delivery">
                        <form>
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Finalizar entrega</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="bg-white/50 dark:bg-black/50 p-3 flex flex-col lg:flex-row">
                                            <Field>
                                                <FieldLabel>Recibo cliente</FieldLabel>
                                                <Input placeholder="recibo del cliente"></Input>
                                            </Field>
                                            <Field>
                                                <FieldLabel>Fecha entrega de moto</FieldLabel>
                                                <Input placeholder="fecha entrega de moto automatico al momento de guardar"></Input>
                                            </Field>
                                        </Card>
                                    </div>
                                    
                                </div>

                            </div>
                        </form>
                    </TabsContent>

                    </div>
                </Tabs>

            </Card>
        </div>
    )
}