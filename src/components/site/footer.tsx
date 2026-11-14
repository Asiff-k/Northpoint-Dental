import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { clinic, nav } from "@/config/clinic.config";
import { Container } from "@/components/ui/section";
import { HoursTable } from "@/components/site/hours-table";
import { Logo } from "@/components/site/logo";

const legalLinks = [
  { label: "Privacy notice", href: "/privacy" },
  { label: "Terms and cancellations", href: "/terms" },
];

export function Footer() {
  const { address, contact } = clinic;

  return (
    <footer className="bg-primary pb-[4.5rem] text-white/75 md:pb-0">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_0.8fr_0.9fr] lg:gap-12">
        <div>
          <Logo tone="dark" />
          <p className="mt-4 max-w-xs text-sm">{clinic.tagline}.</p>
          <address className="mt-6 space-y-3 text-sm not-italic">
            <p className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>
                {address.line1}
                <br />
                {address.city} {address.postcode}
              </span>
            </p>
            <p>
              <a
                href={contact.phoneHref}
                className="inline-flex min-h-6 items-center gap-2.5 text-white hover:text-accent"
              >
                <Phone className="size-4 shrink-0 text-accent" aria-hidden />
                {contact.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-6 items-center gap-2.5 break-all text-white hover:text-accent"
              >
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                {contact.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
            Opening hours
          </h2>
          <HoursTable tone="dark" className="mt-4 max-w-xs -translate-x-3" />
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-8 items-center hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="inline-flex min-h-8 items-center hover:text-accent">
                Book online
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
            Information
          </h2>
          <ul className="mt-4 space-y-1 text-sm">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-8 items-center hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#emergency" className="inline-flex min-h-8 items-center hover:text-accent">
                Dental emergency
              </Link>
            </li>
            {Object.entries(clinic.socials).map(([name, href]) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-8 items-center capitalize hover:text-accent"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-white/80">
              Registered with the GDC. Regulated by the CQC.
            </p>
            {clinic.isDemo && (
              <p>
                Demonstration website. The clinic, team, prices, reviews and
                registration numbers shown are fictional samples.
              </p>
            )}
          </div>
          <p className="shrink-0">
            <a
              href="https://incodet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-accent hover:underline"
            >
              Website by Incodet
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
