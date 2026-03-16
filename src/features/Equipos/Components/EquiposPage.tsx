import { EquiposTable } from "./EquiposTable";

export const EquiposPage = () => {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Equipos</h1>
                <p className="text-muted-foreground text-sm">
                    Gestión del inventario de equipos tecnológicos
                </p>
            </div>
            <EquiposTable />
        </div>
    );
};
