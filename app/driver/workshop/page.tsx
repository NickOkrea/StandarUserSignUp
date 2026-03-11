import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";




export default function WorkshopPage(){
    return (
        <div className="w-full h-screen flex flex-col gap-10 items-center p-3">
            <Card className="w-full">
                <Tabs className="p-2" defaultValue="client">
                    <TabsList className="grid grid-cols-4 flex-2 lg:grid-cols-5">
                        <TabsTrigger value="client">Cliente</TabsTrigger>
                        <TabsTrigger value="motorcycle-condition">Condiciones</TabsTrigger>
                        <TabsTrigger value="parts">Piezas</TabsTrigger>
                        <TabsTrigger value="diagnostic">Aprobación</TabsTrigger>
                        <TabsTrigger value="status">Estados</TabsTrigger>
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
                    </div>
                </Tabs>

            </Card>
        </div>
    )
}