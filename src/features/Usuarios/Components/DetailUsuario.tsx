import { Usuario } from "../Schema/UsuarioSchema";
import { Separator } from "@/components/ui/separator";
import {
    BadgeCheck,
    Building2,
    Hash,
    Mail,
    Phone,
    Shield,
    User,
    UserCog,
    XCircle,
} from "lucide-react";

type DetailUsuarioProps = {
    usuario: Usuario;
};

export const DetailUsuario = ({ usuario }: DetailUsuarioProps) => {
    return (
        <div className="space-y-5 text-sm">
            {/* Encabezado */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold">
                        {usuario.nombres} {usuario.apellidos}
                    </h3>
                    <p className="text-muted-foreground text-xs mt-0.5">
                        @{usuario.username} · {usuario.cargo}
                    </p>
                </div>
                <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold shrink-0 ${usuario.activo
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-red-100 text-red-700 border-red-200"
                        }`}
                >
                    {usuario.activo ? (
                        <BadgeCheck className="h-3 w-3" />
                    ) : (
                        <XCircle className="h-3 w-3" />
                    )}
                    {usuario.activo ? "Activo" : "Inactivo"}
                </span>
            </div>

            <Separator />

            {/* Información personal */}
            <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Información personal
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                    <InfoItem
                        icon={<Mail className="h-4 w-4" />}
                        label="Correo"
                        value={usuario.correo_electronico}
                    />
                    <InfoItem
                        icon={<Phone className="h-4 w-4" />}
                        label="Celular"
                        value={String(usuario.celular)}
                    />
                    <InfoItem
                        icon={<Hash className="h-4 w-4" />}
                        label="CI"
                        value={String(usuario.ci)}
                    />
                    <InfoItem
                        icon={<UserCog className="h-4 w-4" />}
                        label="Tipo"
                        value={usuario.tipo}
                    />
                </div>
            </div>

            <Separator />

            {/* Rol y oficina */}
            <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Organización
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                    <InfoItem
                        icon={<Shield className="h-4 w-4" />}
                        label="Rol"
                        value={usuario.rol?.nombre ?? "—"}
                    />
                    <InfoItem
                        icon={<Building2 className="h-4 w-4" />}
                        label="Oficina"
                        value={
                            usuario.oficina
                                ? `${usuario.oficina.nombre} (${usuario.oficina.departamento})`
                                : "—"
                        }
                    />
                    {usuario.oficina?.direccion && (
                        <InfoItem
                            icon={<User className="h-4 w-4" />}
                            label="Dirección"
                            value={`${usuario.oficina.direccion.nombre} · ${usuario.oficina.direccion.departamento}`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

function InfoItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-2">
            <span className="text-muted-foreground mt-0.5">{icon}</span>
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}
