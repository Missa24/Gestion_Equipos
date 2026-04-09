import { z } from "zod";

export const ServidorSchema = z.object({
    id_servidor: z.number(),
    nombre: z.string(),
    ip: z.string(),
});

export const CategoriaSchema = z.object({
    id_categoria: z.number(),
    nombre: z.string(),
    tipo_categoria: z.string().nullable(),
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

export const BaseDatosSchema = z.object({
    id_base_de_datos: z.number(),
    nombre: z.string().nullable(),
    motor: z.string().nullable(),
    host: z.string().nullable(),
    puerto: z.string().nullable(),
    url_git: z.string().nullable(),
});

export const SistemaSchema = z.object({
    id_sistema: z.number(),
    nombre: z.string(),
    tamaño: z.string().nullable(),
    version: z.string().nullable(),
    fecha_creacion: z.string().datetime(),
    estado: z.string().nullable(),
    url: z.string().nullable(),
    direccion_ip: z.string().nullable(),
    id_servidor: z.number(),
    id_acceso: z.number(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean(),
    sistemaCategoria: z.array(SistemaCategoriaSchema),
    baseDeDatos: z.array(BaseDatosSchema),
    servidor: ServidorSchema.optional(),
});

export type BaseDatos = z.infer<typeof BaseDatosSchema>;
export type Sistema = z.infer<typeof SistemaSchema>;
export type SistemaCategoria = z.infer<typeof SistemaCategoriaSchema>;
export type Categoria = z.infer<typeof CategoriaSchema>;


export const SystemFiltersSchema = z.object({
    estado: z.string().optional(),
    id_servidor: z.number().optional(),
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

export type SystemFilters = z.infer<typeof SystemFiltersSchema>;


export const CreateSystemSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido").max(255),
    id_servidor: z.number().int().positive(),
    tamaño: z.string().max(100).optional(),
    version: z.string().max(50).optional(),
    estado: z.string().max(100).optional(),
    url: z.string().max(500).optional(),
    direccion_ip: z.string().max(45).optional(),
    id_acceso: z.number().int().positive().optional(),
    categorias: z.array(z.number().int().positive()).optional(),
    bases_de_datos: z.array(z.number().int().positive()).optional(),
});

export type CreateSystemForm = z.infer<typeof CreateSystemSchema>;

export const UpdateSystemFormSchema = z.object({
    nombre: z.string().min(1).max(255).optional(),
    tamaño: z.string().max(100).optional(),
    version: z.string().max(50).optional(),
    estado: z.string().max(100).optional(),
    url: z.string().max(500).optional(),
    direccion_ip: z.string().max(45).optional(),
    id_servidor: z.number().int().positive().optional(),
    id_acceso: z.number().int().positive().optional(),
    categorias: z.array(z.number().int().positive()).optional(),
    bases_de_datos: z.array(z.number().int().positive()).optional(),
});

export type UpdateSystemForm = z.infer<typeof UpdateSystemFormSchema>;