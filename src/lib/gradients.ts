import type { Genre, Title } from "@/data/types";

interface GradientPair {
  from: string;
  to: string;
}

/**
 * Deterministic genre -> gradient mapping used by PlaceholderPoster, so a
 * given title always renders the same colors wherever it appears.
 */
const GENRE_GRADIENTS: Record<Genre, GradientPair> = {
  Action: { from: "#7a1620", to: "#2a0a0d" },
  Drama: { from: "#b4552e", to: "#3a160c" },
  Romance: { from: "#8e2a4a", to: "#2e0f1e" },
  Thriller: { from: "#1f2a3a", to: "#05080c" },
  Horror: { from: "#241a2e", to: "#07050a" },
  Comedy: { from: "#b8862e", to: "#3a2a0c" },
  Documentary: { from: "#274036", to: "#0a130f" },
};

export function gradientFor(title: Title): GradientPair {
  return GENRE_GRADIENTS[title.genres[0]];
}
