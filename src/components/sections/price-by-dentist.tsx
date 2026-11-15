import Image from "next/image";
import Link from "next/link";
import {
  dentistsForService,
  formatPrice,
  shortName,
  type Service,
} from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { NextAvailableChip } from "@/components/booking/next-available";
import { FinanceLine, MemberPrice } from "@/components/sections/price-text";
import { getDentists } from "@/lib/data";

/** Price per dentist: a table on desktop, one card per dentist on mobile. */
export async function PriceByDentist({ service }: { service: Service }) {
  const rows = dentistsForService(service, await getDentists());
  const bookHref = (dentistSlug: string) =>
    `/book?service=${service.slug}&dentist=${dentistSlug}`;

  return (
    <div>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-3xl border border-border bg-card md:block">
        <table className="w-full text-left text-[0.9375rem]">
          <thead className="bg-muted text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th scope="col" className="px-5 py-3.5 font-semibold">Clinician</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Price</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Member price</th>
              <th scope="col" className="px-4 py-3.5 font-semibold">Next free slot</th>
              <th scope="col" className="px-5 py-3.5"><span className="sr-only">Book</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((d) => {
              const price = service.prices[d.slug];
              return (
                <tr key={d.slug}>
                  <th scope="row" className="px-5 py-4 font-normal">
                    <Link href={`/dentists/${d.slug}`} className="group flex items-center gap-3">
                      <Image
                        src={d.photo}
                        alt=""
                        width={48}
                        height={48}
                        className="size-12 rounded-full object-cover object-top"
                      />
                      <span>
                        <span className="block font-semibold text-primary group-hover:underline">
                          {d.name}
                        </span>
                        <span className="block text-sm text-muted-foreground">{d.role}</span>
                      </span>
                    </Link>
                  </th>
                  <td className="px-4 py-4">
                    <span className="block font-heading text-lg font-bold text-primary">
                      {formatPrice(price)}
                    </span>
                    <FinanceLine service={service} pence={price} short />
                  </td>
                  <td className="px-4 py-4">
                    <MemberPrice service={service} />
                  </td>
                  <td className="px-4 py-4">
                    <NextAvailableChip dentist={d} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button asChild size="sm" className="h-10">
                      <Link href={bookHref(d.slug)}>Book with {shortName(d)}</Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <ul className="space-y-4 md:hidden">
        {rows.map((d) => {
          const price = service.prices[d.slug];
          return (
            <li key={d.slug} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <Image
                  src={d.photo}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover object-top"
                />
                <div className="min-w-0 flex-1">
                  <Link href={`/dentists/${d.slug}`} className="font-semibold text-primary">
                    {d.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{d.role}</p>
                </div>
                <p className="text-right">
                  <span className="block font-heading text-xl font-bold text-primary">
                    {formatPrice(price)}
                  </span>
                </p>
              </div>
              <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Member price</dt>
                  <dd><MemberPrice service={service} /></dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Next free slot</dt>
                  <dd><NextAvailableChip dentist={d} /></dd>
                </div>
              </dl>
              <FinanceLine service={service} pence={price} className="mt-3 block" />
              <Button asChild className="mt-4 w-full">
                <Link href={bookHref(d.slug)}>Book with {shortName(d)}</Link>
              </Button>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        Final cost confirmed after examination.
      </p>
    </div>
  );
}
