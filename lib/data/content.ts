import type { IconName } from "@/components/shared/Icon";

/**
 * Page content as data. Gallery and reviews live here for now; they move to the
 * database when an admin dashboard is added (Phase 2).
 */

export const marquee = ["Paint Correction", "Ceramic Coating", "Graphene", "Mobile Service", "Since 2018"];

export const trust: { label: [string, string]; icon: IconName }[] = [
  { label: ["Premium", "Products"], icon: "shield-check" },
  { label: ["Owner-", "Operated"], icon: "user" },
  { label: ["Attention", "to Detail"], icon: "search-plus" },
  { label: ["Mobile", "Service"], icon: "pin" },
];

export const signature = [
  {
    eyebrow: "Paint correction",
    title: "Restore the paint. Reveal the depth.",
    text: "Multi-stage machine polishing to reduce swirl marks, scratches, oxidation and haze.",
    image: "polish-b.jpg",
    alt: "Machine polishing removing swirl marks from black paint",
    cta: { label: "Get a Free Quote ↗", href: "/contact", variant: "primary" },
  },
  {
    eyebrow: "Ceramic + graphene",
    title: "Protection that keeps the finish looking right.",
    text: "Nano-ceramic and graphene options for hydrophobicity, UV and chemical resistance.",
    image: "droplets-hood.jpg",
    alt: "Water beading on a ceramic coated black hood",
    cta: { label: "Compare coatings ↗", href: "/services#coatings", variant: "glass" },
  },
] as const;

export const coatings = [
  {
    eyebrow: "The proven classic",
    title: "Nano-Ceramic Coating",
    points: [
      "Hard, glossy protective layer",
      "Hydrophobic: water beads and rolls off",
      "Resists UV, chemicals and road grime",
      "Makes washing noticeably easier",
    ],
    cta: "Ask about nano-ceramic ↗",
    featured: false,
  },
  {
    eyebrow: "The next step up",
    title: "Graphene Coating",
    points: [
      "Ceramic-based with a graphene formula",
      "Slick, hydrophobic finish",
      "Built to resist water spotting and grime",
      "Great for daily drivers and trucks",
    ],
    cta: "Ask about graphene ↗",
    featured: true,
  },
] as const;

/** Order matters: with 4 columns + dense flow the tall/wide tiles pack with no gaps. */
export const serviceMenu: {
  name: string;
  text: string;
  image: string;
  position: string;
  size: "" | "t-tall" | "t-wide";
  icon: IconName;
}[] = [
  { name: "Interior Detailing", text: "Deep-cleaned surfaces and a refreshed cabin.", image: "interior-clean.jpg", position: "center", size: "t-tall", icon: "armchair" },
  { name: "Exterior Detailing", text: "Wash, decontaminate and finish the exterior.", image: "glossy-black.jpg", position: "center 45%", size: "t-wide", icon: "car" },
  { name: "Buff & Wax", text: "Gloss and a slick, smooth feel.", image: "polish-a.jpg", position: "30% 60%", size: "", icon: "sparkle" },
  { name: "Window Tint", text: "Clean, even film for heat and privacy.", image: "ppf-door.jpg", position: "center", size: "", icon: "tint" },
  { name: "Dent Removal", text: "Appearance-focused correction.", image: "dent-car.jpg", position: "center 40%", size: "", icon: "target" },
  { name: "Scratch Repair", text: "Targeted repair of paint defects.", image: "grille-polish.jpg", position: "75% 40%", size: "", icon: "scratch" },
  { name: "Headlight Restoration", text: "Restore clarity to cloudy, yellowed lenses.", image: "headlights-old.jpg", position: "center 40%", size: "t-wide", icon: "sun" },
  { name: "Steam Cleaning", text: "Deep-clean hard-to-reach surfaces.", image: "salon-b.jpg", position: "center 40%", size: "", icon: "steam" },
  { name: "Matte Finish Restoration", text: "Keep matte paint even, clean and uniform.", image: "matte-lambo.jpg", position: "center", size: "t-tall", icon: "half" },
  { name: "Ozone Treatment", text: "Odor removal for a fresher cabin.", image: "lux-interior.jpg", position: "center", size: "", icon: "wind" },
  { name: "Headliner Cleaning", text: "Roof lining cleaned safely.", image: "salon-a.jpg", position: "center", size: "", icon: "roof" },
  { name: "Paint Transfer Removal", text: "Lift scuffs and transferred paint.", image: "ceramic-hands.jpg", position: "center 40%", size: "", icon: "drop" },
];

