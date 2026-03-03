import { ColumnDef } from "@tanstack/react-table"
import { Application } from "../schema/SupportSchema"
import { Eye, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"


const prioridadColor: Record<string, string> = {
    Alta: "bg-red-100 text-red-700 border-red-200",
    Media: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Baja: "bg-green-100 text-green-700 border-green-200",
}

function formatDate(dateStr: string | null | undefined) {
    if (!dateStr) return "—"
    return new Intl.DateTimeFormat("es-BO", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(dateStr))
}

export function getColumns(
    onView: (row: Application) => void,
    onEdit: (row: Application) => void,
    rol: string
): ColumnDef<Application>[] {
    return [
        {
            accessorKey: "nro_de_solicitud",
            header: "N° Solicitud",
            cell: ({ row }) => (
                <span className="font-mono text-xs font-medium text-muted-foreground">
                    {row.getValue("nro_de_solicitud")}
                </span>
            ),
        },
        {
            id: "usuario",
            header: "Solicitante",
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-sm">
                        {row.original.usuario.nombres} {row.original.usuario.apellidos}
                    </p>
                    <p className="text-xs text-muted-foreground">{row.original.usuario.cargo}</p>
                </div>
            ),
        },
        {
            id: "equipo",
            header: "Equipo",
            cell: ({ row }) => (
                <span className="text-sm">
                    {row.original.equipo.marca}{" "}
                    <span className="text-muted-foreground">{row.original.equipo.modelo}</span>
                </span>
            ),
        },
        {
            accessorKey: "problema",
            header: "Problema",
            cell: ({ row }) => (
                <p className="max-w-[220px] truncate text-sm" title={row.getValue("problema")}>
                    {row.getValue("problema")}
                </p>
            ),
        },
        {
            accessorKey: "prioridad",
            header: "Prioridad",
            cell: ({ row }) => {
                const p: string = row.getValue("prioridad")
                return (
                    <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${prioridadColor[p] ?? "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                    >
                        {p}
                    </span>
                )
            },
        },
        {
            accessorKey: "estado",
            header: "Estado",
            cell: ({ row }) => {
                const e: string = row.getValue("estado")
                return <span>{e}</span>
            },
        },
        {
            accessorKey: "fecha_solicitud",
            header: "Fecha solicitud",
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">
                    {formatDate(row.getValue("fecha_solicitud"))}
                </span>
            ),
        },
        {
            accessorKey: "fecha_solucion",
            header: "Fecha solución",
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground">
                    {formatDate(row.getValue("fecha_solucion"))}
                </span>
            ),
        },
        {
            id: "acciones",
            header: () => <span className="sr-only">Acciones</span>,
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => onView(row.original)}
                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver</span>
                    </Button>
                    {rol !== "USER" && (  // <-- ocultar para usuarios normales
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => onEdit(row.original)}
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                        </Button>
                    )}
                </div>
            ),
            enableHiding: false,
        },
    ]
}