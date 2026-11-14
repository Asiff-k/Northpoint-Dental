import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatPrice, fromPrice, type Service } from "@/config/clinic.config";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

/**
 * Service card. `compact` hides the summary on phones so cards can sit two
 * to a row (used on the homepage grid).
 */
export function ServiceCard({
  service,
  compact = false,
}: {
  service: Service;
  compact?: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lift",
        compact ? "p-4 sm:p-5" : "p-5",
      )}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex items-center justify-center rounded-2xl bg-accent/20 text-primary",
            compact ? "size-10 sm:size-12" : "size-12",
          )}
        >
          <Icon name={service.icon} className={compact ? "size-5 sm:size-6" : "size-6"} />
        </span>
        <ArrowUpRight
          className="size-5 text-muted-foreground transition-colors group-hover:text-primary"
          aria-hidden
        />
      </div>
      <h3
        className={cn(
          "mt-4 leading-snug font-semibold text-primary",
          compact ? "flex-1 text-base sm:flex-none sm:text-lg" : "text-lg",
        )}
      >
        {service.name}
      </h3>
      <p
        className={cn(
          "mt-1.5 flex-1 text-sm text-muted-foreground",
          compact && "hidden sm:block",
        )}
      >
        {service.summary}
      </p>
      <div
        className={cn(
          "mt-4 flex justify-between gap-x-3 gap-y-1 border-t border-border pt-4 text-sm",
          compact ? "flex-col sm:flex-row sm:items-center" : "items-center",
        )}
      >
        <span className="font-semibold text-primary">
          from {formatPrice(fromPrice(service))}
        </span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-3.5" aria-hidden />
          {service.durationMin} min
        </span>
      </div>
    </Link>
  );
}
