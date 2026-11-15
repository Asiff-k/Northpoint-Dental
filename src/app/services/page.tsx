import type { Metadata } from "next";
import {
  categoryLabels,
  clinic,
  type ServiceCategory,
} from "@/config/clinic.config";
import { Container } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { RegulatorBadges } from "@/components/sections/regulator-badges";
import { ServiceCard } from "@/components/sections/service-card";
import { getServices } from "@/lib/data";

export function generateMetadata(): Metadata {
  return {
    title: "Dental services and prices",
    description: `All treatments at ${clinic.name} in ${clinic.address.city}, with "from" prices and appointment lengths. Book online with the dentist of your choice.`,
  };
}

export default async function ServicesPage() {
  const services = await getServices();
  const categories = (Object.keys(categoryLabels) as ServiceCategory[]).filter((c) =>
    services.some((s) => s.category === c),
  );

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Treatments and prices"
        intro="Browse by category. Every treatment shows its starting price and how long to allow. Open one to compare each dentist's fee."
        crumbs={[{ label: "Services" }]}
      >
        <nav aria-label="Service categories" className="mt-7">
          <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((c) => (
              <li key={c}>
                <a
                  href={`#${c}`}
                  className="inline-flex h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-medium whitespace-nowrap text-primary transition-colors hover:border-primary/40 hover:bg-muted"
                >
                  {categoryLabels[c]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Container className="space-y-14 pb-8 md:space-y-16">
        {categories.map((c) => (
          <section key={c} id={c} aria-labelledby={`${c}-heading`}>
            <h2
              id={`${c}-heading`}
              className="text-2xl font-bold text-primary md:text-[1.75rem]"
            >
              {categoryLabels[c]}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === c)
                .map((s) => (
                  <li key={s.slug}>
                    <ServiceCard service={s} />
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <div className="flex flex-col gap-4 rounded-3xl bg-muted p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-muted-foreground">
            Prices are a guide. Your final cost is confirmed in writing after
            your examination, before any treatment starts.
          </p>
          <RegulatorBadges />
        </div>
      </Container>

      <FinalCta />
    </>
  );
}
