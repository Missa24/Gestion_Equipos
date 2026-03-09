// src/features/Equipos/Service/EquipoService.ts

import { apiService } from '../../../api/api';
import type { Equipo, ApiResponse, PaginatedResponse } from '../Types/equipo.types';
import type { CreateEquipoInput, UpdateEquipoInput } from '../Schema/EquipoSchema';

const BASE_URL = '/v1/equipos';

export const EquipoService = {
  /**
   * Obtiene todos los equipos
   */
  async getAll(): Promise<Equipo[]> {
    const response = await apiService.get<ApiResponse<Equipo[]>>(BASE_URL);
    return response.data.data;
  },

  /**
   * Obtiene equipos paginados con filtros
   */
  async getAllPaginated(params: {
    page?: number;
    limit?: number;
    estado?: string;
    tipo?: string;
    search?: string;
  }): Promise<PaginatedResponse<Equipo>> {
    const response = await apiService.get<PaginatedResponse<Equipo>>(
      `${BASE_URL}/paginated`,
      { params }
    );
    return response.data;
  },

  /**
   * Obtiene un equipo por ID
   */
  async getById(id: number): Promise<Equipo> {
    const response = await apiService.get<ApiResponse<Equipo>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },

  /**
   * Crea un nuevo equipo
   */
  async create(data: CreateEquipoInput): Promise<Equipo> {
    const response = await apiService.post<ApiResponse<Equipo>>(BASE_URL, data);
    return response.data.data;
  },

  /**
   * Actualiza un equipo
   */
  async update(id: number, data: UpdateEquipoInput): Promise<Equipo> {
    const response = await apiService.put<ApiResponse<Equipo>>(`${BASE_URL}/${id}`, data);
    return response.data.data;
  },

  /**
   * Elimina un equipo (soft delete)
   */
  async delete(id: number): Promise<void> {
    await apiService.delete(`${BASE_URL}/${id}`);
  },

  /**
   * Elimina permanentemente un equipo
   */
  async hardDelete(id: number): Promise<void> {
    await apiService.delete(`${BASE_URL}/${id}/hard`);
  },
};