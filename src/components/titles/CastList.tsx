import type { CastMember } from "@/data/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function CastList({ cast }: { cast: CastMember[] }) {
  if (cast.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
        Cast
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {cast.map((member) => (
          <div
            key={member.name}
            className="w-20 shrink-0 snap-start flex flex-col items-center text-center"
          >
            <span
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-surface-raised)] text-sm font-semibold text-[var(--color-gold)]"
            >
              {initials(member.name)}
            </span>
            <span className="mt-1.5 line-clamp-2 text-xs text-[var(--color-text)]">
              {member.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
