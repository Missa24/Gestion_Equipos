// src/features/Equipos/Types/equipo.types.ts

export interface Equipo {
  id_equipo: number;
  id_usuario: number;
  id_oficina: number;
  marca: string;
  modelo: string;
  numero_serie: string;
  estado: string;
  ubicacion: string;
  fecha_adquisicion: string;
  codigo_activo: string | null;
  tipo: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  es_eliminado: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}