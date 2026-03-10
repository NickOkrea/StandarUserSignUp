"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  IdCardLanyard,
  Settings2,
  SquareTerminal,
  User,
  Users,
  Users2,
  Users2Icon,
  UsersIcon,
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
      icon: UsersIcon,
    },
    {
      title: "Conductores",
      url: "/admin/drivers",
      icon: IdCardLanyard,
    },
    {
      title: "Settings",
      url: "/admin",
      icon: Settings2,
      
    },
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
