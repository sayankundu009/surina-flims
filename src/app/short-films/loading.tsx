import { PosterGridSkeleton, Skeleton } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:py-8">
      <Skeleton className="mb-4 ml-4 h-7 w-40 sm:ml-6 lg:ml-0" />
      <PosterGridSkeleton count={6} />
    </div>
  );
}
