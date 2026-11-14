import { MapPin, Navigation } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { HoursTable } from "@/components/site/hours-table";
import { cn } from "@/lib/utils";

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${clinic.name}, ${clinic.address.line1}, ${clinic.address.city} ${clinic.address.postcode}`,
)}`;

/** Keyless Google Maps embed. 260px tall on mobile, 360px on desktop. */
export function MapEmbed({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-[260px] overflow-hidden rounded-3xl border border-border bg-muted md:h-[360px]",
        className,
      )}
    >
      <iframe
        title={`Map showing ${clinic.name}, ${clinic.address.line1}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.address.mapEmbedQuery)}&z=16&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    </div>
  );
}

export function GettingHere({ className }: { className?: string }) {
  return (
    <ul className={cn("space-y-2 text-[0.9375rem] text-muted-foreground", className)}>
      {clinic.address.gettingHere.map((line) => (
        <li key={line} className="flex gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          {line}
        </li>
      ))}
    </ul>
  );
}

export function DirectionsButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button asChild {...props}>
      <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
        <Navigation />
        Get directions
      </a>
    </Button>
  );
}

export function Location() {
  const { address } = clinic;

  return (
    <Section id="location" className="bg-card">
      <SectionHeading
        eyebrow="Find us"
        title={`In the heart of ${address.city}`}
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <MapEmbed className="lg:h-full lg:min-h-[420px]" />

        <div>
          <p className="flex gap-3 text-lg font-semibold text-primary">
            <MapPin className="mt-1 size-5 shrink-0" aria-hidden />
            <span>
              {address.line1}, {address.city} {address.postcode}
            </span>
          </p>

          <h3 className="mt-7 text-sm font-semibold tracking-wide text-primary uppercase">
            Opening hours
          </h3>
          <HoursTable className="mt-2 max-w-sm -translate-x-3" />

          <h3 className="mt-7 text-sm font-semibold tracking-wide text-primary uppercase">
            Getting here
          </h3>
          <GettingHere className="mt-3" />

          <DirectionsButton size="lg" className="mt-7 w-full sm:w-auto" />
        </div>
      </div>
    </Section>
  );
}
