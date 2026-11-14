import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Container } from "@/components/ui/section";
import { OpenNowBadge } from "@/components/site/open-now-badge";
import { HoursTable } from "@/components/site/hours-table";
import { ContactForm } from "@/components/sections/contact-form";
import { FinalCta } from "@/components/sections/final-cta";
import {
  DirectionsButton,
  GettingHere,
  MapEmbed,
} from "@/components/sections/location";
import { PageHero } from "@/components/sections/page-hero";

export function generateMetadata(): Metadata {
  const { address, contact } = clinic;
  return {
    title: "Contact and location",
    description: `Find ${clinic.name} at ${address.line1}, ${address.city} ${address.postcode}. Call ${contact.phone}, message us on WhatsApp or send an enquiry. Opening hours and directions.`,
  };
}

export default function ContactPage() {
  const { address, contact } = clinic;

  const methods = [
    { icon: Phone, label: "Call us", value: contact.phone, href: contact.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Message the team", href: contact.whatsapp, external: true },
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro={`Find us at ${address.line1}, ${address.city}. Call, message or send us a note and we will get back to you.`}
        crumbs={[{ label: "Contact" }]}
      >
        <p className="mt-5 inline-flex rounded-full bg-primary px-3.5 py-2 text-sm text-white">
          <OpenNowBadge />
        </p>
      </PageHero>

      <Container className="pb-14 md:pb-20">
        <ul className="grid gap-4 sm:grid-cols-3">
          {methods.map((m) => (
            <li key={m.label} className="min-w-0">
              <a
                href={m.href}
                {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-lift"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent/20 text-primary">
                  <m.icon className="size-5" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted-foreground">{m.label}</span>
                  <span className="block font-semibold wrap-anywhere text-primary">{m.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <section aria-labelledby="enquiry-heading" className="self-start rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 id="enquiry-heading" className="text-2xl font-bold text-primary">
              Send us a message
            </h2>
            <p className="mt-2 mb-6 text-[0.9375rem] text-muted-foreground">
              For anything urgent, please call. Do not include medical details
              in this form.
            </p>
            <ContactForm />
          </section>

          <div className="space-y-8">
            <MapEmbed />

            <section aria-labelledby="address-heading">
              <h2 id="address-heading" className="text-sm font-semibold tracking-wide text-primary uppercase">
                Address
              </h2>
              <address className="mt-3 flex gap-3 text-lg font-semibold text-primary not-italic">
                <MapPin className="mt-1 size-5 shrink-0" aria-hidden />
                <span>
                  {clinic.name}
                  <br />
                  {address.line1}
                  <br />
                  {address.city} {address.postcode}
                </span>
              </address>
              <DirectionsButton variant="outline" className="mt-4" />
            </section>

            <section aria-labelledby="hours-heading">
              <h2 id="hours-heading" className="text-sm font-semibold tracking-wide text-primary uppercase">
                Opening hours
              </h2>
              <HoursTable className="mt-2 max-w-sm -translate-x-3" />
            </section>

            <section aria-labelledby="getting-here-heading">
              <h2 id="getting-here-heading" className="text-sm font-semibold tracking-wide text-primary uppercase">
                Getting here
              </h2>
              <GettingHere className="mt-3" />
            </section>
          </div>
        </div>
      </Container>

      <FinalCta />
    </>
  );
}
