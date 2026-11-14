"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { hero, intents } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AskAvaButton } from "@/components/chat/ask-ava-button";

/** Hero "I would like to..." selector. Routes to booking or opens Ava. */
export function IntentSelector() {
  const [serviceSlug, setServiceSlug] = useState<string>("");
  const labelId = useId();
  const intent = intents.find((i) => i.serviceSlug === serviceSlug);

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-soft sm:p-5">
      <p id={labelId} className="mb-2 px-1 text-sm font-semibold text-primary">
        {hero.intentLabel}
      </p>
      <Select value={serviceSlug} onValueChange={setServiceSlug}>
        <SelectTrigger
          aria-labelledby={labelId}
          className="w-full rounded-2xl bg-muted/60 px-4 text-base font-medium data-[size=default]:h-14"
        >
          <SelectValue placeholder="Choose what you need" />
        </SelectTrigger>
        <SelectContent position="popper" className="rounded-2xl p-1">
          {intents.map((i) => (
            <SelectItem
              key={i.serviceSlug}
              value={i.serviceSlug}
              className="min-h-11 rounded-xl px-3 text-base"
            >
              {i.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-[1fr_auto]">
        <Button asChild size="lg">
          <Link href={intent ? `/book?service=${intent.serviceSlug}` : "/book"}>
            {hero.primaryCta}
            <ArrowRight />
          </Link>
        </Button>
        <AskAvaButton
          variant="outline"
          size="lg"
          prefill={intent ? `I would like to ${intent.label.toLowerCase()}` : undefined}
        >
          {hero.secondaryCta}
        </AskAvaButton>
      </div>
    </div>
  );
}
