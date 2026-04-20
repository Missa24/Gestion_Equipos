"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/FormInput";

import {
  CreateBaseDatosSchema,
  CreateBaseDatosForm,
  UpdateBaseDatosForm,
  BaseDatos,
} from "../Schema/databaseSchemta";
import { useCreateBaseDatos, useUpdateBaseDatos } from "../Hooks/databaseHook";

type FormBaseDatosProps = {
  initialData?: BaseDatos;
  mode: "create" | "edit";
  onSuccess?: () => void;
};

export const FormBaseDatos = ({
  initialData,
  mode,
  onSuccess,
}: FormBaseDatosProps) => {
  const { mutate: createBaseDatos, isPending: creating } = useCreateBaseDatos();
  const { mutate: updateBaseDatos, isPending: updating } = useUpdateBaseDatos();

  const isPending = creating || updating;

  const form = useForm<CreateBaseDatosForm>({
    resolver: zodResolver(CreateBaseDatosSchema),
    defaultValues: {
      nombre: initialData?.nombre ?? "",
      motor: initialData?.motor ?? "",
      host: initialData?.host ?? "",
      puerto: initialData?.puerto ?? "",
      url_git: initialData?.url_git ?? "",
    },
  });

  function onSubmit(values: CreateBaseDatosForm) {
    if (mode === "edit" && initialData) {
      const data: UpdateBaseDatosForm = values;
      updateBaseDatos(
        { id: initialData.id_base_de_datos, data },
        { onSuccess: () => onSuccess?.() },
      );
    } else {
      createBaseDatos(values, { onSuccess: () => onSuccess?.() });
    }
  }

  return (
    <Card className="w-full">
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateBaseDatosForm>
                name="nombre"
                control={form.control}
                label="Nombre de la base de datos"
                type="text"
                placeholder="Ej: Base Producción"
              />
              <FormInput<CreateBaseDatosForm>
                name="motor"
                control={form.control}
                label="Motor"
                type="text"
                placeholder="Ej: MySQL, PostgreSQL"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateBaseDatosForm>
                name="host"
                control={form.control}
                label="Host"
                type="text"
                placeholder="Ej: 192.168.1.50"
              />
              <FormInput<CreateBaseDatosForm>
                name="puerto"
                control={form.control}
                label="Puerto"
                type="text"
                placeholder="Ej: 3306"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <FormInput<CreateBaseDatosForm>
                name="url_git"
                control={form.control}
                label="URL Git"
                type="text"
                placeholder="Ej: https://github.com/mi-repo"
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
                  : "Crear base de datos"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
