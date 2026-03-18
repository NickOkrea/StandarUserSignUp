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





export default function WorkshopPage(){
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
                                    <Card className="p-3 flex flex-row justify-end">   
                                        <Field className="w-full lg:w-1/3">
                                            <Input placeholder="No folio automatico" readOnly/>
                                        </Field>   
                                    </Card>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Cliente</Badge>
                                    <Card className="p-3 flex flex-col gap-2 lg:flex-row">
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
                                    <Card className="p-3 flex flex-col gap-2 lg:flex-row">
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

                                        <Card className="p-3 col-span-3 lg:col-span-1">
                                            <Field orientation="horizontal">
                                                <FieldLabel>Espejos</FieldLabel>

                                                <RadioGroup className="flex justify-evenly">
                                                    <div className="flex items-center gap-2">
                                                        <Label>Si</Label>
                                                        <RadioGroupItem value="si"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>No</Label>
                                                        <RadioGroupItem value="no"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>Dañado</Label>
                                                        <RadioGroupItem value="dañado"/>
                                                    </div>
                                                </RadioGroup>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Stop trasero</FieldLabel>

                                                <RadioGroup className="flex justify-evenly">
                                                    <div className="flex items-center gap-2">
                                                        <Label>Si</Label>
                                                        <RadioGroupItem value="si"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>No</Label>
                                                        <RadioGroupItem value="no"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>Dañado</Label>
                                                        <RadioGroupItem value="dañado"/>
                                                    </div>
                                                </RadioGroup>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Cubiertas</FieldLabel>

                                                <RadioGroup className="flex justify-evenly">
                                                    <div className="flex items-center gap-2">
                                                        <Label>Si</Label>
                                                        <RadioGroupItem value="si"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>No</Label>
                                                        <RadioGroupItem value="no"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>Dañado</Label>
                                                        <RadioGroupItem value="dañado"/>
                                                    </div>
                                                </RadioGroup>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Tacometros</FieldLabel>

                                                <RadioGroup className="flex justify-evenly">
                                                    <div className="flex items-center gap-2">
                                                        <Label>Si</Label>
                                                        <RadioGroupItem value="si"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>No</Label>   
                                                        <RadioGroupItem value="no"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>Dañado</Label>
                                                        <RadioGroupItem value="dañado"/>
                                                    </div>
                                                </RadioGroup>
                                                
                                            </Field>

                                            <Field orientation="horizontal">
                                                <FieldLabel>Claxon</FieldLabel>

                                                <RadioGroup className="flex justify-evenly">
                                                    <div className="flex items-center gap-2">
                                                        <Label>Si</Label>
                                                        <RadioGroupItem value="si"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>No</Label>
                                                        <RadioGroupItem value="no"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>Dañado</Label>
                                                        <RadioGroupItem value="dañado"/>
                                                    </div>
                                                </RadioGroup>
                                                
                                            </Field>

                                        </Card>

                                        <Card className="p-3 col-span-3 lg:col-span-1 gap-3">
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

                                        <Card className="p-3 col-span-3 lg:col-span-1 gap-3">

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
                                        <Card className="p-3">
                                            <Field>
                                                <FieldLabel>Nivel de gasolina del tanque</FieldLabel>
                                                <RadioGroup className="flex justify-evenly">
                                                    <div className="flex items-center gap-2">
                                                        <Label>Vacio</Label>
                                                        <RadioGroupItem value="vacio"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>1/4</Label>
                                                        <RadioGroupItem value="1/4"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>1/2</Label>
                                                        <RadioGroupItem value="1/2"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>3/4</Label>
                                                        <RadioGroupItem value="3/4"/>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label>Lleno</Label>
                                                        <RadioGroupItem value="lleno"/>
                                                    </div>
                                                </RadioGroup>
                                            </Field>
                                        </Card>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Observaciones</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="p-3">
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
                                        <Card className="p-3">
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
                                        <Card className="p-3">
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
                                        <Card className="p-3">
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
                                        <Card className="p-3 flex flex-col lg:flex-row">
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
                                        <Card className="p-3 flex flex-col lg:flex-row">
                                            <Field>
                                                <FieldLabel>Firma prestador servicio</FieldLabel>
                                                <Input placeholder="firma del prestador de servicio"></Input>
                                            </Field>
                                            <Field>
                                                <FieldLabel>Firma cliente</FieldLabel>
                                                <Input placeholder="firma del cliente"></Input>
                                            </Field>
                                        </Card>
                                    </div>
                                </div> 
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="status">
                        <div className="flex items-center justify-center p-10 w-full">
                            <form>
                                <dl className="grid grid-cols-1 gap-10 lg:grid-cols-4">
                                    <div className="p-[1.5px] scale-105 rounded-xl bg-gradient-to-l from-green-800 to-transparent">
                                        <Card className="p-6 relative bg-zinc-900/85 backdrop-blur-2xl border border-zinc-800/50">
                                            <dt className="text-sm font-medium text-muted-foreground">Recepción de moto</dt>
                                            <dd className="text-2xl font-semibold text-foreground">Moto recibida</dd>
                                            <div className="mt-6 flex justify-center">
                                            <Button>Enviar a reparación</Button>
                                            </div>
                                        </Card>
                                    </div>
                                    
                                    <div className="p-[1.5px] scale-105 rounded-xl bg-gradient-to-r from-red-900 to-transparent">
                                        <Card className="p-6 relative bg-zinc-900/85 backdrop-blur-2xl border border-zinc-800/50">
                                            <dt className="text-sm font-medium text-muted-foreground">Proceso de reparación</dt>
                                            <dd className="tabular-nums tabular-nums text-2xl font-semibold text-foreground">En reparación</dd>
                                            <div className="group relative mt-6 flex items-center justify-center rounded">
                                                <div className="flex items-center">
                                                    <Button>Marcar como lista</Button>
                                                </div>
                                            </div>    
                                        </Card>
                                    </div>

                                    <div className="p-[1.5px] rounded-xl bg-gradient-to-r from-red-900 to-transparent">
                                        <Card className="p-6 relative bg-zinc-900/85 backdrop-blur-2xl border border-zinc-800/50">
                                            <dt className="text-sm font-medium text-muted-foreground">Lista para entrega</dt>
                                            <dd className="tabular-nums tabular-nums text-2xl font-semibold text-foreground">Por entregar</dd>
                                            <div className="group relative mt-6 flex items-center justify-center rounded">
                                                <div className="flex items-center">
                                                    <Button>Confirmar entrega</Button>
                                                </div>
                                            </div>    
                                        </Card>
                                    </div>

                                    <div className="p-[1.5px] rounded-xl bg-gradient-to-r from-red-900 to-transparent">
                                        <Card className="p-6 relative h-full bg-zinc-900/85 backdrop-blur-2xl border border-zinc-800/50">
                                            <dt className="text-sm font-medium text-muted-foreground">Entregada finalizada</dt>
                                            <dd className="tabular-nums tabular-nums text-2xl font-semibold text-foreground">Moto entregada</dd>
                                        </Card>
                                    </div>

                                </dl>
                            </form>
                        </div>

                    </TabsContent>

                    <TabsContent value="end-delivery">
                        <form>
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <Badge variant="secondary">Finalizar entrega</Badge>
                                    <div className="grid grid-cols-1 gap-2">
                                        <Card className="p-3 flex flex-col lg:flex-row">
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