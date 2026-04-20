import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormServidorEdit } from "./FormServidorEdit";
import { Pencil } from "lucide-react";
import { Servidor } from "../Schema/ServidorSchema";

interface DialogServidorProps {
  text: string;
  mode: "create" | "edit";
  row?: Servidor;
}

export function DialogServidor({ text, mode, row }: DialogServidorProps) {
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
            {mode === "edit" ? "Editar Servidor" : "Nuevo Servidor"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Modifica los datos del servidor"
              : "Completa los datos para registrar un nuevo servidor"}
          </DialogDescription>
        </DialogHeader>
        {mode === "edit" ? (
          <FormServidorEdit
            mode={mode}
            initialData={row}
            onSuccess={() => {}}
          />
        ) : (
          <FormServidorEdit mode={mode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
