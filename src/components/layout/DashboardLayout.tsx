import { AppSidebar } from "../dashboard/app-sidebar";
import { Headerbar } from "@/components/nav/headerbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
                <Headerbar />
                <div className="mt-20 ml-10">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}