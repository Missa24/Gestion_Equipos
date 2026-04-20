import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInbox,
  faCalendar,
  faSearch,
  faCog,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "@/stores/auth.store";
import { Link } from "react-router-dom";

const iconMap = {
  faHome,
  faInbox,
  faCalendar,
  faSearch,
  faCog,
};

export function AppSidebar() {
  const user = useAuthStore((state) => state.user);
  const menus = user?.menus ?? [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((menu) => {
                const icon =
                  iconMap[menu.icono as keyof typeof iconMap] ??
                  faCircleArrowRight;

                return (
                  <SidebarMenuItem key={menu.id_menu}>
                    <SidebarMenuButton asChild>
                      <Link to={`/dashboard${menu.url}`}>
                        <FontAwesomeIcon icon={icon} />
                        <span>{menu.nombre}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
