import { Card, CardContent } from "@/components/ui/card";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          Coming soon.
        </CardContent>
      </Card>
    </div>
  );
}
