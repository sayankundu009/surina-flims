import { Skeleton } from "@/components/common/Skeleton";

export default function TitleDetailsLoading() {
  return (
    <div className="mx-auto max-w-5xl pb-10 sm:pt-8 animate-fade-in">
      {/* Landscape Header Banner Skeleton */}
      <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9] bg-[var(--color-surface)]">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Grid columns layout */}
      <div className="grid gap-8 px-4 pt-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-0">
        {/* Left column: Poster skeleton (hidden on mobile, visible on lg) */}
        <div className="hidden lg:block">
          <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-[var(--color-surface)]">
            <Skeleton className="h-full w-full" />
          </div>
        </div>

        {/* Right column: Title, meta, synopsis skeletons */}
        <div className="space-y-6 min-w-0">
          <div className="space-y-3">
            <Skeleton className="h-8 w-1/3 sm:w-1/4" />
            <Skeleton className="h-5 w-1/4 sm:w-1/6" />
            <div className="mt-3">
              <Skeleton className="h-4 w-40" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Cast list skeleton */}
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-16" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex w-[80px] shrink-0 flex-col items-center gap-1.5 text-center"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-2.5 w-10" />
                </div>
              ))}
            </div>
          </div>

          {/* Director skeleton */}
          <div className="pt-2">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
