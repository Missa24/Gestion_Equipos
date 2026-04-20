import { ServidoresTable } from "@/features/Servidor/Components/ServidorTable";
import { Title } from "@/components/ui/title";

const ServidorPage = () => {
  return (
    <div>
      <Title
        title="Gestiòn de Servidores"
        subtitle="Administra los servidores registrados"
        className="pb-5"
      />
      <div>
        <ServidoresTable />
      </div>
    </div>
  );
};

export default ServidorPage;
