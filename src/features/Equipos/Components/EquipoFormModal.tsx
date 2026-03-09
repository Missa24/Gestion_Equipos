// src/features/Equipos/Components/EquipoFormModal.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateEquipoSchema, UpdateEquipoSchema } from '../Schema/EquipoSchema';
import type { Equipo } from '../Types/equipo.types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Loader2 } from 'lucide-react';

interface Props {
  equipo?: Equipo | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function EquipoFormModal({ equipo, onClose, onSubmit, isLoading }: Props) {
  const isEditing = !!equipo;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(isEditing ? UpdateEquipoSchema : CreateEquipoSchema),
  });

  // DEBUG: Ver qué valores tiene el formulario
  const formData = watch();
  console.log('📝 DATOS DEL FORMULARIO:', formData);

  const handleFormSubmit = (data: any) => {
    console.log('🚀 ENVIANDO DATOS:', data);
    onSubmit(data);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Equipo' : 'Nuevo Equipo'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="marca">Marca *</Label>
              <Input
                id="marca"
                {...register('marca')}
                placeholder="HP, Dell, Lenovo..."
              />
              {errors.marca && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.marca.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="modelo">Modelo *</Label>
              <Input
                id="modelo"
                {...register('modelo')}
                placeholder="EliteBook 840 G8"
              />
              {errors.modelo && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.modelo.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="numero_serie">Número de Serie *</Label>
              <Input
                id="numero_serie"
                {...register('numero_serie')}
                placeholder="5CD12345AB"
              />
              {errors.numero_serie && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.numero_serie.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="codigo_activo">Código de Activo</Label>
              <Input
                id="codigo_activo"
                {...register('codigo_activo')}
                placeholder="ACT-2024-001"
              />
            </div>

            <div>
              <Label htmlFor="tipo">Tipo *</Label>
              <select
                id="tipo"
                {...register('tipo')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Servidor">Servidor</option>
                <option value="Impresora">Impresora</option>
                <option value="Monitor">Monitor</option>
              </select>
              {errors.tipo && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.tipo.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="estado">Estado *</Label>
              <select
                id="estado"
                {...register('estado')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="Operativo">Operativo</option>
                <option value="En Reparación">En Reparación</option>
                <option value="Dado de Baja">Dado de Baja</option>
                <option value="En Bodega">En Bodega</option>
              </select>
              {errors.estado && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.estado.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="ubicacion">Ubicación *</Label>
              <Input
                id="ubicacion"
                {...register('ubicacion')}
                placeholder="Oficina Central - Piso 3"
              />
              {errors.ubicacion && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.ubicacion.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="fecha_adquisicion">Fecha de Adquisición *</Label>
              <Input
                id="fecha_adquisicion"
                type="date"
                {...register('fecha_adquisicion')}
              />
              {errors.fecha_adquisicion && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.fecha_adquisicion.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="id_usuario">ID Usuario *</Label>
              <Input
                id="id_usuario"
                {...register('id_usuario')}
                placeholder="1"
              />
              {errors.id_usuario && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.id_usuario.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="id_oficina">ID Oficina *</Label>
              <Input
                id="id_oficina"
                {...register('id_oficina')}
                placeholder="1"
              />
              {errors.id_oficina && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.id_oficina.message)}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                <>{isEditing ? 'Actualizar' : 'Crear Equipo'}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}