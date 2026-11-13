import { Panel } from "@/components/panel";
import { costByDepartment, peso } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const maxCost = Math.max(...costByDepartment.map((d) => d.cost));

export function DepartmentTable() {
  return (
    <Panel title="Cost by Department" className="h-full" bodyClassName="flex flex-col gap-4">
      {costByDepartment.map((d) => (
        <div key={d.dept}>
          <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium">
              {d.dept} <span className="text-xs font-normal text-muted-foreground">· {d.headcount} staff</span>
            </span>
            <span className="tabular-nums">
              {peso(d.cost)}{" "}
              <span
                className={cn(
                  "text-xs",
                  d.change > 0 && "text-success",
                  d.change < 0 && "text-destructive",
                  d.change === 0 && "text-muted-foreground"
                )}
              >
                {d.change > 0 ? "+" : ""}
                {d.change.toFixed(1)}%
              </span>
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary">
            <div className="h-2 rounded-full bg-chart-2" style={{ width: `${(d.cost / maxCost) * 100}%` }} />
          </div>
        </div>
      ))}
    </Panel>
  );
}
