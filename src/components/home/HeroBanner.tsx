"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlossomCarousel, BlossomPrev, BlossomNext } from "@blossom-carousel/react";
import "@blossom-carousel/react/style.css";
import { motion } from "motion/react";
import type { Title } from "@/data/types";
import { gradientFor } from "@/lib/gradients";
import { TitleMeta } from "@/components/titles/TitleMeta";

function HeroSlideBackdrop({ title, index }: { title: Title; index: number }) {
  const imageSrc = title.backdropSrc || title.posterSrc;
  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={title.posterAlt || ""}
        fill
        sizes="100vw"
        className="object-cover object-left md:object-center"
        priority={index === 0}
        loading={index === 0 ? "eager" : undefined}
        fetchPriority={index === 0 ? "high" : "low"}
        draggable={false}
      />
    );
  }
  const { from, to } = gradientFor(title);
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    />
  );
}

export function HeroBanner({ slides }: { slides: Title[] }) {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<any>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const slideTo = useCallback((index: number) => {
    const el = carouselRef.current?.element;
    if (!el) return;
    const slideWidth = el.clientWidth;
    el.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });
    setActive(index);
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % slides.length;
        slideTo(next);
        return next;
      });
    }, 5000);
  }, [slides.length, slideTo]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  // Track scroll positions to update dots when manually swiped/dragged
  const handleScroll = () => {
    const el = carouselRef.current?.element;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== active && index >= 0 && index < slides.length) {
      setActive(index);
    }
  };

  useEffect(() => {
    if (slides.length > 1) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [active, slides.length, startAutoplay, stopAutoplay]);

  if (slides.length === 0) return null;

  return (
    <section aria-label="Featured titles" className="relative">
      <BlossomCarousel
        id="hero-carousel"
        ref={carouselRef}
        onScroll={handleScroll}
        style={{ display: "flex" }}
        className="relative aspect-[3/4] sm:aspect-[16/9] lg:aspect-[21/9] overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth"
      >
        {slides.map((title, index) => (
          <div
            key={title.slug}
            data-blossom-slide
            style={{ display: "block" }}
            className="relative h-full w-full shrink-0 snap-start overflow-hidden"
          >
            <HeroSlideBackdrop title={title} index={index} />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/95 via-black/50 to-transparent md:from-black/80 md:via-black/30" />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-8 lg:max-w-xl"
            >
              <div>
                <h1 className="font-display text-2xl font-semibold text-white sm:text-5xl lg:text-6xl text-balance">
                  {title.title}
                </h1>
                {title.originalTitle && (
                  <p className="font-bengali text-sm text-white/85 sm:text-xl">
                    {title.originalTitle}
                  </p>
                )}
              </div>
              <TitleMeta title={title} />
              <p
                className={
                  title.tagline
                    ? "font-display line-clamp-2 text-sm italic text-white/85 sm:text-lg"
                    : "line-clamp-2 text-xs text-white/80 sm:text-base"
                }
              >
                {title.tagline ?? title.synopsis}
              </p>
              <Link
                href={`/titles/${title.slug}`}
                draggable={false}
                className="mt-1 w-fit rounded-md bg-[var(--color-red)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-red-dim)]"
              >
                Watch Now
              </Link>
            </motion.div>
          </div>
        ))}
      </BlossomCarousel>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-4 sm:bottom-10 pointer-events-none">
          <BlossomPrev
            for="hero-carousel"
            onClick={() => {
              const prevIndex = (active - 1 + slides.length) % slides.length;
              slideTo(prevIndex);
            }}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-black/40 text-lg text-white transition-colors hover:bg-black/60 sm:flex pointer-events-auto"
          >
            ‹
          </BlossomPrev>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {slides.map((title, i) => (
              <button
                key={title.slug}
                type="button"
                onClick={() => slideTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-[var(--color-red)]" : "w-1.5 bg-white/50"
                  }`}
              />
            ))}
          </div>
          <BlossomNext
            for="hero-carousel"
            onClick={() => {
              const nextIndex = (active + 1) % slides.length;
              slideTo(nextIndex);
            }}
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-black/40 text-lg text-white transition-colors hover:bg-black/60 sm:flex pointer-events-auto"
          >
            ›
          </BlossomNext>
        </div>
      )}
    </section>
  );
}
