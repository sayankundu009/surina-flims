"use client";

import { useRouter } from "next/navigation";

export function BackButton({
  fallbackHref,
  label = "Back",
  variant = "inline",
}: {
  fallbackHref: string;
  label?: string;
  variant?: "inline" | "overlay";
}) {
  const router = useRouter();

  function handleClick() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }

  const className =
    variant === "overlay"
      ? "absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm md:hidden"
      : "mb-3 flex items-center gap-1.5 px-4 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] sm:px-6 lg:px-0 md:hidden";

  return (
    <button type="button" onClick={handleClick} aria-label={label} className={className}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path
          d="M15 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {variant === "inline" && label}
    </button>
  );
}
