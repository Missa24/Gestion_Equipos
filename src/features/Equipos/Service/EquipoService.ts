import { apiService } from "@/api/api";
import {
    EquipoCreateResponse,
    EquipoFilters,
    EquipoGetAll,
    EquipoGetById,
    EquipoPayload,
} from "../Schema/EquipoSchema";

export async function createEquipo(data: EquipoPayload): Promise<EquipoCreateResponse> {
    const response = await apiService.post("/v1/equipos/", data);
    return response.data;
}

export async function getAllEquipos(filters: EquipoFilters): Promise<EquipoGetAll> {
    const response = await apiService.get("/v1/equipos/paginated", {
        params: filters,
    });
    return response.data;
}

export async function getEquipoById(id: number): Promise<EquipoGetById> {
    const response = await apiService.get(`/v1/equipos/${id}`);
    return response.data;
}

export async function updateEquipo(id: number, data: EquipoPayload): Promise<EquipoCreateResponse> {
    const response = await apiService.put(`/v1/equipos/${id}`, data);
    return response.data;
}

export async function deleteEquipo(id: number): Promise<{ message: string }> {
    const response = await apiService.delete(`/v1/equipos/${id}`);
    return response.data;
}
