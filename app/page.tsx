"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import AuthHandler from "@/components/auth-handler"
import { createClient } from "@/lib/supabase/client"

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setUser(user)
        const { data: profile } = await supabase
          .from('profiles')
          .select('rol')
          .eq('id', user.id)
          .single()
        
        if (profile) {
          setUserRole(profile.rol)
        }
      }
      setLoading(false)
    }

    checkUser()
  }, [])

  const handleDashboardClick = () => {
    if (userRole === 'administrador') {
      router.push('/admin')
    } else if (userRole === 'chofer') {
      router.push('/workshop')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <>
      <AuthHandler />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Bienvenido
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Sistema de gestión de usuarios
            </p>
          </div>
          <div className="w-full">
            <img src="/CF-MOTO-TEHUACAN.svg" alt="" />
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            {!loading && user ? (
              <button
                onClick={handleDashboardClick}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[200px]"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={16}
                />
                Ir al Panel
              </button>
            ) : (
              <a
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                href="/auth/login"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={16}
                />
                Iniciar Sesión
              </a>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
