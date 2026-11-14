"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Phone, X } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { Button } from "@/components/ui/button";
import { useChat } from "@/components/chat/chat-context";

const starterChips = ["Book an appointment", "Prices", "Opening hours", "I'm in pain"];

/**
 * Floating chat button and PLACEHOLDER panel. Phase 5 replaces the panel body
 * with the real assistant. Sits above the mobile sticky bar.
 */
export function ChatBubble() {
  const { isOpen, prefill, toggleChat, closeChat } = useChat();
  const [firstName] = clinic.name.split(" ");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeChat();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeChat]);

  return (
    <div className="fixed right-4 bottom-[5.25rem] z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={`Chat with Ava, ${firstName}'s virtual assistant`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[calc(100vw-2rem)] max-w-sm origin-bottom-right overflow-hidden rounded-3xl border border-border bg-card shadow-lift"
          >
            <div className="flex items-center gap-3 bg-primary p-4 text-white">
              <span className="flex size-10 items-center justify-center rounded-full bg-accent font-heading font-bold text-accent-foreground">
                A
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-heading leading-tight font-semibold">Ava</p>
                <p className="text-xs text-white/70">
                  {firstName}&apos;s virtual assistant
                </p>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
                className="inline-flex size-9 items-center justify-center rounded-full hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 p-4">
              <div className="rounded-2xl rounded-tl-sm bg-muted p-3.5 text-sm">
                <p className="font-semibold text-primary">Ava is coming soon</p>
                <p className="mt-1 text-muted-foreground">
                  Soon you will be able to check prices, find a time and book
                  right here. For now, book online or give us a call.
                </p>
              </div>

              {prefill && (
                <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2 text-sm text-white">
                  {prefill}
                </p>
              )}

              <div className="flex flex-wrap gap-2" aria-hidden>
                {starterChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button asChild>
                  <Link href="/book" onClick={closeChat}>
                    Book online
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={clinic.contact.phoneHref}>
                    <Phone />
                    Call us
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat" : "Ask Ava, our virtual assistant"}
        className="inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-accent px-4 font-semibold text-accent-foreground shadow-lift transition-transform duration-200 hover:-translate-y-0.5 md:px-5"
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        <span className="hidden md:inline">{isOpen ? "Close" : "Ask Ava"}</span>
      </button>
    </div>
  );
}
