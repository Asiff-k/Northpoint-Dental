import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/sections/service-card";

/** Homepage: eight services, popular first. */
export function ServicesGrid() {
  const featured = [
    ...services.filter((s) => s.popular),
    ...services.filter((s) => !s.popular),
  ].slice(0, 8);

  return (
    <Section id="services">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Treatments"
          title="Everything your smile needs, under one roof"
          intro="Clear prices from the start. Tap any treatment to see what each dentist charges."
        />
        <Button asChild variant="outline" className="hidden shrink-0 md:inline-flex">
          <Link href="/services">
            View all services
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {featured.map((service, i) => (
          <li key={service.slug}>
            <FadeIn delay={(i % 4) * 0.05} className="h-full">
              <ServiceCard service={service} compact />
            </FadeIn>
          </li>
        ))}
      </ul>

      <div className="mt-8 md:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/services">
            View all services
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
