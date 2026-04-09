import { apiService } from "@/api/api";
import { Oficina, OficinaFilters } from "../Schema/OficinaSchema";

export async function getAllOficinas(filters: OficinaFilters = {}): Promise<Oficina[]> {
    const response = await apiService.get("/v1/oficinas", { params: filters });
    return response.data.data;
}