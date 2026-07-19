import { Suspense } from "react";
import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans, Tiro_Bangla } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BottomNav } from "@/components/layout/BottomNav";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/common/PageTransition";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const tiroBangla = Tiro_Bangla({
  variable: "--font-tiro-bangla",
  subsets: ["bengali"],
  weight: "400",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({ path: "/" }),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  other: {
    "color-scheme": "dark",
    "theme-color": "#0b0a0e",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${tiroBangla.variable} ${plexMono.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <SplashScreen />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Suspense fallback={<div className="h-16 bg-[var(--color-bg)]" />}>
          <SiteHeader />
        </Suspense>
        <main
          id="main-content"
          className="flex-1 min-h-[70vh] mt-16 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-20"
        >
          <PageTransition>{children}</PageTransition>
        </main>
        <div className="filmstrip-seam" aria-hidden="true" />
        <SiteFooter />
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  );
}
