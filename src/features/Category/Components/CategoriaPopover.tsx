import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useCreateCategoria, useGetAllCategorias } from "../Hooks/CategoryHook";
import {
  CreateCategoriaSchema,
  CreateCategoriaForm,
  Category,
  CategoriaCreada,
} from "../Schema/CategorySchema";

type CategoriaPopoverProps = {
  onCreated: (categoria: CategoriaCreada) => void;
};

export function CategoriaPopover({ onCreated }: CategoriaPopoverProps) {
  const [open, setOpen] = useState(false);
  const { mutate: createCategoria, isPending } = useCreateCategoria();

  const { data: categorias = [] } = useGetAllCategorias({ limit: 100 });
  const tipos: string[] = Array.from(
    new Set(
      categorias
        .map((c: Category) => c.tipo_categoria)
        .filter((t): t is string => t !== null && t !== ""),
    ),
  );

  const form = useForm<CreateCategoriaForm>({
    resolver: zodResolver(CreateCategoriaSchema),
    mode: "onSubmit",
    defaultValues: {
      nombre: "",
      tipo_categoria: undefined,
    },
  });

  const tipoValue = useWatch({
    control: form.control,
    name: "tipo_categoria",
  });

  function onSubmit(values: CreateCategoriaForm) {
    createCategoria(values, {
      onSuccess: (nueva) => {
        onCreated(nueva);
        form.reset();
        setOpen(false);
      },
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 flex items-center gap-1 mt-1"
        >
          <Plus className="h-3 w-3" />
          Crear nueva categoría
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-72" align="start">
        <p className="text-sm font-medium mb-3">Nueva categoría</p>

        <FieldGroup>
          <Controller
            name="nombre"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Nombre</FieldLabel>
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Ej: Vue JS"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Field data-invalid={!!form.formState.errors.tipo_categoria}>
            <FieldLabel>
              Tipo <span className="text-muted-foreground">(opcional)</span>
            </FieldLabel>
            <Select
              value={tipoValue ?? ""}
              onValueChange={(val) => form.setValue("tipo_categoria", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                {tipos.length > 0 ? (
                  tipos.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="otro" disabled>
                    Sin tipos registrados
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        <Button
          type="button"
          size="sm"
          className="w-full mt-3"
          disabled={isPending}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isPending ? "Creando..." : "Crear"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
