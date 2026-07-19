import type { Metadata } from "next";
import { getAllGenres, getByType } from "@/data/derive";
import { GenreFilterTabs } from "@/components/titles/GenreFilterTabs";
import { BackButton } from "@/components/layout/BackButton";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Movies",
  description: "Browse every movie from Surina Films OTT.",
  path: "/movies",
});

export default function MoviesPage() {
  const movies = getByType("movie");
  const genres = getAllGenres("movie");

  return (
    <div className="mx-auto max-w-7xl py-6 sm:py-8">
      <BackButton fallbackHref="/" />
      <h1 className="mb-4 px-4 font-display text-2xl font-semibold text-[var(--color-text)] sm:px-6 lg:px-0">
        Movies
      </h1>
      <GenreFilterTabs items={movies} genres={genres} />
    </div>
  );
}
