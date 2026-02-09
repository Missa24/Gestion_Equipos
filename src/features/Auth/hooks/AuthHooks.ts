import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginAuth, LogoutAuth } from "../service/AuthService";
import { toast } from "sonner";
import { LoginResponse } from "../schema/AuthSchema";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";

export function useLoginUser() {
    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["LoginAuth"],
        mutationFn: LoginAuth,
        onSuccess: (response: LoginResponse) => {
            login(response);
            toast.success("Bienvenid@ al sistema");
            navigate("/dashboard")
        },
        onError: () => {
            const message = "Credenciales incorrectas";
            toast.error(message);
        }
    });
}

export function useLogoutUser() {
    const queryClient = useQueryClient();
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: LogoutAuth,
        onSuccess: () => {
            logout();
            queryClient.clear();
            toast.success("Sesión cerrada correctamente");
            navigate("/login");
        },
        onError: () => {
            const message = "Error al cerrar sesión";
            toast.error(message);
        },
    });
}
