// src/features/usuarios/service/UsuarioService.ts

import { apiService } from '../../../api/api';
import type {
  Usuario,
  UsuarioAccesos,
  UsuarioEquipos,
  UsuarioInfoCompleta,
  ApiResponse
} from '../Types/usuario.types';
import type { CreateUsuarioInput, UpdateUsuarioInput } from '../Schema/UsuarioSchema';

const BASE_URL = '/v1/usuarios';

export const UsuarioService = {
  /**
   * Obtiene todos los usuarios
   */
  getAll: async (): Promise<Usuario[]> => {
    const response = await apiService.get<ApiResponse<Usuario[]>>(BASE_URL);
    return response.data.data;
  },

  /**
   * Obtiene un usuario por ID
   */
  getById: async (id: number): Promise<Usuario> => {
    const response = await apiService.get<ApiResponse<Usuario>>(`${BASE_URL}/${id}`);
    return response.data.data;
  },

  /**
   * Obtiene los accesos (contraseñas) de un usuario
   */
  getAccesos: async (id: number): Promise<UsuarioAccesos> => {
    const response = await apiService.get<ApiResponse<UsuarioAccesos>>(
      `${BASE_URL}/${id}/accesos`
    );
    return response.data.data;
  },

  /**
   * Obtiene los equipos asignados a un usuario
   */
  getEquipos: async (id: number, activosOnly: boolean = false): Promise<UsuarioEquipos> => {
    const params = activosOnly ? { activos: 'true' } : {};
    const response = await apiService.get<ApiResponse<UsuarioEquipos>>(
      `${BASE_URL}/${id}/equipos`,
      { params }
    );
    return response.data.data;
  },

  /**
   * Obtiene toda la información del usuario (datos + accesos + equipos)
   */
  getInfoCompleta: async (id: number): Promise<UsuarioInfoCompleta> => {
    const response = await apiService.get<ApiResponse<UsuarioInfoCompleta>>(
      `${BASE_URL}/${id}/info-completa`
    );
    return response.data.data;
  },

  /**
   * Crea un nuevo usuario
   */
  create: async (data: CreateUsuarioInput): Promise<Usuario> => {
    const response = await apiService.post<ApiResponse<Usuario>>(BASE_URL, data);
    return response.data.data;
  },

  /**
   * Actualiza un usuario existente
   */
  update: async (id: number, data: UpdateUsuarioInput): Promise<Usuario> => {
    const response = await apiService.put<ApiResponse<Usuario>>(`${BASE_URL}/${id}`, data);
    return response.data.data;
  },

  /**
   * Desactiva un usuario (soft delete)
   */
  delete: async (id: number): Promise<void> => {
    await apiService.delete(`${BASE_URL}/${id}`);
  },

  /**
   * Elimina permanentemente un usuario
   */
  hardDelete: async (id: number): Promise<void> => {
    await apiService.delete(`${BASE_URL}/${id}/hard`);
  }
};
