import type { Metadata } from "next";
import {
  categoryLabels,
  clinic,
  formatPrice,
  type ServiceCategory,
} from "@/config/clinic.config";
import { Container, SectionHeading } from "@/components/ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinalCta } from "@/components/sections/final-cta";
import { FinanceCalculator } from "@/components/sections/finance-calculator";
import { MembershipCard } from "@/components/sections/membership-card";
import { PageHero } from "@/components/sections/page-hero";
import { PriceMatrix } from "@/components/sections/price-matrix";
import { RegulatorBadges } from "@/components/sections/regulator-badges";
import { getServices } from "@/lib/data";

export function generateMetadata(): Metadata {
  return {
    title: "Fee guide: prices for every dentist",
    description: `The full ${clinic.name} fee guide. Compare prices by treatment and clinician, see member prices and work out 0% finance payments.`,
  };
}

const triggerClass =
  "h-11 flex-none rounded-full px-4 text-sm font-semibold text-primary/80 hover:text-primary data-active:bg-primary data-active:text-white data-active:shadow-none";

export default async function PricingPage() {
  const services = await getServices();
  const categories = (Object.keys(categoryLabels) as ServiceCategory[]).filter((c) =>
    services.some((s) => s.category === c),
  );
  const { finance, membership } = clinic;

  return (
    <>
      <PageHero
        eyebrow="Fee guide"
        title="Clear prices for every treatment and every dentist"
        intro="Fees vary with each clinician's experience and training. Compare them side by side, then book the one that suits you."
        crumbs={[{ label: "Pricing" }]}
      >
        <RegulatorBadges className="mt-6" />
      </PageHero>

      <Container className="pb-14 md:pb-20">
        <Tabs defaultValue="all" className="gap-6">
          <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <TabsList
              aria-label="Treatment category"
              className="h-auto gap-1 rounded-full bg-muted p-1 group-data-horizontal/tabs:h-auto"
            >
              <TabsTrigger value="all" className={triggerClass}>
                All
              </TabsTrigger>
              {categories.map((c) => (
                <TabsTrigger key={c} value={c} className={triggerClass}>
                  {categoryLabels[c]}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all">
            <PriceMatrix services={services} />
          </TabsContent>
          {categories.map((c) => (
            <TabsContent key={c} value={c}>
              <PriceMatrix services={services.filter((s) => s.category === c)} />
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-5 text-sm text-muted-foreground">
          Prices are a guide. Final cost confirmed after examination, in
          writing, before any treatment starts.
        </p>
      </Container>

      {/* Membership */}
      <section id="membership" className="bg-card py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Membership"
              title={`Routine care from ${formatPrice(membership.monthlyPence)} a month`}
              intro={`The ${membership.name} covers your regular check-ups and hygiene visits, and gives you member prices on treatment.`}
            />
            <p className="mt-5 text-[0.9375rem] text-muted-foreground">
              Member prices are shown in their own column in the fee guide above.
              Ask the team about joining at your next visit.
            </p>
          </div>
          <MembershipCard />
        </Container>
      </section>

      {/* Finance */}
      {finance.enabled && (
        <section id="finance" className="py-14 md:py-20">
          <Container>
            <SectionHeading
              eyebrow={`${finance.aprPercent}% finance`}
              title="Spread the cost, interest free"
              intro={`Treatment plans of ${formatPrice(finance.minSpendPence)} or more can be spread over ${finance.terms.join(", ").replace(/, (\d+)$/, " or $1")} months at ${finance.aprPercent}% APR.`}
            />
            <div className="mt-10">
              <FinanceCalculator />
            </div>
          </Container>
        </section>
      )}

      <FinalCta />
    </>
  );
}
