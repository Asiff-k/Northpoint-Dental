"use client";

import Link from "next/link";
import { useState } from "react";
import { Info, Send } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Contact form. Browser validation only in Phase 1: on submit it shows a
 * notice and sends nothing. Phase 4 connects it to email.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="cf-name">Full name</Label>
        <Input id="cf-name" name="name" autoComplete="name" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="cf-email">Email</Label>
          <Input id="cf-email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cf-phone">Phone</Label>
          <Input id="cf-phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="cf-message">How can we help?</Label>
        <Textarea id="cf-message" name="message" rows={5} required minLength={10} />
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="cf-consent" name="consent" required className="mt-0.5" />
        <Label
          htmlFor="cf-consent"
          className="block text-sm leading-relaxed font-normal text-muted-foreground"
        >
          I agree to {clinic.name} using these details to reply to my enquiry,
          as described in the{" "}
          <Link href="/privacy" className="font-medium text-primary underline underline-offset-2">
            privacy notice
          </Link>
          .
        </Label>
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-fit">
        <Send />
        Send message
      </Button>

      <div aria-live="polite">
        {submitted && (
          <p className="flex gap-3 rounded-2xl border border-accent bg-accent/15 p-4 text-sm text-primary">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              <span className="font-semibold">
                Messaging is not connected in this demo.
              </span>{" "}
              Nothing was sent or stored. Please call {clinic.contact.phone} or
              email {clinic.contact.email} instead.
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
