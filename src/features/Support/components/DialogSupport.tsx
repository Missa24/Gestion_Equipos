import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormSupportEdit } from "./FormSupportEdit";
import { Pencil } from "lucide-react";
import { Application } from "../schema/SupportSchema";

interface DialogSupportProps {
  text: string;
  mode: "create" | "edit";
  row?: Application;
}

export function DialogSupport({ text, mode, row }: DialogSupportProps) {
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
            {mode === "edit" ? "Editar Ticket" : "Nuevo Ticket"}
          </DialogTitle>
          <DialogDescription>
            Crea un nuevo ticket de solicitud
          </DialogDescription>
        </DialogHeader>
        {mode === "edit" ? (
          <FormSupportEdit mode={mode} initialData={row} onSuccess={() => {}} />
        ) : (
          <FormSupportEdit mode={mode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
