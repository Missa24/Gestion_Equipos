import z from "zod";

// ── Schemas de creación / actualización ──────────────────────────────────────
export const UsuarioCreateSchema = z.object({
    nombres: z.string().min(1, "Los nombres son requeridos").max(100),
    apellidos: z.string().min(1, "Los apellidos son requeridos").max(100),
    id_oficina: z.number().int().positive("ID de oficina inválido"),
    id_rol: z.number().int().positive("ID de rol inválido"),
    ci: z.number().int().positive("CI inválido"),
    celular: z.number().int().positive("Celular inválido"),
    tipo: z.string().min(1, "El tipo es requerido").max(50),
    correo_electronico: z.string().email("Correo electrónico inválido").max(255),
    cargo: z.string().min(1, "El cargo es requerido").max(150),
    username: z.string().min(3, "El username debe tener al menos 3 caracteres").max(255),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(255),
});

export type UsuarioCreate = z.infer<typeof UsuarioCreateSchema>;

export const UsuarioUpdateSchema = UsuarioCreateSchema.partial().extend({
    activo: z.boolean().optional(),
});
export type UsuarioUpdate = z.infer<typeof UsuarioUpdateSchema>;

export const UsuarioPayloadSchema = z.object({
    nombres: z.string().optional(),
    apellidos: z.string().optional(),
    id_oficina: z.number().optional(),
    id_rol: z.number().optional(),
    ci: z.number().optional(),
    celular: z.number().optional(),
    tipo: z.string().optional(),
    correo_electronico: z.string().email().optional(),
    cargo: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    activo: z.boolean().optional(),
});
export type UsuarioPayload = z.infer<typeof UsuarioPayloadSchema>;

// ── Sub-schemas de relaciones ─────────────────────────────────────────────────
const DireccionSchema = z.object({
    id_direccion: z.number(),
    nombre: z.string(),
    departamento: z.string(),
});

const OficinaSchema = z.object({
    id_oficina: z.number(),
    nombre: z.string(),
    departamento: z.string(),
    tipo: z.string(),
    direccion: DireccionSchema.optional(),
});

const RolSchema = z.object({
    id_rol: z.number(),
    nombre: z.string(),
});

// ── Schema principal de Usuario (respuesta de la API) ─────────────────────────
export const UsuarioSchema = z.object({
    id_usuario: z.number(),
    nombres: z.string(),
    apellidos: z.string(),
    id_oficina: z.number(),
    id_rol: z.number(),
    ci: z.number(),
    celular: z.number(),
    tipo: z.string(),
    correo_electronico: z.string(),
    cargo: z.string(),
    activo: z.boolean(),
    username: z.string(),
    fecha_creacion: z.string(),
    fecha_modificacion: z.string(),
    es_eliminado: z.boolean(),
    oficina: OficinaSchema.optional(),
    rol: RolSchema.optional(),
});

export type Usuario = z.infer<typeof UsuarioSchema>;

// ── Respuesta paginada ────────────────────────────────────────────────────────
const PaginationSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
});

export const UsuarioGetAllSchema = z.object({
    message: z.string(),
    data: z.array(UsuarioSchema),
    pagination: PaginationSchema,
});
export type UsuarioGetAll = z.infer<typeof UsuarioGetAllSchema>;

export const UsuarioGetByIdSchema = z.object({
    message: z.string(),
    data: UsuarioSchema,
});
export type UsuarioGetById = z.infer<typeof UsuarioGetByIdSchema>;

export const UsuarioCreateResponseSchema = z.object({
    message: z.string(),
    data: UsuarioSchema,
});
export type UsuarioCreateResponse = z.infer<typeof UsuarioCreateResponseSchema>;

// ── Filtros de paginación ─────────────────────────────────────────────────────
export const UsuarioFiltersSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    search: z.string().optional(),
    activo: z.boolean().optional(),
    fecha_inicio: z.string().optional(),
    fecha_fin: z.string().optional(),
});
export type UsuarioFilters = z.infer<typeof UsuarioFiltersSchema>;
