import { apiService } from "@/api/api";
import { BaseDatos, BaseDatosFilters, CreateBaseDatosForm, UpdateBaseDatosForm } from "../Schema/databaseSchemta";


export async function getAllBaseDatos(filters: BaseDatosFilters): Promise<BaseDatos[]> {
    const response = await apiService.get("/v1/database", { params: filters });
    return response.data.data;
}

export async function getBaseDatosById(id: number): Promise<BaseDatos> {
    const response = await apiService.get(`/v1/database/${id}`);
    return response.data.data;
}

export async function createBaseDatos(data: CreateBaseDatosForm): Promise<BaseDatos> {
    const response = await apiService.post("/v1/database", data);
    return response.data.data;
}

export async function updateBaseDatos(id: number, data: UpdateBaseDatosForm): Promise<BaseDatos> {
    const response = await apiService.patch(`/v1/database/${id}`, data);
    return response.data.data;
}

export async function deleteBaseDatos(id: number): Promise<void> {
    await apiService.delete(`/v1/database/${id}`);
}