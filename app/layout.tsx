import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./home.css";
import "./pages.css";
import JsonLd from "@/components/shared/JsonLd";
import SiteEffects from "@/components/shared/SiteEffects";
import { seo, site } from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  // Staging: keep out of search results. Flip NEXT_PUBLIC_NOINDEX=false at launch.
  robots: site.noindex ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Flawless Detailing | Car Detailing in Thornton, CO",
    description:
      "Paint correction, ceramic coatings and premium detailing. Mobile service available across the Denver metro.",
    locale: "en_US",
  },
  keywords: [
    "car detailing Thornton CO",
    "paint correction Thornton",
    "ceramic coating Denver",
    "mobile detailing Thornton",
    "graphene coating Colorado",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        {children}
        <SiteEffects />
        <JsonLd />
      </body>
    </html>
  );
}
