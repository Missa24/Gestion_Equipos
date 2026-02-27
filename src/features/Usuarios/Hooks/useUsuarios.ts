// src/features/usuarios/hooks/useUsuarios.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UsuarioService } from '../Service/UsuarioService';
import type { CreateUsuarioInput, UpdateUsuarioInput } from '../Schema/UsuarioSchema';
import { toast } from 'sonner';

/**
 * Hook para obtener todos los usuarios
 */
export const useUsuarios = () => {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: () => UsuarioService.getAll(),
  });
};

/**
 * Hook para obtener un usuario por ID
 */
export const useUsuario = (id: number) => {
  return useQuery({
    queryKey: ['usuario', id],
    queryFn: () => UsuarioService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook para obtener accesos de un usuario
 */
export const useUsuarioAccesos = (id: number) => {
  return useQuery({
    queryKey: ['usuario-accesos', id],
    queryFn: () => UsuarioService.getAccesos(id),
    enabled: !!id,
  });
};

/**
 * Hook para obtener equipos de un usuario
 */
export const useUsuarioEquipos = (id: number, activosOnly: boolean = false) => {
  return useQuery({
    queryKey: ['usuario-equipos', id, activosOnly],
    queryFn: () => UsuarioService.getEquipos(id, activosOnly),
    enabled: !!id,
  });
};

/**
 * Hook para obtener información completa de un usuario
 */
export const useUsuarioInfoCompleta = (id: number) => {
  return useQuery({
    queryKey: ['usuario-info-completa', id],
    queryFn: () => UsuarioService.getInfoCompleta(id),
    enabled: !!id,
  });
};

/**
 * Hook para crear un usuario
 */
export const useCreateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUsuarioInput) => UsuarioService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast.success('Usuario creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al crear usuario');
    },
  });
};

/**
 * Hook para actualizar un usuario
 */
export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUsuarioInput }) =>
      UsuarioService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      queryClient.invalidateQueries({ queryKey: ['usuario', variables.id] });
      toast.success('Usuario actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar usuario');
    },
  });
};

/**
 * Hook para eliminar un usuario (soft delete)
 */
export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UsuarioService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast.success('Usuario desactivado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al desactivar usuario');
    },
  });
};

/**
 * Hook para eliminar permanentemente un usuario
 */
export const useHardDeleteUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => UsuarioService.hardDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast.success('Usuario eliminado permanentemente');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al eliminar usuario');
    },
  });
};
