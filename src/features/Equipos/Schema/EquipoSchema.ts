import z from "zod";

// ── Schema de creación (espeja CreateEquipoSchema del backend) ──────────────
export const EquipoCreateSchema = z.object({
    id_usuario: z.number().int().positive("ID de usuario inválido"),
    id_oficina: z.number().int().positive("ID de oficina inválido"),
    marca: z.string().min(1, "La marca es requerida").max(100),
    modelo: z.string().min(1, "El modelo es requerido").max(100),
    numero_serie: z.string().min(1, "El número de serie es requerido").max(150),
    estado: z.string().min(1, "El estado es requerido"),
    estado_operativo: z.string().min(1, "El estado operativo es requerido"),
    ubicacion: z.string().min(1, "La ubicación es requerida").max(255),
    fecha_adquisicion: z.string().min(1, "La fecha de adquisición es requerida"),
    codigo_activo: z.string().max(100).optional().nullable(),
    tipo: z.string().min(1, "El tipo es requerido"),
});

export type EquipoCreate = z.infer<typeof EquipoCreateSchema>;

// ── Schema para actualización (todos los campos opcionales) ──────────────────
export const EquipoUpdateSchema = EquipoCreateSchema.partial();
export type EquipoUpdate = z.infer<typeof EquipoUpdateSchema>;

// ── Schema de payload genérico ───────────────────────────────────────────────
export const EquipoPayloadSchema = z.object({
    id_usuario: z.number().optional(),
    id_oficina: z.number().optional(),
    marca: z.string().optional(),
    modelo: z.string().optional(),
    numero_serie: z.string().optional(),
    estado: z.string().optional(),
    estado_operativo: z.string().optional(),
    ubicacion: z.string().optional(),
    fecha_adquisicion: z.string().optional(),
    codigo_activo: z.string().nullable().optional(),
    tipo: z.string().optional(),
});
export type EquipoPayload = z.infer<typeof EquipoPayloadSchema>;

// ── Sub-schemas de relaciones devueltas por el backend ───────────────────────
const ComponenteSchema = z.object({
    id_componente: z.number(),
    marca: z.string().nullable(),
    modelo: z.string().nullable(),
    capacidad: z.string().nullable(),
    numero_serie: z.string().nullable(),
    tipoComponente: z.object({
        id_tipo: z.number(),
        nombre: z.string(),
    }),
});

const EquipoUsuarioSchema = z.object({
    id_asignacion: z.number(),
    id_usuario: z.number(),
    fecha_asignacion: z.string(),
    fecha_de_baja: z.string().nullable(),
    usuario: z.object({
        id_usuario: z.number(),
        nombres: z.string(),
        apellidos: z.string(),
        cargo: z.string(),
    }),
});

// ── Schema de equipo completo (respuesta de la API) ───────────────────────────
export const EquipoSchema = z.object({
    id_equipo: z.number(),
    id_usuario: z.number(),
    id_oficina: z.number(),
    marca: z.string(),
    modelo: z.string(),
    numero_serie: z.string(),
    estado: z.string(),
    estado_operativo: z.string(),
    ubicacion: z.string(),
    fecha_adquisicion: z.string(),
    codigo_activo: z.string().nullable(),
    tipo: z.string(),
    fecha_creacion: z.string(),
    fecha_modificacion: z.string(),
    es_eliminado: z.boolean(),
    equiposUsuario: z.array(EquipoUsuarioSchema).optional().default([]),
    componentes: z.array(ComponenteSchema).optional().default([]),
});

export type Equipo = z.infer<typeof EquipoSchema>;

// ── Respuesta paginada ────────────────────────────────────────────────────────
const PaginationSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
});

export const EquipoGetAllSchema = z.object({
    message: z.string(),
    data: z.array(EquipoSchema),
    pagination: PaginationSchema,
});
export type EquipoGetAll = z.infer<typeof EquipoGetAllSchema>;

// ── Respuesta de un equipo por ID ─────────────────────────────────────────────
export const EquipoGetByIdSchema = z.object({
    message: z.string(),
    data: EquipoSchema,
});
export type EquipoGetById = z.infer<typeof EquipoGetByIdSchema>;

// ── Respuesta de creación ─────────────────────────────────────────────────────
export const EquipoCreateResponseSchema = z.object({
    message: z.string(),
    data: EquipoSchema,
});
export type EquipoCreateResponse = z.infer<typeof EquipoCreateResponseSchema>;

// ── Filtros de paginación (espeja EquipoPaginationQuerySchema del backend) ───
export const EquipoFiltersSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    estado: z.string().optional(),
    estado_operativo: z.string().optional(),
    tipo: z.string().optional(),
    id_usuario: z.number().optional(),
    search: z.string().optional(),
    fecha_inicio: z.string().optional(),
    fecha_fin: z.string().optional(),
});
export type EquipoFilters = z.infer<typeof EquipoFiltersSchema>;
