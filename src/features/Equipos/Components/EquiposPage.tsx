// src/features/Equipos/Components/EquiposPage.tsx

import { useState } from 'react';
import {
  useEquipos,
  useCreateEquipo,
  useUpdateEquipo,
  useDeleteEquipo,
} from '../Hooks/useEquipos';
import type { Equipo } from '../Types/equipo.types';
import type { CreateEquipoInput, UpdateEquipoInput } from '../Schema/EquipoSchema';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import {
  Loader2,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
} from 'lucide-react';
import { EquipoFormModal } from './EquipoFormModal';

export default function EquiposPage() {
  const [modalType, setModalType] = useState<'form' | null>(null);
  const [editingEquipo, setEditingEquipo] = useState<Equipo | null>(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('all');
  const [filterTipo, setFilterTipo] = useState<string>('all');

  const { data: equipos, isLoading, error, refetch } = useEquipos();
  const createMutation = useCreateEquipo();
  const updateMutation = useUpdateEquipo();
  const deleteMutation = useDeleteEquipo();

  const handleCloseModal = () => {
    setModalType(null);
    setEditingEquipo(null);
  };

  const handleCreateNew = () => {
    setEditingEquipo(null);
    setModalType('form');
  };

  const handleEdit = (equipo: Equipo) => {
    setEditingEquipo(equipo);
    setModalType('form');
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
      await deleteMutation.mutateAsync(id);
      refetch();
    }
  };

  const handleFormSubmit = async (data: CreateEquipoInput | UpdateEquipoInput) => {
    if (editingEquipo) {
      await updateMutation.mutateAsync({
        id: editingEquipo.id_equipo,
        data: data as UpdateEquipoInput,
      });
    } else {
      await createMutation.mutateAsync(data as CreateEquipoInput);
    }
    handleCloseModal();
    refetch();
  };

  // Filtrado
  const filteredEquipos = equipos?.filter((equipo: any) => {
    const matchesSearch =
      searchTerm === '' ||
      equipo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.numero_serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEstado = filterEstado === 'all' || equipo.estado === filterEstado;
    const matchesTipo = filterTipo === 'all' || equipo.tipo === filterTipo;

    return matchesSearch && matchesEstado && matchesTipo;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterEstado('all');
    setFilterTipo('all');
  };

  const hasActiveFilters =
    searchTerm !== '' || filterEstado !== 'all' || filterTipo !== 'all';

  // Calcular estadísticas
  const stats = {
    total: equipos?.length || 0,
    operativos: equipos?.filter((e: any) => e.estado === 'Operativo').length || 0,
    en_reparacion: equipos?.filter((e: any) => e.estado === 'En Reparación').length || 0,
    dados_de_baja: equipos?.filter((e: any) => e.estado === 'Dado de Baja').length || 0,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Cargando equipos...</p>
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
              <p className="text-red-600 mb-4">Error al cargar equipos</p>
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
          <h1 className="text-3xl font-bold">Equipos</h1>
          <p className="text-muted-foreground">
            Gestiona equipos y componentes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Equipo
          </Button>
        </div>
      </div>

      {/* Filtros */}
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
                  placeholder="Marca, modelo, serie, ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Estado</label>
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">Todos</option>
                <option value="Operativo">Operativo</option>
                <option value="En Reparación">En Reparación</option>
                <option value="Dado de Baja">Dado de Baja</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tipo</label>
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">Todos</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Servidor">Servidor</option>
                <option value="Impresora">Impresora</option>
                <option value="Monitor">Monitor</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 text-sm text-muted-foreground">
              Mostrando {filteredEquipos?.length} de {equipos?.length} equipos
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equipos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {filteredEquipos?.length !== equipos?.length &&
                `${filteredEquipos?.length} filtrados`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.operativos}
            </div>
            <p className="text-xs text-muted-foreground">Funcionando</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Reparación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.en_reparacion}
            </div>
            <p className="text-xs text-muted-foreground">Requieren mantenimiento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dados de Baja</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.dados_de_baja}
            </div>
            <p className="text-xs text-muted-foreground">Fuera de servicio</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Equipos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Equipo</th>
                  <th className="text-left p-4 font-medium">Tipo</th>
                  <th className="text-left p-4 font-medium">Serie</th>
                  <th className="text-left p-4 font-medium">Ubicación</th>
                  <th className="text-left p-4 font-medium">Estado</th>
                  <th className="text-left p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipos?.map((equipo: any) => (
                  <tr key={equipo.id_equipo} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">
                          {equipo.marca} {equipo.modelo}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {equipo.codigo_activo || 'Sin código'}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{equipo.tipo}</td>
                    <td className="p-4 text-sm font-mono">{equipo.numero_serie}</td>
                    <td className="p-4 text-sm">{equipo.ubicacion}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          equipo.estado === 'Operativo'
                            ? 'bg-green-100 text-green-800'
                            : equipo.estado === 'En Reparación'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {equipo.estado}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(equipo)}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(equipo.id_equipo)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredEquipos?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {hasActiveFilters
                  ? 'No se encontraron equipos con los filtros aplicados'
                  : 'No hay equipos registrados'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modales */}
      {modalType === 'form' && (
        <EquipoFormModal
          equipo={editingEquipo}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}
