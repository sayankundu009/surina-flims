import type { Metadata } from "next";
import { getByType } from "@/data/derive";
import { PosterGrid } from "@/components/titles/PosterGrid";
import { BackButton } from "@/components/layout/BackButton";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Short Films",
  description: "Browse every short film from Surina Films OTT.",
  path: "/short-films",
});

export default function ShortFilmsPage() {
  const shortFilms = getByType("short-film");

  return (
    <div className="mx-auto max-w-7xl py-6 sm:py-8">
      <BackButton fallbackHref="/" />
      <h1 className="mb-4 px-4 font-display text-2xl font-semibold text-[var(--color-text)] sm:px-6 lg:px-0">
        Short Films
      </h1>
      <PosterGrid items={shortFilms} />
    </div>
  );
}
