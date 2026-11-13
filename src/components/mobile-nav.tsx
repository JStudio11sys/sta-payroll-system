"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePath } from "@/lib/use-path";
import { AnimatePresence, motion } from "motion/react";
import { LogOut, MoreHorizontal } from "lucide-react";
import { navItems } from "@/lib/mock-data";
import { spring } from "@/lib/motion";
import { navIcons, pendingRemittances } from "@/components/sidebar";
import { cn } from "@/lib/utils";

const MAIN_TABS = ["/", "/employees", "/payroll-runs", "/remittances"];
const mainTabs = navItems.filter((n) => MAIN_TABS.includes(n.href));
const moreItems = navItems.filter((n) => !MAIN_TABS.includes(n.href));

const MotionLink = motion.create(Link);

// Bottom sheet with the remaining menu items; drag it down to close.
function MoreSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePath();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-primary/25 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-label="More menu"
            className="absolute inset-x-0 bottom-0 rounded-t-[30px] bg-card px-4 pt-3 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-20px_60px_-20px_rgba(27,42,124,0.45)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.04, bottom: 0.9 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 600) onClose();
            }}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-border" />
            <div className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">More</div>
            <nav className="flex flex-col gap-1">
              {moreItems.map((item) => {
                const Icon = navIcons[item.href];
                const active = pathname === item.href;
                return (
                  <MotionLink
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium",
                      active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    )}
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </MotionLink>
                );
              })}
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-destructive hover:bg-muted"
              >
                <LogOut className="size-5" />
                Logout
              </motion.button>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Floating pill tab bar at the bottom of the screen on phones/tablets.
export function MobileTabBar() {
  const pathname = usePath();
  const [moreOpen, setMoreOpen] = useState(false);
  // Light up the tapped tab right away, before the new page has loaded.
  const [activeHref, setActiveHref] = useState(pathname);
  useEffect(() => setActiveHref(pathname), [pathname]);

  const moreActive = moreOpen || moreItems.some((n) => n.href === activeHref);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(16px,env(safe-area-inset-bottom))] lg:hidden">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.2 }}
          className="pointer-events-auto flex gap-1 rounded-full bg-primary/95 p-1.5 shadow-[0_16px_40px_-10px_rgba(27,42,124,0.6)] backdrop-blur-xl"
        >
          {mainTabs.map((item) => {
            const Icon = navIcons[item.href];
            const on = !moreActive && activeHref === item.href;
            const count = item.href === "/remittances" ? pendingRemittances : 0;
            return (
              <MotionLink
                key={item.href}
                href={item.href}
                aria-label={item.label}
                onClick={() => setActiveHref(item.href)}
                whileTap={{ scale: 0.85 }}
                className="relative grid size-12 place-items-center rounded-full"
              >
                {on && <motion.span layoutId="tab-active" transition={spring} className="absolute inset-0 rounded-full bg-white" />}
                <Icon className={cn("relative size-5 transition-colors duration-300", on ? "text-primary" : "text-white/70")} />
                {count > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                    {count}
                  </span>
                )}
              </MotionLink>
            );
          })}
          <motion.button
            type="button"
            aria-label="More"
            onClick={() => setMoreOpen(true)}
            whileTap={{ scale: 0.85 }}
            className="relative grid size-12 place-items-center rounded-full"
          >
            {moreActive && <motion.span layoutId="tab-active" transition={spring} className="absolute inset-0 rounded-full bg-white" />}
            <MoreHorizontal className={cn("relative size-5 transition-colors duration-300", moreActive ? "text-primary" : "text-white/70")} />
          </motion.button>
        </motion.nav>
      </div>
      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
