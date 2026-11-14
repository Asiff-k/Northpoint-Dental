import Link from "next/link";
import { Phone } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Container } from "@/components/ui/section";
import { OpenNowBadge } from "@/components/site/open-now-badge";

export function TopBar() {
  return (
    <div className="bg-primary text-xs text-white/85 sm:text-[0.8125rem]">
      <Container className="flex h-10 items-center justify-between gap-3 sm:gap-4">
        <OpenNowBadge className="min-w-0" />
        <div className="flex shrink-0 items-center gap-5">
          <a
            href={clinic.contact.phoneHref}
            className="hidden items-center gap-1.5 font-medium whitespace-nowrap text-white hover:text-accent sm:inline-flex"
          >
            <Phone className="size-3.5" aria-hidden />
            {clinic.contact.phone}
          </a>
          <Link
            href="/#emergency"
            className="inline-flex h-6 items-center rounded-full bg-danger-strong px-2.5 text-xs font-semibold whitespace-nowrap text-white hover:bg-danger"
          >
            Dental emergency?
          </Link>
        </div>
      </Container>
    </div>
  );
}
