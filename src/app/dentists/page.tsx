import type { Metadata } from "next";
import { clinic } from "@/config/clinic.config";
import { Container } from "@/components/ui/section";
import { DentistCard } from "@/components/sections/dentist-card";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";
import { RegulatorBadges } from "@/components/sections/regulator-badges";
import { getDentists } from "@/lib/data";

export function generateMetadata(): Metadata {
  return {
    title: "Our dentists and team",
    description: `Meet the ${clinic.name} team in ${clinic.address.city}. See each clinician's GDC registration, special interests, prices and next available appointment.`,
  };
}

export default async function DentistsPage() {
  const dentists = await getDentists();

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="Meet the people who will look after you"
        intro="Every clinician is registered with the General Dental Council. Choose who you see, compare their prices and book directly."
        crumbs={[{ label: "Dentists" }]}
      >
        <RegulatorBadges className="mt-6" />
      </PageHero>

      <Container className="pb-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dentists.map((dentist) => (
            <li key={dentist.slug}>
              <DentistCard dentist={dentist} />
            </li>
          ))}
        </ul>
      </Container>

      <FinalCta
        title="Not sure who to see?"
        text="Choose First available when you book, or ask Ava to point you to the right clinician."
      />
    </>
  );
}
