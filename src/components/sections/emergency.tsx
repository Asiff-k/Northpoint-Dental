import Link from "next/link";
import { Phone, Siren, TriangleAlert } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

/** Emergency block, linked from the red top-bar link (/#emergency). */
export function Emergency() {
  const { emergency, contact } = clinic;

  return (
    <Section id="emergency">
      <div className="grid gap-8 rounded-3xl border border-danger/25 bg-card p-6 shadow-soft sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-danger-strong px-3 py-1.5 text-sm font-semibold text-white">
            <Siren className="size-4" aria-hidden />
            Dental emergency
          </p>
          <h2 className="mt-5 text-[1.75rem] leading-tight font-bold text-balance text-primary md:text-[2.5rem]">
            In pain? We will see you today.
          </h2>
          {emergency.sameDay && (
            <p className="mt-4 text-lg text-muted-foreground">
              Same-day slots available. New and existing patients are welcome.
            </p>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="destructive" size="lg" className="bg-danger-strong hover:bg-danger">
              <a href={contact.phoneHref}>
                <Phone />
                Call {contact.phone}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book?service=emergency">Book emergency slot</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl bg-muted p-5 sm:p-6">
          <h3 className="font-semibold text-primary">Contact us straight away for</h3>
          <ul className="mt-3 space-y-2.5 text-[0.9375rem]">
            {emergency.redFlags.map((flag) => (
              <li key={flag} className="flex items-start gap-2.5 first-letter:uppercase">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-danger-strong" aria-hidden />
                <span className="first-letter:uppercase">{flag}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Out of hours:</span>{" "}
            {emergency.outOfHours}
          </p>
        </div>
      </div>
    </Section>
  );
}
