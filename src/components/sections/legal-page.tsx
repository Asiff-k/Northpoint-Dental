import { clinic } from "@/config/clinic.config";
import { Container } from "@/components/ui/section";
import { FinalCta } from "@/components/sections/final-cta";
import { PageHero } from "@/components/sections/page-hero";

export interface LegalSection {
  heading: string;
  body: (string | string[])[]; // a string is a paragraph, an array is a list
}

/** Shared layout for /privacy and /terms. */
export function LegalPage({
  title,
  intro,
  crumb,
  sections,
}: {
  title: string;
  intro: string;
  crumb: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={intro} crumbs={[{ label: crumb }]} />
      <Container className="max-w-3xl pb-8">
        {clinic.isDemo && (
          <p className="mb-10 rounded-2xl border border-accent bg-accent/15 p-4 text-sm text-primary">
            <span className="font-semibold">Template wording for a demonstration site.</span>{" "}
            {clinic.name} is fictional. This text is not legal advice and must
            be reviewed before use by a real practice.
          </p>
        )}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-primary md:text-2xl">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-[1.0625rem] leading-relaxed text-muted-foreground">
                {section.body.map((block, i) =>
                  typeof block === "string" ? (
                    <p key={i}>{block}</p>
                  ) : (
                    <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-accent">
                      {block.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
      <FinalCta />
    </>
  );
}
