import { useParams } from "react-router-dom";
import { DetailBaseDatos } from "@/features/Database/Components/DetailDatabase";

export function DatabaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <DetailBaseDatos id={Number(id)} />;
}
