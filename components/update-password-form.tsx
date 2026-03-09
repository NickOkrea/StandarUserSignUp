"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

export default function UpdatePasswordForm() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            return
        }

        setIsLoading(true)
        const supabase = createClient()

        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
            setError(error.message)
            setIsLoading(false)
            return
        }

        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("rol")
                .eq("id", user.id)
                .single()

            if (profile?.rol === "administrador") {
                router.push("/admin")
                return
            } else if (profile?.rol === "chofer") {
                router.push("/driver")
                return
            }
        }

        router.push("/login")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Nueva contraseña</CardTitle>
                <CardDescription>
                    Ingresa tu nueva contraseña para acceder a tu cuenta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Nueva contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Actualizando..." : "Actualizar contraseña"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}