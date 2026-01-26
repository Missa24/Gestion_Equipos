import { createBrowserRouter } from "react-router-dom"
import RootLayout from "@/components/layout/RootLayout"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Dashboard from "@/pages/Dashboard"
import AuthPage from "@/pages/AuthPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <div>Error</div>,
        children: [
            {
                path: "login",
                element: <AuthPage />,
            },
            {
                path: "sa",
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
])
