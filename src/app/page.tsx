import { StatTiles } from "@/components/dashboard/stat-tiles";
import { HistoryChart } from "@/components/dashboard/history-chart";
import { PayrollChecklist } from "@/components/dashboard/payroll-checklist";
import { RegisterTable } from "@/components/dashboard/register-table";
import { DepartmentTable } from "@/components/dashboard/department-table";
import { RemittanceTracker } from "@/components/dashboard/remittance-tracker";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { Stagger, StaggerItem } from "@/components/stagger";

export default function DashboardPage() {
  return (
    <Stagger className="flex flex-col gap-4">
      <StaggerItem>
        <StatTiles />
      </StaggerItem>

      <StaggerItem className="grid gap-4 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <HistoryChart />
        </div>
        <PayrollChecklist />
      </StaggerItem>

      <StaggerItem>
        <RegisterTable />
      </StaggerItem>

      <StaggerItem className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DepartmentTable />
        <RemittanceTracker />
        <div className="md:col-span-2 xl:col-span-1">
          <AlertsPanel />
        </div>
      </StaggerItem>
    </Stagger>
  );
}
