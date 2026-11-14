import { faqs as allFaqs, type Faq as FaqItem } from "@/config/clinic.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { Section, SectionHeading } from "@/components/ui/section";
import { AskAvaButton } from "@/components/chat/ask-ava-button";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="gap-3">
      {items.map((faq, i) => (
        <AccordionItem
          key={faq.q}
          value={`faq-${i}`}
          className="rounded-2xl border border-border bg-card px-5 not-last:border-b"
        >
          <AccordionTrigger className="min-h-14 items-center gap-4 rounded-none py-4 text-base font-semibold text-primary hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export const faqJsonLd = (items: readonly FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

/** FAQ accordion with FAQPage structured data. */
export function Faq({
  items = allFaqs,
  className,
}: {
  items?: readonly FaqItem[];
  className?: string;
}) {
  return (
    <Section id="faq" className={cn(className)}>
      <JsonLd data={faqJsonLd(items)} />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            intro="Cannot find what you need? Ava can help, or call the team."
          />
          <AskAvaButton variant="outline" className="mt-6" />
        </div>
        <FaqAccordion items={items} />
      </div>
    </Section>
  );
}
