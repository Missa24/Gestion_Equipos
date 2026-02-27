// src/features/usuarios/schema/UsuarioSchema.ts

import { z } from 'zod';

/**
 * Schema para crear un nuevo usuario
 */
export const CreateUsuarioSchema = z.object({
  nombres: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellidos: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  ci: z.number().positive('El CI debe ser un número positivo'),
  celular: z.number().positive('El celular debe ser un número positivo'),
  tipo: z.string().min(1, 'El tipo es requerido'),
  correo_electronico: z.string().email('Email inválido'),
  cargo: z.string().min(2, 'El cargo debe tener al menos 2 caracteres'),
  username: z.string().min(3, 'El username debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  id_oficina: z.number().positive('Debe seleccionar una oficina'),
  id_rol: z.number().positive('Debe seleccionar un rol'),
});

/**
 * Schema para actualizar un usuario existente
 */
export const UpdateUsuarioSchema = z.object({
  nombres: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  apellidos: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').optional(),
  ci: z.number().positive('El CI debe ser un número positivo').optional(),
  celular: z.number().positive('El celular debe ser un número positivo').optional(),
  tipo: z.string().min(1, 'El tipo es requerido').optional(),
  correo_electronico: z.string().email('Email inválido').optional(),
  cargo: z.string().min(2, 'El cargo debe tener al menos 2 caracteres').optional(),
  username: z.string().min(3, 'El username debe tener al menos 3 caracteres').optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  id_oficina: z.number().positive('Debe seleccionar una oficina').optional(),
  id_rol: z.number().positive('Debe seleccionar un rol').optional(),
  activo: z.boolean().optional(),
});

/**
 * Schema para filtros de búsqueda
 */
export const UsuarioFilterSchema = z.object({
  search: z.string().optional(),
  activo: z.boolean().optional(),
  id_oficina: z.number().optional(),
  id_rol: z.number().optional(),
});

// Tipos inferidos de los schemas
export type CreateUsuarioInput = z.infer<typeof CreateUsuarioSchema>;
export type UpdateUsuarioInput = z.infer<typeof UpdateUsuarioSchema>;
export type UsuarioFilterInput = z.infer<typeof UsuarioFilterSchema>;
