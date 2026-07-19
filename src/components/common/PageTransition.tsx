"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Force window to scroll to top instantly on route change to a title details page
    if (pathname.startsWith("/titles/")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
