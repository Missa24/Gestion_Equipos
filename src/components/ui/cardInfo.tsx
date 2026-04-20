import { ReactElement, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Label } from "./label";

interface CardInfoProps {
  title: string;
  icon: ReactElement;
  fields: { label: string; value: ReactNode }[];
}

const CardInfo = ({ title, icon, fields }: CardInfoProps) => {
  const isTwoColumns = fields.length > 2;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          className={`grid gap-3 ${isTwoColumns ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
        >
          {fields.map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <Label className="text-xs text-muted-foreground">
                {field.label}
              </Label>
              <span className="text-sm mt-0.5">{field.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
