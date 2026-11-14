"use client";

import { useSyncExternalStore } from "react";

/**
 * The current time, rounded to the minute, re-checked every 15 seconds.
 * Returns null on the server and during hydration, so prerendered HTML never
 * contains a frozen build-time clock. Render a neutral placeholder for null.
 */
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
};

const getSnapshot = () => Math.floor(Date.now() / 60_000) * 60_000;
const getServerSnapshot = () => null;

export function useNow(): Date | null {
  const ms = useSyncExternalStore<number | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return ms === null ? null : new Date(ms);
}
