"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Panel } from "@/components/panel";
import { checklist, currentPeriod } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function PayrollChecklist() {
  const [items, setItems] = useState(checklist);
  const toggle = (i: number) =>
    setItems((prev) => prev.map((it, j) => (j === i ? { ...it, done: !it.done } : it)));
  const doneCount = items.filter((i) => i.done).length;

  return (
    <Panel title="Payroll Checklist" className="h-full" bodyClassName="flex flex-col p-0">
      <ul className="flex-1 divide-y divide-border">
        {items.map((it, i) => (
          <li key={it.task}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-start gap-3 px-5 py-3.5 text-left hover:bg-muted"
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border",
                  it.done ? "border-success bg-success text-white" : "border-border bg-card"
                )}
              >
                {it.done && <Check className="size-3.5" />}
              </span>
              <span className="leading-tight">
                <span className={cn("block text-sm", it.done && "text-muted-foreground line-through")}>
                  {it.task}
                </span>
                <span className="text-[11px] text-muted-foreground">{it.date}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
        <span>
          {doneCount} of {items.length} done
        </span>
        <span>
          Status: <span className="font-medium text-primary">{currentPeriod.status}</span>
        </span>
      </div>
    </Panel>
  );
}
