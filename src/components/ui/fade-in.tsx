"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fade-up on scroll, 300 ms. Reduced motion is handled by the root
 * <MotionConfig reducedMotion="user"> in Providers: the movement is dropped
 * and only a gentle opacity fade remains.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
