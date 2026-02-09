import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import AuthPage from "@/pages/AuthPage";
import Usuarios from "@/pages/UsuariosPage";
import Reportes from "@/pages/ReportesPage";
import { ProtectedRoute } from "@/components/login/ProtectedRoute";


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
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "usuarios", element: <Usuarios /> },
                    { path: "reportes", element: <Reportes /> },
                ],
            },
        ],
    },
]);
