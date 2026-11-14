import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { AskAvaButton } from "@/components/chat/ask-ava-button";

/** Closing booking band. Every page ends with one. */
export function FinalCta({
  title = "Ready when you are",
  text = "Book online in under a minute, or ask Ava anything first.",
  bookHref = "/book",
  bookLabel = "Book an appointment",
}: {
  title?: string;
  text?: string;
  bookHref?: string;
  bookLabel?: string;
}) {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center sm:px-12 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
          />
          <h2 className="relative text-[1.75rem] leading-tight font-bold text-balance text-white md:text-[2.5rem]">
            {title}
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-lg text-white/75">{text}</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href={bookHref}>{bookLabel}</Link>
            </Button>
            <AskAvaButton variant="outline-light" size="lg" />
          </div>
        </div>
      </Container>
    </section>
  );
}
