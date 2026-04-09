import { useGetSupportById } from "../hooks/SupportHooks";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Bolt, AlertCircle } from "lucide-react";
import { useAcceptSupport } from "../hooks/SupportHooks";
import { Title } from "@/components/ui/title";
import { formatDate } from "@/components/formats/formatTime";
import CardInfo from "@/components/ui/cardInfo";

type DetailSupportProps = {
  id: number;
};

export const DetailSupport = ({ id }: DetailSupportProps) => {
  const navigate = useNavigate();
  const { data: response, isLoading } = useGetSupportById(id);
  const { mutate: acceptSupport, isPending } = useAcceptSupport();
  const soporte = response?.data;

  if (isLoading || isPending) {
    return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  }

  if (!soporte) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-muted-foreground">
        <AlertCircle className="h-10 w-10" />
        <p className="text-sm">No se encontró la solicitud.</p>
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
          onClick={() => navigate("/dashboard/soporte")}
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Volver
        </Button>
        <div className="flex items-center gap-2.5 flex-wrap">
          <Title
            title={`Solicitud: ` + soporte.nro_de_solicitud}
            subtitle={
              `Estado: ` + soporte.estado + `\nPrioridad: ` + soporte.prioridad
            }
            className="whitespace-pre-line"
          />
          {soporte.estado != "Aceptado" && (
            <Button
              variant="acept"
              onClick={() => acceptSupport(soporte.id_soporte)}
              disabled={isPending}
            >
              {isPending ? "Aceptando..." : "Aceptar"}
            </Button>
          )}
        </div>
      </div>

      <Separator />

      <div className=" gap-4">
        <CardInfo
          title="Datos del soporte"
          icon={<Bolt className="h-4 w-4" />}
          fields={[
            {
              label: "Nombre",
              value: `${soporte.usuario.nombres} ${soporte.usuario.apellidos}`,
            },
            { label: "Cargo", value: soporte.usuario.cargo },
            { label: "Marca", value: soporte.equipo.marca },
            { label: "Modelo", value: soporte.equipo.modelo },
            {
              label: "Fecha de Solicitud",
              value: formatDate(soporte.fecha_solicitud),
            },
            {
              label: "Fecha de solución",
              value: formatDate(soporte.fecha_solucion),
            },
            {
              label: "Problema",
              value: soporte.problema,
            },
            {
              label: "Resolucion",
              value: soporte.resolucion,
            },
            {
              label: "Observaciones",
              value: soporte.observaciones,
            },
          ]}
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground pb-6">
        <span>Creado: {formatDate(soporte.fecha_creacion)}</span>
        <span>·</span>
        <span>Modificado: {formatDate(soporte.fecha_modificacion)}</span>
      </div>
    </div>
  );
};
