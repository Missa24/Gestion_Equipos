// src/features/Equipos/Hooks/useEquipos.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EquipoService } from '../Service/EquipoService';
import type { CreateEquipoInput, UpdateEquipoInput } from '../Schema/EquipoSchema';
import { toast } from 'react-toastify';

/**
 * Hook para obtener todos los equipos
 */
export const useEquipos = () => {
  return useQuery({
    queryKey: ['equipos'],
    queryFn: () => EquipoService.getAll(),
  });
};

/**
 * Hook para obtener equipos paginados
 */
export const useEquiposPaginated = (params: {
  page?: number;
  limit?: number;
  estado?: string;
  tipo?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['equipos-paginated', params],
    queryFn: () => EquipoService.getAllPaginated(params),
  });
};

/**
 * Hook para obtener un equipo por ID
 */
export const useEquipo = (id: number) => {
  return useQuery({
    queryKey: ['equipo', id],
    queryFn: () => EquipoService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook para crear un equipo
 */
export const useCreateEquipo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEquipoInput) => EquipoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
      queryClient.invalidateQueries({ queryKey: ['equipos-paginated'] });
      toast.success('Equipo creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear equipo');
    },
  });
};

/**
 * Hook para actualizar un equipo
 */
export const useUpdateEquipo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEquipoInput }) =>
      EquipoService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
      queryClient.invalidateQueries({ queryKey: ['equipos-paginated'] });
      queryClient.invalidateQueries({ queryKey: ['equipo', variables.id] });
      toast.success('Equipo actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar equipo');
    },
  });
};

/**
 * Hook para eliminar un equipo
 */
export const useDeleteEquipo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => EquipoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
      queryClient.invalidateQueries({ queryKey: ['equipos-paginated'] });
      toast.success('Equipo eliminado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar equipo');
    },
  });
};

/**
 * Hook para eliminar permanentemente un equipo
 */
export const useHardDeleteEquipo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => EquipoService.hardDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] });
      queryClient.invalidateQueries({ queryKey: ['equipos-paginated'] });
      toast.success('Equipo eliminado permanentemente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar equipo');
    },
  });
};