/**
 * TODO(client): swap for Chris's real before/after pairs (e.g. the black F-150).
 * Until then the "before" layer is the same photo with a CSS dulling filter,
 * and the slider is labelled "Sample preview".
 */
export const results = [
  { file: "polish-b.jpg", label: "Paint correction" },
  { file: "pickup.jpg", label: "Trucks & SUVs" },
  { file: "coating-bay.jpg", label: "Ceramic coating" },
  { file: "mclaren.jpg", label: "Show-car finish" },
  { file: "grille-polish.jpg", label: "Detail work" },
  { file: "polish-a.jpg", label: "Buff & wax" },
] as const;

export const why: { value: string; label: string; title: string; text: string; icon: IconName }[] = [
  { value: "2018", label: "Since 2018", title: "Hands-on experience", text: "Years of paint correction and coating work.", icon: "calendar" },
  { value: "MOBILE", label: "We come to you", title: "Detailing at your driveway", text: "Mobile service across the Denver metro.", icon: "pin" },
  { value: "4.9★", label: "Highly rated", title: "Loved online", text: "Customers regularly mention Chris by name.", icon: "star" },
  { value: "CHRIS", label: "Owner on every job", title: "Direct and personal", text: "You talk to the person doing the work.", icon: "user" },
  { value: "PRO", label: "Premium products", title: "Pro-grade compounds", text: "Professional polishes, coatings and finishes.", icon: "shield-check" },
  { value: "FREE", label: "No-pressure quotes", title: "Know before you commit", text: "Tell us what the vehicle needs, we advise.", icon: "chat" },
];

export const steps: { n: string; title: string; text: string; icon: IconName }[] = [
  { n: "01", title: "Request a quote", text: "Tell us about your vehicle and what you want corrected or protected.", icon: "chat" },
  { n: "02", title: "Inspect & recommend", text: "We look at the vehicle and recommend the work that makes sense.", icon: "search" },
  { n: "03", title: "Correct, coat & detail", text: "The hands-on work happens at the studio or through mobile service.", icon: "sparkle" },
  { n: "04", title: "Drive away Flawless", text: "You leave with a finish designed to look right under real light.", icon: "car-check" },
];

/**
 * TODO(client): replace these themes with 3 real, attributed quotes
 * (first name + last initial) once the client supplies them. Do not invent any.
 */
export const reviewThemes = [
  { title: "Clear communication", text: "Customers mention being kept in the loop and getting straight answers from Chris." },
  { title: "Paint correction", text: "Swirls and scratches removed, leaving a deep and even gloss." },
  { title: "Ceramic results", text: "Coatings that stay glossy, repel water and wash off easily." },
] as const;

export const quoteServices = [
  "Paint Correction",
  "Ceramic Coating",
  "Interior Detailing",
  "Exterior Detailing",
  "Window Tint",
  "Other",
] as const;

export const footerServices = [
  "Paint Correction",
  "Ceramic & Graphene",
  "Interior Detailing",
  "Exterior Detailing",
  "Window Tint",
  "Headlight Restoration",
];

/** Header navigation (the designer's five items). */
export const navLinks = [
  { href: "/", label: "Home", key: "home" },
  { href: "/services", label: "Services", key: "services" },
  { href: "/results", label: "Before & After", key: "results" },
  { href: "/about", label: "About", key: "about" },
  { href: "/contact", label: "Contact", key: "contact" },
];

