import Link from "next/link";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/short-films", label: "Short Films" },
  { href: "/trailers", label: "Trailers" },
] as const;

export function DesktopNav() {
  return (
    <ul className="flex items-center gap-6">
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-red)]"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
