import {
  clinic,
  financeApplies,
  formatPrice,
  fromPrice,
  longestFinanceTerm,
  maxPrice,
  monthlyFinance,
  type Service,
} from "@/config/clinic.config";
import { cn } from "@/lib/utils";

/** "£240 to £280" or a single price when every clinician charges the same. */
export const priceRangeText = (s: Service) => {
  const min = fromPrice(s);
  const max = maxPrice(s);
  return min === max ? formatPrice(min) : `${formatPrice(min)} to ${formatPrice(max)}`;
};

/**
 * "or from £27.09/month over 24 months, 0% APR".
 * Renders nothing unless the service is finance eligible at this price.
 */
export function FinanceLine({
  service,
  pence,
  short = false,
  className,
}: {
  service: Service;
  pence: number;
  short?: boolean;
  className?: string;
}) {
  if (!financeApplies(service, pence)) return null;
  const months = longestFinanceTerm();
  const monthly = formatPrice(monthlyFinance(pence, months));

  return (
    <span className={cn("text-xs text-muted-foreground", className)}>
      or from <span className="font-semibold text-primary">{monthly}/month</span>
      {!short && ` over ${months} months, ${clinic.finance.aprPercent}% APR`}
    </span>
  );
}

/** Member price cell: "Included", a price, or "Not included". */
export function MemberPrice({ service }: { service: Service }) {
  if (service.memberPricePence === undefined) {
    return <span className="text-muted-foreground">Not included</span>;
  }
  if (service.memberPricePence === 0) {
    return <span className="font-semibold text-primary">Included</span>;
  }
  return (
    <span className="font-semibold text-primary">
      {formatPrice(service.memberPricePence)}
    </span>
  );
}
