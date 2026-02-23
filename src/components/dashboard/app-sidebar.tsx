
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faHome,
    faInbox,
    faCalendar,
    faSearch,
    faCog,
    faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons"
import { useAuthStore } from "@/stores/auth.store"

const iconMap = {
    faHome,
    faInbox,
    faCalendar,
    faSearch,
    faCog,
}

export function AppSidebar() {
    const user = useAuthStore((state) => state.user)
    const menus = user?.menus ?? []


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menus.map((menu) => {
                                const icon =
                                    iconMap[menu.icono as keyof typeof iconMap] ?? faCircleArrowRight

                                return (
                                    <SidebarMenuItem key={menu.id_menu}>
                                        <SidebarMenuButton asChild>
                                            <a href={menu.url}>
                                                <FontAwesomeIcon icon={icon} />
                                                <span>{menu.nombre}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}