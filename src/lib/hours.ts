import { clinic, weekdayLabels, type Weekday } from "@/config/clinic.config";
import { clinicClock, clinicDay, toMinutes } from "@/lib/time";

export interface OpenStatus {
  isOpen: boolean;
  /** "Open now until 18:00" or "Closed, opens Mon 08:30" */
  label: string;
  today: Weekday;
}

const hoursFor = (day: Weekday) => clinic.hours.find((h) => h.day === day);

export function getOpenStatus(now: Date): OpenStatus {
  const clock = clinicClock(now);
  const today = hoursFor(clock.weekday);

  if (today?.open && today.close) {
    if (clock.minutes >= toMinutes(today.open) && clock.minutes < toMinutes(today.close)) {
      return {
        isOpen: true,
        label: `Open now until ${today.close}`,
        today: clock.weekday,
      };
    }
    if (clock.minutes < toMinutes(today.open)) {
      return {
        isOpen: false,
        label: `Closed, opens today ${today.open}`,
        today: clock.weekday,
      };
    }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const day = clinicDay(clock, offset);
    const hours = hoursFor(day.weekday);
    if (hours?.open) {
      return {
        isOpen: false,
        label: `Closed, opens ${weekdayLabels[day.weekday].short} ${hours.open}`,
        today: clock.weekday,
      };
    }
  }

  return { isOpen: false, label: "Closed", today: clock.weekday };
}
