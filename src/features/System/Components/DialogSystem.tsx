import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormSystemEdit } from "./FormSystem";
import { Pencil } from "lucide-react";
import { Sistema } from "../Schema/SystemSchema";

interface DialogSystemProps {
  text: string;
  mode: "create" | "edit";
  row?: Sistema;
}

export function DialogSystem({ text, mode, row }: DialogSystemProps) {
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

      <DialogContent className="max-w-2xl w-full h-[90vh] overflow-auto sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Editar Sistema" : "Nuevo Sistema"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Modifica los datos del sistema"
              : "Completa los datos para registrar un nuevo sistema"}
          </DialogDescription>
        </DialogHeader>
        {mode === "edit" ? (
          <FormSystemEdit mode={mode} initialData={row} onSuccess={() => {}} />
        ) : (
          <FormSystemEdit mode={mode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
