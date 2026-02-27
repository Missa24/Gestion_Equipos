// src/features/usuarios/Components/UsuariosPage.tsx

import { useState } from 'react';
import { useUsuarios } from '../Hooks/useUsuarios';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Eye, Key, Laptop, Loader2, RefreshCw } from 'lucide-react';
import UsuarioAccesosModal from './UsuarioAccesosModal';
import { UsuarioEquiposModal } from './UsuarioEquiposModal';
import { UsuarioDetallesModal } from './UsuarioDetallesModal';

export default function UsuariosPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<'accesos' | 'equipos' | 'detalles' | null>(null);

  const { data: usuarios, isLoading, error, refetch } = useUsuarios();

  const handleOpenModal = (userId: number, type: 'accesos' | 'equipos' | 'detalles') => {
    setSelectedUserId(userId);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setModalType(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error al cargar usuarios</p>
              <Button onClick={() => refetch()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usuarios</h1>
          <p className="text-muted-foreground">
            Gestiona usuarios, accesos y equipos asignados
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usuarios?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios registrados en el sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {usuarios?.filter((u) => u.activo).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Con acceso al sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {usuarios?.filter((u) => !u.activo).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Sin acceso al sistema
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de usuarios */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Nombre</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Cargo</th>
                  <th className="text-left p-4 font-medium">Oficina</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios?.map((usuario) => (
                  <tr key={usuario.id_usuario} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">
                          {usuario.nombres} {usuario.apellidos}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @{usuario.username}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{usuario.correo_electronico}</td>
                    <td className="p-4 text-sm">{usuario.cargo}</td>
                    <td className="p-4 text-sm">
                      {usuario.oficina?.nombre || 'N/A'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          usuario.activo
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {usuario.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenModal(usuario.id_usuario, 'detalles')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenModal(usuario.id_usuario, 'accesos')}
                        >
                          <Key className="w-4 h-4 mr-1" />
                          Accesos
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenModal(usuario.id_usuario, 'equipos')}
                        >
                          <Laptop className="w-4 h-4 mr-1" />
                          Equipos
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {usuarios?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No hay usuarios registrados
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modales */}
      {selectedUserId && modalType === 'detalles' && (
        <UsuarioDetallesModal
          userId={selectedUserId}
          onClose={handleCloseModal}
        />
      )}

      {selectedUserId && modalType === 'accesos' && (
        <UsuarioAccesosModal
          userId={selectedUserId}
          onClose={handleCloseModal}
        />
      )}

      {selectedUserId && modalType === 'equipos' && (
        <UsuarioEquiposModal
          userId={selectedUserId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
