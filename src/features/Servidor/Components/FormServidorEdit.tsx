"use client";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormInput } from "@/components/form/FormInput";

import {
  CreateServidorSchema,
  CreateServidorForm,
  UpdateServidorForm,
  Servidor,
} from "../Schema/ServidorSchema";

import { useCreateServidor, useUpdateServidor } from "../Hooks/ServidorHook";

type FormServidorEditProps = {
  initialData?: Servidor;
  mode: "create" | "edit";
  onSuccess?: () => void;
};

export const FormServidorEdit = ({
  initialData,
  mode,
  onSuccess,
}: FormServidorEditProps) => {
  const { mutate: createServidor, isPending: creating } = useCreateServidor();
  const { mutate: updateServidor, isPending: updating } = useUpdateServidor();

  const isPending = creating || updating;

  const form = useForm<CreateServidorForm>({
    resolver: zodResolver(CreateServidorSchema),
    defaultValues: {
      nombre: initialData?.nombre ?? "",
      capacidad: initialData?.capacidad ?? "",
      tipo: initialData?.tipo ?? "",
      ip: initialData?.ip ?? "",
      mascara_red: initialData?.mascara_red ?? "",
      hostname: initialData?.hostname ?? "",
      ubicacion: initialData?.ubicacion ?? "",
      estado: initialData?.estado ?? "Activo",
      fecha_creacion: initialData?.fecha_creacion
        ? initialData.fecha_creacion.split("T")[0]
        : "",
      fecha_expiracion: initialData?.fecha_expiracion
        ? initialData.fecha_expiracion.split("T")[0]
        : "",
    },
  });

  function onSubmit(values: CreateServidorForm) {
    if (mode === "edit" && initialData) {
      const data: UpdateServidorForm = values;

      updateServidor(
        { id: initialData.id_servidor, data },
        { onSuccess: () => onSuccess?.() },
      );
    } else {
      createServidor(values, {
        onSuccess: () => onSuccess?.(),
      });
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{mode === "edit" ? " Servidor" : "Servidor"}</CardTitle>

        <CardDescription>
          {mode === "edit" ? initialData?.nombre : "Crear nueva solicitud"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateServidorForm>
                name="nombre"
                control={form.control}
                label="Nombre del servidor"
                type="text"
                placeholder="Ej: Servidor Principal"
              />
              <FormInput<CreateServidorForm>
                name="tipo"
                control={form.control}
                label="Tipo"
                type="text"
                placeholder="Ej: VPS, Cloud, Físico"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateServidorForm>
                name="ip"
                control={form.control}
                label="IP"
                type="text"
                placeholder="Ej: 192.168.1.10"
              />
              <FormInput<CreateServidorForm>
                name="mascara_red"
                control={form.control}
                label="Máscara de red"
                type="text"
                placeholder="Ej: 255.255.255.0"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateServidorForm>
                name="hostname"
                control={form.control}
                label="Hostname"
                type="text"
                placeholder="Ej: srv-prod-01"
              />
              <FormInput<CreateServidorForm>
                name="ubicacion"
                control={form.control}
                label="Ubicación"
                type="text"
                placeholder="Ej: Data Center La Paz"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateServidorForm>
                name="capacidad"
                control={form.control}
                label="Capacidad"
                type="text"
                placeholder="Ej: 16GB RAM / 500GB SSD"
              />

              <Controller
                name="estado"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Estado</FieldLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                        <SelectItem value="Mantenimiento">
                          Mantenimiento
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateServidorForm>
                name="fecha_creacion"
                control={form.control}
                label="Fecha de creación"
                type="date"
              />
              <FormInput<CreateServidorForm>
                name="fecha_expiracion"
                control={form.control}
                label="Fecha de expiración"
                type="date"
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
                  : "Crear servidor"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
