import { ShieldCheck } from "lucide-react";
import { clinic } from "@/config/clinic.config";
import { cn } from "@/lib/utils";

const regulatorNames: Record<string, string> = {
  GDC: "Registered with the General Dental Council",
  CQC: "Regulated by the Care Quality Commission",
};

/** Compact GDC and CQC badges, shown near prices. Text only, no logos. */
export function RegulatorBadges({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2.5", className)}>
      {clinic.trust.regulators.map((r) => (
        <li
          key={r}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs text-muted-foreground"
        >
          <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden />
          <span>
            <span className="font-bold text-primary">{r}</span>{" "}
            <span className="hidden sm:inline">{regulatorNames[r] ?? ""}</span>
            <span className="sm:hidden">{r === "GDC" ? "registered" : "regulated"}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
