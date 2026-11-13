import { AlertTriangle, Info } from "lucide-react";
import { Panel } from "@/components/panel";
import { alerts } from "@/lib/mock-data";

export function AlertsPanel() {
  return (
    <Panel title="Alerts" className="h-full" bodyClassName="p-0">
      <ul className="divide-y divide-border">
        {alerts.map((a) => (
          <li key={a.text} className="flex items-start gap-3 px-5 py-3.5 text-sm">
            {a.level === "warn" ? (
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" />
            ) : (
              <Info className="mt-0.5 size-4 shrink-0 text-chart-2" />
            )}
            <span>{a.text}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
