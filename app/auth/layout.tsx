import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Autenticación",
  description: "Iniciar sesión o registrarse",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  )
}
