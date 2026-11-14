"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/components/chat/chat-context";

/** Any "Ask Ava" button on the site. Opens the shared chat panel. */
export function AskAvaButton({
  children = "Ask Ava",
  prefill,
  showIcon = true,
  onOpened,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick" | "asChild"> & {
  prefill?: string;
  showIcon?: boolean;
  /** Runs after the chat opens, e.g. to close a menu. */
  onOpened?: () => void;
}) {
  const { openChat } = useChat();

  return (
    <Button
      type="button"
      onClick={() => {
        openChat(prefill);
        onOpened?.();
      }}
      {...props}
    >
      {showIcon && <MessageCircle />}
      {children}
    </Button>
  );
}
