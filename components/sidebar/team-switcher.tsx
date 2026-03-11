"use client"

import * as React from "react"
import { ChevronsUpDown, Warehouse } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Agency } from "@/lib/services/agency"
import { switchAgencyAction } from "@/lib/services/agencyActions"

import { useRouter } from "next/navigation"

interface TeamSwitcherProps {
  agencies: Agency[];
  currentAgencyId: string;
}

export function TeamSwitcher({agencies, currentAgencyId}: TeamSwitcherProps) { 
  const { isMobile } = useSidebar()
  const router = useRouter()

  const initialAgency = agencies.find(a => a.id === currentAgencyId) || agencies[0];
  const [activeTeam, setActiveTeam] = React.useState(initialAgency)

  if (!agencies || agencies.length === 0 || !activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Warehouse className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">Agencia</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Agencias
                        </DropdownMenuLabel>
            {agencies.map((agency) => (
              <DropdownMenuItem
                key={agency.id}
                onClick={async () => {
                  setActiveTeam(agency);
                  try {
                    // ✅ Actualizar la agencia en BD
                    const res = await switchAgencyAction(agency.id);
                    if (res.success) {
                      // ✅ Refrescar para obtener los datos de la nueva agencia
                      router.refresh();
                    } else {
                      console.error("Error switching agency:", res.error);
                      // Revertir el cambio visual si falló
                      setActiveTeam(agencies.find(a => a.id === currentAgencyId) || agencies[0]);
                    }
                  } catch (error) {
                    console.error("Error al ejecutar action:", error);
                    setActiveTeam(agencies.find(a => a.id === currentAgencyId) || agencies[0]);
                  }
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Warehouse className="size-3.5 shrink-0" />
                </div>
                {agency.name}
                <span className="text-xs text-muted-foreground">Agencia</span>
              </DropdownMenuItem>
            ))}
            
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
