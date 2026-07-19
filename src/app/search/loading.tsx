import { Skeleton } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:py-8">
      <div className="px-4 sm:px-6 lg:px-0">
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="mt-6 flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-28 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
