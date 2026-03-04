import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUpdateSupport, useCreateSupport } from '../hooks/SupportHooks'
import { Application, SupportPayload, SupportPayloadSchema } from '../schema/SupportSchema'

type FormSupportEditProps = {
    initialData?: Application
    mode: "create" | "edit"
    onSuccess?: () => void
}

export const FormSupport = ({ initialData, mode, onSuccess }: FormSupportEditProps) => {
    const { mutate: createSupport, isPending: creating } = useCreateSupport()
    const { mutate: updateSupport, isPending: updating } = useUpdateSupport()
    const isPending = creating || updating


    const form = useForm<SupportPayload>({
        resolver: zodResolver(SupportPayloadSchema),
        defaultValues: {
            problema: initialData?.problema ?? "",
            prioridad: initialData?.prioridad ?? "",
            estado: initialData?.estado ?? "Pendiente",
            resolucion: initialData?.resolucion ?? "",
            observaciones: initialData?.observaciones ?? "",
            id_equipo: initialData?.id_equipo ?? 0,
            id_usuario: initialData?.id_usuario ?? 0,
            id_tecnico: initialData?.id_tecnico ?? undefined,
        },
    })

    function onSubmit(values: SupportPayload) {
        if (mode === "edit" && initialData) {
            updateSupport({ id: initialData.id_soporte, data: values }, { onSuccess: () => onSuccess?.() })
        } else {
            createSupport(values, { onSuccess: () => onSuccess?.() })
        }
    }
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {mode === "edit" ? "Editar Ticket" : "Nuevo Ticket"}
                </CardTitle>

                <CardDescription>
                    {mode === "edit" ? initialData?.nro_de_solicitud : "Crear nueva solicitud"}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="id_usuario"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>ID Solicitante</FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="id_tecnico"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>ID Técnico</FieldLabel>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            type="number"
                                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="prioridad"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Prioridad</FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Baja">Baja</SelectItem>
                                                <SelectItem value="Media">Media</SelectItem>
                                                <SelectItem value="Alta">Alta</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="estado"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Estado</FieldLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pendiente">Pendiente</SelectItem>
                                                <SelectItem value="En proceso">En proceso</SelectItem>
                                                <SelectItem value="Resuelto">Resuelto</SelectItem>
                                                <SelectItem value="Cancelado">Cancelado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Controller
                                name="id_equipo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>ID Equipo</FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="resolucion"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Resolución</FieldLabel>
                                        <Input
                                            {...field}
                                            value={field.value ?? ""}
                                            placeholder="Resolución del problema"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        <Controller
                            name="problema"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Problema</FieldLabel>
                                    <Textarea
                                        {...field}
                                        placeholder="Describe el problema"
                                        rows={3}
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="observaciones"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Observaciones</FieldLabel>
                                    <Textarea
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Observaciones adicionales"
                                        rows={3}
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                    </FieldGroup>

                    <CardFooter className="mt-6 px-0 pb-0">
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending
                                ? mode === "edit"
                                    ? "Guardando..."
                                    : "Creando..."
                                : mode === "edit"
                                    ? "Guardar cambios"
                                    : "Crear solicitud"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}