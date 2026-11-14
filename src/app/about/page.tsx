import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { about, clinic, images } from "@/config/clinic.config";
import { FadeIn } from "@/components/ui/fade-in";
import { Icon } from "@/components/ui/icon";
import { Container, SectionHeading } from "@/components/ui/section";
import { DentistsGrid } from "@/components/sections/dentists-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";

export function generateMetadata(): Metadata {
  return {
    title: "About the practice",
    description: `${about.intro} Meet ${clinic.name}: our story, our rooms, our technology and our accreditations.`,
  };
}

export default function AboutPage() {
  const { trust } = clinic;

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={about.headline}
        intro={about.intro}
        crumbs={[{ label: "About" }]}
      />

      <Container>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-muted shadow-lift md:aspect-[16/7]">
          <Image
            src={images.about.src}
            alt={images.about.alt}
            fill
            preload
            sizes="(min-width: 1200px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>

      {/* Story */}
      <section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Our story" title={`${trust.yearsOpen} years in ${clinic.address.city}`} />
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <dl className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-primary p-5 text-white">
                <dt className="text-sm text-white/70">Years open</dt>
                <dd className="mt-1 font-heading text-4xl font-bold">{trust.yearsOpen}</dd>
              </div>
              <div className="rounded-2xl bg-warm p-5 text-primary">
                <dt className="text-sm text-primary/70">Patients treated</dt>
                <dd className="mt-1 font-heading text-4xl font-bold">{trust.patientsTreated}</dd>
              </div>
            </dl>
            <ul className="space-y-3">
              {about.values.map((v) => (
                <li key={v.title} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-semibold text-primary">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Rooms */}
      <section className="bg-card py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="The practice"
            title="Light, calm rooms"
            intro="Designed to feel more like a studio than a surgery."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {images.rooms.map((room, i) => (
              <li key={room.alt}>
                <FadeIn delay={i * 0.06}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
                    <Image
                      src={room.src}
                      alt={room.alt}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Technology */}
      <section className="py-14 md:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-muted shadow-soft">
            <Image
              src={images.technology.src}
              alt={images.technology.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Technology"
              title="Modern kit that makes visits easier"
            />
            <ul className="mt-8 space-y-6">
              {about.technology.map((t) => (
                <li key={t.title} className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/20 text-primary">
                    <Icon name={t.icon} className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{t.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-muted-foreground">{t.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Accreditations */}
      <section className="bg-primary py-14 md:py-20">
        <Container>
          <SectionHeading tone="dark" eyebrow="Accreditations" title="Registered and regulated" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {about.accreditations.map((a) => (
              <li key={a.short} className="rounded-3xl border border-white/15 bg-white/5 p-6">
                <p className="flex items-center gap-3 text-white">
                  <ShieldCheck className="size-6 text-accent" aria-hidden />
                  <span className="font-heading text-xl font-bold">{a.short}</span>
                  <span className="text-sm text-white/70">{a.name}</span>
                </p>
                <p className="mt-3 text-[0.9375rem] text-white/75">{a.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <DentistsGrid />
      <FinalCta />
    </>
  );
}
