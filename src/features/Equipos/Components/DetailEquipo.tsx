import { Equipo } from "../Schema/EquipoSchema";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
    CalendarDays,
    Cpu,
    Hash,
    MapPin,
    Monitor,
    Tag,
    User,
    Wrench,
    Clock,
    CheckCircle2,
    AlertCircle,
    CircleDashed,
    Activity,
    KeyboardIcon,
    MonitorSpeaker,
    FileText,
} from "lucide-react";
import { useGetAllSupport } from "@/features/Support/hooks/SupportHooks";
import { Application } from "@/features/Support/schema/SupportSchema";

type DetailEquipoProps = {
    equipo: Equipo;
};

// ── Colores de estado ────────────────────────────────────────────────────────
const estadoColor: Record<string, string> = {
    Bueno: "bg-green-100 text-green-700 border-green-200",
    Regular: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Malo: "bg-red-100 text-red-700 border-red-200",
    Activo: "bg-green-100 text-green-700 border-green-200",
    Inactivo: "bg-gray-100 text-gray-600 border-gray-200",
    "En mantenimiento": "bg-yellow-100 text-yellow-700 border-yellow-200",
    Dañado: "bg-red-100 text-red-700 border-red-200",
};

const estadoOperativoColor: Record<string, string> = {
    Operativo: "bg-blue-100 text-blue-700 border-blue-200",
    Faltante: "bg-red-100 text-red-700 border-red-200",
    "Acéfalo": "bg-orange-100 text-orange-700 border-orange-200",
    "Sin asignar": "bg-gray-100 text-gray-600 border-gray-200",
};

