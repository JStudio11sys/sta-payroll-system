import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// White content panel with a tinted header strip, used across the dashboard.
export function Panel({
  title,
  action,
  className,
  bodyClassName,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-[22px] bg-card shadow-[0_2px_12px_rgba(27,42,124,0.06)]",
        className
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border bg-panel-header px-5 py-3.5">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {action ?? <MoreHorizontal className="size-4 text-muted-foreground" />}
      </header>
      <div className={cn("flex-1 p-5", bodyClassName)}>{children}</div>
    </section>
  );
}
