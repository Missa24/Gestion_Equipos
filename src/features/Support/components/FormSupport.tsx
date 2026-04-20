import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateSupport } from "../hooks/SupportHooks";
import { SupportCreate, SupportCreateSchema } from "../schema/SupportSchema";
import { useAuthStore } from "@/stores/auth.store";
import { FormInput } from "@/components/form/FormInput";
import { Equipo } from "@/features/Equipos";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllEquipos } from "@/features/Equipos";

export const FormSupport = () => {
  const { mutate: CreateSupport } = useCreateSupport();

  const { data: equiposData } = useGetAllEquipos({ page: 1, limit: 100 });
  const equipos = equiposData?.data ?? [];
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
    },
  });

  function onSubmit(data: SupportCreate) {
    CreateSupport(data);
  }
  return (
    <>
      <Card className="w-full sm:max-w-2xl">
        <CardHeader>
          <CardTitle>Crear Ticket de Soporte</CardTitle>
          <CardDescription>
            Completa la información del problema
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormInput<SupportCreate>
                name="problema"
                control={form.control}
                label="problema"
                type="text"
                placeholder="ingresa el problema"
              />

              <FormInput<SupportCreate, Equipo>
                name="id_equipo"
                control={form.control}
                label="Codigo del equipo"
                type="select"
                placeholder="ingresa el codigo del equipo"
                data={equipos}
                labelKey="codigo_activo"
                valueKey="id_equipo"
              />

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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <FormInput<SupportCreate>
                name="observaciones"
                control={form.control}
                label="Observaciones"
                type="textarea"
                placeholder="Ingresa el observaciones"
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
  );
};
