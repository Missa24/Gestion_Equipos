import z from "zod";

export const CategorySchema = z.object({
    id_categoria: z.number(),
    nombre: z.string(),
    tipo_categoria: z.string().nullable(),
    fecha_creacion: z.string().datetime(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean()
})
export type Category = z.infer<typeof CategorySchema>;

export const CategoriaFiltersSchema = z.object({
    tipo_categoria: z.string().optional(),
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

export type CategoriaFilters = z.infer<typeof CategoriaFiltersSchema>;

export const CreateCategoriaSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido").max(255),
    tipo_categoria: z.string().max(100).optional(),
});

export type CreateCategoriaForm = z.infer<typeof CreateCategoriaSchema>;

export const UpdateCategoriaSchema = z.object({
    nombre: z.string().min(1).max(255).optional(),
    tipo_categoria: z.string().max(100).optional(),
});

export type UpdateCategoriaForm = z.infer<typeof UpdateCategoriaSchema>;

export const CategoryCreateSchema = z.object({
    id_categoria: z.number(),
    nombre: z.string(),
    tipo_categoria: z.string().nullable(),
})

export type CategoriaCreada = z.infer<typeof CategoryCreateSchema>