import { z } from "zod";

export const OficinaSchema = z.object({
    id_oficina: z.number(),
    nombre: z.string(),
    departamento: z.string(),
    tipo: z.string(),
    id_direccion: z.number(),
    fecha_creacion: z.string().datetime(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean(),
});

export type Oficina = z.infer<typeof OficinaSchema>;

export const OficinaFiltersSchema = z.object({
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

export type OficinaFilters = z.infer<typeof OficinaFiltersSchema>;