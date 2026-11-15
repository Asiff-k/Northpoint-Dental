"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronUp, Info, Phone } from "lucide-react";
import {
  categoryLabels,
  clinic,
  dentistsForService,
  formatPrice,
  fromPrice,
  type Dentist,
  type ServiceCategory,
} from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useCatalogue } from "@/components/site/catalogue-provider";
import { placeholderSlotsForDay } from "@/lib/next-available";
import { clinicClock, clinicDay, relativeDayLabel } from "@/lib/time";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";

/*
 * PHASE 1 SHELL. The four steps are navigable and pre-select from the URL
 * (?service=&dentist=&type=consultation&date=&time=), but nothing is booked.
 * Times come from the placeholder in lib/next-available. Phase 3 wires this
 * to the booking engine in src/lib/booking/.
 */

const CONSULTATION = "consultation";
const ANY_DENTIST = "any";
const STEPS = ["Service", "Dentist", "Date and time", "Your details"] as const;
const FORM_ID = "booking-details";

interface Initial {
  service: string | null;
  dentist: string | null;
  date: string | null;
  time: string | null;
}

export function BookingWizard() {
  const params = useSearchParams();
  const { getDentist, getService } = useCatalogue();
  const consultation = clinic.offers.freeConsultation;

  const serviceParam = params.get("service");
  const dentistParam = params.get("dentist");
  const initial: Initial = {
    service:
      params.get("type") === CONSULTATION && consultation.enabled
        ? CONSULTATION
        : serviceParam && getService(serviceParam)
          ? serviceParam
          : null,
    dentist: dentistParam && getDentist(dentistParam) ? dentistParam : null,
    date: params.get("date"),
    time: params.get("time"),
  };

  // Remount when the query changes so a new deep link always wins.
  return <Wizard key={params.toString()} initial={initial} />;
}

