import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { beforeAfter } from "@/config/clinic.config";
import { FadeIn } from "@/components/ui/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { BeforeAfterSlider } from "@/components/sections/before-after-slider";

export function BeforeAfter() {
  return (
    <Section id="results" className="bg-card">
      <SectionHeading
        eyebrow="Before and after"
        title="Small changes, natural results"
        intro="Drag each slider to compare. These are illustrative images, not patient photographs. Results vary from person to person."
      />

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {beforeAfter.map((item, i) => (
          <li key={item.serviceSlug}>
            <FadeIn delay={i * 0.06}>
              <BeforeAfterSlider image={item.image} alt={item.alt} label={item.treatment} />
              <h3 className="mt-4 text-lg font-semibold text-primary">{item.treatment}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.caption}</p>
              <Link
                href={`/services/${item.serviceSlug}`}
                className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                About this treatment
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </FadeIn>
          </li>
        ))}
      </ul>
    </Section>
  );
}
