export type TitleType = "movie" | "short-film" | "trailer";

export type Genre =
  | "Action"
  | "Drama"
  | "Romance"
  | "Thriller"
  | "Horror"
  | "Comedy"
  | "Documentary";

export type Certificate = "U" | "UA 7+" | "UA 13+" | "UA 16+" | "A";

export interface CastMember {
  name: string;
  role?: string;
}

export interface Title {
  /** Unique, kebab-case, used as the /titles/[slug] route param and React key. */
  slug: string;
  type: TitleType;
  title: string;
  /** Optional native-language title, shown as flavor text. */
  originalTitle?: string;

  genres: Genre[];
  year: number;
  runtimeMinutes: number;
  certificate?: Certificate;

  director?: string;
  cast?: CastMember[];

  synopsis: string;
  /** Short one-liner for the hero; falls back to synopsis when absent. */
  tagline?: string;

  /** 0-5, one decimal place (e.g. 4.8). */
  rating: number;

  /**
   * When set, PosterCard renders a real next/image from this path.
   * When absent, PosterCard renders a generated PlaceholderPoster instead.
   * Always set posterAlt alongside posterSrc.
   */
  posterSrc?: string;
  posterAlt?: string;
  /** Wide backdrop image for the hero banner; same optional real-vs-placeholder pattern as posterSrc. */
  backdropSrc?: string;
  /**
   * YouTube video ID (the 11-character id, e.g. "dQw4w9WgXcQ" — not a full
   * URL) for an unlisted upload of this title. When set, the details page
   * renders a click-to-play YouTube facade in place of the static backdrop.
   * When absent, the plain gradient/backdropSrc rendering is unchanged.
   */
  youtubeId?: string;

  /** Eligible for the home page hero rotation. */
  featured?: boolean;
  /** Shows a "NEW RELEASE" chip and is eligible for the Latest Releases rail. */
  newRelease?: boolean;
}
