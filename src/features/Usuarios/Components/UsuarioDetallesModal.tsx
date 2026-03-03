// src/features/Usuarios/Components/UsuarioDetallesModal.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UsuarioService } from '../Service/UsuarioService';
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
  User, 
  Mail, 
  Phone, 
  Building, 
  Briefcase,
  Calendar,
  Key,
  Laptop,
  Shield,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

interface Props {
  userId: number;
  onClose: () => void;
}

export function UsuarioDetallesModal({ userId, onClose }: Props) {
  const [showPasswords, setShowPasswords] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['usuario-info-completa', userId],
    queryFn: () => UsuarioService.getInfoCompleta(userId),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!data) {
    return null;
  }

  const { usuario, accesos, equipos } = data;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Información Completa del Usuario
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Columna Izquierda */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nombre Completo</p>
                      <p className="font-semibold">
                        {usuario.nombres} {usuario.apellidos}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                      <p className="font-medium">{usuario.correo_electronico}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Celular</p>
                      <p className="font-medium">{usuario.celular}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">CI</p>
                      <p className="font-medium">{usuario.ci}</p>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cargo</p>
                      <p className="font-semibold">{usuario.cargo}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Oficina</p>
                      <p className="font-medium">{usuario.oficina.nombre}</p>
                      <p className="text-xs text-muted-foreground">
                        {usuario.oficina.departamento} • {usuario.oficina.tipo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rol</p>
                      <p className="font-medium">{usuario.rol.nombre}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {usuario.activo ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Estado</p>
                      <p className={`font-medium ${usuario.activo ? 'text-green-600' : 'text-red-600'}`}>
                        {usuario.activo ? 'Activo' : 'Inactivo'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Creado:</span>
                  <span className="font-medium">{formatDate(usuario.fecha_creacion)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Modificado:</span>
                  <span className="font-medium">{formatDate(usuario.fecha_modificacion)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumen de Accesos y Equipos */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Accesos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Accesos
                  </span>
                  {accesos.total_accesos > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-3xl font-bold">{accesos.total_accesos}</p>
                  <p className="text-sm text-muted-foreground">
                    Sistemas y servidores con acceso
                  </p>
                </div>

                {accesos.total_accesos > 0 && accesos.accesos ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {accesos.accesos.map((acceso: any) => (
                      <div 
                        key={acceso.id_acceso}
                        className="p-3 bg-muted/50 rounded text-sm space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{acceso.sistema?.nombre || 'Sistema'}</p>
                          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
                            {acceso.nivel_acceso}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Usuario: <code className="bg-muted px-1 py-0.5 rounded">
                            {acceso.usuario}
                          </code>
                        </p>
                        {showPasswords && (
                          <p className="text-xs text-muted-foreground">
                            Password: <code className="bg-muted px-1 py-0.5 rounded font-mono">
                              {acceso.password}
                            </code>
                          </p>
                        )}
                        {acceso.servidor && (
                          <p className="text-xs text-muted-foreground">
                            Servidor: {acceso.servidor.nombre} ({acceso.servidor.ip})
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Sin accesos registrados
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Equipos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Laptop className="w-5 h-5" />
                  Equipos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {equipos.equipos_activos}
                    </p>
                    <p className="text-xs text-muted-foreground">Activos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">
                      {equipos.equipos_historicos}
                    </p>
                    <p className="text-xs text-muted-foreground">Históricos</p>
                  </div>
                </div>

                {equipos.total_equipos > 0 && equipos.equipos ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {equipos.equipos.map((asignacion: any) => (
                      <div 
                        key={asignacion.id_asignacion}
                        className={`p-3 rounded text-sm border ${
                          asignacion.estado_asignacion === 'Activo'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-orange-50 border-orange-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-medium">
                            {asignacion.equipo.marca} {asignacion.equipo.modelo}
                          </p>
                          {asignacion.estado_asignacion === 'Activo' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-orange-600" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {asignacion.equipo.tipo} • {asignacion.equipo.numero_serie}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {asignacion.equipo.ubicacion}
                        </div>
                        {asignacion.equipo.componentes && asignacion.equipo.componentes.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {asignacion.equipo.componentes.length} componente(s)
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Sin equipos asignados
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}