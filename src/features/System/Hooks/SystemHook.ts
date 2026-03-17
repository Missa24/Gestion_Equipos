import { useQuery } from "@tanstack/react-query";
import { getSystemAll } from "../Service/SystemService";
import { SystemFilters, Sistema } from "../Schema/SystemSchema";

export const useGetAllSystems = (filters: SystemFilters) => {
    return useQuery<Sistema[]>({
        queryKey: ["systems", filters],
        queryFn: () => getSystemAll(filters),
    });
};