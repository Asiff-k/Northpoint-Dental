"use client";

import { clinic, weekdayLabels } from "@/config/clinic.config";
import { clinicClock } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";

/** Opening hours with today's row highlighted (Europe/London). */
export function HoursTable({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const now = useNow();
  const today = now ? clinicClock(now).weekday : null;

  return (
    <dl aria-label="Opening hours" className={cn("w-full text-sm", className)}>
      {clinic.hours.map((h) => {
        const isToday = h.day === today;
        return (
          <div
            key={h.day}
            className={cn(
              "flex items-center justify-between gap-4 rounded-lg px-3 py-1.5",
              isToday &&
                (tone === "light"
                  ? "bg-muted font-semibold text-primary"
                  : "bg-white/10 font-semibold text-accent"),
            )}
          >
            <dt>
              {weekdayLabels[h.day].long}
              {isToday && <span className="sr-only"> (today)</span>}
            </dt>
            <dd className="tabular-nums">
              {h.open && h.close ? `${h.open} to ${h.close}` : "Closed"}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
