"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getDentist, reviews } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { SampleTag } from "@/components/ui/sample-tag";
import { Container, SectionHeading } from "@/components/ui/section";
import { RatingBadge } from "@/components/site/rating-badge";

/** Review carousel on CSS scroll-snap. Buttons scroll by one card. */
export function Reviews() {
  const track = useRef<HTMLUListElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="overflow-hidden py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading
              eyebrow="Reviews"
              title="Kind words from our patients"
            />
            <RatingBadge className="mt-4" />
          </div>
          <div className="hidden gap-2 md:flex">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous reviews"
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next reviews"
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </Container>

      <ul
        ref={track}
        tabIndex={0}
        aria-label="Patient reviews"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-4 sm:scroll-px-6 sm:px-6 xl:scroll-px-[max(1.5rem,calc((100vw-75rem)/2+1.5rem))] xl:px-[max(1.5rem,calc((100vw-75rem)/2+1.5rem))]"
      >
        {reviews.map((review) => {
          const dentist = review.dentistSlug ? getDentist(review.dentistSlug) : null;
          return (
            <li
              key={review.name}
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-3xl bg-warm p-6 sm:w-[24rem] sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="flex gap-0.5"
                  role="img"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} className="size-4 fill-amber-500 text-amber-500" aria-hidden />
                  ))}
                </span>
                {review.isSample && (
                  <SampleTag className="border-primary/25 bg-white/50 text-primary/80">
                    Sample review
                  </SampleTag>
                )}
              </div>
              <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-primary">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <footer className="mt-6 text-sm">
                <p className="font-semibold text-primary">{review.name}</p>
                <p className="text-primary/70">
                  {review.treatment}
                  {dentist && ` with ${dentist.name}`}
                </p>
              </footer>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
