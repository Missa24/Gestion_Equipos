import { useQuery } from "@tanstack/react-query";
import { OficinaFilters } from "../Schema/OficinaSchema";
import { getAllOficinas } from "../Service/OficinaService";

export const useGetAllOficinas = (filters: OficinaFilters = {}) => {
    return useQuery({
        queryKey: ["oficinas", filters],
        queryFn: () => getAllOficinas(filters),
    });
};
