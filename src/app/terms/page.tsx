import type { Metadata } from "next";
import { clinic, formatPrice } from "@/config/clinic.config";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";

export function generateMetadata(): Metadata {
  return {
    title: "Terms and cancellation policy",
    description: `Booking terms for ${clinic.name}: how online booking works, prices, and how to change or cancel an appointment.`,
  };
}

export default function TermsPage() {
  const { booking, finance, contact, emergency } = clinic;

  const sections: LegalSection[] = [
    {
      heading: "Booking online",
      body: [
        "When you book through this website you are reserving an appointment with the clinician and at the time shown on your confirmation. Your booking is confirmed when you receive a confirmation email with a booking reference.",
        `Appointments can be booked up to ${booking.windowDays} days ahead and no later than ${booking.minNoticeHours} hours before the start time.`,
      ],
    },
    {
      heading: "Changing or cancelling",
      body: [
        `You can move or cancel your appointment free of charge up to ${booking.cancelNoticeHours} hours before it starts, using the link in your confirmation email or by calling ${contact.phone}.`,
        `If you need to cancel with less than ${booking.cancelNoticeHours} hours' notice, please call us as soon as you can so we can offer the time to another patient.`,
      ],
    },
    {
      heading: "Prices",
      body: [
        "Prices on this website are shown per clinician and are a guide. Your final cost is confirmed in writing after your examination and before any treatment starts.",
        "The price shown at the time you book is recorded with your booking.",
      ],
    },
    ...(finance.enabled
      ? [
          {
            heading: "Finance",
            body: [
              `Finance at ${finance.aprPercent}% APR may be available on treatment plans of ${formatPrice(finance.minSpendPence)} or more, over ${finance.terms.join(", ")} months. ${finance.disclaimer}`,
            ],
          },
        ]
      : []),
    {
      heading: "Emergencies",
      body: [
        `We aim to see dental emergencies on the same day during opening hours. Out of hours: ${emergency.outOfHours}`,
      ],
    },
    {
      heading: "The virtual assistant",
      body: [
        "Ava, our virtual assistant, can help with prices, availability and booking. Ava does not give clinical advice or diagnosis. For anything about your health, please speak to a member of the dental team.",
      ],
    },
    {
      heading: "Complaints",
      body: [
        `If something has not gone as you expected, please tell us at ${contact.email} so we can put it right. Our complaints procedure is available on request.`,
      ],
    },
  ];

  return (
    <LegalPage
      title="Terms and cancellation policy"
      intro="The plain-English version of how booking with us works."
      crumb="Terms"
      sections={sections}
    />
  );
}
