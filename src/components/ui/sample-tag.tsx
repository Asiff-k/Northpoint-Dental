import { cn } from "@/lib/utils";

/** Demo honesty label. Show wherever sample data (reviews, ratings, GDC) appears. */
export function SampleTag({
  children = "Sample",
  className,
  tone = "light",
}: {
  children?: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-1.5 py-px align-middle text-[0.625rem] leading-4 font-semibold tracking-wide uppercase",
        tone === "light"
          ? "border-primary/20 bg-card/80 text-muted-foreground"
          : "border-white/25 bg-white/10 text-white/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
