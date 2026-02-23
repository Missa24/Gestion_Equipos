import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CreateNewSupport, getAllSupport, getSupportById, updateSupport } from "../service/SupportService";
import { CreateSupportResponse, SupportFilters, SupportUpdate } from "../schema/SupportSchema";

export function useCreateSupport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["CreateSupport"],
        mutationFn: CreateNewSupport,
        onSuccess: (data: CreateSupportResponse) => {
            toast.success(`Solicitud creada: ${data.data.nro_de_solicitud}`);
            queryClient.invalidateQueries({ queryKey: ["SupportList"] });
        },

        onError: () => {
            const message = "Error al crear la solicitud";
            toast.error(message);
        }
    });
}

export function useGetAllSupport(filters: SupportFilters) {
    return useQuery({
        queryKey: ["SupportList", filters],
        queryFn: () => getAllSupport(filters),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60,
    });
}

export function useGetSupportById(id: number) {
    return useQuery({
        queryKey: ["Support", id],
        queryFn: () => getSupportById(id),
        enabled: !!id,
    })
}

export function useUpdateSupport() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: SupportUpdate }) =>
            updateSupport(id, data),
        onSuccess: () => {
            toast.success("Solicitud actualizada correctamente")
            queryClient.invalidateQueries({ queryKey: ["SupportList"] })
        },
        onError: () => {
            toast.error("Error al actualizar la solicitud")
        }
    })
}