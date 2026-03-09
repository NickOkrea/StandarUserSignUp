"use client"

import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(searchParams.get("error"))
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      // Por seguridad, NO verificamos si el email existe (previene enumeración de usuarios)
      // Supabase internamente solo enviará el correo si el email está registrado
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/api/auth/callback?type=recovery&next=/auth/update-password`,
      })
      
      // Siempre mostrar éxito, incluso si el email no existe (mejor práctica de seguridad)
      // Si el email no existe, Supabase simplemente no envía nada
      if (error) {
        // Solo mostrar error si hay un problema técnico real (no validación de email)
        throw error
      }
      
      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocurrió un error al enviar el correo")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Verifica tu correo</CardTitle>
            <CardDescription>
              Se han enviado instrucciones para restablecer la contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              
              <p className="text-sm text-muted-foreground font-medium">
                Asegúrate de abrir el correo desde el mismo navegador donde solicitaste el cambio.
              </p>
              <p className="text-sm text-muted-foreground">
                No recibiste el correo? Revisa tu carpeta de spam o{" "}
                <button
                  onClick={() => setSuccess(false)}
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  solicita uno nuevo
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Reestablece tu contraseña
            </CardTitle>
            <CardDescription>
              Escribe tu correo electrónico y te enviaremos un enlace para
              restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? "Enviando..."
                    : "Enviar link de restablecimiento"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Iniciar sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
