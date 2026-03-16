import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateUsuario, useUpdateUsuario } from "../Hooks/UsuarioHooks";
import { Usuario, UsuarioPayload, UsuarioPayloadSchema } from "../Schema/UsuarioSchema";

type FormUsuarioProps = {
    initialData?: Usuario;
    mode: "create" | "edit";
    onSuccess?: () => void;
};

export const FormUsuario = ({ initialData, mode, onSuccess }: FormUsuarioProps) => {
    const { mutate: createUsuario, isPending: creating } = useCreateUsuario();
    const { mutate: updateUsuario, isPending: updating } = useUpdateUsuario();
    const isPending = creating || updating;

    const form = useForm<UsuarioPayload>({
        resolver: zodResolver(UsuarioPayloadSchema),
        defaultValues: {
            nombres: initialData?.nombres ?? "",
            apellidos: initialData?.apellidos ?? "",
            id_oficina: initialData?.id_oficina ?? undefined,
            id_rol: initialData?.id_rol ?? undefined,
            ci: initialData?.ci ?? undefined,
            celular: initialData?.celular ?? undefined,
            tipo: initialData?.tipo ?? "",
            correo_electronico: initialData?.correo_electronico ?? "",
            cargo: initialData?.cargo ?? "",
            username: initialData?.username ?? "",
            password: "",
            activo: initialData?.activo ?? true,
        },
    });

    function onSubmit(values: UsuarioPayload) {
        // En modo edición, no enviar password si está vacío
        if (mode === "edit") {
            if (!values.password) {
                delete values.password;
            }
        }

        if (mode === "edit" && initialData) {
            updateUsuario(
                { id: initialData.id_usuario, data: values },
                { onSuccess: () => onSuccess?.() }
            );
        } else {
            createUsuario(values, { onSuccess: () => onSuccess?.() });
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{mode === "edit" ? "Editar Usuario" : "Nuevo Usuario"}</CardTitle>
                <CardDescription>
                    {mode === "edit"
                        ? `${initialData?.nombres} ${initialData?.apellidos} — @${initialData?.username}`
                        : "Registra un nuevo usuario en el sistema"}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Nombres / Apellidos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="nombres"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Nombres</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Juan Carlos"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="apellidos"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Apellidos</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Mamani Quispe"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Cargo / Tipo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="cargo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Cargo</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Técnico de sistemas"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="tipo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Tipo</FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger aria-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Seleccionar tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="INTERNO">INTERNO</SelectItem>
                                                <SelectItem value="EXTERNO">EXTERNO</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* CI / Celular */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="ci"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>CI</FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value ? Number(e.target.value) : undefined
                                                )
                                            }
                                            placeholder="12345678"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="celular"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Celular</FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value ? Number(e.target.value) : undefined
                                                )
                                            }
                                            placeholder="70012345"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Correo */}
                        <Controller
                            name="correo_electronico"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Correo electrónico</FieldLabel>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="usuario@ejemplo.com"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Username / Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Username</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="jmamani"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Contraseña{" "}
                                            {mode === "edit" && (
                                                <span className="text-xs text-muted-foreground font-normal">
                                                    (dejar vacío para no cambiar)
                                                </span>
                                            )}
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder={
                                                mode === "edit" ? "••••••••" : "Mín. 6 caracteres"
                                            }
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* ID Oficina / ID Rol */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="id_oficina"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>ID Oficina</FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value ? Number(e.target.value) : undefined
                                                )
                                            }
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="id_rol"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>ID Rol</FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            value={field.value ?? ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value ? Number(e.target.value) : undefined
                                                )
                                            }
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Estado activo (solo en edición) */}
                        {mode === "edit" && (
                            <Controller
                                name="activo"
                                control={form.control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel>Estado</FieldLabel>
                                        <Select
                                            value={field.value ? "true" : "false"}
                                            onValueChange={(v) => field.onChange(v === "true")}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Activo</SelectItem>
                                                <SelectItem value="false">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                )}
                            />
                        )}
                    </FieldGroup>

                    <CardFooter className="mt-6 px-0 pb-0">
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending
                                ? mode === "edit"
                                    ? "Guardando..."
                                    : "Creando..."
                                : mode === "edit"
                                    ? "Guardar cambios"
                                    : "Registrar usuario"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};
