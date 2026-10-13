/**
 * Single source of truth for business details. Everything the client has not
 * confirmed yet is flagged TODO so it is easy to find before launch.
 */
export const site = {
  name: "Flawless Detailing",
  legalName: "Flawless Detailing Paint Correction & Ceramic Coatings",
  tagline: "Don’t get caught riding dirty. Keep it Flawless.",
  foundedYear: 2018,
  rating: 4.9,
  // TODO(client): (720) 123-4567 looks like a placeholder, confirm the real number.
  phoneDisplay: "(720) 123-4567",
  phoneHref: "tel:+17201234567",
  phoneE164: "+1-720-123-4567",
  email: "flawlessdetailing303@gmail.com",
  // TODO(client): confirm this is a public studio address and not a residence.
  address: {
    street: "4476 Cottonwood Lakes Blvd",
    city: "Thornton",
    region: "CO",
    postalCode: "80241",
    country: "US",
  },
  areaServed: ["Thornton", "Westminster", "Northglenn", "Broomfield", "Brighton", "Denver"],
  social: {
    instagram: "https://www.instagram.com/flawlessdetailing303/",
    facebook: "https://www.facebook.com/FlawlessDetailing303/",
  },
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002").replace(/\/$/, ""),
  noindex: process.env.NEXT_PUBLIC_NOINDEX !== "false",
} as const;

export const mapEmbedUrl =
  "https://www.google.com/maps?q=4476+Cottonwood+Lakes+Blvd,+Thornton,+CO+80241&output=embed";

export const seo = {
  title: "Car Detailing in Thornton, CO | Paint Correction & Ceramic Coating | Flawless Detailing",
  description:
    "Flawless Detailing in Thornton, CO: paint correction, ceramic and graphene coatings, interior and exterior detailing, plus mobile service across the Denver metro. Get a free quote.",
};
