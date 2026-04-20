import { ReactNode } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // a ms
    return Date.now() > exp;
  } catch {
    return true;
  }
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
