import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    ServidorFilters,
    CreateServidorForm,
    UpdateServidorForm,
} from "../Schema/ServidorSchema";
import { toast } from "sonner";
import { createServidor, deleteServidor, getAllServidores, getServidorById, updateServidor } from "../Service/ServidorService";

const QUERY_KEY = "servidores";

export const useGetAllServidores = (filters: ServidorFilters = {}) => {
    return useQuery({
        queryKey: [QUERY_KEY, filters],
        queryFn: () => getAllServidores(filters),
    });
};

export const useGetServidorById = (id: number) => {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: () => getServidorById(id),
        enabled: !!id,
    });
};

export const useCreateServidor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateServidorForm) => createServidor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            toast.success("Servidor creado exitosamente");
        },
        onError: () => {
            toast.error("Error al crear el servidor");
        },
    });
};

export const useUpdateServidor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateServidorForm }) =>
            updateServidor(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
            toast.success("Servidor actualizado exitosamente");
        },
        onError: () => {
            toast.error("Error al actualizar el servidor");
        },
    });
};

export const useDeleteServidor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteServidor(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            toast.success("Servidor eliminado exitosamente");
        },
        onError: () => {
            toast.error("Error al eliminar el servidor");
        },
    });
};