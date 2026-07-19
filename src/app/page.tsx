import Link from "next/link";
import {
  getAllGenres,
  getByType,
  getFeatured,
  getLatestReleases,
} from "@/data/derive";
import { HeroBanner } from "@/components/home/HeroBanner";
import { Rail } from "@/components/titles/Rail";
import { GenreFilterTabs } from "@/components/titles/GenreFilterTabs";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SidebarPanel } from "@/components/layout/SidebarPanel";

export default function Home() {
  const featured = getFeatured();
  const latestReleases = getLatestReleases(10);
  const movies = getByType("movie");
  const shortFilms = getByType("short-film");
  const trailers = getByType("trailer");
  const movieGenres = getAllGenres("movie");

  return (
    <div className="-mt-16">
      <HeroBanner slides={featured} />

      <div className="mx-auto max-w-7xl lg:flex lg:items-start lg:gap-8 lg:px-8 lg:py-6">
        <div className="min-w-0 flex-1">
          <Rail
            heading="Latest Releases"
            seeAllHref="/movies"
            items={latestReleases}
          />

          <section aria-label="Movies" className="defer-offscreen py-4">
            <SectionHeading title="Movies" seeAllHref="/movies" />
            <div className="mt-3">
              <GenreFilterTabs items={movies.slice(0, 10)} genres={movieGenres} />
            </div>
          </section>

          <Rail heading="Short Films" seeAllHref="/short-films" items={shortFilms} />
          <Rail heading="Trailers" seeAllHref="/trailers" items={trailers} />
        </div>

        <SidebarPanel />
      </div>

      <div className="px-4 pb-8 text-center sm:px-6 lg:hidden">
        <Link
          href="/movies"
          className="text-sm font-medium text-[var(--color-red)] hover:underline"
        >
          Browse all movies →
        </Link>
      </div>
    </div>
  );
}
