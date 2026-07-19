import type { Metadata } from "next";

export const siteName = "Surina Films OTT";
export const siteTagline = "Watch. Feel. Inspire.";
export const siteUrl = "https://surina-flims.vercel.app";
export const defaultDescription =
  "Surina Films OTT is the home of Surina Monish Film Productions — stream original movies, short films and trailers.";

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title?: string;
  description?: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} — ${siteTagline}`;
  const pageDescription = description ?? defaultDescription;
  const url = `${siteUrl}${path}`;
  const finalOgImage = ogImage ?? `${siteUrl}/images/og-image.jpg`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName,
      type: "website",
      images: [
        {
          url: finalOgImage,
          width: 1200,
          height: 630,
          alt: title ?? siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [finalOgImage],
    },
    other: {
      "theme-color": "#0b0a0e",
    },
  };
}
