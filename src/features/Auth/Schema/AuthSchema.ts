import { z } from "zod";

export const LoginSchema = z.object({
    correo_electronico: z.string(),
    password: z.string(),
})

export type Login = z.infer<typeof LoginSchema>;

export const DireccionSchema = z.object({
    id_direccion: z.number(),
    nombre: z.string(),
    departamento: z.string(),
});

export const OficinaSchema = z.object({
    id_oficina: z.number(),
    nombre: z.string(),
    departamento: z.string(),
    tipo: z.string(),
    direccion: DireccionSchema,
});

export const RolSchema = z.object({
    id_rol: z.number(),
    nombre: z.string(),
    id_oficina: z.number(),
});

export const MenuSchema = z.object({
    id_menu: z.number(),
    id_rol: z.number(),
    icono: z.string(),
    nombre: z.string(),
    url: z.string(),
});

export const UserDataSchema = z.object({
    id_usuario: z.number(),
    nombres: z.string(),
    apellidos: z.string(),
    ci: z.number(),
    celular: z.number(),
    tipo: z.string(),
    correo_electronico: z.string().email(),
    cargo: z.string(),
    activo: z.boolean(),
    username: z.string(),
    oficina: OficinaSchema,
    rol: RolSchema,
    menus: z.array(MenuSchema),
});

export const LoginResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        accessToken: z.string(),
        userData: UserDataSchema,
    }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;