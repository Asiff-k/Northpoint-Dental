"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { clinic, formatPrice } from "@/config/clinic.config";
import { Container } from "@/components/ui/section";

/** Dismissible new patient offer strip under the header. */
export function OfferStrip() {
  const [dismissed, setDismissed] = useState(false);
  const offer = clinic.offers.newPatient;

  if (!offer.enabled || dismissed) return null;

  return (
    <aside aria-label="New patient offer" className="bg-warm text-primary">
      <Container className="relative flex min-h-12 items-center justify-center py-2 pr-12 text-sm sm:pr-14">
        <p className="text-center text-balance">
          <span className="font-semibold">{offer.label}</span>{" "}
          <s className="text-primary/60">{formatPrice(offer.wasPence)}</s>{" "}
          <span className="font-bold">{formatPrice(offer.nowPence)}</span> when
          you book online.{" "}
          <Link
            href="/book?service=new-patient-exam"
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:no-underline"
          >
            Book now
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss offer"
          className="absolute top-1/2 right-2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full hover:bg-primary/10 sm:right-3"
        >
          <X className="size-4" />
        </button>
      </Container>
    </aside>
  );
}