function Wizard({ initial }: { initial: Initial }) {
  const consultation = clinic.offers.freeConsultation;
  const now = useNow();
  const { dentists, services, getDentist, getService } = useCatalogue();

  const eligibleDentists = useCallback(
    (slug: string | null): Dentist[] => {
      if (!slug || slug === CONSULTATION) return dentists;
      const chosen = services.find((s) => s.slug === slug);
      return chosen ? dentistsForService(chosen, dentists) : dentists;
    },
    [dentists, services],
  );

  // A preselected dentist only sticks if they offer the preselected service.
  const initialDentist =
    initial.dentist &&
    eligibleDentists(initial.service).some((d) => d.slug === initial.dentist)
      ? initial.dentist
      : null;

  const [serviceSlug, setServiceSlug] = useState<string | null>(initial.service);
  const [dentistSlug, setDentistSlug] = useState<string | null>(initialDentist);
  const [dayIso, setDayIso] = useState<string | null>(initial.date);
  const [time, setTime] = useState<string | null>(initial.time);
  const [step, setStep] = useState(() =>
    !initial.service ? 1 : !initialDentist ? 2 : 3,
  );
  const [isNewPatient, setIsNewPatient] = useState(true);
  // Kept in state so details survive a round trip to the final screen.
  const [details, setDetails] = useState({ name: "", email: "", phone: "", note: "" });
  const [consent, setConsent] = useState(false);
  const setDetail = (key: keyof typeof details) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setDetails((d) => ({ ...d, [key]: e.target.value }));
  const [submitted, setSubmitted] = useState(false);

  const isConsultation = serviceSlug === CONSULTATION;
  const service = serviceSlug && !isConsultation ? getService(serviceSlug) : undefined;
  const dentist =
    dentistSlug && dentistSlug !== ANY_DENTIST ? getDentist(dentistSlug) : undefined;
  const preferredDentist = initial.dentist ? getDentist(initial.dentist) : undefined;

  const serviceName = isConsultation ? consultation.label : service?.name;
  const durationMin = isConsultation ? consultation.durationMin : service?.durationMin;
  const priceText = isConsultation
    ? "Free"
    : service
      ? dentist
        ? formatPrice(service.prices[dentist.slug])
        : `from ${formatPrice(fromPrice(service))}`
      : null;

  const days = useMemo(() => {
    if (!now) return [];
    const clock = clinicClock(now);
    const pool =
      dentistSlug && dentistSlug !== ANY_DENTIST
        ? dentists.filter((d) => d.slug === dentistSlug)
        : eligibleDentists(serviceSlug);

    return Array.from({ length: 14 }, (_, offset) => {
      const times = new Set<string>();
      for (const d of pool) {
        for (const slot of placeholderSlotsForDay(d, now, offset)) times.add(slot.time);
      }
      return { day: clinicDay(clock, offset), times: [...times].sort() };
    });
  }, [now, dentistSlug, serviceSlug, dentists, eligibleDentists]);

  const selectedDay = days.find((d) => d.day.iso === dayIso);
  const validTime = selectedDay?.times.includes(time ?? "") ? time : null;
  const whenText =
    selectedDay && validTime
      ? `${selectedDay.day.offset < 2 ? `${relativeDayLabel(selectedDay.day)}, ` : ""}${selectedDay.day.label} at ${validTime}`
      : null;

  const canContinue =
    (step === 1 && Boolean(serviceSlug)) ||
    (step === 2 && Boolean(dentistSlug)) ||
    (step === 3 && Boolean(whenText)) ||
    step === 4;

  const chooseService = (slug: string) => {
    setServiceSlug(slug);
    // Keep the dentist only if they offer the newly chosen service.
    const keep =
      dentistSlug === ANY_DENTIST ||
      eligibleDentists(slug).some((d) => d.slug === dentistSlug);
    if (!keep) setDentistSlug(null);
    setStep(2);
  };

  const chooseDentist = (slug: string) => {
    setDentistSlug(slug);
    setDayIso(null);
    setTime(null);
    setStep(3);
  };

  const summary = (
    <div>
    <dl className="space-y-4 text-[0.9375rem]">
      <SummaryRow label="Service" value={serviceName} hint={durationMin ? `${durationMin} min` : undefined} />
      <SummaryRow
        label="Dentist"
        value={dentist ? dentist.name : dentistSlug === ANY_DENTIST ? "First available" : undefined}
        hint={dentist?.role}
      />
      <SummaryRow label="Date and time" value={whenText ?? undefined} />
      <div className="flex items-baseline justify-between border-t border-border pt-4">
        <dt className="font-semibold text-primary">Price</dt>
        <dd className="font-heading text-2xl font-bold text-primary">
          {priceText ?? <span className="text-base font-normal text-muted-foreground">Choose a service</span>}
        </dd>
      </div>
    </dl>
      {!isConsultation && service && (
        <p className="mt-3 text-xs text-muted-foreground">
          Final cost confirmed after examination.
        </p>
      )}
    </div>
  );

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-6 text-center shadow-soft sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/25 text-primary">
          <Info className="size-7" aria-hidden />
        </span>
        <h2 className="mt-5 text-2xl font-bold text-primary">
          Online booking is not connected in this demo
        </h2>
        <p className="mt-3 text-muted-foreground">
          Nothing has been booked and your details have not been sent or
          stored. This is where your confirmation and booking reference will
          appear.
        </p>
        <div className="mt-6 rounded-2xl bg-muted p-5 text-left">{summary}</div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={clinic.contact.phoneHref}>
              <Phone />
              Call {clinic.contact.phone}
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={() => setSubmitted(false)}>
            Back to details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 pb-24 md:grid-cols-[1fr_19rem] md:pb-0 lg:grid-cols-[1fr_22rem] lg:gap-12">
      <div className="min-w-0">
        {/* Progress */}
        <ol className="grid grid-cols-4 gap-2" aria-label="Booking progress">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            return (
              <li key={label}>
                <button
                  type="button"
                  disabled={!done}
                  onClick={() => setStep(n)}
                  aria-current={n === step ? "step" : undefined}
                  className="group block w-full text-left disabled:cursor-default"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-colors",
                      n <= step ? "bg-primary" : "bg-border",
                    )}
                  />
                  <span
                    className={cn(
                      "mt-2 flex items-center gap-1.5 text-xs font-semibold sm:text-sm",
                      n === step ? "text-primary" : "text-muted-foreground",
                      done && "group-hover:text-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full text-[0.6875rem]",
                        done
                          ? "bg-accent text-accent-foreground"
                          : n === step
                            ? "bg-primary text-white"
                            : "bg-muted",
                      )}
                    >
                      {done ? <Check className="size-3" strokeWidth={3} aria-hidden /> : n}
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-sm font-semibold text-primary sm:hidden">
          Step {step} of {STEPS.length}: {STEPS[step - 1]}
        </p>

        <div className="mt-8">
          {/* Step 1: service */}
          {step === 1 && (
            <section aria-labelledby="step-service">
              <StepTitle id="step-service" title="What would you like to book?" />
              {preferredDentist && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Showing treatments offered by {preferredDentist.name}.
                </p>
              )}

              {consultation.enabled && (
                <OptionButton
                  className="mt-6"
                  selected={isConsultation}
                  onClick={() => chooseService(CONSULTATION)}
                  title={consultation.label}
                  subtitle={`${consultation.durationMin} min, no obligation`}
                  right="Free"
                  highlight
                />
              )}

              {(Object.keys(categoryLabels) as ServiceCategory[]).map((category) => {
                const items = services.filter(
                  (s) =>
                    s.category === category &&
                    (!preferredDentist || preferredDentist.slug in s.prices),
                );
                if (items.length === 0) return null;
                return (
                  <div key={category} className="mt-7">
                    <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                      {categoryLabels[category]}
                    </h3>
                    <div className="mt-3 grid gap-2.5 lg:grid-cols-2">
                      {items.map((s) => (
                        <OptionButton
                          key={s.slug}
                          selected={serviceSlug === s.slug}
                          onClick={() => chooseService(s.slug)}
                          title={s.name}
                          subtitle={`${s.durationMin} min`}
                          right={`from ${formatPrice(fromPrice(s))}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* Step 2: dentist */}
          {step === 2 && (
            <section aria-labelledby="step-dentist">
              <StepTitle id="step-dentist" title="Who would you like to see?" />
              <p className="mt-2 text-sm text-muted-foreground">
                {isConsultation
                  ? "Consultations are free with any clinician."
                  : "Only clinicians who offer this treatment are shown, with their exact price."}
              </p>
              <div className="mt-6 grid gap-2.5">
                <OptionButton
                  selected={dentistSlug === ANY_DENTIST}
                  onClick={() => chooseDentist(ANY_DENTIST)}
                  title="First available"
                  subtitle="The earliest appointment with any clinician"
                  right={isConsultation ? "Free" : service ? `from ${formatPrice(fromPrice(service))}` : undefined}
                  highlight
                />
                {eligibleDentists(serviceSlug).map((d) => (
                  <OptionButton
                    key={d.slug}
                    selected={dentistSlug === d.slug}
                    onClick={() => chooseDentist(d.slug)}
                    image={d.photo}
                    title={d.name}
                    subtitle={d.role}
                    right={isConsultation ? "Free" : service ? formatPrice(service.prices[d.slug]) : undefined}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Step 3: date and time */}
          {step === 3 && (
            <section aria-labelledby="step-time">
              <StepTitle id="step-time" title="Choose a date and time" />
              <p className="mt-2 text-sm text-muted-foreground">
                All times are UK time. Days without appointments are greyed out.
              </p>

              {days.length === 0 ? (
                <div className="mt-6 h-20 animate-pulse rounded-2xl bg-muted" aria-hidden />
              ) : (
                <ul className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                  {days.map(({ day, times }) => {
                    const [weekday, , month] = day.label.split(" ");
                    const selected = day.iso === dayIso;
                    return (
                      <li key={day.iso}>
                        <button
                          type="button"
                          disabled={times.length === 0}
                          aria-pressed={selected}
                          aria-label={`${day.label}${times.length === 0 ? ", no appointments" : ""}`}
                          onClick={() => {
                            setDayIso(day.iso);
                            setTime(null);
                          }}
                          className={cn(
                            "flex h-20 w-16 flex-col items-center justify-center rounded-2xl border text-sm transition-colors",
                            selected
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-card text-primary hover:border-primary/40",
                            "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-muted disabled:text-muted-foreground/60",
                          )}
                        >
                          <span className="text-xs font-medium opacity-80">
                            {day.offset === 0 ? "Today" : weekday}
                          </span>
                          <span className="font-heading text-xl leading-tight font-bold">
                            {day.dayOfMonth}
                          </span>
                          <span className="text-[0.6875rem] opacity-80">{month}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="mt-7">
                {!selectedDay ? (
                  days.length > 0 && (
                    <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                      Pick a day to see times.
                    </p>
                  )
                ) : selectedDay.times.length === 0 ? (
                  <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                    No appointments on this day. Please choose another.
                  </p>
                ) : (
                  <>
                    <h3 className="font-semibold text-primary">
                      Times on {selectedDay.day.label}
                    </h3>
                    <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                      {selectedDay.times.map((t) => (
                        <li key={t}>
                          <button
                            type="button"
                            aria-pressed={validTime === t}
                            onClick={() => setTime(t)}
                            className={cn(
                              "h-11 w-full rounded-full border text-sm font-semibold tabular-nums transition-colors",
                              validTime === t
                                ? "border-primary bg-primary text-white"
                                : "border-border bg-card text-primary hover:border-primary/40 hover:bg-muted",
                            )}
                          >
                            {t}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <p className="mt-6 flex gap-2 text-xs text-muted-foreground">
                <Info className="mt-px size-3.5 shrink-0" aria-hidden />
                Demo: times shown are based on each clinician&apos;s usual
                working hours, not live availability.
              </p>
            </section>
          )}

          {/* Step 4: details */}
          {step === 4 && (
            <section aria-labelledby="step-details">
              <StepTitle id="step-details" title="Your details" />
              <form
                id={FORM_ID}
                className="mt-6 grid gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  window.scrollTo({ top: 0 });
                }}
              >
                <div className="grid gap-2">
                  <Label htmlFor="bk-name">Full name</Label>
                  <Input id="bk-name" name="name" autoComplete="name" required value={details.name} onChange={setDetail("name")} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="bk-email">Email</Label>
                    <Input id="bk-email" name="email" type="email" autoComplete="email" required value={details.email} onChange={setDetail("email")} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bk-phone">Mobile number</Label>
                    <Input id="bk-phone" name="phone" type="tel" autoComplete="tel" required value={details.phone} onChange={setDetail("phone")} />
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-medium">Have you visited us before?</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2.5">
                    {[
                      { value: true, label: "I am a new patient" },
                      { value: false, label: "I am an existing patient" },
                    ].map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        aria-pressed={isNewPatient === option.value}
                        onClick={() => setIsNewPatient(option.value)}
                        className={cn(
                          "min-h-12 rounded-2xl border px-3 py-2 text-sm font-semibold transition-colors",
                          isNewPatient === option.value
                            ? "border-primary bg-primary text-white"
                            : "border-border bg-card text-primary hover:border-primary/40",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-2">
                  <Label htmlFor="bk-note">
                    Anything we should know?{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea id="bk-note" name="note" rows={3} value={details.note} onChange={setDetail("note")} />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="bk-consent"
                    name="consent"
                    required
                    checked={consent}
                    onCheckedChange={(value) => setConsent(value === true)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="bk-consent" className="block text-sm leading-relaxed font-normal text-muted-foreground">
                    I agree to {clinic.name} using these details to manage my
                    appointment, as described in the{" "}
                    <a href="/privacy" className="font-medium text-primary underline underline-offset-2">
                      privacy notice
                    </a>
                    .
                  </Label>
                </div>
              </form>
            </section>
          )}
        </div>

        {/* Desktop navigation */}
        <div className="mt-10 hidden items-center justify-between border-t border-border pt-6 md:flex">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft />
              Back
            </Button>
          ) : (
            <span />
          )}
          <ContinueButton step={step} disabled={!canContinue} onNext={() => setStep(step + 1)} size="lg" />
        </div>
      </div>

      {/* Desktop summary */}
      <aside className="hidden md:block" aria-label="Booking summary">
        <div className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-bold text-primary">Your booking</h2>
          <div className="mt-5">{summary}</div>
        </div>
      </aside>

      {/* Mobile summary bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(15_61_62/0.08)] backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          {step > 1 && (
            <Button
              variant="outline"
              size="icon"
              aria-label="Back"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft className="size-5" />
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-xl px-1 text-left"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs text-muted-foreground">
                    {serviceName ?? "Your booking"}
                  </span>
                  <span className="block truncate text-sm font-bold text-primary">
                    {priceText ?? "Summary"}
                  </span>
                </span>
                <ChevronUp className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader className="pb-0">
                <SheetTitle className="text-lg font-bold text-primary">Your booking</SheetTitle>
                <SheetDescription>Step {step} of {STEPS.length}</SheetDescription>
              </SheetHeader>
              <div className="px-4 pb-8">{summary}</div>
            </SheetContent>
          </Sheet>
          <ContinueButton step={step} disabled={!canContinue} onNext={() => setStep(step + 1)} />
        </div>
      </div>
    </div>
  );
}

function ContinueButton({
  step,
  disabled,
  onNext,
  size,
}: {
  step: number;
  disabled: boolean;
  onNext: () => void;
  size?: "default" | "lg";
}) {
  if (step === STEPS.length) {
    return (
      <Button type="submit" form={FORM_ID} size={size}>
        Confirm booking
      </Button>
    );
  }
  return (
    <Button type="button" disabled={disabled} onClick={onNext} size={size}>
      Continue
      <ArrowRight />
    </Button>
  );
}

function StepTitle({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-primary md:text-[1.75rem]">
      {title}
    </h2>
  );
}

function SummaryRow({
  label,
  value,
  hint,
}: {
  label: string;
  value?: string;
  hint?: string;
}) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className={cn("mt-0.5", value ? "font-semibold text-primary" : "text-muted-foreground")}>
        {value ?? "Not chosen yet"}
        {value && hint && (
          <span className="block text-sm font-normal text-muted-foreground">{hint}</span>
        )}
      </dd>
    </div>
  );
}

function OptionButton({
  title,
  subtitle,
  right,
  image,
  selected,
  highlight,
  onClick,
  className,
}: {
  title: string;
  subtitle?: string;
  right?: string;
  image?: string;
  selected: boolean;
  highlight?: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-16 w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors",
        selected
          ? "border-primary bg-primary/5 ring-2 ring-primary"
          : highlight
            ? "border-accent bg-accent/10 hover:border-primary/50"
            : "border-border bg-card hover:border-primary/40",
        className,
      )}
    >
      {image && (
        <Image
          src={image}
          alt=""
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-full object-cover object-top"
        />
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-primary">{title}</span>
        {subtitle && <span className="block text-sm text-muted-foreground">{subtitle}</span>}
      </span>
      {right && (
        <span className="shrink-0 text-sm font-bold whitespace-nowrap text-primary">{right}</span>
      )}
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full border",
          selected ? "border-primary bg-primary text-white" : "border-border",
        )}
        aria-hidden
      >
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
    </button>
  );
}
