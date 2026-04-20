import { ColumnDef } from "@tanstack/react-table";
import { BaseDatos } from "../Schema/databaseSchemta";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatDate } from "@/components/formats/formatTime";
import { DialogBaseDatos } from "./DialogDatabase";

const estadoColor: Record<string, string> = {
  Activo: "bg-green-100 text-green-700 border-green-200",
  Inactivo: "bg-red-100 text-red-700 border-red-200",
  "En mantenimiento": "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export function getBaseDatosColumns(): ColumnDef<BaseDatos>[] {
  return [
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">
            {row.original.nombre ?? "Sin nombre"}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.original.motor ?? "Sin motor"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "host",
      header: "Host",
      cell: ({ row }) => (
        <div className="text-xs">
          <p className="font-mono">{row.getValue("host") ?? "N/A"}</p>
          <p className="text-muted-foreground">
            {row.getValue("puerto") ?? "Sin puerto"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "url_git",
      header: "Repositorio",
      cell: ({ row }) => (
        <span className="text-xs font-mono">
          {row.getValue("url_git") ?? "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "fecha_creacion",
      header: "Creación",
      cell: ({ row }) => (
        <span className="text-xs">
          {formatDate(row.getValue("fecha_creacion"))}
        </span>
      ),
    },
    {
      accessorKey: "fecha_modificacion",
      header: "Última Modificación",
      cell: ({ row }) => (
        <span className="text-xs">
          {formatDate(row.getValue("fecha_modificacion"))}
        </span>
      ),
    },
    {
      accessorKey: "es_eliminado",
      header: "Estado",
      cell: ({ row }) => {
        const estado = row.getValue("es_eliminado") ? "Inactivo" : "Activo";
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
      id: "acciones",
      header: () => <span className="sr-only">Acciones</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <DialogBaseDatos mode="edit" text="Editar" row={row.original} />
          <Link
            to={`/dashboard/base_de_datos/${row.original.id_base_de_datos}`}
          >
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];
}