// ── Badge estado soporte ─────────────────────────────────────────────────────
function SoporteEstadoBadge({ estado }: { estado: string }) {
    const map: Record<string, { color: string; icon: React.ReactNode }> = {
        Pendiente: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", icon: <CircleDashed className="h-3 w-3" /> },
        "En progreso": { color: "bg-blue-50 text-blue-700 border-blue-200", icon: <Clock className="h-3 w-3" /> },
        Resuelto: { color: "bg-green-50 text-green-700 border-green-200", icon: <CheckCircle2 className="h-3 w-3" /> },
        Cancelado: { color: "bg-gray-100 text-gray-600 border-gray-200", icon: <AlertCircle className="h-3 w-3" /> },
    };
    const cfg = map[estado] ?? { color: "bg-gray-100 text-gray-600 border-gray-200", icon: <CircleDashed className="h-3 w-3" /> };
    return (
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${cfg.color}`}>
            {cfg.icon}{estado}
        </span>
    );
}

const prioridadColor: Record<string, string> = {
    Alta: "text-red-600 font-semibold",
    Media: "text-yellow-600 font-semibold",
    Baja: "text-green-600 font-semibold",
};

function formatDate(dateStr: string | null | undefined) {
    if (!dateStr) return "—";
    return new Intl.DateTimeFormat("es-BO", { dateStyle: "medium" }).format(new Date(dateStr));
}

// ── Tarjeta soporte ──────────────────────────────────────────────────────────
function SoporteCard({ soporte }: { soporte: Application }) {
    return (
        <div className="rounded-lg border bg-muted/20 px-4 py-3 space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{soporte.nro_de_solicitud}</span>
                    <SoporteEstadoBadge estado={soporte.estado} />
                </div>
                <span className={`text-xs ${prioridadColor[soporte.prioridad] ?? "text-muted-foreground"}`}>
                    Prioridad: {soporte.prioridad}
                </span>
            </div>
            <p className="text-sm font-medium">{soporte.problema}</p>
            {soporte.resolucion && (
                <p className="text-xs text-muted-foreground border-l-2 border-muted pl-2">{soporte.resolucion}</p>
            )}
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground flex-wrap pt-1">
                <span>
                    Solicitado por{" "}
                    <span className="font-medium text-foreground">
                        {soporte.usuario.nombres} {soporte.usuario.apellidos}
                    </span>
                </span>
                <div className="flex items-center gap-3">
                    {soporte.tecnico && (
                        <span>Técnico: <span className="font-medium text-foreground">{soporte.tecnico.nombres} {soporte.tecnico.apellidos}</span></span>
                    )}
                    <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />{formatDate(soporte.fecha_solicitud)}
                    </span>
                    {soporte.fecha_solucion && (
                        <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-3 w-3" />{formatDate(soporte.fecha_solucion)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ── Componente principal ─────────────────────────────────────────────────────
export const DetailEquipo = ({ equipo }: DetailEquipoProps) => {
    const usuarioActual = equipo.equiposUsuario?.find((eu) => !eu.fecha_de_baja);

    const { data: soporteResponse, isLoading: loadingSoporte } = useGetAllSupport({
        id_equipo: equipo.id_equipo,
        limit: 50,
        page: 1,
    });
    const soportes = soporteResponse?.data ?? [];

    // Parsear componentes_descripcion
    let compInternos: string[] = [];
    let compEntrada: string[] = [];
    let compSalida: string[] = [];
    let compDescripcion = "";
    try {
        const parsed = JSON.parse(equipo.componentes_descripcion ?? "{}");
        compInternos = parsed.internos ?? [];
        compEntrada = parsed.entrada ?? [];
        compSalida = parsed.salida ?? [];
        compDescripcion = parsed.descripcion ?? "";
    } catch { /* sin componentes */ }

    const tieneComponentes = compInternos.length > 0 || compEntrada.length > 0 || compSalida.length > 0 || compDescripcion;

    return (
        <div className="space-y-5 text-sm">

            {/* ── Encabezado ── */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h3 className="text-lg font-semibold">{equipo.marca} {equipo.modelo}</h3>
                    <p className="text-muted-foreground font-mono text-xs mt-0.5">N° Serie: {equipo.numero_serie}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${estadoColor[equipo.estado] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
                        {equipo.estado}
                    </span>
                    {equipo.estado_operativo && (
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${estadoOperativoColor[equipo.estado_operativo] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
                            {equipo.estado_operativo}
                        </span>
                    )}
                </div>
            </div>

            <Separator />

            {/* ── Información general ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                <InfoItem icon={<Monitor className="h-4 w-4" />} label="Tipo" value={equipo.tipo} />
                <InfoItem icon={<MapPin className="h-4 w-4" />} label="Ubicación" value={equipo.ubicacion} />
                <InfoItem icon={<Tag className="h-4 w-4" />} label="Código activo" value={equipo.codigo_activo ?? "—"} />
                <InfoItem icon={<CalendarDays className="h-4 w-4" />} label="Fecha adquisición" value={formatDate(equipo.fecha_adquisicion)} />
                <InfoItem icon={<Activity className="h-4 w-4" />} label="Estado operativo" value={equipo.estado_operativo || "—"} />
                <InfoItem icon={<Hash className="h-4 w-4" />} label="ID Oficina" value={String(equipo.id_oficina)} />
            </div>

            {/* ── Usuario asignado ── */}
            {usuarioActual && (
                <>
                    <Separator />
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Usuario asignado
                        </p>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{usuarioActual.usuario.nombres} {usuarioActual.usuario.apellidos}</span>
                            <span className="text-muted-foreground text-xs">— {usuarioActual.usuario.cargo}</span>
                        </div>
                    </div>
                </>
            )}

            {/* ── Componentes físicos (del formulario) ── */}
            {tieneComponentes && (
                <>
                    <Separator />
                    <div className="space-y-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Componentes físicos
                        </p>

                        {compInternos.length > 0 && (
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs font-medium text-muted-foreground">Componentes internos</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {compInternos.map((c) => (
                                        <span key={c} className="inline-flex items-center rounded-md border bg-muted/40 px-2 py-0.5 text-xs font-medium">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {compEntrada.length > 0 && (
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <KeyboardIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs font-medium text-muted-foreground">Dispositivos de entrada</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {compEntrada.map((c) => (
                                        <span key={c} className="inline-flex items-center rounded-md border bg-muted/40 px-2 py-0.5 text-xs font-medium">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {compSalida.length > 0 && (
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <MonitorSpeaker className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs font-medium text-muted-foreground">Dispositivos de salida</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {compSalida.map((c) => (
                                        <span key={c} className="inline-flex items-center rounded-md border bg-muted/40 px-2 py-0.5 text-xs font-medium">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {compDescripcion && (
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-xs font-medium text-muted-foreground">Descripción</span>
                                </div>
                                <p className="text-xs text-foreground bg-muted/30 rounded-md border px-3 py-2 whitespace-pre-line leading-relaxed">
                                    {compDescripcion}
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* ── Componentes Prisma (relación) ── */}
            {equipo.componentes && equipo.componentes.length > 0 && (
                <>
                    <Separator />
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Componentes registrados ({equipo.componentes.length})
                        </p>
                        <div className="space-y-2">
                            {equipo.componentes.map((comp) => (
                                <div key={comp.id_componente} className="flex items-center gap-3 rounded-md border px-3 py-2 bg-muted/30">
                                    <Cpu className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <div className="min-w-0">
                                        <p className="font-medium truncate">{comp.tipoComponente.nombre}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {[comp.marca, comp.modelo, comp.capacidad].filter(Boolean).join(" · ") || "Sin detalles"}
                                        </p>
                                    </div>
                                    {comp.numero_serie && (
                                        <span className="font-mono text-xs text-muted-foreground ml-auto shrink-0">{comp.numero_serie}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* ── Historial de soporte ── */}
            <Separator />
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Historial de soporte
                        {!loadingSoporte && soportes.length > 0 && (
                            <span className="ml-1 normal-case font-normal">({soportes.length})</span>
                        )}
                    </p>
                </div>
                {loadingSoporte ? (
                    <div className="space-y-2">
                        <Skeleton className="h-20 w-full rounded-lg" />
                        <Skeleton className="h-20 w-full rounded-lg" />
                    </div>
                ) : soportes.length > 0 ? (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {soportes.map((s) => (
                            <SoporteCard key={s.id_soporte} soporte={s} />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground py-4 text-center rounded-lg border border-dashed">
                        Este equipo no tiene solicitudes de soporte registradas.
                    </p>
                )}
            </div>
        </div>
    );
};

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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
