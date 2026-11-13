import { Panel } from "@/components/panel";
import { peso, remittances, type RemittanceStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyle: Record<RemittanceStatus, string> = {
  Pending: "bg-destructive/10 text-destructive",
  Filed: "bg-accent/20 text-[#8a6a0a]",
  Paid: "bg-success/10 text-success",
};

export function RemittanceTracker() {
  return (
    <Panel title="Government Remittances" className="h-full" bodyClassName="p-0">
      <ul className="divide-y divide-border">
        {remittances.map((r) => (
          <li key={r.agency} className="flex items-center justify-between gap-3 px-5 py-3.5">
            <div className="leading-tight">
              <div className="text-sm font-medium">
                {r.agency} <span className="text-xs font-normal text-muted-foreground">{r.form}</span>
              </div>
              <div className="text-[11px] text-muted-foreground">Due {r.due}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm tabular-nums">{peso(r.amount)}</span>
              <span className={cn("rounded px-2 py-0.5 text-[11px] font-medium", statusStyle[r.status])}>
                {r.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
