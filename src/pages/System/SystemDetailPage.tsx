import { DetailSystem } from "@/features/System/Components/DetailSystem";
import { useParams } from "react-router-dom";

export function SystemDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <DetailSystem id={Number(id)} />;
}
