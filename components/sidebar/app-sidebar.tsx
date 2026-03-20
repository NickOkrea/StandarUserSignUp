"use client"

import * as React from "react"
import {
  Handshake,
  Motorbike,
  Settings2,
  ShieldUser,
  UsersIcon,
  Wrench,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Agency } from "@/lib/services/agency"



// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  navMain: [
    {
      title: "Usuarios",
      url: "/admin/users",
      icon: ShieldUser,
    },
    {
      title: "Mecánicos",
      url: "/admin/drivers",
      icon: Wrench,
    },
    {
      title: "Vendedores",
      url: "/admin/sales-agent",
      icon: Handshake,
    },
    {
      title: "Motocicletas",
      url: "/admin/motorcycles",
      icon: Motorbike,

    }
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  agencies: Agency[];
  currentAgencyId?: string;
}


export function AppSidebar({ agencies, currentAgencyId, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher agencies={agencies} currentAgencyId={currentAgencyId || ""} />
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
