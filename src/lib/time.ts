import { clinic, type Weekday } from "@/config/clinic.config";

/**
 * Wall-clock helpers for the clinic timezone (Europe/London).
 * Pure functions: callers pass `now` so nothing here reads the clock.
 */

const WEEKDAYS: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export interface ClinicClock {
  year: number;
  month: number; // 1 to 12
  day: number;
  weekday: Weekday;
  minutes: number; // minutes since midnight in the clinic timezone
}

export function clinicClock(now: Date): ClinicClock {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: clinic.timezone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  const year = get("year");
  const month = get("month");
  const day = get("day");
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];

  return { year, month, day, weekday, minutes: get("hour") * 60 + get("minute") };
}

export interface ClinicDay {
  offset: number; // days from today
  iso: string; // 2026-11-18
  weekday: Weekday;
  /** "Tue 18 Nov" */
  label: string;
  dayOfMonth: number;
}

/** The calendar day `offset` days after today, in the clinic timezone. */
export function clinicDay(clock: ClinicClock, offset: number): ClinicDay {
  const date = new Date(Date.UTC(clock.year, clock.month - 1, clock.day + offset));
  const label = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
  })
    .format(date)
    .replace(",", "");

  return {
    offset,
    iso: date.toISOString().slice(0, 10),
    weekday: WEEKDAYS[date.getUTCDay()],
    label,
    dayOfMonth: date.getUTCDate(),
  };
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const toHHMM = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** "Today 15:45", "Tomorrow 09:00" or "Tue 18 Nov 09:00". */
export const relativeDayLabel = (day: ClinicDay) =>
  day.offset === 0 ? "Today" : day.offset === 1 ? "Tomorrow" : day.label;
