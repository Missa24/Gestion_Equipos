import { ColumnDef } from "@tanstack/react-table";
import { Sistema } from "../Schema/SystemSchema";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const estadoColor: Record<string, string> = {
  Activo: "bg-green-100 text-green-700 border-green-200",
  Inactivo: "bg-red-100 text-red-700 border-red-200",
};

export function getColumns(
  onView: (row: Sistema) => void,
): ColumnDef<Sistema>[] {
  return [
    {
      accessorKey: "nombre",
      header: "Sistema",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">{row.original.nombre}</p>
          <p className="text-xs text-muted-foreground">
            v{row.original.version}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: ({ row }) => (
        <a
          href={row.getValue("url")}
          target="_blank"
          className="text-blue-600 text-sm underline"
        >
          {row.getValue("url")}
        </a>
      ),
    },
    {
      accessorKey: "direccion_ip",
      header: "IP",
      cell: ({ row }) => (
        <span className="font-mono text-xs">
          {row.getValue("direccion_ip")}
        </span>
      ),
    },
    {
      accessorKey: "tamaño",
      header: "Tamaño",
      cell: ({ row }) => (
        <span className="text-sm">{row.getValue("tamaño") ?? "N/A"} GB</span>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => {
        const estado: string = row.getValue("estado");
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
      id: "categorias",
      header: "Categorías",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.sistemaCategoria.map((c) => (
            <span
              key={c.id_sistema_cat}
              className="text-xs border px-2 py-0.5 rounded bg-muted"
            >
              {c.categoria.nombre}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "acciones",
      header: () => <span className="sr-only">Acciones</span>,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onView(row.original)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];
}