/** Footer links: the five above plus the two pages that are not in the header. */
export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Before & After" },
  { href: "/why-us", label: "Why Us" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Every service Chris offers: the quote form's dropdown and the API allow-list. */
export const allServices = [
  "Paint Correction",
  "Ceramic Coating",
  "Interior Detailing",
  "Exterior Detailing",
  "Buff and Wax",
  "Window Tinting",
  "Dent Removal",
  "Scratch Repair",
  "Headlight Restoration",
  "Steam Cleaning",
  "Ozone Treatment",
  "Paint Transfer Removal",
  "Matte Finish Restoration",
  "Roof Lining / Headliner Cleaning",
  "Other",
] as const;

/* ------------------------- home page (design v2) ------------------------- */

export const homeTrust: { icon: IconName; title: string; text: string }[] = [
  { icon: "calendar", title: "Since 2018", text: "Trusted in Thornton, CO" },
  { icon: "truck", title: "Mobile service available", text: "We come to you in the Denver metro area." },
  { icon: "shield-check", title: "Premium products", text: "Nano-ceramic and graphene coatings." },
];

export const homeFeatures = [
  {
    eyebrow: "Paint correction",
    title: "Remove swirls.",
    accent: "Reveal clarity.",
    text: "Professional paint correction removes swirls, scratches and imperfections to restore depth, clarity and true gloss.",
    cta: "Learn About Paint Correction",
    href: "/services#paint-correction",
    image: "polish-a.jpg",
    alt: "Gloved detailer machine polishing black paint with an orange pad",
    position: "70% center",
  },
  {
    eyebrow: "Ceramic coatings",
    title: "Advanced",
    accent: "protection.",
    text: "Nano-ceramic and graphene coatings deliver long-lasting shine, hydrophobic protection and easier maintenance.",
    cta: "Explore Ceramic Coatings",
    href: "/services#ceramic",
    image: "droplets-hood.jpg",
    alt: "Water beading on a ceramic coated black hood",
    position: "center",
  },
] as const;

/** Three columns, read top to bottom, as in the design. */
export const homeServiceColumns: { icon: IconName; name: string; text: string }[][] = [
  [
    { icon: "seat", name: "Interior Detailing", text: "Deep cleaning for a fresh, refined cabin" },
    { icon: "tint", name: "Window Tinting", text: "Enhanced style, comfort and UV protection" },
    { icon: "headlight", name: "Headlight Restoration", text: "Clearer, safer and brighter visibility" },
    { icon: "swirl", name: "Paint Transfer Removal", text: "Remove scuffs and restore a clean finish" },
  ],
  [
    { icon: "car", name: "Exterior Detailing", text: "Hand wash, decontamination and shine" },
    { icon: "hammer", name: "Dent Removal", text: "Minor dent repair to restore appearance" },
    { icon: "steam", name: "Steam Cleaning", text: "Deep, chemical-free cleaning power" },
    { icon: "gear", name: "Matte Finish Restoration", text: "Specialized care for matte and satin finishes" },
  ],
  [
    { icon: "sparkle", name: "Buff and Wax", text: "Add gloss and protection" },
    { icon: "burst", name: "Scratch Repair", text: "Minimize the look of surface scratches" },
    { icon: "molecule", name: "Ozone Treatment", text: "Odor removal for a cleaner, fresher interior" },
    { icon: "roof", name: "Roof Lining / Headliner Cleaning", text: "Restore a like-new interior feel" },
  ],
];

export const homeStrip = [
  { file: "grille-polish.jpg", alt: "Detailer polishing with an orange pad", position: "60% center" },
  { file: "interior-clean.jpg", alt: "Cleaning a leather seat", position: "center" },
  { file: "salon-a.jpg", alt: "Detailer working inside a car interior", position: "center" },
] as const;

/**
 * Before/after pairs for the home slider. Each pair is the same photo twice:
 * `after` is the clean stock image, `before` adds defects (swirl marks, haze,
 * yellowed lenses) ONLY on the serviced area. They are generated by
 * `scripts/make-before-after.py`, so they are illustrative: the design labels the slider
 * "Illustrative comparison — client photos pending."
 * TODO(client): replace each pair with Chris's real before/after photos
 * (same camera angle in both files) by changing the file names below.
 */
export const homeCompare = [
  {
    before: "ba-front-before.jpg",
    after: "ba-front-after.jpg",
    label: "Hood and fender: swirl marks removed",
    position: "center 45%",
  },
  {
    before: "ba-hood-before.jpg",
    after: "ba-hood-after.jpg",
    label: "Supercar hood: gloss restored",
    position: "center 62%",
  },
  {
    before: "ba-lens-before.jpg",
    after: "ba-lens-after.jpg",
    label: "Headlights: oxidation removed",
    position: "center 40%",
  },
] as const;

export const homeWhy: { icon: IconName; title: string; text: string }[] = [
  { icon: "calendar", title: "Since 2018", text: "Trusted in Thornton, CO with a focus on quality and care." },
  { icon: "truck", title: "Mobile service available", text: "We bring premium detailing and coatings to your home or office in the Denver metro area." },
  { icon: "shield-check", title: "Premium products", text: "Nano-ceramic and graphene coatings, and industry-leading detailing products." },
  { icon: "chats", title: "5-star customer feedback", text: "A reputation for great results and a focus on clear communication." },
];

export const homeThemes: { icon: IconName; text: string }[] = [
  { icon: "chat", text: "Clear communication with Chris" },
  { icon: "gear", text: "Careful paint correction" },
  { icon: "diamond", text: "Beautiful ceramic finishes" },
];
