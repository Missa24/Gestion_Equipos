import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    createEquipo,
    deleteEquipo,
    getAllEquipos,
    getEquipoById,
    updateEquipo,
} from "../Service/EquipoService";
import { EquipoCreateResponse, EquipoFilters, EquipoPayload } from "../Schema/EquipoSchema";

export function useCreateEquipo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["CreateEquipo"],
        mutationFn: createEquipo,
        onSuccess: (data: EquipoCreateResponse) => {
            toast.success(`Equipo "${data.data.marca} ${data.data.modelo}" creado exitosamente`);
            queryClient.invalidateQueries({ queryKey: ["EquipoList"] });
        },
        onError: () => {
            toast.error("Error al crear el equipo");
        },
    });
}

export function useGetAllEquipos(filters: EquipoFilters) {
    return useQuery({
        queryKey: ["EquipoList", filters],
        queryFn: () => getAllEquipos(filters),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60,
    });
}

export function useGetEquipoById(id: number) {
    return useQuery({
        queryKey: ["Equipo", id],
        queryFn: () => getEquipoById(id),
        enabled: !!id,
    });
}

export function useUpdateEquipo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: EquipoPayload }) =>
            updateEquipo(id, data),
        onSuccess: (_, { id }) => {
            toast.success("Equipo actualizado correctamente");
            queryClient.invalidateQueries({ queryKey: ["EquipoList"] });
            queryClient.invalidateQueries({ queryKey: ["Equipo", id] });
        },
        onError: () => {
            toast.error("Error al actualizar el equipo");
        },
    });
}

export function useDeleteEquipo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteEquipo(id),
        onSuccess: () => {
            toast.success("Equipo eliminado correctamente");
            queryClient.invalidateQueries({ queryKey: ["EquipoList"] });
        },
        onError: () => {
            toast.error("Error al eliminar el equipo");
        },
    });
}
