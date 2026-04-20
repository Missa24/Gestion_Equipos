import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import AuthPage from "@/pages/AuthPage";
import Reportes from "@/pages/ReportesPage";
import { ProtectedRoute } from "@/components/login/ProtectedRoute";
import { SupportPage } from "@/pages/SupportPage";
import { SupportDetailPage } from "@/pages/Support/SupportDetailPage";
import UsuariosPage from "@/features/Usuarios/Components/UsuariosPage";
import { EquiposPage } from "@/features/Equipos";
import { SystemPage } from "@/pages/SystemPage";
import ServidorPage from "@/pages/ServidorPage";
import { ServidorDetailPage } from "@/pages/Servidor/ServidorDetailPage";
import { SystemDetailPage } from "@/pages/System/SystemDetailPage";
import { DatabasePage } from "@/pages/DatabasePage";
import { DatabaseDetailPage } from "@/pages/Database/DatabaseDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
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
          { path: "equipos", element: <EquiposPage /> },
          { path: "sistemas", element: <SystemPage /> },
          { path: "sistemas/:id", element: <SystemDetailPage /> },
          { path: "servidores", element: <ServidorPage /> },
          { path: "servidores/:id", element: <ServidorDetailPage /> },
          { path: "base_de_datos", element: <DatabasePage /> },
          { path: "base_de_datos/:id", element: <DatabaseDetailPage /> },
        ],
      },
    ],
  },
]);
