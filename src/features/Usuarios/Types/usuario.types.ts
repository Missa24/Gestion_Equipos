// src/features/usuarios/types/usuario.types.ts

export interface Usuario {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  ci: number;
  celular: number;
  tipo: string;
  correo_electronico: string;
  cargo: string;
  activo: boolean;
  username: string;
  id_oficina: number;
  id_rol: number;
  oficina: Oficina;
  rol: Rol;
  fecha_creacion: string;
  fecha_modificacion: string;
}

export interface Oficina {
  id_oficina: number;
  nombre: string;
  departamento: string;
  tipo: string;
  direccion: Direccion;
}

export interface Direccion {
  id_direccion: number;
  nombre: string;
  departamento: string;
}

export interface Rol {
  id_rol: number;
  nombre: string;
}

// Tipos para Accesos
export interface AccesoSistema {
  id_acceso: number;
  usuario: string;
  password: string;
  nivel_acceso: string;
  fecha_creacion: string;
  sistema: Sistema | null;
  servidor: Servidor | null;
}

export interface Sistema {
  id_sistema: number;
  nombre: string;
  version: string | null;
  estado: string | null;
  url: string | null;
  direccion_ip: string | null;
  tamaño: string | null;
}

export interface Servidor {
  id_servidor: number;
  nombre: string;
  tipo: string | null;
  ip: string | null;
  hostname: string | null;
  ubicacion: string | null;
  estado: string | null;
  capacidad: string | null;
}

export interface UsuarioAccesos {
  usuario: {
    id_usuario: number;
    nombres: string;
    apellidos: string;
    correo_electronico: string;
    cargo: string;
  };
  total_accesos: number;
  accesos: AccesoSistema[];
}

// Tipos para Equipos
export interface Componente {
  id_componente: number;
  tipo: string;
  marca: string | null;
  modelo: string | null;
  capacidad: string | null;
  numero_serie: string | null;
}

export interface Equipo {
  id_equipo: number;
  marca: string;
  modelo: string;
  numero_serie: string;
  tipo: string;
  estado: string;
  ubicacion: string;
  codigo_activo: string | null;
  fecha_adquisicion: string;
  componentes: Componente[];
}

export interface EquipoAsignacion {
  id_asignacion: number;
  fecha_asignacion: string;
  fecha_de_baja: string | null;
  estado_asignacion: 'Activo' | 'Inactivo';
  equipo: Equipo;
}

export interface UsuarioEquipos {
  usuario: {
    id_usuario: number;
    nombres: string;
    apellidos: string;
    correo_electronico: string;
    cargo: string;
  };
  total_equipos: number;
  equipos_activos: number;
  equipos_historicos: number;
  equipos: EquipoAsignacion[];
}

// Tipo para información completa
export interface UsuarioInfoCompleta {
  usuario: Usuario;
  accesos: UsuarioAccesos;
  equipos: UsuarioEquipos;
}

// Respuestas de API
export interface ApiResponse<T> {
  message: string;
  data: T;
}
