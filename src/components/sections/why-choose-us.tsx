import { whyChooseUs } from "@/config/clinic.config";
import { FadeIn } from "@/components/ui/fade-in";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";

/** Generous dark section with thin line icons. */
export function WhyChooseUs() {
  return (
    <Section id="why" className="relative overflow-hidden bg-primary">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Why choose us"
          title="Private dentistry, without the surprises"
          intro="Six things patients tell us they could not find anywhere else."
        />

        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((point, i) => (
            <li key={point.title}>
              <FadeIn delay={(i % 3) * 0.06}>
                <span className="flex size-12 items-center justify-center rounded-2xl border border-accent/30 text-accent">
                  <Icon name={point.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">
                  {point.text}
                </p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
