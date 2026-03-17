export function formatDate(dateStr: string | null | undefined) {
    if (!dateStr) return "—";
    return new Intl.DateTimeFormat("es-BO", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(dateStr));
}
