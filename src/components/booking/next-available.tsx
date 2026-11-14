"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Clock } from "lucide-react";
import { getDentist, shortName } from "@/config/clinic.config";
import {
  placeholderEarliest,
  placeholderNextAvailable,
  placeholderNextSlots,
  slotHref,
} from "@/lib/next-available";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";

/*
 * "Next available" UI. Phase 1 reads the placeholder in lib/next-available.
 * Phase 3 swaps these for getNextAvailable / getAvailableSlots.
 */

/** Small "Next: Today 15:45" chip for dentist cards and price tables. */
export function NextAvailableChip({
  dentistSlug,
  className,
}: {
  dentistSlug: string;
  className?: string;
}) {
  const now = useNow();
  const dentist = getDentist(dentistSlug);
  const slot = now && dentist ? placeholderNextAvailable(dentist, now) : null;

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full bg-accent/20 px-2.5 text-xs font-medium whitespace-nowrap text-primary",
        className,
      )}
    >
      <Clock className="size-3.5" aria-hidden />
      {slot ? (
        <span>Next: {slot.label}</span>
      ) : (
        <span>
          Next available
          <span className="sr-only">: loading</span>
        </span>
      )}
    </span>
  );
}

/** Hero floating card: "Next available: Today 15:45 with Dr Patel". */
export function NextAvailableCard({ className }: { className?: string }) {
  const now = useNow();
  const slot = useMemo(() => (now ? placeholderEarliest(now) : null), [now]);
  const dentist = slot ? getDentist(slot.dentistSlug) : null;

  const body = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/25 text-primary">
        <Clock className="size-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-medium text-muted-foreground">
          Next available
        </span>
        {slot && dentist ? (
          <span className="block text-sm font-semibold text-primary">
            {slot.label} with {shortName(dentist)}
          </span>
        ) : (
          <span className="mt-1 block h-4 w-40 rounded-full bg-muted" aria-hidden />
        )}
      </span>
    </>
  );

  const classes = cn(
    "flex items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-5 shadow-lift",
    className,
  );

  return slot ? (
    <Link href={slotHref(slot)} className={cn(classes, "transition-transform duration-200 hover:-translate-y-0.5")}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}

/** Dentist profile: the next few free slots as one-click chips. */
export function NextSlotChips({
  dentistSlug,
  count = 5,
}: {
  dentistSlug: string;
  count?: number;
}) {
  const now = useNow();
  const dentist = getDentist(dentistSlug);
  const slots = useMemo(
    () => (now && dentist ? placeholderNextSlots(dentist, now, count) : null),
    [now, dentist, count],
  );

  if (!slots) {
    return (
      <div className="flex flex-wrap gap-2" aria-hidden>
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="h-11 w-36 rounded-full bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {slots.map((slot) => (
        <li key={`${slot.day.iso}-${slot.time}`}>
          <Link
            href={slotHref(slot)}
            className="inline-flex h-11 items-center rounded-full border border-primary/20 bg-card px-4 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white"
          >
            {slot.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
