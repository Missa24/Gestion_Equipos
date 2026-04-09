import { ColumnDef } from "@tanstack/react-table";
import { Equipo } from "../Schema/EquipoSchema";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/components/formats/formatTime";

const estadoColor: Record<string, string> = {
  Activo: "bg-green-100 text-green-700 border-green-200",
  Inactivo: "bg-gray-100 text-gray-600 border-gray-200",
  "En mantenimiento": "bg-yellow-100 text-yellow-700 border-yellow-200",
  Dañado: "bg-red-100 text-red-700 border-red-200",
};

const tipoColor: Record<string, string> = {
  Laptop: "bg-blue-100 text-blue-700 border-blue-200",
  Desktop: "bg-purple-100 text-purple-700 border-purple-200",
  Servidor: "bg-orange-100 text-orange-700 border-orange-200",
  Impresora: "bg-teal-100 text-teal-700 border-teal-200",
};

export function getEquipoColumns(
  onView: (row: Equipo) => void,
  onEdit: (row: Equipo) => void,
  onDelete: (row: Equipo) => void,
  rol: string,
): ColumnDef<Equipo>[] {
  return [
    {
      accessorKey: "id_equipo",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          #{row.getValue("id_equipo")}
        </span>
      ),
    },
    {
      id: "equipo",
      header: "Equipo",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">{row.original.marca}</p>
          <p className="text-xs text-muted-foreground">{row.original.modelo}</p>
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
      accessorKey: "numero_serie",
      header: "N° Serie",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {row.getValue("numero_serie")}
        </span>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado: string = row.getValue("estado");
        return (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${estadoColor[estado] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
          >
            {estado}
          </span>
        );
      },
    },
    {
      accessorKey: "ubicacion",
      header: "Ubicación",
      cell: ({ row }) => (
        <p
          className="max-w-[180px] truncate text-sm"
          title={row.getValue("ubicacion")}
        >
          {row.getValue("ubicacion")}
        </p>
      ),
    },
    {
      accessorKey: "codigo_activo",
      header: "Código Activo",
      cell: ({ row }) => {
        const codigo = row.getValue("codigo_activo") as string | null;
        return (
          <span className="text-xs text-muted-foreground">{codigo ?? "—"}</span>
        );
      },
    },
    {
      accessorKey: "fecha_adquisicion",
      header: "Adquisición",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(row.getValue("fecha_adquisicion"))}
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
                <span className="sr-only">Eliminar</span>
              </Button>
            </>
          )}
        </div>
      ),
      enableHiding: false,
    },
  ];
}
