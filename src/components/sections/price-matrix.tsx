import Link from "next/link";
import {
  formatPrice,
  fromPrice,
  type Service,
} from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { FinanceLine, MemberPrice } from "@/components/sections/price-text";
import { getDentists } from "@/lib/data";

/**
 * Fee guide: services by dentists with a Member column.
 * Desktop shows the matrix, mobile shows one card per service.
 */
export async function PriceMatrix({ services }: { services: Service[] }) {
  const dentists = await getDentists();

  return (
    <div>
      {/* Desktop matrix */}
      <div className="hidden overflow-x-auto rounded-3xl border border-border bg-card lg:block">
        <table className="w-full text-left text-[0.9375rem]">
          <thead className="bg-muted text-sm text-primary">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">Treatment</th>
              {dentists.map((d) => (
                <th key={d.slug} scope="col" className="px-3 py-4 font-semibold">
                  <Link href={`/dentists/${d.slug}`} className="hover:underline">
                    {d.name}
                  </Link>
                  <span className="block text-xs font-normal text-muted-foreground">
                    {d.role}
                  </span>
                </th>
              ))}
              <th scope="col" className="bg-accent/25 px-4 py-4 font-semibold">
                Member price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((s) => (
              <tr key={s.slug} className="transition-colors hover:bg-muted/40">
                <th scope="row" className="max-w-64 px-5 py-4 font-normal">
                  <Link
                    href={`/services/${s.slug}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {s.name}
                  </Link>
                  <span className="block text-xs text-muted-foreground">
                    {s.durationMin} min
                  </span>
                  <FinanceLine service={s} pence={fromPrice(s)} short className="block" />
                </th>
                {dentists.map((d) => {
                  const price = s.prices[d.slug];
                  return (
                    <td key={d.slug} className="px-3 py-4 align-top">
                      {price === undefined ? (
                        <span className="text-xs text-muted-foreground/80">Not offered</span>
                      ) : (
                        <Link
                          href={`/book?service=${s.slug}&dentist=${d.slug}`}
                          className="font-heading text-base font-bold text-primary tabular-nums underline-offset-4 hover:underline"
                          aria-label={`${formatPrice(price)}, book ${s.name} with ${d.name}`}
                        >
                          {formatPrice(price)}
                        </Link>
                      )}
                    </td>
                  );
                })}
                <td className="bg-accent/10 px-4 py-4 align-top">
                  <MemberPrice service={s} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="space-y-4 lg:hidden">
        {services.map((s) => (
          <li key={s.slug} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-lg leading-snug font-semibold text-primary"
                >
                  {s.name}
                </Link>
                <p className="text-sm text-muted-foreground">{s.durationMin} min</p>
              </div>
              <p className="shrink-0 text-right text-sm text-muted-foreground">
                from
                <span className="block font-heading text-xl leading-tight font-bold text-primary">
                  {formatPrice(fromPrice(s))}
                </span>
              </p>
            </div>

            <dl className="mt-4 divide-y divide-border border-y border-border text-[0.9375rem]">
              {dentists
                .filter((d) => d.slug in s.prices)
                .map((d) => (
                  <div key={d.slug} className="flex items-center justify-between gap-3 py-2.5">
                    <dt>{d.name}</dt>
                    <dd className="font-semibold text-primary tabular-nums">
                      {formatPrice(s.prices[d.slug])}
                    </dd>
                  </div>
                ))}
              <div className="-mx-2 flex items-center justify-between gap-3 rounded-lg bg-accent/15 px-2 py-2.5">
                <dt className="font-medium text-primary">Member price</dt>
                <dd><MemberPrice service={s} /></dd>
              </div>
            </dl>

            <FinanceLine service={s} pence={fromPrice(s)} className="mt-3 block" />
            <Button asChild variant="outline" className="mt-4 w-full">
              <Link href={`/book?service=${s.slug}`}>
                Book
                <span className="sr-only"> {s.name}</span>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
