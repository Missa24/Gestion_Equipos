import { Title } from "@/components/ui/title";
import { DatabaseTable } from "@/features/Database/Components/DatabaseTable";

export const DatabasePage = () => {
  return (
    <div>
      <Title
        title="Gestiòn de Base de datos"
        subtitle="Administra las bases de datos registradas"
        className="pb-5"
      />
      <div>
        <DatabaseTable />
      </div>
    </div>
  );
};
