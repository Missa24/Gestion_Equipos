"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Server, Database, Layers } from "lucide-react";
import { Title } from "@/components/ui/title";
import { formatDate } from "@/components/formats/formatTime";
import CardInfo from "@/components/ui/cardInfo";
import { useGetSystemById } from "../Hooks/SystemHook";

type DetailSystemProps = {
  id: number;
};

export const DetailSystem = ({ id }: DetailSystemProps) => {
  const navigate = useNavigate();
  const { data: sistema, isLoading } = useGetSystemById(id);

  if (isLoading) {
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  }

  if (!sistema) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
        <Server className="h-10 w-10" />
        <p className="text-sm">No se encontró el sistema.</p>
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
          onClick={() => navigate("/dashboard/sistemas")}
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Volver
        </Button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Title
            title={`Sistema: ${sistema.nombre}`}
            subtitle={`Estado: ${sistema.estado ?? "N/A"}\nServidor ID: ${sistema.id_servidor}`}
            className="whitespace-pre-line"
          />
        </div>
      </div>

      <Separator />

      <div className="gap-4 space-y-4">
        <CardInfo
          title="Datos del Sistema"
          icon={<Server className="h-4 w-4" />}
          fields={[
            { label: "Nombre", value: sistema.nombre },
            { label: "Tamaño", value: sistema.tamaño ?? "N/A" },
            { label: "Versión", value: sistema.version ?? "N/A" },
            { label: "Estado", value: sistema.estado ?? "N/A" },
            { label: "URL", value: sistema.url ?? "N/A" },
            { label: "Dirección IP", value: sistema.direccion_ip ?? "N/A" },
            {
              label: "Fecha de creación",
              value: formatDate(sistema.fecha_creacion),
            },
          ]}
        />
        <CardInfo
          title="Servidor asociado"
          icon={<Server className="h-4 w-4" />}
          fields={[
            { label: "Nombre", value: sistema.servidor?.nombre ?? "N/A" },
            { label: "IP", value: sistema.servidor?.ip ?? "N/A" },
          ]}
        />

        <CardInfo
          title="Categorías del Sistema"
          icon={<Layers className="h-4 w-4" />}
          fields={sistema.sistemaCategoria.map((sc) => ({
            label: sc.categoria.nombre,
            value: `Tipo: ${sc.categoria.tipo_categoria ?? "N/A"}`,
          }))}
        />

        <CardInfo
          title="Bases de Datos"
          icon={<Database className="h-4 w-4" />}
          fields={sistema.baseDeDatos.map((db) => ({
            label: db.nombre ?? "N/A",
            value: `Motor: ${db.motor ?? "N/A"}\nHost: ${db.host ?? "N/A"}\nPuerto: ${db.puerto ?? "N/A"}\nGit: ${db.url_git ?? "N/A"}`,
          }))}
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground pb-6">
        <span>Creado: {formatDate(sistema.fecha_creacion)}</span>
        <span>·</span>
        <span>Modificado: {formatDate(sistema.fecha_modificacion)}</span>
      </div>
    </div>
  );
};
