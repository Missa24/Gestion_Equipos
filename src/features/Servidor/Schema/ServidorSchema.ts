import { z } from "zod";

export const ServidorSchema = z.object({
    id_servidor: z.number(),
    nombre: z.string(),
    capacidad: z.string().nullable(),
    tipo: z.string().nullable(),
    ip: z.string().nullable(),
    mascara_red: z.string().nullable(),
    hostname: z.string().nullable(),
    ubicacion: z.string().nullable(),
    estado: z.string().nullable(),
    fecha_creacion: z.string().date(),
    fecha_expiracion: z.string().date(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean(),
});

export type Servidor = z.infer<typeof ServidorSchema>;

export const ServidorFiltersSchema = z.object({
    estado: z.string().optional(),
    tipo: z.string().optional(),
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

export type ServidorFilters = z.infer<typeof ServidorFiltersSchema>;

export const CreateServidorSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido").max(255),
    capacidad: z.string().max(100).optional(),
    tipo: z.string().max(50).optional(),
    ip: z.string().max(45).optional(),
    mascara_red: z.string().max(100).optional(),
    hostname: z.string().max(255).optional(),
    ubicacion: z.string().max(100).optional(),
    estado: z.string().max(50).optional(),
    fecha_creacion: z.string().date(),
    fecha_expiracion: z.string().date(),
});

export type CreateServidorForm = z.infer<typeof CreateServidorSchema>;

export const UpdateServidorSchema = z.object({
    nombre: z.string().min(1).max(255).optional(),
    capacidad: z.string().max(100).optional(),
    tipo: z.string().max(50).optional(),
    ip: z.string().max(45).optional(),
    mascara_red: z.string().max(100).optional(),
    hostname: z.string().max(255).optional(),
    ubicacion: z.string().max(100).optional(),
    estado: z.string().max(50).optional(),
    fecha_creacion: z.string().date(),
    fecha_expiracion: z.string().date(),
});

export type UpdateServidorForm = z.infer<typeof UpdateServidorSchema>;





