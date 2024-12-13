import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardsProps {
  title: string;
  href?: string;
  desc?: string;
  children: React.ReactNode;
}

export function CardForm({ title, children }: CardsProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-left pt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function CardSwitch({ title, desc, children }: CardsProps) {
  return (
    <Card className="flex items-center justify-center">
      <CardHeader className="flex flex-col">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc || "default description"}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center p-4">{children}</CardContent>
    </Card>
  );
}
