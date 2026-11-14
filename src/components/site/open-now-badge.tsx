"use client";

import { getOpenStatus } from "@/lib/hours";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";

/** Live "Open now until 18:00" badge, computed in Europe/London every minute. */
export function OpenNowBadge({ className }: { className?: string }) {
  const now = useNow();

  if (!now) {
    return (
      <span
        aria-hidden
        className={cn("inline-block h-4 w-36 rounded-full bg-white/10", className)}
      />
    );
  }

  const status = getOpenStatus(now);

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex size-2 shrink-0">
        {status.isOpen && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            status.isOpen ? "bg-accent" : "bg-white/40",
          )}
        />
      </span>
      <span className="truncate">{status.label}</span>
    </span>
  );
}
