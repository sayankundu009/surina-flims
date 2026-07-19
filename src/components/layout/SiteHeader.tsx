"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DesktopNav } from "./DesktopNav";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const headerClasses = !isHome || isScrolled
    ? "fixed inset-x-0 top-0 z-30 py-2 bg-[var(--color-bg)] transition-colors duration-300"
    : "fixed inset-x-0 top-0 z-30 py-2 bg-transparent transition-colors duration-300";

  return (
    <header className={headerClasses}>
      {/* Deep Cinematic Vignette Overlay */}
      {isHome && (
        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-black/95 via-black/50 to-transparent pointer-events-none" />
      )}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center py-0">
          <Image
            src="/images/logo.png"
            alt="Surina Films OTT"
            width={120}
            height={40}
            priority
            loading="eager"
            className="object-contain"
          />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <DesktopNav />
        </nav>

        <Link
          href="/search"
          aria-label="Search"
          className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-text)] transition-colors hover:text-[var(--color-red)]"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="M21 21l-4.3-4.3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
