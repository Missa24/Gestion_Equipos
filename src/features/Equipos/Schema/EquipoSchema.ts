// src/features/Equipos/Schema/EquipoSchema.ts

import { z } from 'zod';

export const CreateEquipoSchema = z.object({
  id_usuario: z.coerce.number().int().positive('ID de usuario inválido'),
  id_oficina: z.coerce.number().int().positive('ID de oficina inválido'),
  marca: z.string().min(1, 'La marca es requerida').max(100),
  modelo: z.string().min(1, 'El modelo es requerido').max(100),
  numero_serie: z.string().min(1, 'El número de serie es requerido').max(150),
  estado: z.string().min(1, 'El estado es requerido').max(50),
  ubicacion: z.string().min(1, 'La ubicación es requerida').max(255),
  fecha_adquisicion: z.string().min(1, 'La fecha de adquisición es requerida'),
  codigo_activo: z.string().max(100).optional(),
  tipo: z.string().min(1, 'El tipo es requerido').max(50),
});

export const UpdateEquipoSchema = CreateEquipoSchema.partial();

export const EquipoFilterSchema = z.object({
  search: z.string().optional(),
  estado: z.string().optional(),
  tipo: z.string().optional(),
  fecha_inicio: z.string().optional(),
  fecha_fin: z.string().optional(),
});

export type CreateEquipoInput = z.infer<typeof CreateEquipoSchema>;
export type UpdateEquipoInput = z.infer<typeof UpdateEquipoSchema>;
export type EquipoFilterInput = z.infer<typeof EquipoFilterSchema>;