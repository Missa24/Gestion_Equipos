import { apiService } from "@/api/api";
import { Sistema, SystemFilters } from "../Schema/SystemSchema";

export async function getSystemAll(data: SystemFilters): Promise<Sistema[]> {
    const response = await apiService.get("/v1/system", {
        params: data
    })
    return response.data.data
}
