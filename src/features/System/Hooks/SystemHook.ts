import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    CreateSystem,
    getSystemAll,
    getSystemById,
    UpdateSystem,
    DeleteSystem,
} from "../Service/SystemService";
import {
    SystemFilters,
    CreateSystemForm,
    UpdateSystemForm,
} from "../Schema/SystemSchema";
import { toast } from "sonner";

const QUERY_KEY = "sistemas";

export const useGetAllSystems = (filters: SystemFilters) => {
    return useQuery({
        queryKey: [QUERY_KEY, filters],
        queryFn: () => getSystemAll(filters),
    });
};

export const useGetSystemById = (id: number) => {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: () => getSystemById(id),
        enabled: !!id,
    });
};

export const useCreateSystem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateSystemForm) => CreateSystem(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            toast.success("Sistema creado exitosamente");
        },
        onError: () => {
            toast.error("Error al crear el sistema");
        },
    });
};

export const useUpdateSystem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateSystemForm }) =>
            UpdateSystem(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
            toast.success("Sistema actualizado exitosamente");
        },
        onError: () => {
            toast.error("Error al actualizar el sistema");
        },
    });
};

export const useDeleteSystem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => DeleteSystem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            toast.success("Sistema eliminado exitosamente");
        },
        onError: () => {
            toast.error("Error al eliminar el sistema");
        },
    });
};