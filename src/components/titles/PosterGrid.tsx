import type { Title } from "@/data/types";
import { PosterCard } from "./PosterCard";

export function PosterGrid({ items }: { items: Title[] }) {
  if (items.length === 0) {
    return (
      <p className="px-4 py-8 text-sm text-[var(--color-text-muted)] sm:px-6 lg:px-0">
        Nothing here yet — check back soon.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-6 px-4 sm:grid-cols-3 sm:px-6 md:grid-cols-4 lg:grid-cols-5 lg:px-0">
      {items.map((title) => (
        <li key={title.slug}>
          <PosterCard title={title} />
        </li>
      ))}
    </ul>
  );
}
