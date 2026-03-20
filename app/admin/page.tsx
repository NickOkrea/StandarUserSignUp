"use client"

import { Info } from "lucide-react"

export default function PanelPage() {
    return (
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
            <img src="/CF-MOTO-TEHUACAN.svg" alt="CF Moto Tehuacan Logo" />
            
            <h1 className="text-3xl font-bold">Demo Panel Administrativo</h1>
            <div className="flex items-start justify-center gap-2 text-justify max-w-4xl">
                <Info/>
                <span className="">Aviso: Esta versión es únicamente demostrativa y consiste en una maqueta del sistema con fines ilustrativos. 
                    Las funcionalidades aún no están implementadas, ya que los procesos internos del sistema todavía no han sido definidos. 
                    Estos podrían cambiar en la versión final del producto.
                </span>
            </div>
        </div>
    )
}