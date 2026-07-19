import Link from "next/link";
import { getTopRated } from "@/data/derive";
import { RatingBadge } from "@/components/common/RatingBadge";

export function SidebarPanel() {
  const topRated = getTopRated(5);

  return (
    <aside className="hidden w-80 shrink-0 space-y-6 lg:block">
      <section
        aria-label="Top Rated"
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
      >
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text)]">
          Top Rated
        </h2>
        <ul className="space-y-3">
          {topRated.map((title) => (
            <li key={title.slug}>
              <Link
                href={`/titles/${title.slug}`}
                className="flex items-center justify-between gap-2 text-sm text-[var(--color-text)] hover:text-[var(--color-red)]"
              >
                <span className="line-clamp-1">{title.title}</span>
                <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
                  {title.year}
                </span>
              </Link>
              <div className="mt-0.5">
                <RatingBadge rating={title.rating} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
