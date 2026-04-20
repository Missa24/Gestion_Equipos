import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormInput } from "@/components/form/FormInput";
import { useCreateSystem, useUpdateSystem } from "../Hooks/SystemHook";
import {
  CreateSystemSchema,
  CreateSystemForm,
  Sistema,
} from "../Schema/SystemSchema";
import { CategoriaPopover } from "@/features/Category/Components/CategoriaPopover";
import { useGetAllCategorias } from "@/features/Category/Hooks/CategoryHook";
import { Category } from "@/features/Category/Schema/CategorySchema";
import { useGetAllServidores } from "@/features/Servidor/Hooks/ServidorHook";
import { Servidor } from "@/features/Servidor/Schema/ServidorSchema";

// mocks temporales — reemplazar por hooks reales cuando estén listos

const basesDeDatos = [
  { id_base_de_datos: 1, nombre: "DB_Gestion_Principal" },
  { id_base_de_datos: 2, nombre: "DB_Gestion_Reportes" },
  { id_base_de_datos: 3, nombre: "DB_Reportes" },
];

type FormSystemEditProps = {
  initialData?: Sistema;
  mode: "create" | "edit";
  onSuccess?: () => void;
};

export const FormSystemEdit = ({
  initialData,
  mode,
  onSuccess,
}: FormSystemEditProps) => {
  const { mutate: createSystem, isPending: creating } = useCreateSystem();
  const { mutate: updateSystem, isPending: updating } = useUpdateSystem();
  const { data: categorias = [] } = useGetAllCategorias({ limit: 100 });
  const { data: servidores = [] } = useGetAllServidores({ limit: 100 });
  const isPending = creating || updating;

  const form = useForm<CreateSystemForm>({
    resolver: zodResolver(CreateSystemSchema),
    defaultValues: {
      nombre: initialData?.nombre ?? "",
      version: initialData?.version ?? "",
      estado: initialData?.estado ?? "Activo",
      url: initialData?.url ?? "",
      direccion_ip: initialData?.direccion_ip ?? "",
      tamaño: initialData?.tamaño ?? "",
      id_servidor: initialData?.id_servidor ?? 0,
      categorias:
        initialData?.sistemaCategoria?.map((sc) => sc.categoria.id_categoria) ??
        [],
      bases_de_datos:
        initialData?.baseDeDatos?.map((bd) => bd.id_base_de_datos) ?? [],
    },
  });

  function onSubmit(values: CreateSystemForm) {
    if (mode === "edit" && initialData) {
      updateSystem(
        { id: initialData.id_sistema, data: values },
        { onSuccess: () => onSuccess?.() },
      );
    } else {
      createSystem(values, { onSuccess: () => onSuccess?.() });
    }
  }

  return (
    <Card className="w-full">
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateSystemForm>
                name="nombre"
                control={form.control}
                label="Nombre del sistema"
                type="text"
                placeholder="Ej: Sistema de Gestión"
              />
              <FormInput<CreateSystemForm>
                name="version"
                control={form.control}
                label="Versión"
                type="text"
                placeholder="Ej: 1.0.0"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateSystemForm>
                name="url"
                control={form.control}
                label="URL"
                type="text"
                placeholder="Ej: https://sistema.gob.bo"
              />
              <FormInput<CreateSystemForm>
                name="direccion_ip"
                control={form.control}
                label="Dirección IP"
                type="text"
                placeholder="Ej: 192.168.1.10"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<CreateSystemForm>
                name="tamaño"
                control={form.control}
                label="Tamaño"
                type="text"
                placeholder="Ej: 200MB"
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
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                        <SelectItem value="En mantenimiento">
                          En mantenimiento
                        </SelectItem>
                        <SelectItem value="En desarrollo">
                          En desarrollo
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
            <FormInput<CreateSystemForm, Servidor>
              name="id_servidor"
              control={form.control}
              label="Servidor"
              type="select"
              placeholder="Seleccionar servidor"
              data={servidores}
              valueKey="id_servidor"
              labelKey="nombre"
            />
            <div>
              <FormInput<CreateSystemForm, Category>
                name="categorias"
                control={form.control}
                label="Categorías"
                type="multi-select"
                placeholder="Seleccionar categorías"
                data={categorias}
                valueKey="id_categoria"
                labelKey="nombre"
              />
              <CategoriaPopover
                onCreated={(nueva) => {
                  const actuales = form.getValues("categorias") ?? [];
                  form.setValue("categorias", [
                    ...actuales,
                    nueva.id_categoria,
                  ]);
                }}
              />
            </div>

            {/* Bases de datos */}
            <FormInput<CreateSystemForm, (typeof basesDeDatos)[0]>
              name="bases_de_datos"
              control={form.control}
              label="Bases de datos"
              type="multi-select"
              placeholder="Seleccionar bases de datos"
              data={basesDeDatos}
              valueKey="id_base_de_datos"
              labelKey="nombre"
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
                  : "Crear sistema"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
