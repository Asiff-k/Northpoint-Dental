import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CalendarClock, Phone } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export function generateMetadata(): Metadata {
  return {
    title: "Manage your booking",
    description: "View, change or cancel your appointment.",
    robots: { index: false, follow: false },
  };
}

async function TokenReference({ params }: Pick<PageProps<"/booking/[token]">, "params">) {
  const { token } = await params;
  return <span className="font-mono text-foreground">{token.slice(0, 24)}</span>;
}

/**
 * PHASE 1 PLACEHOLDER. Phase 3 looks the booking up by its manage token.
 * The token is runtime data, so it is read inside Suspense.
 */
export default function ManageBookingPage({ params }: PageProps<"/booking/[token]">) {
  const { cancelNoticeHours } = clinic.booking;

  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-2xl">
        <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft sm:p-10">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/25 text-primary">
            <CalendarClock className="size-7" aria-hidden />
          </span>
          <h1 className="mt-5 text-[1.75rem] leading-tight font-bold text-primary md:text-[2.5rem]">
            Manage your booking
          </h1>
          <p className="mt-4 text-muted-foreground">
            This is where you will view, move or cancel your appointment, free
            of charge up to {cancelNoticeHours} hours before. Booking
            management is not connected in this demo.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Link reference:{" "}
            <Suspense fallback={<span>loading</span>}>
              <TokenReference params={params} />
            </Suspense>
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={clinic.contact.phoneHref}>
                <Phone />
                Call {clinic.contact.phone}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book">Book a new appointment</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
