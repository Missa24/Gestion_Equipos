import { ReactNode } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = useAuthStore((state) => state.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
