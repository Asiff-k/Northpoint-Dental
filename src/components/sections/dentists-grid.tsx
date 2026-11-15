import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { DentistCard } from "@/components/sections/dentist-card";
import { getDentists } from "@/lib/data";

export async function DentistsGrid() {
  const dentists = await getDentists();

  return (
    <Section id="dentists" className="bg-card">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Meet the team"
          title="Choose who looks after you"
          intro="Every clinician publishes their own prices and availability, so you can pick the right fit."
        />
        <Button asChild variant="outline" className="hidden shrink-0 md:inline-flex">
          <Link href="/dentists">
            Meet the whole team
            <ArrowRight />
          </Link>
        </Button>
      </div>

      {/* Phones: swipeable row. Tablet and up: grid. */}
      <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {dentists.slice(0, 4).map((dentist, i) => (
          <li key={dentist.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <FadeIn delay={i * 0.05} className="h-full">
              <DentistCard dentist={dentist} />
            </FadeIn>
          </li>
        ))}
      </ul>

      <div className="mt-4 sm:mt-8 md:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/dentists">
            Meet the whole team
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
