"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Bell, Search } from "lucide-react";
import { alerts, currentPeriod, currentUser, navItems } from "@/lib/mock-data";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

function usePageTitle() {
  const pathname = usePathname();
  return navItems.find((n) => n.href === pathname)?.label ?? "Dashboard";
}

function AlertsButton({ dark = false }: { dark?: boolean }) {
  return (
    <motion.button
      type="button"
      aria-label="Alerts"
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative grid size-10 shrink-0 place-items-center rounded-full",
        dark ? "hover:bg-white/10" : "bg-card text-primary shadow-[0_6px_16px_-8px_rgba(27,42,124,0.35)]"
      )}
    >
      <Bell className="size-5" />
      <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
        {alerts.length}
      </span>
    </motion.button>
  );
}

// Desktop top bar: floating navy card. The school brand slides in when the sidebar is collapsed.
export function Topbar({ collapsed }: { collapsed: boolean }) {
  const title = usePageTitle();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.05 }}
      className="hidden h-16 shrink-0 items-center gap-3 rounded-[26px] bg-primary px-5 text-primary-foreground shadow-[0_14px_40px_-20px_rgba(27,42,124,0.6)] lg:flex"
    >
      <div
        className={cn(
          "flex min-w-0 items-center gap-3 overflow-hidden transition-[max-width] duration-500 ease-in-out",
          collapsed ? "max-w-md" : "max-w-0"
        )}
      >
        <Image
          src="/logo.png"
          alt="St. Theresita's Academy logo"
          width={44}
          height={44}
          className="size-11 max-w-none shrink-0"
          data-logo="topbar"
        />
        <div
          className={cn(
            "min-w-0 leading-tight transition-all duration-500",
            collapsed ? "translate-x-0 opacity-100 delay-300" : "-translate-x-6 opacity-0"
          )}
        >
          <div className="truncate font-semibold whitespace-nowrap">St. Theresita&apos;s Academy</div>
          <div className="text-xs whitespace-nowrap text-white/65">of Silay City, Inc.</div>
        </div>
      </div>

      <div className={cn("min-w-0 flex-1 leading-tight transition-all duration-500", collapsed && "border-l border-white/15 pl-4")}>
        <div className="font-semibold">{title}</div>
        <div className="truncate text-xs text-white/65">
          Pay period {currentPeriod.label} · Pay date {currentPeriod.payDate}
        </div>
      </div>

      <label className="flex w-64 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm transition-colors focus-within:bg-white/15">
        <Search className="size-4 text-white/60" />
        <input
          placeholder="Search employee"
          className="w-full bg-transparent text-white outline-none placeholder:text-white/60"
        />
      </label>

      <AlertsButton dark />

      <div className="flex shrink-0 items-center gap-2 border-l border-white/15 pl-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
          {currentUser.initials}
        </span>
        <div className="leading-tight">
          <div className="text-sm font-medium whitespace-nowrap">{currentUser.name}</div>
          <div className="text-[11px] text-white/60">{currentUser.role}</div>
        </div>
      </div>
    </motion.header>
  );
}

// Phone/tablet header: school brand row + large page title, on the page background.
export function MobileHeader() {
  const title = usePageTitle();

  return (
    <header className="px-5 pt-[max(16px,env(safe-area-inset-top))] pb-2 lg:hidden">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="St. Theresita's Academy logo" width={40} height={40} className="size-10 shrink-0" />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-sm font-semibold text-primary">St. Theresita&apos;s Academy</div>
          <div className="truncate text-[11px] text-muted-foreground">Payroll System</div>
        </div>
        <AlertsButton />
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {currentUser.initials}
        </span>
      </div>
      <h1 className="mt-5 text-[26px] font-semibold tracking-tight">{title}</h1>
      <p className="text-xs text-muted-foreground">
        Pay period {currentPeriod.label} · Pay date {currentPeriod.payDate}
      </p>
    </header>
  );
}
