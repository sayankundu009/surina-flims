"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const TABS = [
  {
    href: "/",
    label: "Home",
    icon: (
      <path
        d="M4 11.5L12 4l8 7.5M6 10v9h5v-5h2v5h5v-9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/movies",
    label: "Movies",
    icon: (
      <>
        <rect
          x="3.5"
          y="5"
          width="17"
          height="14"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M7 5v14M17 5v14M3.5 9h3M3.5 15h3M17.5 9h3M17.5 15h3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    href: "/short-films",
    label: "Shorts",
    icon: (
      <path
        d="M13 3L5 13.5h5.5L10 21l8-10.5h-5.5L13 3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/trailers",
    label: "Trailers",
    icon: (
      <>
        <rect
          x="3.5"
          y="4.5"
          width="17"
          height="15"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M10 9l5 3-5 3V9z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    href: "/search",
    label: "Search",
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M20 20l-4-4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
] as const;

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-stretch justify-around border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {TABS.map((tab) => {
        const active = isActive(tab.href, pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-medium uppercase tracking-wide transition-colors ${
              active
                ? "text-[var(--color-gold)]"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            {active && (
              <motion.span
                layoutId="bottom-nav-active-indicator"
                className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-[var(--color-gold)]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              {tab.icon}
            </svg>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
