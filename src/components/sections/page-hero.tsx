import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="inline-flex min-h-8 items-center hover:text-primary">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="inline-flex items-center gap-1">
            <ChevronRight className="size-3.5" aria-hidden />
            {item.href ? (
              <Link href={item.href} className="inline-flex min-h-8 items-center hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Standard inner-page header. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("pt-8 pb-10 md:pt-12 md:pb-14", className)}>
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-primary/70 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl leading-[1.1] font-bold text-balance text-primary md:text-[3.5rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">
            {intro}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
