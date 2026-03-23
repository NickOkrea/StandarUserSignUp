"use client"

import { Info } from "lucide-react"

export default function PanelPage() {
    return (
        <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
            <img src="/CF-MOTO-TEHUACAN.svg" alt="CF Moto Tehuacan Logo" />
            
            <h1 className="text-3xl font-bold">Demo Panel Administrativo</h1>
            <div className="flex items-start justify-center gap-2 text-justify max-w-4xl">
                <Info/>
                <span>
                    Aviso: Esta es una versión demostrativa del sistema. Las funcionalidades no están implementadas, ya que los procesos internos aún están en definición y pueden cambiar en la versión final.
                </span>
            </div>
        </div>
    )
}