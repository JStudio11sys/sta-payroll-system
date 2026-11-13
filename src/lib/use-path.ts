"use client";

import { usePathname } from "next/navigation";

// Current path without a trailing slash ("/employees/" -> "/employees"), so it
// matches the menu links. The static build uses trailing slashes.
export function usePath() {
  const pathname = usePathname();
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}
