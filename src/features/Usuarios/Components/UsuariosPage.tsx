// src/features/Usuarios/Components/UsuariosPage.tsx

import { useState } from 'react';
import { useUsuarios, useCreateUsuario, useUpdateUsuario } from '../Hooks/useUsuarios';
import type { Usuario } from '../Types/usuario.types';
import type { CreateUsuarioInput, UpdateUsuarioInput } from '../Schema/UsuarioSchema';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Eye, Key, Laptop, Loader2, RefreshCw, Plus, Pencil, Search, X } from 'lucide-react';
import UsuarioAccesosModal  from './UsuarioAccesosModal';
import { UsuarioEquiposModal } from './UsuarioEquiposModal';
import { UsuarioDetallesModal } from './UsuarioDetallesModal';
import { UsuarioFormModal } from './UsuarioFormModal';

export default function UsuariosPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<'accesos' | 'equipos' | 'detalles' | 'form' | null>(null);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterCargo, setFilterCargo] = useState('');

  const { data: usuarios, isLoading, error, refetch } = useUsuarios();
  const createMutation = useCreateUsuario();
  const updateMutation = useUpdateUsuario();

  const handleOpenModal = (userId: number, type: 'accesos' | 'equipos' | 'detalles') => {
    setSelectedUserId(userId);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setModalType(null);
    setEditingUsuario(null);
  };

  const handleCreateNew = () => {
    setEditingUsuario(null);
    setModalType('form');
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    setModalType('form');
  };

  const handleFormSubmit = async (data: CreateUsuarioInput | UpdateUsuarioInput) => {
    if (editingUsuario) {
      await updateMutation.mutateAsync({
        id: editingUsuario.id_usuario,
        data: data as UpdateUsuarioInput,
      });
    } else {
      await createMutation.mutateAsync(data as CreateUsuarioInput);
    }
    handleCloseModal();
    refetch();
  };

  // Filtrado de usuarios
  const filteredUsuarios = usuarios?.filter((usuario: any) => {
    const matchesSearch =
      searchTerm === '' ||
      usuario.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.correo_electronico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && usuario.activo) ||
      (filterStatus === 'inactive' && !usuario.activo);

    const matchesCargo =
      filterCargo === '' ||
      usuario.cargo.toLowerCase().includes(filterCargo.toLowerCase());

    return matchesSearch && matchesStatus && matchesCargo;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterCargo('');
  };

  const hasActiveFilters = searchTerm !== '' || filterStatus !== 'all' || filterCargo !== '';

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usuarios</h1>
          <p className="text-muted-foreground">Gestiona usuarios, accesos y equipos asignados</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filtros</CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Limpiar filtros
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Nombre, email, usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Cargo</label>
              <Input
                placeholder="Filtrar por cargo..."
                value={filterCargo}
                onChange={(e) => setFilterCargo(e.target.value)}
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 text-sm text-muted-foreground">
              Mostrando {filteredUsuarios?.length} de {usuarios?.length} usuarios
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usuarios?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {filteredUsuarios?.length !== usuarios?.length &&
                `${filteredUsuarios?.length} filtrados`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {usuarios?.filter((u: any) => u.activo).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Con acceso al sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Inactivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {usuarios?.filter((u: any) => !u.activo).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Sin acceso al sistema</p>
          </CardContent>
        </Card>
      </div>

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
                {filteredUsuarios?.map((usuario: any) => (
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
                    <td className="p-4 text-sm">{usuario.oficina?.nombre || 'N/A'}</td>
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(usuario)}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
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

            {filteredUsuarios?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {hasActiveFilters
                  ? 'No se encontraron usuarios con los filtros aplicados'
                  : 'No hay usuarios registrados'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedUserId && modalType === 'detalles' && (
        <UsuarioDetallesModal userId={selectedUserId} onClose={handleCloseModal} />
      )}

      {selectedUserId && modalType === 'accesos' && (
        <UsuarioAccesosModal userId={selectedUserId} onClose={handleCloseModal} />
      )}

      {selectedUserId && modalType === 'equipos' && (
        <UsuarioEquiposModal userId={selectedUserId} onClose={handleCloseModal} />
      )}

      {modalType === 'form' && (
        <UsuarioFormModal
          usuario={editingUsuario}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}