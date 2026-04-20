"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Server } from "lucide-react";
import { Title } from "@/components/ui/title";
import { formatDate } from "@/components/formats/formatTime";
import CardInfo from "@/components/ui/cardInfo";
import { useGetServidorById } from "../Hooks/ServidorHook";

type DetailServidorProps = {
  id: number;
};

export const DetailServidor = ({ id }: DetailServidorProps) => {
  const navigate = useNavigate();
  const { data: servidor, isLoading } = useGetServidorById(id);

  if (isLoading) {
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  }

  if (!servidor) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
        <Server className="h-10 w-10" />
        <p className="text-sm">No se encontró el servidor.</p>
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
          onClick={() => navigate("/dashboard/servidores")}
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Volver
        </Button>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Title
            title={`Servidor: ${servidor.nombre}`}
            subtitle={`Estado: ${servidor.estado ?? "N/A"}\nTipo: ${servidor.tipo ?? "N/A"}`}
            className="whitespace-pre-line"
          />
        </div>
      </div>

      <Separator />

      <div className="gap-4">
        <CardInfo
          title="Datos del Servidor"
          icon={<Server className="h-4 w-4" />}
          fields={[
            { label: "Nombre", value: servidor.nombre },
            { label: "Capacidad", value: servidor.capacidad ?? "N/A" },
            { label: "Tipo", value: servidor.tipo ?? "N/A" },
            { label: "IP", value: servidor.ip ?? "N/A" },
            { label: "Máscara de Red", value: servidor.mascara_red ?? "N/A" },
            { label: "Hostname", value: servidor.hostname ?? "N/A" },
            { label: "Ubicación", value: servidor.ubicacion ?? "N/A" },
            {
              label: "Fecha de creación",
              value: formatDate(servidor.fecha_creacion),
            },
            {
              label: "Fecha de expiración",
              value: formatDate(servidor.fecha_expiracion),
            },
          ]}
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground pb-6">
        <span>Creado: {formatDate(servidor.fecha_creacion)}</span>
        <span>·</span>
        <span>Modificado: {formatDate(servidor.fecha_modificacion)}</span>
      </div>
    </div>
  );
};
