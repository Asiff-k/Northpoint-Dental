"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Menu, Phone } from "lucide-react";
import { clinic, nav } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AskAvaButton } from "@/components/chat/ask-ava-button";
import { Logo } from "@/components/site/logo";
import { RatingBadge } from "@/components/site/rating-badge";
import { cn } from "@/lib/utils";

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );
}

export function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border bg-background/80 shadow-soft backdrop-blur-lg"
          : "border-transparent bg-background",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-11 items-center rounded-full px-3.5 text-[0.9375rem] font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <RatingBadge className="hidden xl:inline-flex" />
          {/* On phones the sticky bottom bar carries the Book button. */}
          <Button asChild size="default" className="hidden sm:inline-flex">
            <Link href="/book">Book online</Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] gap-0 sm:max-w-sm">
              <SheetHeader className="border-b p-5">
                <SheetTitle className="text-lg font-bold text-primary">
                  {clinic.name}
                </SheetTitle>
                <SheetDescription>{clinic.tagline}</SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
                <ul>
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex h-12 items-center rounded-xl px-3 text-lg font-medium text-foreground hover:bg-muted"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/#emergency"
                      onClick={() => setMenuOpen(false)}
                      className="flex h-12 items-center rounded-xl px-3 text-lg font-medium text-danger-strong hover:bg-muted"
                    >
                      Dental emergency?
                    </Link>
                  </li>
                </ul>
                <div className="mt-4 px-3">
                  <RatingBadge className="flex-wrap whitespace-normal" />
                </div>
              </nav>

              <div className="grid gap-2 border-t p-5">
                <Button asChild size="lg">
                  <Link href="/book" onClick={() => setMenuOpen(false)}>
                    Book online
                  </Link>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline">
                    <a href={clinic.contact.phoneHref}>
                      <Phone />
                      Call
                    </a>
                  </Button>
                  <AskAvaButton
                    variant="outline"
                    onOpened={() => setMenuOpen(false)}
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
