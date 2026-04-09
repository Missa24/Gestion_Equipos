import { apiService } from "@/api/api";
import {
    Servidor,
    ServidorFilters,
    CreateServidorForm,
    UpdateServidorForm,
} from "../Schema/ServidorSchema";

export async function getAllServidores(filters: ServidorFilters): Promise<Servidor[]> {
    const response = await apiService.get("/v1/servidores", { params: filters });
    return response.data.data;
}

export async function getServidorById(id: number): Promise<Servidor> {
    const response = await apiService.get(`/v1/servidores/${id}`);
    return response.data.data;
}

export async function createServidor(data: CreateServidorForm): Promise<Servidor> {
    const response = await apiService.post("/v1/servidores", data);
    return response.data.data;
}

export async function updateServidor(id: number, data: UpdateServidorForm): Promise<Servidor> {
    const response = await apiService.patch(`/v1/servidores/${id}`, data);
    return response.data.data;
}

export async function deleteServidor(id: number): Promise<void> {
    await apiService.delete(`/v1/servidores/${id}`);
}