import { apiService } from "@/api/api";
import {
    CreateSystemForm,
    Sistema,
    SystemFilters,
    UpdateSystemForm,
} from "../Schema/SystemSchema";

export async function CreateSystem(data: CreateSystemForm): Promise<Sistema> {
    const response = await apiService.post("/v1/system", data);
    return response.data.data;
}

export async function getSystemAll(filters: SystemFilters): Promise<Sistema[]> {
    const response = await apiService.get("/v1/system", { params: filters });
    return response.data.data;
}

export async function getSystemById(id: number): Promise<Sistema> {
    const response = await apiService.get(`/v1/system/${id}`);
    return response.data.data;
}

export async function UpdateSystem(id: number, data: UpdateSystemForm): Promise<Sistema> {
    const response = await apiService.patch(`/v1/system/${id}`, data);
    return response.data.data;
}

export async function DeleteSystem(id: number): Promise<void> {
    await apiService.delete(`/v1/system/${id}`);
}