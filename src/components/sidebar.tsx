"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  Clock,
  Calculator,
  HandCoins,
  Landmark,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react";
import { navItems, remittances } from "@/lib/mock-data";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const navIcons: Record<string, LucideIcon> = {
  "/": LayoutDashboard,
  "/employees": Users,
  "/timekeeping": Clock,
  "/payroll-runs": Calculator,
  "/loans": HandCoins,
  "/remittances": Landmark,
  "/reports": FileText,
  "/settings": Settings,
};
export const pendingRemittances = remittances.filter((r) => r.status === "Pending").length;

// Sizes shared with the logo "fly" animation in app-shell.tsx.
export const SIDEBAR_FULL = 256;
export const SIDEBAR_RAIL = 76;
export const SIDEBAR_PAD = 12;
export const SIDEBAR_LOGO = 88;

const MotionLink = motion.create(Link);

function NavList({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  // Switch the pill on click right away, before the new page has loaded.
  const [activeHref, setActiveHref] = useState(pathname);
  useEffect(() => setActiveHref(pathname), [pathname]);

  return (
    <nav className="flex shrink-0 flex-col gap-1">
      {navItems.map((item) => {
        const Icon = navIcons[item.href];
        const active = activeHref === item.href;
        const count = item.href === "/remittances" ? pendingRemittances : 0;
        return (
          <MotionLink
            key={item.href}
            href={item.href}
            onClick={() => setActiveHref(item.href)}
            whileTap={{ scale: 0.95 }}
            title={collapsed ? item.label : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors duration-300",
              active ? "text-sidebar-primary-foreground" : "text-sidebar-foreground hover:text-white"
            )}
          >
            {active ? (
              <motion.span layoutId="sidebar-active" transition={spring} className="absolute inset-0 rounded-2xl bg-sidebar-primary" />
            ) : (
              <span className="absolute inset-0 rounded-2xl bg-sidebar-accent opacity-0 transition-opacity group-hover:opacity-100" />
            )}
            <Icon className="relative size-5 shrink-0" />
            <span
              className={cn(
                "relative flex-1 overflow-hidden whitespace-nowrap transition-all duration-300",
                collapsed && "-translate-x-3 opacity-0"
              )}
            >
              {item.label}
            </span>
            {count > 0 && (
              <span
                className={cn(
                  "relative rounded-full bg-accent px-1.5 text-[10px] font-semibold text-accent-foreground",
                  collapsed && "absolute top-1 left-8"
                )}
              >
                {count}
              </span>
            )}
          </MotionLink>
        );
      })}
    </nav>
  );
}

export function SchoolBrand({ flyTarget = false, size = SIDEBAR_LOGO }: { flyTarget?: boolean; size?: number }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <motion.div whileHover={{ rotate: -8, scale: 1.06 }} transition={spring}>
        <Image
          src="/logo.png"
          alt="St. Theresita's Academy logo"
          width={size}
          height={size}
          priority
          data-logo={flyTarget ? "sidebar" : undefined}
        />
      </motion.div>
      <div className="leading-snug">
        <div className="text-base font-semibold whitespace-nowrap text-white">St. Theresita&apos;s Academy</div>
        <div className="text-sm text-white/75">of Silay City, Inc.</div>
        <div className="mt-1 text-[11px] tracking-wide text-accent uppercase">Payroll System</div>
      </div>
    </div>
  );
}

// Desktop sidebar: floating card, full width or a narrow icon rail when collapsed.
export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <motion.aside
      data-sidebar
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0, width: collapsed ? SIDEBAR_RAIL : SIDEBAR_FULL }}
      transition={spring}
      className="no-scrollbar hidden h-full shrink-0 flex-col overflow-x-hidden overflow-y-auto rounded-[26px] bg-sidebar py-4 text-sidebar-foreground shadow-[0_14px_40px_-20px_rgba(27,42,124,0.6)] lg:flex"
      style={{ width: SIDEBAR_FULL, paddingLeft: SIDEBAR_PAD, paddingRight: SIDEBAR_PAD }}
    >
      <div className={cn("mb-2 flex shrink-0", collapsed ? "justify-center" : "justify-end")}>
        <motion.button
          layout
          type="button"
          onClick={onToggle}
          whileTap={{ scale: 0.88 }}
          transition={spring}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-2xl p-2.5 text-white hover:bg-sidebar-accent"
        >
          <motion.span className="block" animate={{ rotate: collapsed ? 180 : 0 }} transition={spring}>
            <ChevronLeft className="size-5" />
          </motion.span>
        </motion.button>
      </div>

      <div
        className={cn(
          "shrink-0 overflow-hidden transition-all duration-500",
          collapsed ? "max-h-0 opacity-0" : "mb-6 max-h-64 border-b border-sidebar-border pb-6 opacity-100"
        )}
      >
        <SchoolBrand flyTarget />
      </div>

      <div
        className={cn(
          "mb-2 px-4 text-xs font-medium tracking-wide whitespace-nowrap text-white uppercase transition-all duration-300",
          collapsed && "-translate-x-3 opacity-0"
        )}
      >
        Main Menu
      </div>
      <NavList collapsed={collapsed} />

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        title={collapsed ? "Logout" : undefined}
        className="mt-auto flex shrink-0 items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium whitespace-nowrap hover:bg-sidebar-accent hover:text-white"
      >
        <LogOut className="size-5 shrink-0" />
        <span className={cn("transition-all duration-300", collapsed && "-translate-x-3 opacity-0")}>Logout</span>
      </motion.button>
    </motion.aside>
  );
}
