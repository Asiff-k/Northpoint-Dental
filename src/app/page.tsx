import type { Metadata } from "next";
import { clinic } from "@/config/clinic.config";
import { BeforeAfter } from "@/components/sections/before-after";
import { DentistsGrid } from "@/components/sections/dentists-grid";
import { Emergency } from "@/components/sections/emergency";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowBookingWorks } from "@/components/sections/how-booking-works";
import { Location } from "@/components/sections/location";
import { OfferStrip } from "@/components/sections/offer-strip";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { QuickBookingBar } from "@/components/sections/quick-booking-bar";
import { Reviews } from "@/components/sections/reviews";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export function generateMetadata(): Metadata {
  return {
    title: { absolute: `${clinic.name} | Private dentist in ${clinic.address.city}` },
    description: `${clinic.tagline}. Choose your dentist, see every price upfront and book online in under a minute.`,
  };
}

// Order follows docs/blueprint.md section 2. Top bar, header and footer live in the root layout.
export default function Home() {
  return (
    <>
      <OfferStrip />
      <Hero />
      <QuickBookingBar />
      <ServicesGrid />
      <DentistsGrid />
      <WhyChooseUs />
      <HowBookingWorks />
      <PricingPreview />
      <Reviews />
      <BeforeAfter />
      <Emergency />
      <Faq />
      <Location />
      <FinalCta />
    </>
  );
}
