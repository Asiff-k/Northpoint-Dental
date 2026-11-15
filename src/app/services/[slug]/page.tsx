import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Check, Clock } from "lucide-react";
import {
  categoryLabels,
  clinic,
  formatPrice,
  fromPrice,
  type Service,
} from "@/config/clinic.config";
import { serviceContent } from "@/config/service-content";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Container, SectionHeading } from "@/components/ui/section";
import { AskAvaButton } from "@/components/chat/ask-ava-button";
import { FaqAccordion, faqJsonLd } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { DetailSkeleton } from "@/components/sections/page-skeleton";
import { PriceByDentist } from "@/components/sections/price-by-dentist";
import { FinanceLine } from "@/components/sections/price-text";
import { RegulatorBadges } from "@/components/sections/regulator-badges";
import { ServiceCard } from "@/components/sections/service-card";
import { getService, getServices } from "@/lib/data";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: `${service.name}, from ${formatPrice(fromPrice(service))}`,
    description: `${service.summary} ${service.durationMin} minutes, from ${formatPrice(fromPrice(service))} at ${clinic.name}, ${clinic.address.city}. Compare each dentist's price and book online.`,
  };
}

// `params` is read inside Suspense so the route's shared shell stays URL
// independent. Slugs from generateStaticParams are still fully prerendered.
export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({
  params,
}: Pick<PageProps<"/services/[slug]">, "params">) {
  const { slug } = await params;
  const [service, services] = await Promise.all([getService(slug), getServices()]);
  const content = serviceContent[slug];
  if (!service || !content) notFound();

  const from = fromPrice(service);
  const related = content.related
    .map((related) => services.find((s) => s.slug === related))
    .filter((s): s is Service => Boolean(s));

  return (
    <>
      <JsonLd data={faqJsonLd(content.faqs)} />

      {/* Hero */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16">
        <Container>
          <Breadcrumbs
            items={[{ label: "Services", href: "/services" }, { label: service.name }]}
          />
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-14">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1.5 text-sm font-semibold text-primary">
                <Icon name={service.icon} className="size-4" />
                {categoryLabels[service.category]}
              </p>
              <h1 className="mt-4 text-4xl leading-[1.1] font-bold text-balance text-primary md:text-[3.5rem]">
                {service.name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">
                {content.benefit}
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-heading text-4xl font-bold text-primary">
                    {formatPrice(from)}
                  </p>
                </div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-primary">
                  <Clock className="size-4" aria-hidden />
                  {service.durationMin} min
                </p>
              </div>
              <FinanceLine service={service} pence={from} className="mt-2 block text-sm" />
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Button asChild size="lg">
                  <Link href={`/book?service=${service.slug}`}>Book this treatment</Link>
                </Button>
                <AskAvaButton
                  variant="outline"
                  size="lg"
                  prefill={`I have a question about ${service.name.toLowerCase()}`}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What it is, who it is for */}
      <section className="bg-card py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-[1.75rem]">What it is</h2>
            <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
              {content.whatItIs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-[1.75rem]">Who it is for</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem]">
              {content.whoItIsFor.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* What happens */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Your visit" title="What happens" />
          <ol
            className={cn(
              "mt-10 grid gap-5 sm:grid-cols-2",
              content.steps.length === 3 && "lg:grid-cols-3",
              content.steps.length === 4 && "lg:grid-cols-4",
              content.steps.length >= 5 && "lg:grid-cols-3 xl:grid-cols-5",
            )}
          >
            {content.steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-primary font-heading font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-primary">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-3xl bg-warm p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary">Aftercare</h2>
            <ul className="mt-4 grid gap-3 text-[0.9375rem] text-primary/90 md:grid-cols-3 md:gap-6">
              {content.aftercare.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Price by dentist */}
      <section id="prices" className="bg-card py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Prices"
              title="Choose your clinician"
              intro="Fees reflect each clinician's experience and training. Pick the one that suits you."
            />
            <RegulatorBadges className="shrink-0" />
          </div>
          <div className="mt-8">
            <PriceByDentist service={service} />
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-14 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <FaqAccordion items={content.faqs} />
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-card py-14 md:py-20">
          <Container>
            <SectionHeading title="Related treatments" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <ServiceCard service={s} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FinalCta
        title={`Ready to book your ${service.category === "emergency" ? "emergency appointment" : "visit"}?`}
        bookHref={`/book?service=${service.slug}`}
      />
    </>
  );
}
