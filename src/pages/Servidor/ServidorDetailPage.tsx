import { useParams } from "react-router-dom";
import { DetailServidor } from "@/features/Servidor/Components/DetailServidor";

export function ServidorDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <DetailServidor id={Number(id)} />;
}
