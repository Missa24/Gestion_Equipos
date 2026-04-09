import { apiService } from "@/api/api";
import { Rol, RolFilters } from "../Schema/RolSchema";

export async function getAllRoles(filters: RolFilters = {}): Promise<Rol[]> {
    const response = await apiService.get("/v1/rol", { params: filters });

    const roles: Rol[] = response.data.data;

    const uniqueRolesMap = new Map<string, Rol>();

    for (const rol of roles) {
        if (!uniqueRolesMap.has(rol.nombre)) {
            uniqueRolesMap.set(rol.nombre, rol);
        }
    }

    return Array.from(uniqueRolesMap.values());
}