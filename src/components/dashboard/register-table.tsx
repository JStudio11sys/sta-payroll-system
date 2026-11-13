"use client";

import { ArrowUpDown } from "lucide-react";
import {
  createColumnHelper,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_basic,
  sortFn_text,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/panel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { peso, register, type RegisterRow } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { basic: sortFn_basic, text: sortFn_text },
});

const helper = createColumnHelper<typeof features, RegisterRow>();
const money = (v: number) => <span className="tabular-nums">{peso(v)}</span>;

const columns = helper.columns([
  helper.accessor("id", { header: "ID", sortFn: "text" }),
  helper.accessor("name", { header: "Employee", sortFn: "text" }),
  helper.accessor("category", {
    header: "Category",
    sortFn: "text",
    cell: (info) => (
      <Badge variant={info.getValue() === "Teaching" ? "secondary" : "outline"}>
        {info.getValue()}
      </Badge>
    ),
  }),
  helper.accessor("dept", { header: "Department", sortFn: "text" }),
  helper.accessor("gross", { header: "Gross", sortFn: "basic", cell: (i) => money(i.getValue()) }),
  helper.accessor("deductions", { header: "Deductions", sortFn: "basic", cell: (i) => money(i.getValue()) }),
  helper.accessor("net", { header: "Net", sortFn: "basic", cell: (i) => money(i.getValue()) }),
]);

const numeric = new Set(["gross", "deductions", "net"]);

export function RegisterTable() {
  const table = useTable({ features, columns, data: register });

  return (
    <Panel title="Payroll Register (current period)" bodyClassName="px-3 py-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn("text-xs font-normal text-muted-foreground", numeric.has(header.column.id) && "text-right")}
                  >
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      <table.FlexRender header={header} />
                      <ArrowUpDown className="size-3 opacity-50" />
                    </button>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn("py-3.5", numeric.has(cell.column.id) && "text-right tabular-nums")}
                  >
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Panel>
  );
}
