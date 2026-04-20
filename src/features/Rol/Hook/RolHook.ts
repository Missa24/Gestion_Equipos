import { useQuery } from "@tanstack/react-query";
import { RolFilters } from "../Schema/RolSchema";
import { getAllRoles } from "../Service/RolService";

export const useGetAllRoles = (filters: RolFilters = {}) => {
    return useQuery({
        queryKey: ["roles", filters],
        queryFn: () => getAllRoles(filters),
    });
};
