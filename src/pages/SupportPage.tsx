import { SupportTable } from "@/features/Support/components/SoporteTable";
import { Title } from "@/components/ui/title";
export const SupportPage = () => {
  return (
    <div>
      <Title
        title="Gestiòn de soporte"
        subtitle="Administra los soportes solicitados"
        className="pb-5"
      />
      <div>
        <SupportTable />
      </div>
    </div>
  );
};
