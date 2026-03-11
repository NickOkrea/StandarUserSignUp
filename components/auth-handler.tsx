"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

/**
 * Componente que maneja el flujo de autenticación
 * - Detecta invitaciones (type=invite)
 * - Detecta recuperación de contraseña (type=recovery)
 * - NO redirige automáticamente usuarios autenticados
 */
export default function AuthHandler() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      // Verificar si viene de una invitación o reset de contraseña
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const type = hashParams.get('type')
      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')

      // Si es una invitación o recuperación de contraseña
      if ((type === 'invite' || type === 'recovery') && accessToken && refreshToken) {
        const supabase = createClient()
        
        try {
          // Establecer la sesión con los tokens del hash
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })
          
          console.log(`✅ Sesión establecida para tipo: ${type}`)
          
          // Redirigir a update-password
          router.push('/auth/update-password')
        } catch (error) {
          console.error('❌ Error al establecer sesión:', error)
          router.push('/auth/login')
        }
        return
      }
    }

    handleAuth()
  }, [router])

  return null // Este componente no renderiza nada visible
}
