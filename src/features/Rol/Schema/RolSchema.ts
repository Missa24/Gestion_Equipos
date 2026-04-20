import z from "zod";


export const RolSchema = z.object({
    id_rol: z.number(),
    nombre: z.string(),
    id_oficina: z.number(),
    fecha_creacion: z.string().datetime(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean(),
});

export type Rol = z.infer<typeof RolSchema>;

export const RolFiltersSchema = z.object({
    id_oficina: z.number().optional(),
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

export type RolFilters = z.infer<typeof RolFiltersSchema>;