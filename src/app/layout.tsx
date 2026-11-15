import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import { clinic, reviews } from "@/config/clinic.config";
import { CatalogueProvider } from "@/components/site/catalogue-provider";
import { ChatBubble } from "@/components/site/chat-bubble";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileStickyBar } from "@/components/site/mobile-sticky-bar";
import { Providers } from "@/components/site/providers";
import { ReviewToast } from "@/components/site/review-toast";
import { TopBar } from "@/components/site/top-bar";
import { getCatalogue } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${clinic.name} | Private dentist in ${clinic.address.city}`,
    template: `%s | ${clinic.name}`,
  },
  description: `${clinic.tagline}. Book online with the dentist of your choice and see every price upfront.`,
};

export const viewport: Viewport = {
  themeColor: "#0f3d3e",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { dentists, services } = await getCatalogue();

  return (
    <html lang="en-GB" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Providers>
          <CatalogueProvider dentists={dentists} services={services}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary focus:shadow-lift"
          >
            Skip to content
          </a>
          <TopBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ReviewToast reviews={reviews} />
          <ChatBubble />
          <MobileStickyBar />
          </CatalogueProvider>
        </Providers>
      </body>
    </html>
  );
}
