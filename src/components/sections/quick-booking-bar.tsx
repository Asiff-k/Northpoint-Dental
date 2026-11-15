"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { dentistsForService } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/ui/section";
import { useCatalogue } from "@/components/site/catalogue-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clinicClock, clinicDay, relativeDayLabel } from "@/lib/time";
import { useNow } from "@/lib/use-now";

const ANY = "any";
const triggerClass =
  "w-full rounded-xl bg-card px-3.5 text-[0.9375rem] data-[size=default]:h-12";
const itemClass = "min-h-10 rounded-lg px-3";

/** Service, dentist and date pickers that hand off to the booking wizard. */
export function QuickBookingBar() {
  const [service, setService] = useState(ANY);
  const [dentist, setDentist] = useState(ANY);
  const [date, setDate] = useState(ANY);
  const now = useNow();
  const { dentists, services, getService } = useCatalogue();

  const selectedService = service === ANY ? undefined : getService(service);
  const dentistOptions = selectedService ? dentistsForService(selectedService, dentists) : dentists;
  // Fall back to "First available" if the chosen dentist does not offer the service.
  const activeDentist = dentistOptions.some((d) => d.slug === dentist) ? dentist : ANY;

  const days = useMemo(() => {
    if (!now) return [];
    const clock = clinicClock(now);
    return Array.from({ length: 14 }, (_, i) => clinicDay(clock, i));
  }, [now]);

  const params = new URLSearchParams();
  if (service !== ANY) params.set("service", service);
  if (activeDentist !== ANY) params.set("dentist", activeDentist);
  if (date !== ANY) params.set("date", date);
  const query = params.toString();

  return (
    <section aria-label="Quick booking" className="pb-4 md:pb-8">
      <Container>
        <div className="grid gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft sm:grid-cols-2 sm:p-5 lg:grid-cols-[1.3fr_1.1fr_1fr_auto] lg:items-end">
          <div className="grid gap-1.5">
            <Label htmlFor="qb-service">Service</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger id="qb-service" className={triggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-80 rounded-xl p-1">
                <SelectItem value={ANY} className={itemClass}>
                  Any service
                </SelectItem>
                {services.map((s) => (
                  <SelectItem key={s.slug} value={s.slug} className={itemClass}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="qb-dentist">Dentist</Label>
            <Select value={activeDentist} onValueChange={setDentist}>
              <SelectTrigger id="qb-dentist" className={triggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="rounded-xl p-1">
                <SelectItem value={ANY} className={itemClass}>
                  First available
                </SelectItem>
                {dentistOptions.map((d) => (
                  <SelectItem key={d.slug} value={d.slug} className={itemClass}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="qb-date">Date</Label>
            <Select value={date} onValueChange={setDate}>
              <SelectTrigger id="qb-date" className={triggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-80 rounded-xl p-1">
                <SelectItem value={ANY} className={itemClass}>
                  Earliest date
                </SelectItem>
                {days.map((d) => (
                  <SelectItem key={d.iso} value={d.iso} className={itemClass}>
                    {d.offset < 2 ? `${relativeDayLabel(d)}, ${d.label}` : d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button asChild size="lg" className="h-12 sm:self-end">
            <Link href={query ? `/book?${query}` : "/book"}>
              <Search />
              See times
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
