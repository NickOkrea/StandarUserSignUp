"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"
import { Login } from "@/lib/login/actions"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {


  const [state, formAction] = useActionState(Login, null)
  
  return (
    <form action={formAction} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Contraseña</FieldLabel>
            <a
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
              >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </Field>
              {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <Field>
          <Button type="submit">Iniciar sesión</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
