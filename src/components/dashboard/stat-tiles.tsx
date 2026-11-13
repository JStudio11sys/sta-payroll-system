import { ArrowDown, ArrowUp, Banknote, MinusCircle, Users, Wallet } from "lucide-react";
import { kpis, netPerCutoff, peso } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/stagger";

const [prev, curr] = netPerCutoff.slice(-2);
const pct = (a: number, b: number) => ((a - b) / b) * 100;

const tiles = [
  {
    value: String(kpis.teaching + kpis.nonTeaching),
    label: "Active employees",
    trend: `${kpis.teaching} teaching · ${kpis.nonTeaching} non-teaching`,
    change: null as number | null,
    icon: Users,
  },
  { value: peso(kpis.gross), label: "Gross pay", change: pct(curr.gross, prev.gross), icon: Wallet },
  {
    value: peso(kpis.deductions),
    label: "Total deductions",
    change: pct(curr.gross - curr.net, prev.gross - prev.net),
    icon: MinusCircle,
  },
  { value: peso(kpis.net), label: "Net pay", change: pct(curr.net, prev.net), icon: Banknote },
];

export function StatTiles() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tiles.map(({ value, label, trend, change, icon: Icon }) => (
        <StaggerItem
          key={label}
          className="flex items-center justify-between gap-3 rounded-[22px] bg-card p-5 shadow-[0_2px_12px_rgba(27,42,124,0.06)]"
        >
          <div className="min-w-0">
            <div className="truncate text-xl font-semibold tabular-nums">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
            {change === null ? (
              <div className="mt-1 text-[11px] text-muted-foreground">{trend}</div>
            ) : (
              <div
                className={cn(
                  "mt-1 flex items-center gap-1 text-[11px]",
                  change >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {change >= 0 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                {Math.abs(change).toFixed(1)}% vs last cut-off
              </div>
            )}
          </div>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary">
            <Icon className="size-5 text-primary" />
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
