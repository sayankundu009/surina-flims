import Link from "next/link";

export function SectionHeading({
  title,
  seeAllHref,
}: {
  title: string;
  seeAllHref?: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
      <h2 className="font-display text-lg font-semibold tracking-tight text-[var(--color-text)] sm:text-xl">
        {title}
      </h2>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="text-sm font-medium text-[var(--color-red)] hover:underline"
        >
          See All
        </Link>
      )}
    </div>
  );
}
