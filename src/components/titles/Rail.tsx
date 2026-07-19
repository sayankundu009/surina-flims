"use client";

import type { Title } from "@/data/types";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PosterCard } from "./PosterCard";
import { BlossomCarousel, BlossomPrev, BlossomNext } from "@blossom-carousel/react";
import "@blossom-carousel/react/style.css";

export function Rail({
  heading,
  seeAllHref,
  items,
}: {
  heading: string;
  seeAllHref?: string;
  items: Title[];
}) {
  if (items.length === 0) return null;

  const railId = `rail-${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-label={heading} className="py-4">
      <SectionHeading title={heading} seeAllHref={seeAllHref} />

      <div className="group/rail relative mt-3">
        <BlossomCarousel
          id={railId}
          style={{ display: "flex", scrollSnapType: "none" }}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-1 scrollbar-none px-4 sm:px-6 lg:px-0 scroll-smooth"
        >
          {items.map((title) => (
            <div
              key={title.slug}
              data-blossom-slide
              style={{ display: "block", scrollSnapAlign: "none" }}
              className="w-[38vw] max-w-[170px] shrink-0 sm:w-[200px]"
            >
              <PosterCard title={title} />
            </div>
          ))}
        </BlossomCarousel>

        <BlossomPrev
          for={railId}
          className="absolute left-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-lg text-white opacity-0 transition-opacity hover:bg-black/70 group-hover/rail:opacity-100 sm:flex disabled:!opacity-0 disabled:pointer-events-none"
        >
          ‹
        </BlossomPrev>
        <BlossomNext
          for={railId}
          className="absolute right-1 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-lg text-white opacity-0 transition-opacity hover:bg-black/70 group-hover/rail:opacity-100 sm:flex disabled:!opacity-0 disabled:pointer-events-none"
        >
          ›
        </BlossomNext>
      </div>
    </section>
  );
}
