"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star, X } from "lucide-react";
import type { Review } from "@/config/clinic.config";
import { SampleTag } from "@/components/ui/sample-tag";

const ROTATE_MS = 8000;
/** At this width and above the toast is always allowed. */
const WIDE_SCREEN_PX = 1536;

const isRendered = (el: Element) => el.getClientRects().length > 0;

/**
 * Whether the toast may show right now.
 * Below 1536px it has to stay out of the way: only after the visitor has
 * scrolled past the page hero (the first section in <main>), and never while
 * the final CTA or the footer is on screen. Those are marked with
 * [data-toast-avoid]. Hidden routes kept alive by <Activity> are skipped.
 */
function canShowToast() {
  if (window.innerWidth >= WIDE_SCREEN_PX) return true;

  const hero = [...document.querySelectorAll("main section")].find(isRendered);
  if (!hero || hero.getBoundingClientRect().bottom > 0) return false;

  const viewportHeight = window.innerHeight;
  for (const el of document.querySelectorAll("[data-toast-avoid]")) {
    if (!isRendered(el)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) return false;
  }
  return true;
}

const subscribe = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
};

/** Rotating review toast, bottom-left. Desktop only, pauses on hover. */
export function ReviewToast({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const paused = useRef(false);
  const allowed = useSyncExternalStore(subscribe, canShowToast, () => false);

  const active = allowed && !dismissed && reviews.length > 0;

  useEffect(() => {
    if (!active) return;
    const rotate = window.setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % reviews.length);
    }, ROTATE_MS);
    return () => window.clearInterval(rotate);
  }, [active, reviews.length]);

  const review = active ? reviews[index] : null;

  return (
    <div
      className="fixed bottom-6 left-6 z-30 hidden w-[300px] max-w-[300px] lg:block"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <AnimatePresence mode="wait">
        {review && (
          <motion.aside
            key={review.name}
            aria-label="Patient review"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative rounded-2xl border border-border bg-card p-4 pr-10 shadow-lift"
          >
            <span className="flex" aria-hidden>
              {Array.from({ length: review.rating }, (_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <p className="mt-1.5 text-sm font-semibold text-primary">
              {review.rating} star review by {review.name}
            </p>
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {review.text}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {review.treatment}
              {review.isSample && <SampleTag>Sample review</SampleTag>}
            </p>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss reviews"
              className="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
