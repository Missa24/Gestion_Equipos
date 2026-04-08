import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useCreateEquipo, useUpdateEquipo } from "../Hooks/EquipoHooks";
import { Equipo, EquipoPayload, EquipoPayloadSchema } from "../Schema/EquipoSchema";
import { useAuthStore } from "@/stores/auth.store";

type FormEquipoProps = {
    initialData?: Equipo;
    mode: "create" | "edit";
    onSuccess?: () => void;
};

const MARCAS = ["Dell", "Aopen", "HP", "Lenovo", "Epson"];

const MODELOS = [
    "Laser Jet Pro 40",
    "L655",
    "L655 color negro",
    "Ecotank L3350",
];

const TIPOS = [
    "Impresora",
    "Computadora portátil",
    "Computadora de escritorio",
    "Scanner",
    "Disco duro externo",
    "Servidor",
    "Router",
    "Router switch",
    "Tablet",
    "Dispensador automático de tickets",
    "Memoria RAM",
    "UPS (Sistema de alimentación interrumpida)",
    "Monitor",
    "Cámara de seguridad",
    "Activo sin asignar",
    "Faltante",
];

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
            estado: initialData?.estado ?? "",
            estado_operativo: initialData?.estado_operativo ?? "",
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
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h3 className="text-base font-semibold leading-6">
                    {mode === "edit" ? "Editar equipo" : "Nuevo equipo"}
                </h3>
            </div>

            <Separator />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* ── Sección: Identificación ── */}
                <div className="space-y-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Identificación
                    </p>
                    <FieldGroup>
                        {/* Marca / Modelo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="marca"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Marca</FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger aria-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Seleccionar marca" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {MARCAS.map((m) => (
                                                    <SelectItem key={m} value={m}>{m}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger aria-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Seleccionar modelo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {MODELOS.map((m) => (
                                                    <SelectItem key={m} value={m}>{m}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Nro. de serie / Código activo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="numero_serie"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Nro. de serie</FieldLabel>
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
                                            placeholder="XXXXXX-XX"
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
                </div>

                <Separator />

                {/* ── Sección: Clasificación ── */}
                <div className="space-y-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Clasificación
                    </p>
                    <FieldGroup>
                        {/* Tipo (fila completa) */}
                        <Controller
                            name="tipo"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Tipo</FieldLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder="Seleccionar tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TIPOS.map((t) => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Estado / Estado operativo */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="estado"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Estado</FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger aria-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Seleccionar estado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Bueno">Bueno</SelectItem>
                                                <SelectItem value="Regular">Regular</SelectItem>
                                                <SelectItem value="Malo">Malo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="estado_operativo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Estado operativo</FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger aria-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Seleccionar estado operativo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Operativo">Operativo</SelectItem>
                                                <SelectItem value="Faltante">Faltante</SelectItem>
                                                <SelectItem value="Acéfalo">Acéfalo</SelectItem>
                                                <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                    </FieldGroup>
                </div>

                <Separator />

                {/* ── Sección: Ubicación y registro ── */}
                <div className="space-y-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Ubicación y registro
                    </p>
                    <FieldGroup>
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
                    </FieldGroup>
                </div>

                <Separator />

                {/* ── Sección: Asignación ── */}
                <div className="space-y-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Asignación
                    </p>
                    <FieldGroup>
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
                                            onChange={(e) => field.onChange(Number(e.target.value))}
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
                                            onChange={(e) => field.onChange(Number(e.target.value))}
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
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-2">
                    <Button type="submit" disabled={isPending} className="min-w-32">
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {mode === "edit" ? "Guardando…" : "Creando…"}
                            </>
                        ) : mode === "edit" ? (
                            "Guardar cambios"
                        ) : (
                            "Registrar equipo"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};
