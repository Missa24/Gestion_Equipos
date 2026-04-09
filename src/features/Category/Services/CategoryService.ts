import { apiService } from "@/api/api";
import { CategoriaFilters, CreateCategoriaForm, UpdateCategoriaForm, Category } from "../Schema/CategorySchema";


export async function getAllCategorias(filters: CategoriaFilters): Promise<Category[]> {
    const response = await apiService.get("/v1/categorias", { params: filters });
    return response.data.data;
}

export async function getCategoriaById(id: number): Promise<Category> {
    const response = await apiService.get(`/v1/categorias/${id}`);
    return response.data.data;
}

export async function createCategoria(data: CreateCategoriaForm): Promise<Category> {
    const response = await apiService.post("/v1/categorias", data);
    return response.data.data;
}

export async function updateCategoria(id: number, data: UpdateCategoriaForm): Promise<Category> {
    const response = await apiService.patch(`/v1/categorias/${id}`, data);
    return response.data.data;
}

export async function deleteCategoria(id: number): Promise<void> {
    await apiService.delete(`/v1/categorias/${id}`);
}