import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Award, Clock, Languages } from "lucide-react";
import {
  clinic,
  dentists,
  formatPrice,
  getDentist,
  reviews,
  servicesForDentist,
  shortName,
  weekdayLabels,
} from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { SampleTag } from "@/components/ui/sample-tag";
import { Container } from "@/components/ui/section";
import { NextSlotChips } from "@/components/booking/next-available";
import { GdcNumber } from "@/components/sections/dentist-card";
import { FinalCta } from "@/components/sections/final-cta";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { DetailSkeleton } from "@/components/sections/page-skeleton";
import { FinanceLine, MemberPrice } from "@/components/sections/price-text";

export function generateStaticParams() {
  return dentists.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/dentists/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const dentist = getDentist(slug);
  if (!dentist) return { title: "Dentist not found" };

  return {
    title: `${dentist.name}, ${dentist.role}`,
    description: `${dentist.bio} See ${shortName(dentist)}'s treatments, prices and next available appointments at ${clinic.name}.`,
  };
}

// `params` is read inside Suspense so the route's shared shell stays URL
// independent. Slugs from generateStaticParams are still fully prerendered.
export default function DentistPage({ params }: PageProps<"/dentists/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <DentistDetail params={params} />
    </Suspense>
  );
}

async function DentistDetail({
  params,
}: Pick<PageProps<"/dentists/[slug]">, "params">) {
  const { slug } = await params;
  const dentist = getDentist(slug);
  if (!dentist) notFound();

  const offered = servicesForDentist(dentist);
  const dentistReviews = reviews.filter((r) => r.dentistSlug === dentist.slug);
  const short = shortName(dentist);

  return (
    <>
      <section className="pt-8 pb-12 md:pt-12 md:pb-16">
        <Container>
          <Breadcrumbs
            items={[{ label: "Dentists", href: "/dentists" }, { label: dentist.name }]}
          />

          <div className="grid gap-8 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12 lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-muted shadow-lift md:mx-0">
              <Image
                src={dentist.photo}
                alt={`Portrait of ${dentist.name}`}
                fill
                preload
                sizes="(min-width: 768px) 352px, 100vw"
                className="object-cover object-top"
              />
            </div>

            <div>
              <h1 className="text-4xl leading-[1.1] font-bold text-primary md:text-[3.5rem]">
                {dentist.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{dentist.role}</p>
              <p className="mt-3">
                <GdcNumber dentist={dentist} />
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem]">
                <li className="inline-flex items-center gap-2">
                  <Award className="size-4 text-primary" aria-hidden />
                  {dentist.yearsExperience} years of experience
                </li>
                <li className="inline-flex items-center gap-2">
                  <Languages className="size-4 text-primary" aria-hidden />
                  {dentist.languages.join(", ")}
                </li>
              </ul>

              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground">
                {dentist.bio}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {dentist.specialties.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-accent/20 px-3 py-1.5 text-sm font-medium text-primary"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6">
                <h2 className="flex items-center gap-2 font-semibold text-primary">
                  <Clock className="size-4" aria-hidden />
                  Next appointments with {short}
                </h2>
                <div className="mt-4">
                  <NextSlotChips dentistSlug={dentist.slug} />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Usually in clinic{" "}
                  {dentist.availability.map((a) => weekdayLabels[a.day].short).join(", ")}.
                </p>
                <Button asChild className="mt-4 w-full sm:w-auto">
                  <Link href={`/book?dentist=${dentist.slug}`}>See all times</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-card py-14 md:py-20">
        <Container>
          <h2 className="text-2xl font-bold text-primary md:text-[2.5rem]">
            Treatments and prices with {short}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {offered.map((s) => {
              const price = s.prices[dentist.slug];
              return (
                <li
                  key={s.slug}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/services/${s.slug}`}
                      className="font-semibold text-primary hover:underline"
                    >
                      {s.name}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {s.durationMin} min · Member: <MemberPrice service={s} />
                    </p>
                    <FinanceLine service={s} pence={price} className="mt-1 block" />
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="font-heading text-xl font-bold text-primary">
                      {formatPrice(price)}
                    </span>
                    <Button asChild size="sm" variant="outline" className="h-10">
                      <Link href={`/book?service=${s.slug}&dentist=${dentist.slug}`}>
                        Book
                        <span className="sr-only"> {s.name}</span>
                      </Link>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            Final cost confirmed after examination.
          </p>
        </Container>
      </section>

      {dentistReviews.length > 0 && (
        <section className="py-14 md:py-20">
          <Container>
            <h2 className="text-2xl font-bold text-primary md:text-[2.5rem]">
              What patients say about {short}
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {dentistReviews.map((r) => (
                <li key={r.name} className="rounded-3xl bg-warm p-6">
                  <blockquote className="text-[1.0625rem] leading-relaxed text-primary">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-primary/80">
                    <span className="font-semibold text-primary">{r.name}</span>
                    {r.treatment}
                    {r.isSample && (
                      <SampleTag className="border-primary/25 bg-white/50 text-primary/80">
                        Sample review
                      </SampleTag>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FinalCta
        title={`Book with ${short}`}
        text="Pick a treatment and a time that suits you. Confirmation is instant."
        bookHref={`/book?dentist=${dentist.slug}`}
      />
    </>
  );
}
