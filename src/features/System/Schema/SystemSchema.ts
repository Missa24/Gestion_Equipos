import { z } from "zod";

export const CategoriaSchema = z.object({
    id_categoria: z.number(),
    nombre: z.string(),
    tipo_categoria: z.string(),
});

export const SistemaCategoriaSchema = z.object({
    id_sistema_cat: z.number(),
    id_sistema: z.number(),
    id_categoria: z.number(),
    fecha_creacion: z.string().datetime(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean(),
    categoria: CategoriaSchema,
});

export const SistemaSchema = z.object({
    id_sistema: z.number(),
    nombre: z.string(),
    tamaño: z.number().nullable(),
    version: z.string(),
    fecha_creacion: z.string().datetime(),
    estado: z.string(),
    url: z.string().url(),
    direccion_ip: z.string(),
    id_servidor: z.number(),
    id_acceso: z.number(),
    id_base_de_datos: z.number(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean(),
    sistemaCategoria: z.array(SistemaCategoriaSchema),
});

export type Sistema = z.infer<typeof SistemaSchema>;
export type SistemaCategoria = z.infer<typeof SistemaCategoriaSchema>;
export type Categoria = z.infer<typeof CategoriaSchema>;


export const SystemFiltersSchema = z.object({
    estado: z.string().optional(),
    id_servidor: z.number().optional(),
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
})

export type SystemFilters = z.infer<typeof SystemFiltersSchema>