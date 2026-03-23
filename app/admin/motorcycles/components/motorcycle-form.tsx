import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MotorcycleForm() {
    return (
        <Card>
            <CardContent>
                <form>
                    <Card className="flex flex-col gap-6 bg-white/80 dark:bg-black/50 backdrop-blur-2xl p-4 rounded-2xl">
                        <Field>
                            <FieldLabel>
                                Categoría
                                <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona la categoría de la motocicleta" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="deportiva">Deportiva</SelectItem>
                                    <SelectItem value="naked">Naked</SelectItem>
                                    <SelectItem value="scooter">Scooter</SelectItem>
                                    <SelectItem value="custom">Custom</SelectItem>
                                    <SelectItem value="enduro">Enduro</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <div className="flex flex-col gap-3 lg:flex-row">
                        <Field>
                            <FieldLabel>
                                Marca
                                <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Input
                                type="text"
                                placeholder="Marca de la motocicleta"
                            >
                            </Input>
                        </Field>
                        <Field>
                            <FieldLabel>
                                Modelo
                                <span className="text-red-500">*</span>
                            </FieldLabel>
                            <Input
                                type="text"
                                placeholder="Modelo de la motocicleta"
                            >
                            </Input>
                        </Field>
                        </div>
                        <div className="flex flex-col gap-3 lg:flex-row">
                            <Field>
                                <FieldLabel>
                                    Precio
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Precio de la motocicleta"
                                >
                                </Input>
                            </Field>
                            <Field>
                                <FieldLabel>
                                    Descuento             
                                </FieldLabel>
                                <Select defaultValue="0">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona el descuento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">0%</SelectItem>
                                        <SelectItem value="5">2%</SelectItem>
                                        <SelectItem value="10">3%</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                    </Card>
                </form>
            </CardContent>
            <CardFooter>
                <Button>
                    Guardar motocicleta
                </Button>
            </CardFooter>
        </Card>
    )
}