import { ColumnDef } from "@tanstack/react-table";
import { Usuario } from "../Schema/UsuarioSchema";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const tipoColor: Record<string, string> = {
    INTERNO: "bg-blue-100 text-blue-700 border-blue-200",
    EXTERNO: "bg-orange-100 text-orange-700 border-orange-200",
};

export function getUsuarioColumns(
    onView: (row: Usuario) => void,
    onEdit: (row: Usuario) => void,
    onDelete: (row: Usuario) => void,
    rol: string
): ColumnDef<Usuario>[] {
    return [
        {
            accessorKey: "id_usuario",
            header: "ID",
            cell: ({ row }) => (
                <span className="font-mono text-xs text-muted-foreground">
                    #{row.getValue("id_usuario")}
                </span>
            ),
        },
        {
            id: "nombre_completo",
            header: "Nombre",
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-sm">
                        {row.original.nombres} {row.original.apellidos}
                    </p>
                    <p className="text-xs text-muted-foreground">{row.original.cargo}</p>
                </div>
            ),
        },
        {
            accessorKey: "correo_electronico",
            header: "Correo",
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {row.getValue("correo_electronico")}
                </span>
            ),
        },
        {
            accessorKey: "username",
            header: "Username",
            cell: ({ row }) => (
                <span className="font-mono text-xs">{row.getValue("username")}</span>
            ),
        },
        {
            id: "rol",
            header: "Rol",
            cell: ({ row }) => (
                <span className="text-sm">{row.original.rol?.nombre ?? "—"}</span>
            ),
        },
        {
            id: "oficina",
            header: "Oficina",
            cell: ({ row }) => (
                <div>
                    <p className="text-sm">{row.original.oficina?.nombre ?? "—"}</p>
                    <p className="text-xs text-muted-foreground">
                        {row.original.oficina?.departamento ?? ""}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: "tipo",
            header: "Tipo",
            cell: ({ row }) => {
                const tipo: string = row.getValue("tipo");
                return (
                    <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tipoColor[tipo] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
                    >
                        {tipo}
                    </span>
                );
            },
        },
        {
            accessorKey: "activo",
            header: "Estado",
            cell: ({ row }) => {
                const activo: boolean = row.getValue("activo");
                return (
                    <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${activo
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                            }`}
                    >
                        {activo ? "Activo" : "Inactivo"}
                    </span>
                );
            },
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
                    {rol !== "USER" && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={() => onEdit(row.original)}
                            >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => onDelete(row.original)}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Desactivar</span>
                            </Button>
                        </>
                    )}
                </div>
            ),
            enableHiding: false,
        },
    ];
}
