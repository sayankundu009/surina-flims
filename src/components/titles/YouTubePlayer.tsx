"use client";

import { useEffect, useRef, useState } from "react";

let youtubeApiPromise: Promise<typeof YT> | null = null;

function loadYouTubeIframeApi(): Promise<typeof YT> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
  return youtubeApiPromise;
}

export function YouTubePlayer({
  videoId,
  title,
  posterSrc,
}: {
  videoId: string;
  title: string;
  posterSrc?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const mountRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    setStatus("idle");
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  useEffect(() => {
    if (status !== "loading") return;
    let cancelled = false;

    loadYouTubeIframeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      playerRef.current = new YT.Player(mountRef.current, {
        videoId,
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: () => {
            if (!cancelled) setStatus("ready");
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [status, videoId]);

  const posterUrl = posterSrc ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="absolute inset-0">
      {status !== "ready" && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterUrl}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        </>
      )}

      <div
        className={
          status === "ready"
            ? "absolute inset-0 [&>div]:h-full [&>div]:w-full [&_iframe]:h-full [&_iframe]:w-full"
            : "pointer-events-none absolute inset-0 opacity-0 [&>div]:h-full [&>div]:w-full [&_iframe]:h-full [&_iframe]:w-full"
        }
      >
        <div ref={mountRef} />
      </div>

      {status === "idle" && (
        <button
          type="button"
          onClick={() => setStatus("loading")}
          aria-label={`Play ${title}`}
          className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:bg-black/65">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            aria-hidden="true"
            className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white"
          />
          <span className="sr-only">Loading video…</span>
        </div>
      )}
    </div>
  );
}
