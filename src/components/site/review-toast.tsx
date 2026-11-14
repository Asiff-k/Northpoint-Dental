"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star, X } from "lucide-react";
import type { Review } from "@/config/clinic.config";
import { SampleTag } from "@/components/ui/sample-tag";

const ROTATE_MS = 8000;
const SHOW_AFTER_SCROLL_PX = 500;

/** Rotating review toast, bottom-left. Desktop only, pauses on hover. */
export function ReviewToast({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    if (dismissed || reviews.length === 0) return;

    // First appearance waits until the visitor has scrolled past the top of
    // the page, so the toast never covers a hero or its call to action.
    const showFirst = () => {
      if (window.scrollY < SHOW_AFTER_SCROLL_PX) return;
      setIndex((i) => i ?? 0);
      window.removeEventListener("scroll", showFirst);
    };
    window.addEventListener("scroll", showFirst, { passive: true });

    const rotate = window.setInterval(() => {
      if (paused.current) return;
      setIndex((i) => (i === null ? i : (i + 1) % reviews.length));
    }, ROTATE_MS);

    return () => {
      window.removeEventListener("scroll", showFirst);
      window.clearInterval(rotate);
    };
  }, [dismissed, reviews.length]);

  const review = index === null || dismissed ? null : reviews[index];

  return (
    <div
      className="fixed bottom-6 left-6 z-30 hidden w-80 lg:block"
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
            <div className="flex items-center gap-2">
              <span className="flex" aria-hidden>
                {Array.from({ length: review.rating }, (_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="text-sm font-semibold text-primary">
                {review.rating} star review by {review.name}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {review.text}
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
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
