import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BaseDatosFilters, CreateBaseDatosForm, UpdateBaseDatosForm } from "../Schema/databaseSchemta";
import { createBaseDatos, deleteBaseDatos, getAllBaseDatos, getBaseDatosById, updateBaseDatos } from "../Service/databaseService";

const QUERY_KEY = "base-de-datos";

export const useGetAllBaseDatos = (filters: BaseDatosFilters = {}) => {
    return useQuery({
        queryKey: [QUERY_KEY, filters],
        queryFn: () => getAllBaseDatos(filters),
    });
};

export const useGetBaseDatosById = (id: number) => {
    return useQuery({
        queryKey: [QUERY_KEY, id],
        queryFn: () => getBaseDatosById(id),
        enabled: !!id,
    });
};

export const useCreateBaseDatos = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateBaseDatosForm) => createBaseDatos(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            toast.success("Base de datos creada exitosamente");
        },
        onError: () => {
            toast.error("Error al crear la base de datos");
        },
    });
};

export const useUpdateBaseDatos = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateBaseDatosForm }) =>
            updateBaseDatos(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
            toast.success("Base de datos actualizada exitosamente");
        },
        onError: () => {
            toast.error("Error al actualizar la base de datos");
        },
    });
};

export const useDeleteBaseDatos = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteBaseDatos(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            toast.success("Base de datos eliminada exitosamente");
        },
        onError: () => {
            toast.error("Error al eliminar la base de datos");
        },
    });
};