import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useState } from "react";
import { useCreateEquipo, useUpdateEquipo } from "../Hooks/EquipoHooks";
import {
  Equipo,
  EquipoPayload,
  EquipoPayloadSchema,
} from "../Schema/EquipoSchema";
import { useAuthStore } from "@/stores/auth.store";
import { FormInput } from "@/components/form/FormInput";
import { useGetAllUsuarios, Usuario } from "@/features/Usuarios";
import { Oficina } from "@/features/Oficina/Schema/OficinaSchema";
import { useGetAllOficinas } from "@/features/Oficina/Hook/OficinaHook";

type FormEquipoProps = {
  initialData?: Equipo;
  mode: "create" | "edit";
  onSuccess?: () => void;
};

// ── Listas de componentes ────────────────────────────────────────────────────
const COMPONENTES_INTERNOS = [
  "Placa madre",
  "Procesador (CPU)",
  "Memoria (RAM)",
  "Disco duro (HDD o SSD)",
  "Fuente de poder (PSU)",
  "Tarjeta gráfica (GPU)",
  "Sistema de refrigeración",
  "Tarjeta de red (NIC)",
  "Tarjeta de sonido",
];

const DISPOSITIVOS_ENTRADA = [
  "Teclado",
  "Mouse",
  "Micrófono",
  "Cámara web",
  "Scanner",
];

const DISPOSITIVOS_SALIDA = [
  "Monitor",
  "Impresora",
  "Parlantes",
  "Audífonos",
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

// ── Componente: panel multi-selección con toggle ─────────────────────────────
type MultiSelectPanelProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
};

function MultiSelectPanel({ label, options, selected, onChange }: MultiSelectPanelProps) {
  const [open, setOpen] = useState(false);

  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  const count = selected.length;

  return (
    <div className="rounded-md border bg-background">
      {/* Botón toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors rounded-md"
      >
        <span className="flex items-center gap-2">
          {label}
          {count > 0 && (
            <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground font-semibold">
              {count}
            </span>
          )}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Lista de opciones */}
      {open && (
        <div className="border-t px-3 py-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-left transition-colors ${
                  checked
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-muted/50 text-foreground"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    checked
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/40"
                  }`}
                >
                  {checked && <Check className="h-3 w-3 text-primary-foreground" />}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      )}

      {/* Resumen de seleccionados (cuando está cerrado) */}
      {count > 0 && !open && (
        <div className="border-t px-3 py-2 flex flex-wrap gap-1">
          {selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-full border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Formulario principal ─────────────────────────────────────────────────────
export const FormEquipo = ({
  initialData,
  mode,
  onSuccess,
}: FormEquipoProps) => {
  const { user } = useAuthStore();
  const { mutate: createEquipo, isPending: creating } = useCreateEquipo();
  const { mutate: updateEquipo, isPending: updating } = useUpdateEquipo();
  const { data: oficinas } = useGetAllOficinas({ limit: 100 });
  const { data: usuariosData } = useGetAllUsuarios({ page: 1, limit: 100 });
  const usuarios = usuariosData?.data ?? [];
  const isPending = creating || updating;

  // Parsear componentes guardados previamente
  const parseComponentes = (raw: string | null | undefined) => {
    try { return JSON.parse(raw ?? "{}"); } catch { return {}; }
  };
  const savedComp = parseComponentes(initialData?.componentes_descripcion);

  const [internos, setInternos] = useState<string[]>(savedComp.internos ?? []);
  const [entrada, setEntrada] = useState<string[]>(savedComp.entrada ?? []);
  const [salida, setSalida] = useState<string[]>(savedComp.salida ?? []);
  const [descComponentes, setDescComponentes] = useState<string>(savedComp.descripcion ?? "");

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
      componentes_descripcion: initialData?.componentes_descripcion ?? "",
    },
  });

  function onSubmit(values: EquipoPayload) {
    const componentesJson = JSON.stringify({
      internos,
      entrada,
      salida,
      descripcion: descComponentes,
    });

    const payload: EquipoPayload = {
      ...values,
      componentes_descripcion: componentesJson,
    };

    if (mode === "edit" && initialData) {
      updateEquipo(
        { id: initialData.id_equipo, data: payload },
        { onSuccess: () => onSuccess?.() }
      );
    } else {
      createEquipo(payload, { onSuccess: () => onSuccess?.() });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold leading-6">
          {mode === "edit" ? "Editar equipo" : "Nuevo equipo"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "edit"
            ? `${initialData?.marca} ${initialData?.modelo} — N° ${initialData?.numero_serie}`
            : "Completa los campos para registrar un nuevo equipo."}
        </p>
      </div>

      <Separator />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* ── Identificación ── */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Identificación
          </p>
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="marca"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Marca</FieldLabel>
                    <Input {...field} placeholder="Dell, HP, Lenovo…" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="modelo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Modelo</FieldLabel>
                    <Input {...field} placeholder="OptiPlex 7050, ThinkPad…" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="numero_serie"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nro. de serie</FieldLabel>
                    <Input {...field} placeholder="SN-XXXXXXXXX" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="codigo_activo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Código activo</FieldLabel>
                    <Input {...field} value={field.value ?? ""} placeholder="ACT-0001 (opcional)" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </div>

        <Separator />

        {/* ── Clasificación ── */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Clasificación
          </p>
          <FieldGroup>
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
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
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </div>

        <Separator />

        {/* ── Componentes físicos ── */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Componentes físicos
          </p>
          <div className="space-y-3">
            <MultiSelectPanel
              label="Componentes internos"
              options={COMPONENTES_INTERNOS}
              selected={internos}
              onChange={setInternos}
            />
            <MultiSelectPanel
              label="Dispositivos de entrada"
              options={DISPOSITIVOS_ENTRADA}
              selected={entrada}
              onChange={setEntrada}
            />
            <MultiSelectPanel
              label="Dispositivos de salida"
              options={DISPOSITIVOS_SALIDA}
              selected={salida}
              onChange={setSalida}
            />
            <Field>
              <FieldLabel>Descripción de componentes</FieldLabel>
              <Textarea
                value={descComponentes}
                onChange={(e) => setDescComponentes(e.target.value)}
                placeholder="Ej: RAM 8GB DDR4, SSD 256GB Samsung, monitor 24'' Full HD…"
                className="min-h-20 resize-none"
              />
            </Field>
          </div>
        </div>

        <Separator />

        {/* ── Ubicación y registro ── */}
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
                    <Input {...field} placeholder="Oficina central, Piso 2…" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="fecha_adquisicion"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Fecha de adquisición</FieldLabel>
                    <Input {...field} type="date" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </div>

        <Separator />

        {/* ── Asignación ── */}
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Asignación
          </p>
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput<EquipoPayload, Usuario>
                name="id_usuario"
                control={form.control}
                label="Nombre del solicitante"
                type="select"
                placeholder="Seleccionar usuario"
                data={usuarios}
                valueKey="id_usuario"
                labelKey="nombres"
              />
              <FormInput<EquipoPayload, Oficina>
                name="id_oficina"
                control={form.control}
                label="Oficina"
                type="select"
                placeholder="Seleccionar oficina"
                data={oficinas}
                valueKey="id_oficina"
                labelKey="nombre"
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
