import Link from "next/link";
import { bookingSteps } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";

export function HowBookingWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeading
        align="center"
        eyebrow="How booking works"
        title="Booked in three simple steps"
        intro="No phone queues and no waiting for a call back. It takes about a minute."
      />

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {bookingSteps.map((step, i) => (
          <li key={step.title}>
            <FadeIn delay={i * 0.08} className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="flex size-11 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted-foreground">{step.text}</p>
            </FadeIn>
          </li>
        ))}
      </ol>

      <div className="mt-10 text-center">
        <Button asChild size="lg">
          <Link href="/book">Start booking</Link>
        </Button>
      </div>
    </Section>
  );
}
