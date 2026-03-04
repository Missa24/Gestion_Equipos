// src/features/Usuarios/Components/UsuarioFormModal.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUsuarioSchema, UpdateUsuarioSchema } from '../Schema/UsuarioSchema';
import type { Usuario } from '../Types/usuario.types';
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
  usuario?: Usuario | null;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function UsuarioFormModal({ usuario, onClose, onSubmit, isLoading }: Props) {
  const isEditing = !!usuario;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEditing ? UpdateUsuarioSchema : CreateUsuarioSchema),
    defaultValues: isEditing && usuario ? {
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      ci: usuario.ci,
      celular: usuario.celular,
      tipo: usuario.tipo,
      correo_electronico: usuario.correo_electronico,
      cargo: usuario.cargo,
      username: usuario.username,
      id_oficina: usuario.id_oficina,
      id_rol: usuario.id_rol,
      activo: usuario.activo,
    } : undefined,
  });

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombres">Nombres *</Label>
              <Input
                id="nombres"
                {...register('nombres')}
                placeholder="Juan Carlos"
              />
              {errors.nombres && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.nombres.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="apellidos">Apellidos *</Label>
              <Input
                id="apellidos"
                {...register('apellidos')}
                placeholder="Pérez García"
              />
              {errors.apellidos && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.apellidos.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="ci">CI *</Label>
              <Input
                id="ci"
                type="number"
                {...register('ci')}
                placeholder="12345678"
              />
              {errors.ci && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.ci.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="celular">Celular *</Label>
              <Input
                id="celular"
                type="number"
                {...register('celular')}
                placeholder="78945612"
              />
              {errors.celular && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.celular.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="correo_electronico">Email *</Label>
              <Input
                id="correo_electronico"
                type="email"
                {...register('correo_electronico')}
                placeholder="juan@empresa.com"
              />
              {errors.correo_electronico && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.correo_electronico.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="username">Usuario *</Label>
              <Input
                id="username"
                {...register('username')}
                placeholder="jperez"
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.username.message)}
                </p>
              )}
            </div>

            {!isEditing && (
              <div>
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {String(errors.password.message)}
                  </p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="cargo">Cargo *</Label>
              <Input
                id="cargo"
                {...register('cargo')}
                placeholder="Desarrollador"
              />
              {errors.cargo && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.cargo.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="tipo">Tipo *</Label>
              <select
                id="tipo"
                {...register('tipo')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="Permanente">Permanente</option>
                <option value="Contrato">Contrato</option>
                <option value="Pasante">Pasante</option>
              </select>
              {errors.tipo && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.tipo.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="id_oficina">ID Oficina *</Label>
              <Input
                id="id_oficina"
                type="number"
                {...register('id_oficina')}
                placeholder="1"
              />
              {errors.id_oficina && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.id_oficina.message)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="id_rol">ID Rol *</Label>
              <Input
                id="id_rol"
                type="number"
                {...register('id_rol')}
                placeholder="1"
              />
              {errors.id_rol && (
                <p className="text-sm text-red-600 mt-1">
                  {String(errors.id_rol.message)}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex items-center gap-2 pt-8">
                <input
                  id="activo"
                  type="checkbox"
                  {...register('activo')}
                  className="h-4 w-4"
                />
                <Label htmlFor="activo">Usuario Activo</Label>
              </div>
            )}
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
                <>{isEditing ? 'Actualizar' : 'Crear Usuario'}</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}