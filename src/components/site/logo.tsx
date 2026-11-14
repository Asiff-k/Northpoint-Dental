import Link from "next/link";
import { clinic } from "@/config/clinic.config";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const [first, ...rest] = clinic.name.split(" ");

  return (
    <Link
      href="/"
      aria-label={`${clinic.name} home`}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg",
        tone === "light" ? "text-primary" : "text-white",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <circle cx="16" cy="16" r="16" className={tone === "light" ? "fill-primary" : "fill-white/10"} />
        <path d="M16 6.5 21 20l-5-2.6L11 20l5-13.5Z" className="fill-accent" />
        <circle cx="16" cy="24" r="1.4" className="fill-white" />
      </svg>
      <span className="font-heading text-lg leading-none font-bold tracking-tight whitespace-nowrap">
        {first}
        {rest.length > 0 && (
          <span className="font-medium opacity-70"> {rest.join(" ")}</span>
        )}
      </span>
    </Link>
  );
}
