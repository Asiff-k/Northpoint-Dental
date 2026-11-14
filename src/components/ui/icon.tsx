import {
  Activity,
  Anchor,
  CalendarClock,
  CircleHelp,
  ClipboardCheck,
  Crown,
  HeartHandshake,
  Percent,
  Radiation,
  ReceiptPoundSterling,
  ScanFace,
  ScanLine,
  Shield,
  Siren,
  Sparkles,
  Stethoscope,
  Sun,
  Wand2,
  Wind,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/** Icons the config may reference by name. Add new names here. */
const icons: Record<string, LucideIcon> = {
  Activity,
  Anchor,
  CalendarClock,
  ClipboardCheck,
  Crown,
  HeartHandshake,
  Percent,
  Radiation,
  ReceiptPoundSterling,
  ScanFace,
  ScanLine,
  Shield,
  Siren,
  Sparkles,
  Stethoscope,
  Sun,
  Wand2,
  Wind,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name] ?? CircleHelp;
  return <Cmp aria-hidden strokeWidth={1.5} {...props} />;
}
