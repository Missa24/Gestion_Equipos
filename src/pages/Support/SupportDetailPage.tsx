import { useParams } from "react-router-dom"
import { DetailSupport } from "@/features/Support/components/DetailSupport"

export function SupportDetailPage() {
    const { id } = useParams<{ id: string }>()
    return <DetailSupport id={Number(id)} />
}