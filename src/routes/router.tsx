import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import AuthPage from "@/pages/AuthPage";
import Reportes from "@/pages/ReportesPage";
import { ProtectedRoute } from "@/components/login/ProtectedRoute";
import { SupportPage } from "@/pages/SupportPage";
import { SupportDetailPage } from "@/pages/SupportDetailPage";
import UsuariosPage from "@/features/Usuarios/Components/UsuariosPage";  // ← U mayúscula


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
                    { path: "soporte", element: <SupportPage /> },
                    { path: "soporte/:id", element: <SupportDetailPage /> },
                    { path: "reportes", element: <Reportes /> },
                    { path: "usuarios", element: <UsuariosPage /> },
                ],
            },
        ],
    },
]);