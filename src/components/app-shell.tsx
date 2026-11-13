"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePath } from "@/lib/use-path";
import { LayoutGroup, MotionConfig, motion } from "motion/react";
import { Sidebar, SIDEBAR_FULL, SIDEBAR_LOGO, SIDEBAR_PAD, SIDEBAR_RAIL } from "@/components/sidebar";
import { MobileHeader, Topbar } from "@/components/topbar";
import { MobileTabBar } from "@/components/mobile-nav";
import { navItems } from "@/lib/mock-data";
import { easeOutExpo, spring } from "@/lib/motion";
import { useIsDesktop } from "@/lib/use-media";
import { asset } from "@/lib/utils";

type Box = { left: number; top: number; size: number };

// Animates a copy of the logo along an arc (with a coin spin) from one spot to another.
function flyLogo(from: DOMRect, to: Box, hide: HTMLElement[]) {
  const clone = document.createElement("img");
  clone.src = asset("/logo.png");
  clone.alt = "";
  Object.assign(clone.style, {
    position: "fixed",
    left: `${to.left}px`,
    top: `${to.top}px`,
    width: `${to.size}px`,
    height: `${to.size}px`,
    zIndex: "60",
    pointerEvents: "none",
  });
  document.body.appendChild(clone);
  hide.forEach((el) => (el.style.visibility = "hidden"));

  const dx = from.left + from.width / 2 - (to.left + to.size / 2);
  const dy = from.top + from.height / 2 - (to.top + to.size / 2);
  const s = from.width / to.size;

  const anim = clone.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(0deg)` },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 60}px) scale(${(s + 1) / 2}) rotate(200deg)`, offset: 0.5 },
      { transform: "translate(0, 0) scale(1) rotate(360deg)" },
    ],
    { duration: 700, easing: "cubic-bezier(0.45, 0, 0.2, 1)" }
  );
  let done = false;
  const cleanup = () => {
    if (done) return;
    done = true;
    clone.remove();
    hide.forEach((el) => (el.style.visibility = ""));
  };
  anim.onfinish = anim.oncancel = cleanup;
  setTimeout(cleanup, 800); // fallback if the browser pauses the animation
}

const desktopPage = {
  enter: { opacity: 0, scale: 0.985, filter: "blur(8px)" },
  center: { opacity: 1, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } },
};
const mobilePage = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0, filter: "blur(6px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } },
};

// Re-animates the page content whenever the route changes.
function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePath();
  const isDesktop = useIsDesktop();
  const index = navItems.findIndex((n) => n.href === pathname);
  const [nav, setNav] = useState({ path: pathname, index, dir: 0, first: true });

  // Slide from the right when moving to a tab further along the menu, from the left otherwise.
  if (nav.path !== pathname) {
    setNav({ path: pathname, index, dir: index >= nav.index ? 1 : -1, first: false });
  }

  return (
    <motion.div
      key={pathname}
      custom={nav.dir}
      variants={isDesktop ? desktopPage : mobilePage}
      initial={nav.first ? false : "enter"}
      animate="center"
      transition={isDesktop ? { duration: 0.3, ease: easeOutExpo } : { ...spring, opacity: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const fromRef = useRef<DOMRect | null>(null);

  const toggle = () => {
    const src = document.querySelector<HTMLElement>(collapsed ? "[data-logo=topbar]" : "[data-logo=sidebar]");
    fromRef.current = src?.getBoundingClientRect() ?? null;
    setCollapsed((c) => !c);
  };

  // After the toggle renders, fly the logo to where it will end up once the sidebar finishes animating.
  useLayoutEffect(() => {
    const from = fromRef.current;
    fromRef.current = null;
    if (!from || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const aside = document.querySelector<HTMLElement>("[data-sidebar]");
    const sideImg = document.querySelector<HTMLElement>("[data-logo=sidebar]");
    const topImg = document.querySelector<HTMLElement>("[data-logo=topbar]");
    if (!aside || !sideImg || !topImg) return;

    const asideRect = aside.getBoundingClientRect();
    let to: Box;
    if (collapsed) {
      // Top-bar logo shifts left by however much the sidebar is about to shrink.
      const r = topImg.getBoundingClientRect();
      to = { left: r.left - (asideRect.width - SIDEBAR_RAIL), top: r.top, size: r.width };
    } else {
      // Sidebar logo is centered in the full-width sidebar.
      to = {
        left: asideRect.left + SIDEBAR_PAD + (SIDEBAR_FULL - 2 * SIDEBAR_PAD - SIDEBAR_LOGO) / 2,
        top: sideImg.getBoundingClientRect().top,
        size: SIDEBAR_LOGO,
      };
    }
    flyLogo(from, to, [sideImg, topImg]);
  }, [collapsed]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="lg:flex lg:h-dvh lg:gap-4 lg:p-4">
        <LayoutGroup id="desktop">
          <Sidebar collapsed={collapsed} onToggle={toggle} />
        </LayoutGroup>
        <div className="flex min-w-0 flex-1 flex-col lg:gap-4">
          <Topbar collapsed={collapsed} />
          <MobileHeader />
          <main className="thin-scroll px-4 pt-4 pb-32 lg:-mx-2 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:px-2 lg:pt-0 lg:pb-2">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
        <LayoutGroup id="mobile">
          <MobileTabBar />
        </LayoutGroup>
      </div>
    </MotionConfig>
  );
}
