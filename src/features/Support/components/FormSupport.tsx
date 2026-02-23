import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCreateSupport } from '../hooks/SupportHooks'
import { SupportCreate, SupportCreateSchema } from "../schema/SupportSchema"
import { useAuthStore } from "@/stores/auth.store"

export const FormSupport = () => {
    const { mutate: CreateSupport } = useCreateSupport();
    const { user } = useAuthStore();

    const form = useForm({
        resolver: zodResolver(SupportCreateSchema),
        defaultValues: {
            problema: "",
            id_usuario: user?.id_usuario ?? 0,
            id_equipo: 0,
            prioridad: "",
            observaciones: "",
            estado: "Pendiente",
        }
    })


    function onSubmit(data: SupportCreate) {
        CreateSupport(data);
    }


    return (
        <>
            <Card className='w-full sm:max-w-2xl'>
                <CardHeader>
                    <CardTitle>Crear Ticket de Soporte</CardTitle>
                    <CardDescription>
                        Completa la información del problema
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>

                            <Controller
                                name='problema'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Problema</FieldLabel>
                                        <Input
                                            {...field}
                                            placeholder="Describe el problema"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='id_equipo'
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
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='prioridad'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Prioridad</FieldLabel>
                                        <select
                                            {...field}
                                            className="w-full border rounded-md p-2"
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="Baja">Baja</option>
                                            <option value="Media">Media</option>
                                            <option value="Alta">Alta</option>
                                        </select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name='estado'
                                control={form.control}
                                render={({ field }) => (
                                    <Field>
                                        <FieldLabel>Estado</FieldLabel>
                                        <Input {...field} disabled />
                                    </Field>
                                )}
                            />

                            <Controller
                                name='observaciones'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Observaciones</FieldLabel>
                                        <textarea
                                            {...field}
                                            className="w-full border rounded-md p-2"
                                            rows={3}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>

                        <CardFooter className="mt-4">
                            <Button type="submit" className="w-full">
                                Crear Ticket
                            </Button>
                        </CardFooter>

                    </form>
                </CardContent>
            </Card>
        </>

    )
}
