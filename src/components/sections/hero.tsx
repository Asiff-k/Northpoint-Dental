import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { clinic, hero, images } from "@/config/clinic.config";
import { Container } from "@/components/ui/section";
import { NextAvailableCard } from "@/components/booking/next-available";
import { RatingBadge } from "@/components/site/rating-badge";
import { IntentSelector } from "@/components/sections/intent-selector";

export function Hero() {
  const { trust, offers } = clinic;

  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3.5 py-1.5 text-sm font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 text-4xl leading-[1.08] font-bold text-balance text-primary md:text-[3.5rem]">
            {clinic.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            {hero.subhead}
          </p>

          <div className="mt-8 max-w-xl">
            <IntentSelector />
            {offers.freeConsultation.enabled && (
              <p className="mt-4 px-1 text-sm">
                <Link
                  href="/book?type=consultation"
                  className="inline-flex min-h-11 items-center font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:decoration-primary"
                >
                  {hero.consultationCta}
                </Link>
              </p>
            )}
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <li>
              <RatingBadge />
            </li>
            <li>
              <span className="font-semibold text-foreground">{trust.yearsOpen} years</span>{" "}
              in {clinic.address.city}
            </li>
            <li>
              <span className="font-semibold text-foreground">{trust.patientsTreated}</span>{" "}
              patients treated
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              {trust.regulators.join(" and ")} regulated
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-muted shadow-lift sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[620px] lg:w-full">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              preload
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent" aria-hidden />
          </div>
          <NextAvailableCard className="absolute -bottom-5 left-4 max-w-[calc(100%-2rem)] sm:left-6 lg:-left-8 lg:bottom-10" />
        </div>
      </Container>
    </section>
  );
}
