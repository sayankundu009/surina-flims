import type { Title } from "@/data/types";
import { RatingBadge } from "@/components/common/RatingBadge";

function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function TitleMeta({ title }: { title: Title }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-text-muted)]">
      <RatingBadge rating={title.rating} />
      <span className="font-mono">{title.year}</span>
      <span>{title.genres.join(", ")}</span>
      <span className="font-mono">{formatRuntime(title.runtimeMinutes)}</span>
      {title.certificate && (
        <span className="rounded border border-[var(--reel-gold-dim)] bg-[var(--paper)] px-1.5 py-0.5 font-mono text-xs font-semibold text-[var(--ink)]">
          {title.certificate}
        </span>
      )}
    </div>
  );
}
