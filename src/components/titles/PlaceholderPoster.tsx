import { gradientFor } from "@/lib/gradients";
import type { Title } from "@/data/types";

const TYPE_LABEL: Record<Title["type"], string> = {
  movie: "Movie",
  "short-film": "Short Film",
  trailer: "Trailer",
};

/**
 * Generated placeholder poster used until a real posterSrc is supplied for a
 * title. Purely decorative — the accessible name for a poster card comes
 * from the visible title caption rendered alongside it, not from this SVG.
 */
export function PlaceholderPoster({ title }: { title: Title }) {
  const { from, to } = gradientFor(title);
  const gradientId = `poster-gradient-${title.slug}`;

  return (
    <svg
      viewBox="0 0 400 600"
      aria-hidden="true"
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${gradientId}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.65" />
        </linearGradient>
      </defs>
      <rect width="400" height="600" fill={`url(#${gradientId})`} />
      <rect width="400" height="600" fill={`url(#${gradientId}-fade)`} />
      <text
        x="20"
        y="36"
        fontSize="15"
        fontWeight="600"
        letterSpacing="0.06em"
        fill="rgba(255,255,255,0.85)"
        style={{ textTransform: "uppercase" }}
      >
        {TYPE_LABEL[title.type]}
      </text>
      <foreignObject x="16" y="480" width="368" height="108">
        <div
          style={{
            fontSize: "22px",
            lineHeight: 1.25,
            fontWeight: 600,
            color: "white",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title.title}
        </div>
      </foreignObject>
    </svg>
  );
}
