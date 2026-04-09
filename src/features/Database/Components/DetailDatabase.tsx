"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "lucide-react";
import { Title } from "@/components/ui/title";
import { formatDate } from "@/components/formats/formatTime";
import CardInfo from "@/components/ui/cardInfo";
import { useGetBaseDatosById } from "../Hooks/databaseHook";

type DetailBaseDatosProps = {
  id: number;
};

export const DetailBaseDatos = ({ id }: DetailBaseDatosProps) => {
  const navigate = useNavigate();
  const { data: baseDatos, isLoading } = useGetBaseDatosById(id);

  if (isLoading) {
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  }

  if (!baseDatos) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
        <Database className="h-10 w-10" />
        <p className="text-sm">No se encontró la base de datos.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5 py-6 px-4">
      <div className="space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-muted-foreground -ml-2"
          onClick={() => navigate("/dashboard/base_de_datos")}
        >
          Volver
        </Button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Title
            title={`Base de datos: ${baseDatos.nombre ?? "N/A"}`}
            subtitle={`Motor: ${baseDatos.motor ?? "N/A"}`}
            className="whitespace-pre-line"
          />
        </div>
      </div>

      <Separator />

      <div className="gap-4">
        <CardInfo
          title="Datos de la Base de Datos"
          icon={<Database className="h-4 w-4" />}
          fields={[
            { label: "Nombre", value: baseDatos.nombre ?? "N/A" },
            { label: "Motor", value: baseDatos.motor ?? "N/A" },
            { label: "Host", value: baseDatos.host ?? "N/A" },
            { label: "Puerto", value: baseDatos.puerto ?? "N/A" },

            { label: "ID", value: baseDatos.id_base_de_datos.toString() },
            {
              label: "Fecha de creación",
              value: formatDate(baseDatos.fecha_creacion),
            },
            {
              label: "Fecha de modificación",
              value: formatDate(baseDatos.fecha_modificacion),
            },
            { label: "Eliminado", value: baseDatos.es_eliminado ? "Sí" : "No" },
            { label: "URL Git", value: baseDatos.url_git ?? "N/A" },
          ]}
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground pb-6">
        <span>Creado: {formatDate(baseDatos.fecha_creacion)}</span>
        <span>·</span>
        <span>Modificado: {formatDate(baseDatos.fecha_modificacion)}</span>
      </div>
    </div>
  );
};
