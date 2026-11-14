import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fromPrice, maxPrice, services } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { MembershipCard } from "@/components/sections/membership-card";
import { FinanceLine, priceRangeText } from "@/components/sections/price-text";
import { RegulatorBadges } from "@/components/sections/regulator-badges";

/** Five popular treatments with price ranges, plus the membership card. */
export function PricingPreview() {
  const popular = services.filter((s) => s.popular).slice(0, 5);

  return (
    <Section id="pricing" className="bg-card">
      <SectionHeading
        eyebrow="Pricing"
        title="Honest prices, published for every dentist"
        intro="Fees vary with each clinician's experience. You always see the exact price before you book."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
        <FadeIn>
          <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-background">
            {popular.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/60 sm:p-5"
                >
                  <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-primary sm:flex">
                    <Icon name={s.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-primary">{s.name}</span>
                    <span className="block text-sm text-muted-foreground">
                      {fromPrice(s) === maxPrice(s)
                        ? `${s.durationMin} min`
                        : "Depending on clinician"}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block font-heading text-lg font-bold whitespace-nowrap text-primary">
                      {priceRangeText(s)}
                    </span>
                    <FinanceLine service={s} pence={fromPrice(s)} short className="block" />
                  </span>
                  <ArrowRight
                    className="hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary sm:block"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <RegulatorBadges />
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/pricing">
                Full fee guide
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <MembershipCard />
        </FadeIn>
      </div>
    </Section>
  );
}
