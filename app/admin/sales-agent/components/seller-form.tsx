import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

export default function SellerForm(){
    return (
        <Card>
            <CardContent className="flex flex-col p-2 gap-4">
                <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-2xl">
                    <CardTitle className="px-5">
                        <FieldDescription className="flex gap-2 items-center">
                            <AlertCircle className="h-4 w-4"/>
                            Formulario para editar un vendedor (en construcción)
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
                                    readOnly>
                                </Input>
                            </Field>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-black/50 backdrop-blur-2xl">
                    <CardContent>
                        <form action="">
                            <div className="flex flex-col gap-3 lg:flex-row">
                            <Field>
                                <FieldLabel>Nombre</FieldLabel>
                                <Input
                                    type="text"
                                    placeholder="Nombre del vendedor"
                                /> 
                            </Field>
                            <Field>
                                <FieldLabel>Teléfono</FieldLabel>
                                <Input
                                    type="tel"
                                    placeholder="Teléfono del vendedor"
                                />
                            </Field>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button>
                            Guardar cambios
                        </Button>
                    </CardFooter>
                </Card>

            </CardContent>
        </Card>

    )
}