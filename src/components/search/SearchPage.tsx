"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { Title } from "@/data/types";
import { PosterGrid } from "@/components/titles/PosterGrid";

const POPULAR_SEARCHES = [
  "Charitraheen",
  "Taranath",
  "Thriller",
  "Horror",
  "Mir Afsar Ali",
];

function matches(title: Title, query: string): boolean {
  const q = query.toLowerCase();
  return (
    title.title.toLowerCase().includes(q) ||
    !!title.originalTitle?.toLowerCase().includes(q) ||
    title.genres.some((g) => g.toLowerCase().includes(q)) ||
    !!title.director?.toLowerCase().includes(q) ||
    !!title.cast?.some((c) => c.name.toLowerCase().includes(q))
  );
}

export function SearchPage({ allTitles }: { allTitles: Title[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const trimmed = deferredQuery.trim();
    if (!trimmed) return [];
    return allTitles.filter((t) => matches(t, trimmed));
  }, [allTitles, deferredQuery]);

  const defaultSuggestions = useMemo(() => {
    return allTitles.filter((t) => t.featured);
  }, [allTitles]);

  const isPending = query !== deferredQuery;

  return (
    <div className="mx-auto max-w-7xl py-6 sm:py-8">
      <div className="px-4 sm:px-6 lg:px-0">
        <label htmlFor="site-search" className="sr-only">
          Search movies, actors, genres
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, actors, genres..."
          autoComplete="off"
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
        />
      </div>

      {deferredQuery.trim() === "" ? (
        <div className="mt-6 px-4 sm:px-6 lg:px-0 space-y-8">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Popular Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Recommended for You
            </h2>
            <PosterGrid items={defaultSuggestions} />
          </div>
        </div>
      ) : (
        <div className={`mt-6 transition-opacity duration-150 ${isPending ? "opacity-50" : "opacity-100"}`}>
          <p
            className="mb-4 px-4 text-sm text-[var(--color-text-muted)] sm:px-6 lg:px-0"
            aria-live="polite"
          >
            {results.length} result{results.length === 1 ? "" : "s"} for
            &ldquo;{deferredQuery}&rdquo;
          </p>
          
          {results.length > 0 ? (
            <PosterGrid items={results} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border border-[var(--color-border)] bg-[var(--ink-raised)]/20 mx-4 sm:mx-6 lg:mx-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-raised)] text-[var(--color-text-muted)] mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-[var(--color-text)]">
                No results found
              </h3>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Try another search term.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
