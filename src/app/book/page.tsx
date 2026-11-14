import type { Metadata } from "next";
import { Suspense } from "react";
import { clinic } from "@/config/clinic.config";
import { Container } from "@/components/ui/section";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Breadcrumbs } from "@/components/sections/page-hero";

export function generateMetadata(): Metadata {
  return {
    title: "Book an appointment online",
    description: `Book with ${clinic.name} in ${clinic.address.city}. Choose a treatment, pick your dentist and see the exact price before you confirm.`,
  };
}

function WizardFallback() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_19rem] lg:grid-cols-[1fr_22rem] lg:gap-12" aria-hidden>
      <div className="space-y-4">
        <div className="h-10 animate-pulse rounded-full bg-muted" />
        <div className="h-8 w-2/3 animate-pulse rounded-full bg-muted" />
        <div className="h-16 animate-pulse rounded-2xl bg-muted" />
        <div className="h-16 animate-pulse rounded-2xl bg-muted" />
        <div className="h-16 animate-pulse rounded-2xl bg-muted" />
      </div>
      <div className="hidden h-72 animate-pulse rounded-3xl bg-muted md:block" />
    </div>
  );
}

export default function BookPage() {
  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24">
      <Container>
        <Breadcrumbs items={[{ label: "Book online" }]} />
        <h1 className="text-4xl leading-[1.1] font-bold text-primary md:text-[3.5rem]">
          Book an appointment
        </h1>
        <p className="mt-4 mb-10 max-w-2xl text-lg text-muted-foreground">
          Four quick steps. You will see the exact price before you confirm.
        </p>

        {/* The wizard reads ?service=&dentist=&type=consultation from the URL. */}
        <Suspense fallback={<WizardFallback />}>
          <BookingWizard />
        </Suspense>
      </Container>
    </section>
  );
}
