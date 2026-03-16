import { UsuariosTable } from "./UsuariosTable";

export default function UsuariosPage() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
                <p className="text-muted-foreground text-sm">
                    Gestión de usuarios del sistema
                </p>
            </div>
            <UsuariosTable />
        </div>
    );
}
