import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-[var(--color-text)]">
        Page not found
      </h1>
      <p className="text-[var(--color-text-muted)]">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/"
        className="rounded-md bg-[var(--color-red)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-red-dim)]"
      >
        Back to Home
      </Link>
    </div>
  );
}
