import type { Metadata } from "next";
import Link from "next/link";
import { nav } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-2xl text-center">
        <p className="font-heading text-7xl font-bold text-accent">404</p>
        <h1 className="mt-4 text-[1.75rem] leading-tight font-bold text-primary md:text-[2.5rem]">
          We could not find that page
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          It may have moved, or the link may be out of date. These should help.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/book">Book an appointment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Go to the homepage</Link>
          </Button>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center font-medium text-primary underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
