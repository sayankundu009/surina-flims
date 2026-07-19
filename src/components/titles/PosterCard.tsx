import Image from "next/image";
import Link from "next/link";
import type { Title } from "@/data/types";
import { PlaceholderPoster } from "./PlaceholderPoster";
import { RatingBadge } from "@/components/common/RatingBadge";

export function PosterCard({
  title,
  priority = false,
  fetchPriority,
}: {
  title: Title;
  priority?: boolean;
  fetchPriority?: "high" | "low";
}) {
  return (
    <Link
      href={`/titles/${title.slug}`}
      data-genre={title.genres.join(" ")}
      data-type={title.type}
      draggable={false}
      className="group block w-full shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-[var(--color-surface)]">
        {title.posterSrc ? (
          <Image
            src={title.posterSrc}
            alt={title.posterAlt ?? `${title.title} poster`}
            fill
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 180px"
            className="object-cover object-left transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105"
            priority={priority}
            fetchPriority={fetchPriority}
            draggable={false}
          />
        ) : (
          <PlaceholderPoster title={title} />
        )}
        {title.newRelease && (
          <span className="absolute right-2 top-2 rounded bg-[var(--color-red)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            New
          </span>
        )}
      </div>
      <div className="mt-2 space-y-0.5">
        <p className="line-clamp-1 text-sm font-semibold text-[var(--color-text)] @sm:text-base">
          {title.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="font-mono">{title.year}</span>
          <RatingBadge rating={title.rating} />
        </div>
      </div>
    </Link>
  );
}
