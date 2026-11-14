import { Star } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { SampleTag } from "@/components/ui/sample-tag";
import { cn } from "@/lib/utils";

/** Google rating summary. Always shows the Sample tag while ratingIsSample. */
export function RatingBadge({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const { googleRating, googleReviewCount, ratingIsSample } = clinic.trust;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-sm whitespace-nowrap",
        tone === "light" ? "text-foreground" : "text-white",
        className,
      )}
    >
      <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
      <span className="font-semibold">{googleRating.toFixed(1)}</span>
      <span className={tone === "light" ? "text-muted-foreground" : "text-white/70"}>
        {googleReviewCount} Google reviews
      </span>
      {ratingIsSample && <SampleTag tone={tone} />}
    </span>
  );
}
