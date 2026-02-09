import { apiService } from "@/api/api";
import { Login, LoginResponse } from "../schema/AuthSchema";


export async function LoginAuth(data: Login): Promise<LoginResponse> {
    const response = await apiService.post("/v1/auth/login", data);
    return response.data;
}

export async function LogoutAuth() {
    const response = await apiService.post("/v1/auth/logout");
    return response.data
}