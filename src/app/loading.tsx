import { Skeleton } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="aspect-[3/4] w-full rounded-none sm:aspect-[16/9] lg:aspect-[21/9]" />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="mb-4 h-6 w-40" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[38vw] max-w-[170px] shrink-0 space-y-2 sm:w-[200px]"
            >
              <Skeleton className="aspect-[2/3] w-full" />
              <Skeleton className="h-3.5 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
