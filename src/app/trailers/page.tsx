import type { Metadata } from "next";
import { getByType } from "@/data/derive";
import { PosterGrid } from "@/components/titles/PosterGrid";
import { BackButton } from "@/components/layout/BackButton";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Trailers",
  description: "Watch trailers for upcoming and current Surina Films OTT titles.",
  path: "/trailers",
});

export default function TrailersPage() {
  const trailers = getByType("trailer");

  return (
    <div className="mx-auto max-w-7xl py-6 sm:py-8">
      <BackButton fallbackHref="/" />
      <h1 className="mb-4 px-4 font-display text-2xl font-semibold text-[var(--color-text)] sm:px-6 lg:px-0">
        Trailers
      </h1>
      <PosterGrid items={trailers} />
    </div>
  );
}
