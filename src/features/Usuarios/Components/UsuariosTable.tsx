"use client";
import {
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Loader2,
    Plus,
    Search,
    Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllUsuarios, useDeleteUsuario } from "../Hooks/UsuarioHooks";
import { Usuario, UsuarioFilters } from "../Schema/UsuarioSchema";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getUsuarioColumns } from "./ColumnsUsuario";
import { FormUsuario } from "./FormUsuario";
import { DetailUsuario } from "./DetailUsuario";
import { useAuthStore } from "@/stores/auth.store";

export function UsuariosTable() {
    const { user } = useAuthStore();
    const rol = user?.rol.nombre ?? "USER";

    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [activo, setActivo] = useState<boolean | undefined>(undefined);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    // Dialogs
    const [createOpen, setCreateOpen] = useState(false);
    const [editRow, setEditRow] = useState<Usuario | null>(null);
    const [viewRow, setViewRow] = useState<Usuario | null>(null);
    const [deleteRow, setDeleteRow] = useState<Usuario | null>(null);

    const { mutate: deleteUsuario, isPending: deleting } = useDeleteUsuario();

    const LIMIT = 10;

    // Debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 400);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    const filters: UsuarioFilters = {
        page,
        limit: LIMIT,
        ...(search && { search }),
        ...(activo !== undefined && { activo }),
    };

    const { data: response, isLoading, isFetching } = useGetAllUsuarios(filters);
    const data = response?.data ?? [];
    const pagination = response?.pagination;

    const handleView = useCallback((row: Usuario) => setViewRow(row), []);
    const handleEdit = useCallback((row: Usuario) => setEditRow(row), []);
    const handleDelete = useCallback((row: Usuario) => setDeleteRow(row), []);

    const columns = useMemo(
        () => getUsuarioColumns(handleView, handleEdit, handleDelete, rol),
        [handleView, handleEdit, handleDelete, rol]
    );

    const table = useReactTable({
        data,
        columns,
        state: { columnVisibility },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: pagination?.total ?? 0,
    });

    function handleActivoChange(val: string) {
        if (val === "todos") setActivo(undefined);
        else setActivo(val === "true");
        setPage(1);
    }

    function confirmDelete() {
        if (!deleteRow) return;
        deleteUsuario(deleteRow.id_usuario, {
            onSuccess: () => setDeleteRow(null),
        });
    }

    const canPrev = page > 1 && !isFetching;
    const canNext = page < (pagination?.totalPages ?? 1) && !isFetching;

    return (
        <div className="space-y-4">
            {/* Barra de herramientas */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nombre, correo, username…"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-8"
                    />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <Select
                        value={activo === undefined ? "todos" : String(activo)}
                        onValueChange={handleActivoChange}
                    >
                        <SelectTrigger className="h-9 w-[145px]">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="true">Activos</SelectItem>
                            <SelectItem value="false">Inactivos</SelectItem>
                        </SelectContent>
                    </Select>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9">
                                <Settings2 className="mr-2 h-4 w-4" />
                                Columnas
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {table
                                .getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.id}
                                        className="capitalize"
                                        checked={col.getIsVisible()}
                                        onCheckedChange={(val) =>
                                            col.toggleVisibility(!!val)
                                        }
                                    >
                                        {col.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {rol !== "USER" && (
                        <Button
                            size="sm"
                            className="h-9"
                            onClick={() => setCreateOpen(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo usuario
                        </Button>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id} className="bg-muted/50">
                                {hg.headers.map((header) => (
                                    <TableHead key={header.id} className="whitespace-nowrap">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-center"
                                >
                                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={`hover:bg-muted/30 transition-colors ${
                                        isFetching ? "opacity-50" : ""
                                    }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    No se encontraron usuarios.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {isFetching && !isLoading && (
                        <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                    Total: {pagination?.total ?? 0} usuarios
                </p>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium whitespace-nowrap">
                        Página {page} de {pagination?.totalPages ?? 1}
                    </span>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage(1)}
                            disabled={!canPrev}
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage((p) => p - 1)}
                            disabled={!canPrev}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage((p) => p + 1)}
                            disabled={!canNext}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setPage(pagination?.totalPages ?? 1)}
                            disabled={!canNext}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Dialog: Crear */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Registrar usuario</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto flex-1 pr-1">
                        <FormUsuario
                            mode="create"
                            onSuccess={() => setCreateOpen(false)}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog: Editar */}
            <Dialog
                open={!!editRow}
                onOpenChange={(open: boolean) => !open && setEditRow(null)}
            >
                <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Editar usuario</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto flex-1 pr-1">
                        {editRow && (
                            <FormUsuario
                                initialData={editRow}
                                mode="edit"
                                onSuccess={() => setEditRow(null)}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog: Ver detalle */}
            <Dialog
                open={!!viewRow}
                onOpenChange={(open: boolean) => !open && setViewRow(null)}
            >
                <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Detalle del usuario</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-y-auto flex-1 pr-1">
                        {viewRow && <DetailUsuario usuario={viewRow} />}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog: Confirmar desactivar */}
            <Dialog
                open={!!deleteRow}
                onOpenChange={(open: boolean) => !open && setDeleteRow(null)}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>¿Desactivar usuario?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        Se desactivará a{" "}
                        <span className="font-medium text-foreground">
                            {deleteRow?.nombres} {deleteRow?.apellidos}
                        </span>{" "}
                        (@{deleteRow?.username}). El usuario no podrá iniciar sesión.
                    </p>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteRow(null)}
                            disabled={deleting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={confirmDelete}
                            disabled={deleting}
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Desactivando…
                                </>
                            ) : (
                                "Desactivar"
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
