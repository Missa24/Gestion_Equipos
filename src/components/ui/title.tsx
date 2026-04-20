import { cn } from "@/lib/utils";

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Title({ title, subtitle, className }: TitleProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
