import type { Metadata } from "next";
import { clinic } from "@/config/clinic.config";
import { LegalPage, type LegalSection } from "@/components/sections/legal-page";

export function generateMetadata(): Metadata {
  return {
    title: "Privacy notice",
    description: `How ${clinic.name} collects, uses and protects your personal information under UK GDPR.`,
  };
}

export default function PrivacyPage() {
  const { contact, address } = clinic;

  const sections: LegalSection[] = [
    {
      heading: "Who we are",
      body: [
        `${clinic.name}, ${address.line1}, ${address.city} ${address.postcode}, is the data controller for the personal information described in this notice. You can contact us at ${contact.email} or on ${contact.phone}.`,
      ],
    },
    {
      heading: "What we collect",
      body: [
        "When you book or enquire online we collect only what we need to arrange your visit:",
        ["Your name", "Your email address", "Your phone number", "The appointment you request and any note you choose to add"],
        "Clinical records are created at the practice and kept separately from this website.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        ["To confirm, change or cancel your appointment", "To send you a reminder before your visit", "To reply to an enquiry you have sent us"],
        "Our lawful bases under UK GDPR are taking steps to enter into a contract with you, and our legitimate interest in running the practice. Health information is processed for the provision of health care.",
      ],
    },
    {
      heading: "Who we share it with",
      body: [
        "We use carefully chosen service providers to host this website, store bookings and send emails. They act only on our instructions. We never sell your information.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Booking details are kept for as long as you are a patient and for the period required by dental record-keeping guidance. Enquiries that do not lead to a booking are deleted after 12 months.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You have the right to ask for a copy of your information, to have it corrected or deleted, to object to or restrict how we use it, and to data portability.",
        `To use any of these rights, email ${contact.email}. If you are unhappy with our response you can complain to the Information Commissioner's Office at ico.org.uk.`,
      ],
    },
    {
      heading: "Cookies, fonts and maps",
      body: [
        "This website does not use advertising or tracking cookies. Fonts are served from our own website, not from a third party.",
        "Our location map is provided by Google Maps. When the map loads, Google may collect information as described in its own privacy policy.",
      ],
    },
  ];

  return (
    <LegalPage
      title="Privacy notice"
      intro="What we collect when you book or get in touch, why, and the choices you have."
      crumb="Privacy"
      sections={sections}
    />
  );
}
