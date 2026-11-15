import Image from "next/image";
import Link from "next/link";
import {
  clinic,
  gdcDisplay,
  shortName,
  type Dentist,
} from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { SampleTag } from "@/components/ui/sample-tag";
import { NextAvailableChip } from "@/components/booking/next-available";

/** GDC registration line. The Sample tag is driven by clinic.isDemo. */
export function GdcNumber({ dentist }: { dentist: Dentist }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>
        GDC <span className="tabular-nums">{gdcDisplay(dentist)}</span>
      </span>
      {clinic.isDemo && <SampleTag />}
    </span>
  );
}

export function DentistCard({ dentist }: { dentist: Dentist }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={dentist.photo}
          alt={`Portrait of ${dentist.name}`}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <NextAvailableChip
          dentist={dentist}
          className="absolute bottom-3 left-3 bg-card/95 shadow-soft backdrop-blur"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-primary">
          <Link href={`/dentists/${dentist.slug}`} className="hover:underline">
            {dentist.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{dentist.role}</p>
        <p className="mt-2">
          <GdcNumber dentist={dentist} />
        </p>
        <ul className="mt-3 flex flex-1 flex-wrap content-start gap-1.5">
          {dentist.specialties.slice(0, 2).map((s) => (
            <li
              key={s}
              className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-primary"
            >
              {s}
            </li>
          ))}
        </ul>
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link href={`/book?dentist=${dentist.slug}`}>
            Book with {shortName(dentist)}
          </Link>
        </Button>
      </div>
    </article>
  );
}
