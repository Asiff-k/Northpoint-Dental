"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dentist, Service } from "@/config/clinic.config";

interface CatalogueValue {
  dentists: Dentist[];
  services: Service[];
  getDentist: (slug: string) => Dentist | undefined;
  getService: (slug: string) => Service | undefined;
}

const CatalogueContext = createContext<CatalogueValue | null>(null);

/**
 * Hands the catalogue loaded on the server (src/lib/data.ts) to client
 * components such as the booking wizard, so they never read the config.
 */
export function CatalogueProvider({
  dentists,
  services,
  children,
}: {
  dentists: Dentist[];
  services: Service[];
  children: React.ReactNode;
}) {
  const value = useMemo<CatalogueValue>(
    () => ({
      dentists,
      services,
      getDentist: (slug) => dentists.find((d) => d.slug === slug),
      getService: (slug) => services.find((s) => s.slug === slug),
    }),
    [dentists, services],
  );
  return <CatalogueContext.Provider value={value}>{children}</CatalogueContext.Provider>;
}

export function useCatalogue(): CatalogueValue {
  const value = useContext(CatalogueContext);
  if (!value) throw new Error("useCatalogue must be used inside CatalogueProvider");
  return value;
}
