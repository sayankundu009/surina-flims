import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "./DesktopNav";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Image
              src="/images/logo.png"
              alt="Surina Films OTT"
              width={480}
              height={320}
              className="h-24 w-auto"
            />
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Watch. Feel. Inspire. A platform by Surina Monish Film
              Productions.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:flex sm:flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/search"
                  className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Surina Monish Film Productions. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
