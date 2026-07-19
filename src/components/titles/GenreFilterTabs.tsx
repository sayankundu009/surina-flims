"use client";

import { useMemo, useState } from "react";
import type { Genre, Title } from "@/data/types";
import { PosterGrid } from "./PosterGrid";

export function GenreFilterTabs({
  items,
  genres,
}: {
  items: Title[];
  genres: Genre[];
}) {
  const [active, setActive] = useState<Genre | "All">("All");

  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((t) => t.genres.includes(active))),
    [items, active],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter by genre"
        className="no-scrollbar mb-4 flex gap-2 overflow-x-auto px-4 sm:px-6 lg:px-0"
      >
        {(["All", ...genres] as const).map((genre) => {
          const isActive = genre === active;
          return (
            <button
              key={genre}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(genre)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[var(--color-red)] bg-[var(--color-red)] text-white"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
      <PosterGrid items={filtered} />
    </div>
  );
}
