import { site } from "@/lib/site";

/**
 * LocalBusiness structured data. No aggregateRating on purpose: the 4.9 comes
 * from third-party platforms and marking it up here would be an unverified claim.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name: site.legalName,
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    foundingDate: String(site.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: site.areaServed,
    sameAs: [site.social.facebook, site.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
