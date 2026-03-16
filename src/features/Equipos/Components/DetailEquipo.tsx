import { Equipo } from "../Schema/EquipoSchema";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Cpu, Hash, MapPin, Monitor, Tag, User } from "lucide-react";

type DetailEquipoProps = {
    equipo: Equipo;
};

const estadoColor: Record<string, string> = {
    Activo: "bg-green-100 text-green-700 border-green-200",
    Inactivo: "bg-gray-100 text-gray-600 border-gray-200",
    "En mantenimiento": "bg-yellow-100 text-yellow-700 border-yellow-200",
    Dañado: "bg-red-100 text-red-700 border-red-200",
};

function formatDate(dateStr: string | null | undefined) {
    if (!dateStr) return "—";
    return new Intl.DateTimeFormat("es-BO", { dateStyle: "long" }).format(new Date(dateStr));
}

export const DetailEquipo = ({ equipo }: DetailEquipoProps) => {
    const usuarioActual = equipo.equiposUsuario?.find((eu) => !eu.fecha_de_baja);

    return (
        <div className="space-y-5 text-sm">
            {/* Encabezado */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">
                        {equipo.marca} {equipo.modelo}
                    </h3>
                    <p className="text-muted-foreground font-mono text-xs mt-0.5">
                        N° Serie: {equipo.numero_serie}
                    </p>
                </div>
                <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shrink-0 ${estadoColor[equipo.estado] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
                >
                    {equipo.estado}
                </span>
            </div>

            <Separator />

            {/* Información general */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                <InfoItem icon={<Monitor className="h-4 w-4" />} label="Tipo" value={equipo.tipo} />
                <InfoItem
                    icon={<MapPin className="h-4 w-4" />}
                    label="Ubicación"
                    value={equipo.ubicacion}
                />
                <InfoItem
                    icon={<Tag className="h-4 w-4" />}
                    label="Código activo"
                    value={equipo.codigo_activo ?? "—"}
                />
                <InfoItem
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Fecha adquisición"
                    value={formatDate(equipo.fecha_adquisicion)}
                />
                <InfoItem
                    icon={<Hash className="h-4 w-4" />}
                    label="ID Oficina"
                    value={String(equipo.id_oficina)}
                />
            </div>

            {/* Usuario asignado */}
            {usuarioActual && (
                <>
                    <Separator />
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Usuario asignado
                        </p>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                                {usuarioActual.usuario.nombres}{" "}
                                {usuarioActual.usuario.apellidos}
                            </span>
                            <span className="text-muted-foreground text-xs">
                                — {usuarioActual.usuario.cargo}
                            </span>
                        </div>
                    </div>
                </>
            )}

            {/* Componentes */}
            {equipo.componentes && equipo.componentes.length > 0 && (
                <>
                    <Separator />
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Componentes ({equipo.componentes.length})
                        </p>
                        <div className="space-y-2">
                            {equipo.componentes.map((comp) => (
                                <div
                                    key={comp.id_componente}
                                    className="flex items-center gap-3 rounded-md border px-3 py-2 bg-muted/30"
                                >
                                    <Cpu className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <div className="min-w-0">
                                        <p className="font-medium truncate">
                                            {comp.tipoComponente.nombre}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {[comp.marca, comp.modelo, comp.capacidad]
                                                .filter(Boolean)
                                                .join(" · ") || "Sin detalles"}
                                        </p>
                                    </div>
                                    {comp.numero_serie && (
                                        <span className="font-mono text-xs text-muted-foreground ml-auto shrink-0">
                                            {comp.numero_serie}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-2">
            <span className="text-muted-foreground mt-0.5">{icon}</span>
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}
