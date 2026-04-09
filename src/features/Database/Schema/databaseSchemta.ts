import { z } from "zod";

export const BaseDatosSchema = z.object({
    id_base_de_datos: z.number(),
    nombre: z.string().nullable(),
    motor: z.string().nullable(),
    host: z.string().nullable(),
    puerto: z.string().nullable(),
    url_git: z.string().nullable(),
    fecha_creacion: z.string().datetime(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean(),
});

export type BaseDatos = z.infer<typeof BaseDatosSchema>;

export const BaseDatosFiltersSchema = z.object({
    motor: z.string().optional(),
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

export type BaseDatosFilters = z.infer<typeof BaseDatosFiltersSchema>;

export const CreateBaseDatosSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido").max(255),
    motor: z.string().max(50).optional(),
    host: z.string().max(45).optional(),
    puerto: z.string().max(10).optional(),
    url_git: z.string().max(500).optional(),
});

export type CreateBaseDatosForm = z.infer<typeof CreateBaseDatosSchema>;

export const UpdateBaseDatosSchema = z.object({
    nombre: z.string().min(1).max(255).optional(),
    motor: z.string().max(50).optional(),
    host: z.string().max(45).optional(),
    puerto: z.string().max(10).optional(),
    url_git: z.string().max(500).optional(),
});

export type UpdateBaseDatosForm = z.infer<typeof UpdateBaseDatosSchema>;