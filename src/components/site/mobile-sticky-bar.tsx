"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";

function Bar() {
  const pathname = usePathname();
  // The booking wizard has its own summary bar in the same position.
  if (pathname === "/book") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(15_61_62/0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        <Button asChild variant="outline">
          <a href={clinic.contact.phoneHref}>
            <Phone />
            Call
          </a>
        </Button>
        <Button asChild>
          <Link href="/book">
            <CalendarCheck />
            Book
          </Link>
        </Button>
      </div>
    </div>
  );
}

/** Mobile only: Call and Book, fixed to the bottom of every page. */
export function MobileStickyBar() {
  // usePathname needs a Suspense boundary on routes with runtime params.
  return (
    <Suspense fallback={null}>
      <Bar />
    </Suspense>
  );
}
