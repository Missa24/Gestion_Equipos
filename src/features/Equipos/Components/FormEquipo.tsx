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
import { useCreateEquipo, useUpdateEquipo } from "../Hooks/EquipoHooks";
import { Equipo, EquipoPayload, EquipoPayloadSchema } from "../Schema/EquipoSchema";
import { useAuthStore } from "@/stores/auth.store";

type FormEquipoProps = {
    initialData?: Equipo;
    mode: "create" | "edit";
    onSuccess?: () => void;
};

export const FormEquipo = ({ initialData, mode, onSuccess }: FormEquipoProps) => {
    const { user } = useAuthStore();
    const { mutate: createEquipo, isPending: creating } = useCreateEquipo();
    const { mutate: updateEquipo, isPending: updating } = useUpdateEquipo();
    const isPending = creating || updating;

    const form = useForm<EquipoPayload>({
        resolver: zodResolver(EquipoPayloadSchema),
        defaultValues: {
            id_usuario: initialData?.id_usuario ?? user?.id_usuario ?? 0,
            id_oficina: initialData?.id_oficina ?? user?.oficina?.id_oficina ?? 0,
            marca: initialData?.marca ?? "",
            modelo: initialData?.modelo ?? "",
            numero_serie: initialData?.numero_serie ?? "",
            estado: initialData?.estado ?? "Activo",
            ubicacion: initialData?.ubicacion ?? "",
            fecha_adquisicion: initialData?.fecha_adquisicion
                ? initialData.fecha_adquisicion.substring(0, 10)
                : "",
            codigo_activo: initialData?.codigo_activo ?? "",
            tipo: initialData?.tipo ?? "",
        },
    });

    function onSubmit(values: EquipoPayload) {
        if (mode === "edit" && initialData) {
            updateEquipo(
                { id: initialData.id_equipo, data: values },
                { onSuccess: () => onSuccess?.() }
            );
        } else {
            createEquipo(values, { onSuccess: () => onSuccess?.() });
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{mode === "edit" ? "Editar Equipo" : "Nuevo Equipo"}</CardTitle>
                <CardDescription>
                    {mode === "edit"
                        ? `${initialData?.marca} ${initialData?.modelo} — N° ${initialData?.numero_serie}`
                        : "Registra un nuevo equipo en el sistema"}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Marca / Modelo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="marca"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Marca</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Dell, HP, Lenovo…"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="modelo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Modelo</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Latitude 5540, ThinkPad…"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Tipo / Estado */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                                <SelectItem value="Laptop">Laptop</SelectItem>
                                                <SelectItem value="Desktop">Desktop</SelectItem>
                                                <SelectItem value="Servidor">Servidor</SelectItem>
                                                <SelectItem value="Impresora">Impresora</SelectItem>
                                                <SelectItem value="Tablet">Tablet</SelectItem>
                                                <SelectItem value="Monitor">Monitor</SelectItem>
                                                <SelectItem value="Otro">Otro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="estado"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Estado</FieldLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger aria-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Activo">Activo</SelectItem>
                                                <SelectItem value="Inactivo">Inactivo</SelectItem>
                                                <SelectItem value="En mantenimiento">
                                                    En mantenimiento
                                                </SelectItem>
                                                <SelectItem value="Dañado">Dañado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Número de serie / Código activo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="numero_serie"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Número de serie</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="SN-XXXXXXXXX"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="codigo_activo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Código activo</FieldLabel>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            placeholder="ACT-0001 (opcional)"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Ubicación / Fecha adquisición */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="ubicacion"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Ubicación</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Oficina central, Piso 2…"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="fecha_adquisicion"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Fecha de adquisición</FieldLabel>
                                        <Input
                                            {...field}
                                            type="date"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* ID Usuario / ID Oficina */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="id_usuario"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>ID Usuario responsable</FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) =>
                                                field.onChange(Number(e.target.value))
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
                                name="id_oficina"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>ID Oficina</FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) =>
                                                field.onChange(Number(e.target.value))
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
                    </FieldGroup>

                    <CardFooter className="mt-6 px-0 pb-0">
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending
                                ? mode === "edit"
                                    ? "Guardando..."
                                    : "Creando..."
                                : mode === "edit"
                                    ? "Guardar cambios"
                                    : "Registrar equipo"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};
