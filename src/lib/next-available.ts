import { clinic, dentists, type Dentist } from "@/config/clinic.config";
import {
  clinicClock,
  clinicDay,
  relativeDayLabel,
  toHHMM,
  toMinutes,
  type ClinicDay,
} from "@/lib/time";

/**
 * PHASE 1 PLACEHOLDER.
 * Derives "next available" times from each dentist's weekly working pattern
 * in the config. It ignores existing bookings and time off. Phase 3 replaces
 * every caller with the real engine in src/lib/booking/ (getAvailableSlots,
 * getNextAvailable). Do not add slot rules here.
 */

export interface PlaceholderSlot {
  dentistSlug: string;
  day: ClinicDay;
  time: string; // "14:30"
  /** "Today 15:45", "Tomorrow 09:00", "Tue 18 Nov 09:00" */
  label: string;
}

const DISPLAY_STEP_MIN = 30;
const ASSUMED_LENGTH_MIN = 30;

/** Times a dentist works on a given day, at a 30 minute display step. */
export function placeholderSlotsForDay(
  dentist: Dentist,
  now: Date,
  offset: number,
): PlaceholderSlot[] {
  const clock = clinicClock(now);
  const day = clinicDay(clock, offset);
  const shift = dentist.availability.find((a) => a.day === day.weekday);
  if (!shift) return [];

  const { slotStepMin, minNoticeHours } = clinic.booking;
  let start = toMinutes(shift.start);
  if (offset === 0) {
    const earliest = clock.minutes + minNoticeHours * 60;
    start = Math.max(start, Math.ceil(earliest / slotStepMin) * slotStepMin);
  }
  const lastStart = toMinutes(shift.end) - ASSUMED_LENGTH_MIN;

  const slots: PlaceholderSlot[] = [];
  for (let m = start; m <= lastStart; m += DISPLAY_STEP_MIN) {
    const time = toHHMM(m);
    slots.push({
      dentistSlug: dentist.slug,
      day,
      time,
      label: `${relativeDayLabel(day)} ${time}`,
    });
  }
  return slots;
}

/** The next `count` placeholder slots for one dentist, spread over days. */
export function placeholderNextSlots(
  dentist: Dentist,
  now: Date,
  count = 1,
  perDay = 2,
): PlaceholderSlot[] {
  const found: PlaceholderSlot[] = [];
  for (let offset = 0; offset < 21 && found.length < count; offset++) {
    const daySlots = placeholderSlotsForDay(dentist, now, offset);
    // Spread picks across the day so the chips do not all read 09:00, 09:30.
    const stride = Math.max(1, Math.floor(daySlots.length / perDay));
    for (let i = 0; i < daySlots.length && found.length < count; i += stride) {
      found.push(daySlots[i]);
      if (found.filter((s) => s.day.offset === offset).length >= perDay) break;
    }
  }
  return found;
}

export const placeholderNextAvailable = (dentist: Dentist, now: Date) =>
  placeholderNextSlots(dentist, now, 1)[0];

/** Earliest placeholder slot across the given dentists (default: everyone). */
export function placeholderEarliest(now: Date, among: Dentist[] = dentists) {
  let best: PlaceholderSlot | undefined;
  for (const dentist of among) {
    const slot = placeholderNextAvailable(dentist, now);
    if (!slot) continue;
    if (
      !best ||
      slot.day.offset < best.day.offset ||
      (slot.day.offset === best.day.offset && slot.time < best.time)
    ) {
      best = slot;
    }
  }
  return best;
}

/** Whether a dentist works at all on the day `offset` days from now. */
export const worksOnDay = (dentist: Dentist, now: Date, offset: number) =>
  placeholderSlotsForDay(dentist, now, offset).length > 0;

/** Deep link into the booking wizard for a placeholder slot. */
export const slotHref = (slot: PlaceholderSlot, serviceSlug?: string) => {
  const params = new URLSearchParams();
  if (serviceSlug) params.set("service", serviceSlug);
  params.set("dentist", slot.dentistSlug);
  params.set("date", slot.day.iso);
  params.set("time", slot.time);
  return `/book?${params.toString()}`;
};
