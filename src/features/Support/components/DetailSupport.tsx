import { useGetSupportById } from '../hooks/SupportHooks'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
    ArrowLeft,
    Calendar,
    Monitor,
    Hash,
    User,
    AlertCircle,
    ClipboardList,
    StickyNote,
    Wrench,
} from 'lucide-react'

type DetailSupportProps = {
    id: number
}

function formatDate(dateStr: string | null | undefined) {
    if (!dateStr) return '—'
    return new Intl.DateTimeFormat('es-BO', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(dateStr))
}

export const DetailSupport = ({ id }: DetailSupportProps) => {
    const navigate = useNavigate()
    const { data: response, isLoading } = useGetSupportById(id)
    const soporte = response?.data

    if (isLoading) {
        return (
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
        )
    }

    if (!soporte) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
                <AlertCircle className="h-10 w-10" />
                <p className="text-sm">No se encontró la solicitud.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-5 py-6 px-4">
            <div className="space-y-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-muted-foreground -ml-2"
                    onClick={() => navigate("/dashboard/soporte")}
                >
                    <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                    Volver
                </Button>
                <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-xl font-semibold tracking-tight">Solicitud: {soporte.nro_de_solicitud}</h1>
                    <span
                        className={`p-2 rounded-full flex items-center gap-1 ${soporte.estado === "Pendiente"
                            ? "bg-red-200"
                            : "bg-green-200"
                            }`}
                    >
                        Estado: <p>{soporte.estado}</p>
                    </span>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${soporte.prioridad ?? 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                        Prioridad: {soporte.prioridad}
                    </span>
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" /> Solicitante
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label className="text-xs text-muted-foreground">Nombre</Label>
                            <p className="text-sm mt-0.5">{soporte.usuario.nombres} {soporte.usuario.apellidos}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Cargo</Label>
                            <p className="text-sm mt-0.5">{soporte.usuario.cargo}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                            <Monitor className="h-4 w-4" /> Equipo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label className="text-xs text-muted-foreground">Marca</Label>
                            <p className="text-sm mt-0.5">{soporte.equipo.marca}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Modelo</Label>
                            <p className="text-sm mt-0.5">{soporte.equipo.modelo}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" /> Fechas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label className="text-xs text-muted-foreground">Fecha de solicitud</Label>
                            <p className="text-sm mt-0.5">{formatDate(soporte.fecha_solicitud)}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Fecha de solución</Label>
                            <p className="text-sm mt-0.5">{formatDate(soporte.fecha_solucion)}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                            <Hash className="h-4 w-4" /> Identificación
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <Label className="text-xs text-muted-foreground">ID Soporte</Label>
                            <p className="text-sm mt-0.5 font-mono">#{soporte.id_soporte}</p>
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">ID Equipo</Label>
                            <p className="text-sm mt-0.5 font-mono">#{soporte.id_equipo}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                        <ClipboardList className="h-4 w-4" /> Problema reportado
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm leading-relaxed">{soporte.problema}</p>
                </CardContent>
            </Card>

            {soporte.resolucion && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                            <Wrench className="h-4 w-4" /> Resolución
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed">{soporte.resolucion}</p>
                    </CardContent>
                </Card>
            )}

            {soporte.observaciones && (
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                            <StickyNote className="h-4 w-4" /> Observaciones
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-relaxed">{soporte.observaciones}</p>
                    </CardContent>
                </Card>
            )}

            <div className="flex items-center gap-4 text-xs text-muted-foreground pb-6">
                <span>Creado: {formatDate(soporte.fecha_creacion)}</span>
                <span>·</span>
                <span>Modificado: {formatDate(soporte.fecha_modificacion)}</span>
            </div>
        </div>
    )
}