// src/features/Usuarios/Components/UsuarioEquiposModal.tsx

import { useState } from 'react';
import { UsuarioService } from '../Service/UsuarioService';
import { useQuery } from '@tanstack/react-query';
import type { EquipoAsignacion } from '../Types/usuario.types';  // ← AGREGAR IMPORT
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';
import { 
  Laptop, 
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Props {
  userId: number;
  onClose: () => void;
}

export default function UsuarioEquiposModal({ userId, onClose }: Props) {
  const [activosOnly, setActivosOnly] = useState(false);
  const [expandedEquipos, setExpandedEquipos] = useState<Set<number>>(new Set());

  const { data, isLoading } = useQuery({
    queryKey: ['usuario-equipos', userId, activosOnly],
    queryFn: () => UsuarioService.getEquipos(userId, activosOnly),
  });

  const toggleEquipoExpand = (equipoId: number) => {
    setExpandedEquipos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(equipoId)) {
        newSet.delete(equipoId);
      } else {
        newSet.add(equipoId);
      }
      return newSet;
    });
  };

  const getEquipoIcon = (tipo: string) => {
    const tipoLower = tipo.toLowerCase();
    if (tipoLower.includes('laptop') || tipoLower.includes('portátil')) {
      return <Laptop className="w-5 h-5" />;
    }
    if (tipoLower.includes('desktop') || tipoLower.includes('escritorio')) {
      return <Monitor className="w-5 h-5" />;
    }
    return <Laptop className="w-5 h-5" />;
  };

  const getComponenteIcon = (tipo: string) => {
    const tipoLower = tipo.toLowerCase();
    if (tipoLower.includes('procesador') || tipoLower.includes('cpu')) {
      return <Cpu className="w-4 h-4" />;
    }
    if (tipoLower.includes('ram') || tipoLower.includes('memoria')) {
      return <MemoryStick className="w-4 h-4" />;
    }
    if (tipoLower.includes('disco') || tipoLower.includes('ssd') || tipoLower.includes('hdd')) {
      return <HardDrive className="w-4 h-4" />;
    }
    return <HardDrive className="w-4 h-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Laptop className="w-5 h-5" />
            Equipos Asignados
          </DialogTitle>
          {data && (
            <p className="text-sm text-muted-foreground">
              {data.usuario.nombres} {data.usuario.apellidos} - {data.usuario.cargo}
            </p>
          )}
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Resumen</CardTitle>
                  <Button
                    size="sm"
                    variant={activosOnly ? 'default' : 'outline'}
                    onClick={() => setActivosOnly(!activosOnly)}
                  >
                    {activosOnly ? 'Mostrando Activos' : 'Mostrar Solo Activos'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{data?.total_equipos || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Activos</p>
                    <p className="text-2xl font-bold text-green-600">
                      {data?.equipos_activos || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Históricos</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {data?.equipos_historicos || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {data?.equipos && data.equipos.length > 0 ? (
                data.equipos.map((asignacion: EquipoAsignacion) => {  // ← AGREGAR TIPO AQUÍ
                  const isExpanded = expandedEquipos.has(asignacion.id_asignacion);
                  const isActivo = asignacion.estado_asignacion === 'Activo';

                  return (
                    <Card 
                      key={asignacion.id_asignacion} 
                      className={`overflow-hidden ${isActivo ? 'border-green-200' : 'border-orange-200'}`}
                    >
                      <CardContent className="p-0">
                        <div 
                          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => toggleEquipoExpand(asignacion.id_asignacion)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`p-2 rounded ${isActivo ? 'bg-green-100' : 'bg-orange-100'}`}>
                                {getEquipoIcon(asignacion.equipo.tipo)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-lg">
                                    {asignacion.equipo.marca} {asignacion.equipo.modelo}
                                  </h3>
                                  {isActivo ? (
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-orange-600" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {asignacion.equipo.tipo} • Serial: {asignacion.equipo.numero_serie}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span>Asignado: {formatDate(asignacion.fecha_asignacion)}</span>
                                  </div>
                                  {asignacion.fecha_de_baja && (
                                    <div className="flex items-center gap-1 text-orange-600">
                                      <Calendar className="w-4 h-4" />
                                      <span>Dado de baja: {formatDate(asignacion.fecha_de_baja)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                isActivo 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-orange-100 text-orange-800'
                              }`}>
                                {asignacion.estado_asignacion}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <>
                            <Separator />
                            <div className="p-4 bg-muted/30 space-y-4">
                              <div>
                                <h4 className="font-medium mb-3">Información del Equipo</h4>
                                <div className="grid md:grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Estado:</span>
                                    <p className="font-medium">{asignacion.equipo.estado}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Código de Activo:</span>
                                    <p className="font-medium">
                                      {asignacion.equipo.codigo_activo || 'N/A'}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Fecha de Adquisición:</span>
                                    <p className="font-medium">
                                      {new Date(asignacion.equipo.fecha_adquisicion).toLocaleDateString('es-ES')}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Ubicación:</span>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      <p className="font-medium">{asignacion.equipo.ubicacion}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {asignacion.equipo.componentes && asignacion.equipo.componentes.length > 0 && (
                                <>
                                  <Separator />
                                  <div>
                                    <h4 className="font-medium mb-3">
                                      Componentes ({asignacion.equipo.componentes.length})
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                      {asignacion.equipo.componentes.map((componente) => (
                                        <div 
                                          key={componente.id_componente}
                                          className="flex items-start gap-3 p-3 bg-background rounded border"
                                        >
                                          <div className="p-2 bg-blue-100 rounded">
                                            {getComponenteIcon(componente.tipo)}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm">{componente.tipo}</p>
                                            <p className="text-xs text-muted-foreground truncate">
                                              {componente.marca} {componente.modelo}
                                            </p>
                                            {componente.capacidad && (
                                              <p className="text-xs font-medium text-blue-600">
                                                {componente.capacidad}
                                              </p>
                                            )}
                                            {componente.numero_serie && (
                                              <p className="text-xs text-muted-foreground font-mono">
                                                S/N: {componente.numero_serie}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Laptop className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
                      {activosOnly 
                        ? 'Este usuario no tiene equipos activos asignados'
                        : 'Este usuario no tiene equipos asignados'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={onClose}>Cerrar</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}