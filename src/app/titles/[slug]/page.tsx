import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllTitles, getBySlug, getRelated } from "@/data/derive";
import { gradientFor } from "@/lib/gradients";
import { PlaceholderPoster } from "@/components/titles/PlaceholderPoster";
import { TitleMeta } from "@/components/titles/TitleMeta";
import { CastList } from "@/components/titles/CastList";
import { Rail } from "@/components/titles/Rail";
import { YouTubePlayer } from "@/components/titles/YouTubePlayer";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";

export function generateStaticParams() {
  return getAllTitles().map((title) => ({ slug: title.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = getBySlug(slug);
  if (!title) return buildMetadata({ path: `/titles/${slug}` });
  return buildMetadata({
    title: title.title,
    description: title.synopsis,
    path: `/titles/${title.slug}`,
    ogImage: title.backdropSrc || title.posterSrc,
  });
}

export default async function TitleDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getBySlug(slug);
  if (!title) notFound();

  const related = getRelated(title);
  const { from, to } = gradientFor(title);
  const backdropImage = title.backdropSrc || title.posterSrc;

  return (
    <div className="mx-auto max-w-5xl pb-10 sm:pt-8">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {title.youtubeId ? (
          <YouTubePlayer
            videoId={title.youtubeId}
            title={title.title}
            posterSrc={backdropImage}
          />
        ) : (
          <>
            {backdropImage && (
              <Image
                src={backdropImage}
                alt={title.posterAlt || ""}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                fetchPriority="high"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          </>
        )}
      </div>

      <div className="grid gap-8 px-4 pt-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-0">
        <div className="hidden lg:block">
          <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-[var(--color-surface)]">
            {title.posterSrc ? (
              <Image
                src={title.posterSrc}
                alt={title.posterAlt ?? `${title.title} poster`}
                width={220}
                height={330}
                className="h-full w-full object-cover object-left"
              />
            ) : (
              <PlaceholderPoster title={title} />
            )}
          </div>
        </div>

        <div className="space-y-6 min-w-0">
          <div>
            <h1 className="font-display text-2xl font-semibold text-[var(--color-text)] sm:text-3xl">
              {title.title}
            </h1>
            {title.originalTitle && (
              <p className="font-bengali text-base text-[var(--color-text-muted)] sm:text-lg">
                {title.originalTitle}
              </p>
            )}
            <div className="mt-3">
              <TitleMeta title={title} />
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-text)] break-words sm:text-base">
            {title.synopsis}
          </p>

          {title.cast && title.cast.length > 0 && <CastList cast={title.cast} />}

          {title.director && (
            <p className="text-sm text-[var(--color-text-muted)]">
              <span className="font-semibold text-[var(--color-text)]">
                Director:
              </span>{" "}
              {title.director}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Rail heading="More Like This" items={related} />
      </div>
    </div>
  );
}
