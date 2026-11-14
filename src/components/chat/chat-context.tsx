"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface ChatContextValue {
  isOpen: boolean;
  /** Optional opening line, e.g. the hero intent. Phase 5 sends it to Ava. */
  prefill: string | null;
  openChat: (prefill?: string) => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<string | null>(null);

  const openChat = useCallback((text?: string) => {
    setPrefill(text ?? null);
    setIsOpen(true);
  }, []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((open) => !open), []);

  const value = useMemo(
    () => ({ isOpen, prefill, openChat, closeChat, toggleChat }),
    [isOpen, prefill, openChat, closeChat, toggleChat],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
}
