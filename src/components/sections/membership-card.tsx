import Link from "next/link";
import { Check } from "lucide-react";
import { clinic, formatPrice } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MembershipCard({ className }: { className?: string }) {
  const plan = clinic.membership;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl bg-primary p-6 text-white shadow-lift sm:p-8",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-accent/15 blur-2xl"
      />
      <p className="relative text-sm font-semibold tracking-[0.14em] text-accent uppercase">
        Membership
      </p>
      <h3 className="relative mt-2 text-2xl font-bold">{plan.name}</h3>
      <p className="relative mt-4 flex items-baseline gap-1.5">
        <span className="font-heading text-5xl font-bold">
          {formatPrice(plan.monthlyPence)}
        </span>
        <span className="text-white/70">per month</span>
      </p>
      <ul className="relative mt-6 flex-1 space-y-3 text-[0.9375rem]">
        {plan.includes.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Check className="size-3.5" strokeWidth={3} aria-hidden />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <Button asChild variant="accent" size="lg" className="relative mt-8 w-full">
        <Link href="/contact">Ask about joining</Link>
      </Button>
    </div>
  );
}
