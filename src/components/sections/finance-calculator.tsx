"use client";

import { useId, useState } from "react";
import { clinic, formatPrice, monthlyFinance } from "@/config/clinic.config";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const MAX_PENCE = 500_000;
const STEP_PENCE = 5_000;

/** 0% finance illustration: amount slider and a 6 / 12 / 24 month term. */
export function FinanceCalculator() {
  const { finance } = clinic;
  const [amount, setAmount] = useState(240_000);
  const [months, setMonths] = useState<number>(finance.terms[finance.terms.length - 1]);
  const amountId = useId();

  const monthly = monthlyFinance(amount, months);

  return (
    <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label id={amountId} className="font-semibold text-primary">
            Treatment cost
          </label>
          <output className="font-heading text-2xl font-bold text-primary tabular-nums">
            {formatPrice(amount)}
          </output>
        </div>
        <Slider
          aria-labelledby={amountId}
          className="mt-5 py-2"
          min={finance.minSpendPence}
          max={MAX_PENCE}
          step={STEP_PENCE}
          value={[amount]}
          onValueChange={([value]) => setAmount(value)}
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(finance.minSpendPence)}</span>
          <span>{formatPrice(MAX_PENCE)}</span>
        </div>

        <fieldset className="mt-7">
          <legend className="font-semibold text-primary">Spread over</legend>
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {finance.terms.map((term) => (
              <button
                key={term}
                type="button"
                aria-pressed={months === term}
                onClick={() => setMonths(term)}
                className={cn(
                  "h-12 rounded-full border text-sm font-semibold transition-colors",
                  months === term
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-card text-primary hover:border-primary/40 hover:bg-muted",
                )}
              >
                {term} months
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-primary p-6 text-white">
        <p className="text-sm text-white/70">Your monthly payment</p>
        <p className="mt-1 font-heading text-5xl font-bold tabular-nums" aria-live="polite">
          {formatPrice(monthly)}
        </p>
        <dl className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-white/70">Term</dt>
            <dd className="font-semibold">{months} months</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/70">Interest</dt>
            <dd className="font-semibold">{finance.aprPercent}% APR</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/70">Total repayable</dt>
            <dd className="font-semibold tabular-nums">{formatPrice(amount)}</dd>
          </div>
        </dl>
      </div>

      <p className="text-xs text-muted-foreground lg:col-span-2">
        Illustration only. {finance.disclaimer}
      </p>
    </div>
  );
}
