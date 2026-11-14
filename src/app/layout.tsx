import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import { clinic } from "@/config/clinic.config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${clinic.name} | Private dentist in ${clinic.address.city}`,
    template: `%s | ${clinic.name}`,
  },
  description: `${clinic.tagline}. Book online with the dentist of your choice and see every price upfront.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
