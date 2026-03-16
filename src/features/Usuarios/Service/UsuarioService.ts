import { apiService } from "@/api/api";
import {
    UsuarioCreateResponse,
    UsuarioFilters,
    UsuarioGetAll,
    UsuarioGetById,
    UsuarioPayload,
} from "../Schema/UsuarioSchema";

export async function createUsuario(data: UsuarioPayload): Promise<UsuarioCreateResponse> {
    const response = await apiService.post("/v1/usuarios/", data);
    return response.data;
}

export async function getAllUsuarios(filters: UsuarioFilters): Promise<UsuarioGetAll> {
    const response = await apiService.get("/v1/usuarios/paginated", {
        params: filters,
    });
    return response.data;
}

export async function getUsuarioById(id: number): Promise<UsuarioGetById> {
    const response = await apiService.get(`/v1/usuarios/${id}`);
    return response.data;
}

export async function updateUsuario(
    id: number,
    data: UsuarioPayload
): Promise<UsuarioCreateResponse> {
    const response = await apiService.put(`/v1/usuarios/${id}`, data);
    return response.data;
}

export async function deleteUsuario(id: number): Promise<{ message: string }> {
    const response = await apiService.delete(`/v1/usuarios/${id}`);
    return response.data;
}
