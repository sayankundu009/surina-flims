import { titles } from "./titles";
import type { Genre, Title, TitleType } from "./types";

if (process.env.NODE_ENV !== "production") {
  const seen = new Set<string>();
  for (const t of titles) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t.slug)) {
      throw new Error(
        `[data/titles] "${t.title}" has an invalid slug "${t.slug}" — slugs must be kebab-case.`,
      );
    }
    if (seen.has(t.slug)) {
      throw new Error(`[data/titles] duplicate slug "${t.slug}" (${t.title}).`);
    }
    seen.add(t.slug);
    if (t.genres.length === 0) {
      throw new Error(`[data/titles] "${t.title}" has no genres set.`);
    }
    if (t.posterSrc && !t.posterAlt) {
      throw new Error(
        `[data/titles] "${t.title}" sets posterSrc without posterAlt — always set both together.`,
      );
    }
    if (t.youtubeId && !/^[\w-]{11}$/.test(t.youtubeId)) {
      throw new Error(
        `[data/titles] "${t.title}" has an invalid youtubeId "${t.youtubeId}" — expected an 11-character YouTube video ID, not a full URL.`,
      );
    }
  }
}

export function getAllTitles(): Title[] {
  return titles;
}

export function getBySlug(slug: string): Title | undefined {
  return titles.find((t) => t.slug === slug);
}

export function getByType(type: TitleType): Title[] {
  return titles.filter((t) => t.type === type);
}

export function getByGenre(genre: Genre, type?: TitleType): Title[] {
  return titles.filter(
    (t) => t.genres.includes(genre) && (!type || t.type === type),
  );
}

export function getFeatured(): Title[] {
  return titles.filter((t) => t.featured);
}

export function getLatestReleases(limit = 10): Title[] {
  return titles
    .filter((t) => t.newRelease)
    .sort((a, b) => b.year - a.year)
    .slice(0, limit);
}

export function getTopRated(limit = 5): Title[] {
  return [...titles].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getAllGenres(type?: TitleType): Genre[] {
  const pool = type ? getByType(type) : titles;
  const unique = new Set<Genre>();
  for (const t of pool) {
    for (const g of t.genres) unique.add(g);
  }
  return Array.from(unique);
}

export function getRelated(current: Title, limit = 6): Title[] {
  return titles
    .filter(
      (t) =>
        t.slug !== current.slug &&
        t.genres.some((g) => current.genres.includes(g)),
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
