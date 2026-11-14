import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, Lock, ReceiptPoundSterling } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export function generateMetadata(): Metadata {
  return {
    title: "Clinic dashboard",
    description: `Staff area for ${clinic.name}.`,
    robots: { index: false, follow: false },
  };
}

const planned = [
  { icon: CalendarDays, title: "Bookings", text: "Today and upcoming, filtered by dentist." },
  { icon: Clock, title: "Availability", text: "Working hours and time off." },
  { icon: ReceiptPoundSterling, title: "Prices", text: "Fees for every dentist and service." },
];

/** PHASE 1 PLACEHOLDER. Phase 6 adds Supabase Auth and the real dashboard. */
export default function AdminPage() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <div className="rounded-3xl border border-border bg-card p-6 text-center shadow-soft sm:p-10">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/25 text-primary">
            <Lock className="size-7" aria-hidden />
          </span>
          <h1 className="mt-5 text-[1.75rem] leading-tight font-bold text-primary md:text-[2.5rem]">
            Clinic dashboard
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            The staff area is not available in this demo yet. Sign-in and the
            tools below are on the way.
          </p>

          <ul className="mt-8 grid gap-4 text-left sm:grid-cols-3">
            {planned.map((item) => (
              <li key={item.title} className="rounded-2xl bg-muted p-4">
                <item.icon className="size-5 text-primary" strokeWidth={1.5} aria-hidden />
                <h2 className="mt-3 font-semibold text-primary">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </li>
            ))}
          </ul>

          <Button asChild variant="outline" className="mt-8">
            <Link href="/">Back to the website</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
