import { ColumnDef } from "@tanstack/react-table";
import { Servidor } from "../Schema/ServidorSchema";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DialogServidor } from "./DialogServidor";
import { formatDate } from "@/components/formats/formatTime";

const estadoColor: Record<string, string> = {
  Activo: "bg-green-100 text-green-700 border-green-200",
  Inactivo: "bg-red-100 text-red-700 border-red-200",
  Mantenimiento: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export function getServidorColumns(): ColumnDef<Servidor>[] {
  return [
    {
      accessorKey: "nombre",
      header: "Servidor",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">{row.original.nombre}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.tipo ?? "Sin tipo"}
          </p>
        </div>
      ),
    },
    {
      id: "red",
      header: "Red",
      cell: ({ row }) => (
        <div className="text-xs">
          <p className="font-mono">{row.original.ip ?? "N/A"}</p>
          <p className="text-muted-foreground">
            {row.original.hostname ?? "Sin hostname"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "mascara_red",
      header: "Máscara",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {row.getValue("mascara_red") ?? "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "capacidad",
      header: "Capacidad",
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("capacidad") ?? "N/A"}</span>
      ),
    },
    {
      accessorKey: "ubicacion",
      header: "Ubicación",
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("ubicacion") ?? "N/A"}</span>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado: string = row.getValue("estado") ?? "Desconocido";
        return (
          <span
            className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
              estadoColor[estado] ?? "bg-gray-100 text-gray-700 border-gray-200"
            }`}
          >
            {estado}
          </span>
        );
      },
    },
    {
      id: "fechas",
      header: "Fechas",
      cell: ({ row }) => (
        <div className="text-xs">
          <p>Creación: {formatDate(row.original.fecha_creacion)}</p>
          <p>Expira: {formatDate(row.original.fecha_expiracion)}</p>
        </div>
      ),
    },
    {
      id: "acciones",
      header: () => <span className="sr-only">Acciones</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <DialogServidor mode="edit" text="Editar" row={row.original} />
          <Link to={`/dashboard/servidores/${row.original.id_servidor}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];
}
