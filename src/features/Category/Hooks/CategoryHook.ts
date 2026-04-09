import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
} from "../Services/CategoryService";
import {
    CategoriaFilters,
    CreateCategoriaForm,
    UpdateCategoriaForm,
} from "../Schema/CategorySchema";
import { toast } from "sonner";

export const useGetAllCategorias = (filters: CategoriaFilters = {}) => {
    return useQuery({
        queryKey: ["categorias", filters],
        queryFn: () => getAllCategorias(filters),
    });
};

export const useGetCategoriaById = (id: number) => {
    return useQuery({
        queryKey: ["categorias", id],
        queryFn: () => getCategoriaById(id),
        enabled: !!id,
    });
};

export const useCreateCategoria = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateCategoriaForm) => createCategoria(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
            toast.success("Categoría creada exitosamente");
        },
        onError: () => {
            toast.error("Error al crear la categoría");
        },
    });
};

export const useUpdateCategoria = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateCategoriaForm }) =>
            updateCategoria(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
            queryClient.invalidateQueries({ queryKey: ["categorias", id] });
            toast.success("Categoría actualizada exitosamente");
        },
        onError: () => {
            toast.error("Error al actualizar la categoría");
        },
    });
};

export const useDeleteCategoria = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteCategoria(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categorias"] });
            toast.success("Categoría eliminada exitosamente");
        },
        onError: () => {
            toast.error("Error al eliminar la categoría");
        },
    });
};