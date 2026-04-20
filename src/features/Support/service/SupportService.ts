import { apiService } from "@/api/api";
import { CreateSupportResponse, SupportPayload, SupportFilters, SupportGetAll, SupportGetId } from "../schema/SupportSchema";

export async function CreateNewSupport(data: SupportPayload): Promise<CreateSupportResponse> {
    const response = await apiService.post("/v1/support/", data)
    return response.data
}

export async function getAllSupport(filters: SupportFilters): Promise<SupportGetAll> {
    const response = await apiService.get("/v1/support/", {
        params: filters
    })
    return response.data
}

export async function getSupportById(id: number): Promise<SupportGetId> {
    const response = await apiService.get(`/v1/support/${id}`)
    return response.data
}

export async function updateSupport(id: number, data: SupportPayload) {
    const response = await apiService.put(`/v1/support/${id}`, data)
    return response.data
}

export async function acceptSupport(id: number) {
    const response = await apiService.patch(`/v1/support/${id}/aceptar`)
    return response.data
}