import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Outlet />
            <Toaster />
        </ThemeProvider>
    )
}