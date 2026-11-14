"use client";

import { MotionConfig } from "motion/react";
import { ChatProvider } from "@/components/chat/chat-context";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider delayDuration={150}>
        <ChatProvider>{children}</ChatProvider>
      </TooltipProvider>
    </MotionConfig>
  );
}
