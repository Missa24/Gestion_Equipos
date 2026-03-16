import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    createUsuario,
    deleteUsuario,
    getAllUsuarios,
    getUsuarioById,
    updateUsuario,
} from "../Service/UsuarioService";
import { UsuarioCreateResponse, UsuarioFilters, UsuarioPayload } from "../Schema/UsuarioSchema";

export function useCreateUsuario() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["CreateUsuario"],
        mutationFn: createUsuario,
        onSuccess: (data: UsuarioCreateResponse) => {
            toast.success(
                `Usuario "${data.data.nombres} ${data.data.apellidos}" creado exitosamente`
            );
            queryClient.invalidateQueries({ queryKey: ["UsuarioList"] });
        },
        onError: () => {
            toast.error("Error al crear el usuario");
        },
    });
}

export function useGetAllUsuarios(filters: UsuarioFilters) {
    return useQuery({
        queryKey: ["UsuarioList", filters],
        queryFn: () => getAllUsuarios(filters),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60,
    });
}

export function useGetUsuarioById(id: number) {
    return useQuery({
        queryKey: ["Usuario", id],
        queryFn: () => getUsuarioById(id),
        enabled: !!id,
    });
}

export function useUpdateUsuario() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UsuarioPayload }) =>
            updateUsuario(id, data),
        onSuccess: (_, { id }) => {
            toast.success("Usuario actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ["UsuarioList"] });
            queryClient.invalidateQueries({ queryKey: ["Usuario", id] });
        },
        onError: () => {
            toast.error("Error al actualizar el usuario");
        },
    });
}

export function useDeleteUsuario() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteUsuario(id),
        onSuccess: () => {
            toast.success("Usuario desactivado correctamente");
            queryClient.invalidateQueries({ queryKey: ["UsuarioList"] });
        },
        onError: () => {
            toast.error("Error al eliminar el usuario");
        },
    });
}
