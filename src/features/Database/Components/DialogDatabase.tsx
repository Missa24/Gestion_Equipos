import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { FormBaseDatos } from "./FormDataBase";
import { BaseDatos } from "../Schema/databaseSchemta";

interface DialogBaseDatosProps {
  text: string;
  mode: "create" | "edit";
  row?: BaseDatos;
}

export function DialogBaseDatos({ text, mode, row }: DialogBaseDatosProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>{text}</Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-full h-[90vh] overflow-auto sm:rounded-lg p-6 flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Editar Base de Datos" : "Nueva Base de Datos"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Modifica los datos de la base de datos"
              : "Completa los datos para registrar una nueva base de datos"}
          </DialogDescription>
        </DialogHeader>
        {mode === "edit" ? (
          <FormBaseDatos mode={mode} initialData={row} onSuccess={() => {}} />
        ) : (
          <FormBaseDatos mode={mode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
