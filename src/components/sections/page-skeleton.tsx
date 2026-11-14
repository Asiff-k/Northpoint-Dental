import { Container } from "@/components/ui/section";

/**
 * Placeholder for detail pages while URL-specific content streams in.
 * Service and dentist pages read `params` inside Suspense so client
 * navigations stay instant (see Next.js "URL data outside of Suspense").
 */
export function DetailSkeleton() {
  return (
    <section className="pt-8 pb-16 md:pt-12" aria-busy="true" aria-label="Loading">
      <Container>
        <div className="h-4 w-48 animate-pulse rounded-full bg-muted" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="space-y-4">
            <div className="h-8 w-32 animate-pulse rounded-full bg-muted" />
            <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-muted md:h-16" />
            <div className="h-5 w-full animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-2/3 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="h-48 animate-pulse rounded-3xl bg-muted" />
        </div>
        <div className="mt-12 h-64 animate-pulse rounded-3xl bg-muted" />
      </Container>
    </section>
  );
}
