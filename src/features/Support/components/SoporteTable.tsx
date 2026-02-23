"use client"
import {
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Settings2,
    Search,
    Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetAllSupport } from "../hooks/SupportHooks"
import { SupportFilters, Application } from "../schema/SupportSchema"
import { useCallback, useEffect, useMemo, useState } from "react"
import { getColumns } from "./ColumnsSupport"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormSupportEdit } from "./FormSupportEdit"



export function SupportTable() {
    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [estado, setEstado] = useState<string | undefined>(undefined)
    const [prioridad, setPrioridad] = useState<string | undefined>(undefined)
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [editRow, setEditRow] = useState<Application | null>(null)

    const LIMIT = 10

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput)
            setPage(1)
        }, 400)
        return () => clearTimeout(timeout)
    }, [searchInput])

    const filters: SupportFilters = {
        page,
        limit: LIMIT,
        ...(search && { search }),
        ...(estado && { estado }),
        ...(prioridad && { prioridad }),
    }

    const { data: response, isLoading, isFetching } = useGetAllSupport(filters)

    const data = response?.data ?? []
    const meta = response?.meta
    const navigate = useNavigate()

    const handleView = useCallback((row: Application) => {
        navigate(`/dashboard/soporte/${row.id_soporte}`)
    }, [navigate])

    const handleEdit = useCallback((row: Application) => {
        setEditRow(row)
    }, [])

    const columns = useMemo(
        () => getColumns(handleView, handleEdit),
        [handleView, handleEdit]
    )

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        state: { columnVisibility },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: meta?.total ?? 0,
    })

    function handleEstadoChange(val: string) {
        setEstado(val === "todos" ? undefined : val)
        setPage(1)
    }

    function handlePrioridadChange(val: string) {
        setPrioridad(val === "todos" ? undefined : val)
        setPage(1)
    }

    const canPrev = page > 1 && !isFetching
    const canNext = page < (meta?.totalPages ?? 1) && !isFetching

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nombre del solicitante..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="pl-8"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Select value={estado ?? "todos"} onValueChange={handleEstadoChange}>
                        <SelectTrigger className="h-9 w-[145px]">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos los estados</SelectItem>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                            <SelectItem value="En proceso">En proceso</SelectItem>
                            <SelectItem value="Resuelto">Resuelto</SelectItem>
                            <SelectItem value="Cancelado">Cancelado</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={prioridad ?? "todos"} onValueChange={handlePrioridadChange}>
                        <SelectTrigger className="h-9 w-[145px]">
                            <SelectValue placeholder="Prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Toda prioridad</SelectItem>
                            <SelectItem value="Alta">Alta</SelectItem>
                            <SelectItem value="Media">Media</SelectItem>
                            <SelectItem value="Baja">Baja</SelectItem>
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
                                        onCheckedChange={(val) => col.toggleVisibility(!!val)}
                                    >
                                        {col.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id} className="bg-muted/50">
                                {hg.headers.map((header) => (
                                    <TableHead key={header.id} className="whitespace-nowrap">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center">
                                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={`hover:bg-muted/30 transition-colors ${isFetching ? "opacity-50" : ""}`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                                    No se encontraron solicitudes.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {isFetching && !isLoading && (
                        <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                    Total: {meta?.total ?? 0} solicitudes
                </p>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium whitespace-nowrap">
                        Página {page} de {meta?.totalPages ?? 1}
                    </span>

                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8"
                            onClick={() => setPage(1)} disabled={!canPrev}>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8"
                            onClick={() => setPage((p) => p - 1)} disabled={!canPrev}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8"
                            onClick={() => setPage((p) => p + 1)} disabled={!canNext}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8"
                            onClick={() => setPage(meta?.totalPages ?? 1)} disabled={!canNext}>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
            <Dialog open={!!editRow} onOpenChange={(open) => !open && setEditRow(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Editar Solicitud</DialogTitle>
                    </DialogHeader>
                    {editRow && (
                        <FormSupportEdit
                            data={editRow}
                            onSuccess={() => setEditRow(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>

    )
}