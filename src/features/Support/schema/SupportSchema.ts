import z from "zod";

export const SupportCreateSchema = z.object({
    problema: z.string(),
    id_usuario: z.number(),
    id_equipo: z.number(),
    prioridad: z.string(),
    observaciones: z.string(),
    estado: z.string(),
    resolucion: z.string().optional(),
    fecha_solucion: z.date().nullable().optional(),

})

export type SupportCreate = z.infer<typeof SupportCreateSchema>;


export const SupportCreateResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        id_soporte: z.number(),
        nro_de_solicitud: z.string(),

        id_usuario: z.number().nullable(),
        id_equipo: z.number().nullable(),

        problema: z.string().nullable(),
        estado: z.string(),
        prioridad: z.string(),

        resolucion: z.string().nullable(),
        observaciones: z.string().nullable(),
        duracion: z.number().nullable(),

        fecha_solicitud: z.string().datetime(),
        fecha_solucion: z.string().datetime().nullable(),
        fecha_creacion: z.string().datetime(),
        fecha_modificacion: z.string().datetime(),

        es_eliminado: z.boolean(),

        usuario: z
            .object({
                nombres: z.string(),
                apellidos: z.string(),
                cargo: z.string(),
            })
            .nullable(),

        equipo: z
            .object({
                marca: z.string(),
                modelo: z.string(),
            })
            .nullable(),
    }),
});

export type CreateSupportResponse = z.infer<typeof SupportCreateResponseSchema>


const UsuarioSchema = z.object({
    nombres: z.string(),
    apellidos: z.string(),
    cargo: z.string(),
});

const EquipoSchema = z.object({
    marca: z.string(),
    modelo: z.string(),
});

const SolicitudSchema = z.object({
    id_soporte: z.number(),
    nro_de_solicitud: z.string(),
    id_usuario: z.number(),
    id_equipo: z.number(),
    fecha_solicitud: z.string().datetime(),
    fecha_solucion: z.string().datetime().nullable(),
    estado: z.string(),
    resolucion: z.string().nullable(),
    prioridad: z.string(),
    problema: z.string(),
    duracion: z.number().nullable(),
    observaciones: z.string(),
    fecha_creacion: z.string().datetime(),
    fecha_modificacion: z.string().datetime(),
    es_eliminado: z.boolean(),
    usuario: UsuarioSchema,
    equipo: EquipoSchema,
    id_tecnico: z.number().nullable(),
    tecnico: z.object({
        nombres: z.string(),
        apellidos: z.string(),
        cargo: z.string(),
    }).nullable(),
});

export type Application = z.infer<typeof SolicitudSchema>

const MetaSchema = z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
});

export const SupportGetAllSchema = z.object({
    message: z.string(),
    data: z.array(SolicitudSchema),
    meta: MetaSchema,
});

export type SupportGetAll = z.infer<typeof SupportGetAllSchema>;


export const SupportFiltersSchema = z.object({
    estado: z.string().optional(),
    prioridad: z.string().optional(),
    id_usuario: z.coerce.number().optional(),
    id_equipo: z.coerce.number().optional(),
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
})

export type SupportFilters = z.infer<typeof SupportFiltersSchema>


export const SupportGetIdSchema = z.object({
    message: z.string(),
    data: SolicitudSchema,
});
export type SupportGetId = z.infer<typeof SupportGetIdSchema>;

export const SupportUpdateSchema = z.object({
    estado: z.string().min(1),
    prioridad: z.string().min(1),
    problema: z.string().min(1),
    resolucion: z.string().optional(),
    observaciones: z.string().optional(),
    id_equipo: z.number().optional(),
    id_usuario: z.number().optional(),
    id_tecnico: z.number().optional(),
})

export type SupportUpdate = z.infer<typeof SupportUpdateSchema>

export const SupportPayloadSchema = z.object({
    nro_de_solicitud: z.string().optional(),
    id_usuario: z.number().optional(),
    id_tecnico: z.number().optional(),
    id_equipo: z.number().optional(),
    estado: z.string().optional(),
    prioridad: z.string().optional(),
    problema: z.string().optional(),
    resolucion: z.string().optional(),
    observaciones: z.string().optional(),
    fecha_solucion: z.union([z.date(), z.string().datetime().optional(), z.null()]).optional(),
    duracion: z.union([z.date(), z.string().datetime().optional(), z.null()]).optional(),
});

export type SupportPayload = z.infer<typeof SupportPayloadSchema>;