import type { IconName } from "@/components/shared/Icon";
import { homeCompare, homeServiceColumns } from "@/lib/data/content";

/**
 * Content for the inner pages (/services, /results, /why-us, /reviews, /about,
 * /contact). Nothing here is a price, a guarantee or an invented testimonial.
 */

/** All 14 services: the two main ones first, then the twelve from the home list. */
export const servicesFull: { icon: IconName; name: string; text: string }[] = [
  { icon: "polish", name: "Paint Correction", text: "Machine polishing to remove swirls, scratches and haze, and restore depth and gloss." },
  { icon: "shield-check", name: "Ceramic Coating", text: "Nano-ceramic and graphene coatings for lasting, hydrophobic protection." },
  ...homeServiceColumns.flat(),
];

export const paintCorrection = {
  eyebrow: "Paint correction",
  title: "Remove swirls.",
  accent: "Reveal clarity.",
  text: [
    "Paint correction is careful machine polishing of the clear coat to remove the fine defects that dull a finish. The result is more depth, more clarity and a gloss that reflects like glass.",
    "Every vehicle is different, so Chris looks at the paint first and recommends how much correction it actually needs. Nothing is rushed, and nothing is added that your car does not need.",
  ],
  fixesTitle: "What it can improve",
  fixes: [
    "Swirl marks and spider-web scratches",
    "Light to moderate scratches",
    "Oxidation and faded, hazy paint",
    "Water spots and light etching",
    "Dullness from years of washing and sun",
  ],
  image: "polish-b.jpg",
  alt: "Machine polishing removing swirl marks from black paint",
};

export const paintProcess: { n: string; icon: IconName; title: string; text: string }[] = [
  { n: "01", icon: "search-plus", title: "Inspect", text: "Check the paint under light and agree what is worth correcting." },
  { n: "02", icon: "steam", title: "Wash & decontaminate", text: "Remove dirt, bonded contaminants and old wax so polishing starts clean." },
  { n: "03", icon: "polish", title: "Machine polish", text: "Work through the correction stages the paint needs, panel by panel." },
  { n: "04", icon: "sparkle", title: "Finish & protect", text: "Refine the gloss and add protection so the result lasts." },
];

export const ceramicDetail = {
  eyebrow: "Ceramic coatings",
  title: "Advanced",
  accent: "protection.",
  text: "A ceramic coating bonds to the paint and forms a hard, slick layer that repels water and makes the vehicle easier to keep clean. We offer nano-ceramic and graphene options.",
  note: "Coatings lock in whatever is underneath, so many customers pair a coating with paint correction. Chris will tell you honestly what your paint needs first.",
  benefits: [
    { icon: "drop", title: "Hydrophobic", text: "Water beads and rolls off, taking dirt with it." },
    { icon: "sun", title: "UV and chemical resistance", text: "Helps protect paint from sun, road grime and harsh cleaners." },
    { icon: "sparkle", title: "Deep, lasting gloss", text: "A rich, glassy shine that stays easy to maintain." },
    { icon: "shield-check", title: "Easier washing", text: "Less effort every time you clean the vehicle." },
  ] as { icon: IconName; title: string; text: string }[],
  options: [
    {
      title: "Nano-Ceramic Coating",
      tag: "The proven classic",
      points: ["Hard, glossy protective layer", "Hydrophobic: water beads and rolls off", "Resists UV, chemicals and road grime", "Makes washing noticeably easier"],
      cta: "Ask about nano-ceramic",
      featured: false,
    },
    {
      title: "Graphene Coating",
      tag: "The next step up",
      points: ["Ceramic-based with a graphene formula", "Slick, hydrophobic finish", "Built to resist water spotting and grime", "Great for daily drivers and trucks"],
      cta: "Ask about graphene",
      featured: true,
    },
  ],
  image: "droplets-hood.jpg",
  alt: "Water beading on a ceramic coated black hood",
};

export const areas = ["Thornton", "Westminster", "Northglenn", "Broomfield", "Brighton", "Denver metro"];

export const faqServices: { q: string; a: string }[] = [
  { q: "How much does detailing cost?", a: "Every vehicle is different, so all work is quoted individually. Send a request and you will get a free, no-pressure quote." },
  { q: "Do you come to me?", a: "Yes. Mobile service is available across the Denver metro. Tell us where the vehicle is when you request a quote." },
  { q: "How do I know which service I need?", a: "Tell us about your vehicle and what bothers you, or send photos. Chris recommends the work that makes sense and nothing more." },
  { q: "What is the difference between nano-ceramic and graphene?", a: "Both are ceramic-based protective coatings. Graphene versions add a graphene formula for a slick, hydrophobic finish that resists water spotting. Chris will recommend one based on your vehicle and how you use it." },
  { q: "Do I need paint correction before a ceramic coating?", a: "A coating locks in what is under it, so correcting visible swirls and scratches first gives the best result. We will tell you honestly what your paint needs." },
  { q: "Which areas do you serve?", a: "Thornton and the Denver metro, including Westminster, Northglenn, Broomfield and Brighton." },
];

export const faqContact = faqServices.slice(0, 3);

export type GalleryCat = "Paint correction" | "Ceramic" | "Interior" | "Detail work";
export type GalleryItem = { file: string; label: string; cat: GalleryCat };
export const galleryCats: GalleryCat[] = ["Paint correction", "Ceramic", "Interior", "Detail work"];

/** TODO(client): stock photos for now; replace with Chris's real work. */
export const gallery: GalleryItem[] = [
  { file: "polish-a.jpg", label: "Machine polishing a black panel", cat: "Paint correction" },
  { file: "polish-b.jpg", label: "Swirl removal in progress", cat: "Paint correction" },
  { file: "grille-polish.jpg", label: "Polishing around trim", cat: "Paint correction" },
  { file: "glossy-black.jpg", label: "Mirror-finish black paint", cat: "Detail work" },
  { file: "droplets-hood.jpg", label: "Water beading on a coated hood", cat: "Ceramic" },
  { file: "coating-bay.jpg", label: "Ceramic coating bay", cat: "Ceramic" },
  { file: "ceramic-hands.jpg", label: "Applying a coating", cat: "Ceramic" },
  { file: "interior-clean.jpg", label: "Leather seat cleaning", cat: "Interior" },
  { file: "salon-a.jpg", label: "Interior detail work", cat: "Interior" },
  { file: "salon-b.jpg", label: "Dash and vents detail", cat: "Interior" },
  { file: "lux-interior.jpg", label: "Cabin refresh", cat: "Interior" },
  { file: "mclaren.jpg", label: "Show-car finish", cat: "Detail work" },
  { file: "pickup.jpg", label: "Trucks and SUVs", cat: "Detail work" },
  { file: "matte-lambo.jpg", label: "Matte finish care", cat: "Detail work" },
  { file: "headlights-old.jpg", label: "Headlight restoration", cat: "Detail work" },
  { file: "ppf-door.jpg", label: "Protection film application", cat: "Detail work" },
];

export const pillars: { icon: IconName; title: string; text: string }[] = [
  { icon: "calendar", title: "Since 2018", text: "Trusted in Thornton, CO with a focus on quality and care." },
  { icon: "truck", title: "Mobile service available", text: "We bring premium detailing and coatings to your home or office in the Denver metro area." },
  { icon: "shield-check", title: "Premium products", text: "Nano-ceramic and graphene coatings, and industry-leading detailing products." },
  { icon: "chats", title: "5-star customer feedback", text: "A reputation for great results and a focus on clear communication." },
  { icon: "user", title: "Owner-operated", text: "You deal with Chris directly, from the first message to the final walk-around." },
  { icon: "chat", title: "Free, no-pressure quotes", text: "Tell us what the vehicle needs. We advise, you decide." },
];

export const craftVsWash: { label: string; us: string; them: string }[] = [
  { label: "Approach", us: "Inspect first, then a careful, hand-controlled process", them: "A fast, one-size-fits-all routine" },
  { label: "Paint", us: "Machine polishing that corrects swirls and scratches", them: "Washing alone does not remove them" },
  { label: "Protection", us: "Ceramic and graphene coatings built to last", them: "Spray wax that washes away quickly" },
  { label: "Service", us: "At the studio, or at your home or office", them: "Drive through and take what you get" },
  { label: "Communication", us: "Clear recommendations and a free quote", them: "A menu of fixed packages" },
];

export const aboutStory = [
  "Flawless Detailing started in 2018 with one simple belief: every car deserves to look better than the day it left the showroom.",
  "Chris built the business one vehicle at a time, with a focus on straight answers, clear communication and work that holds up under the brightest light.",
  "Based in Thornton, he helps Denver-area drivers restore and protect their vehicles with careful detailing, at the studio or right at your home or office.",
];

export const aboutFacts: { icon: IconName; title: string; text: string }[] = [
  { icon: "calendar", title: "Since 2018", text: "Detailing in Thornton, CO" },
  { icon: "truck", title: "Mobile service", text: "Across the Denver metro" },
  { icon: "user", title: "Owner-operated", text: "Chris on every job" },
];

export const aboutValues: { icon: IconName; title: string; text: string }[] = [
  { icon: "chat", title: "Straight answers", text: "Clear communication and honest recommendations, before and after the work." },
  { icon: "search-plus", title: "A careful process", text: "Inspect first, then correct, coat and finish with attention to detail." },
  { icon: "shield-check", title: "Quality products", text: "Premium compounds, nano-ceramic and graphene coatings." },
  { icon: "car-check", title: "Treated like our own", text: "Your vehicle gets the same care Chris would give his own." },
];

export const nextSteps: { n: string; icon: IconName; title: string; text: string }[] = [
  { n: "01", icon: "chat", title: "You send the details", text: "Vehicle, what you want done, and where it is. Photos help." },
  { n: "02", icon: "search-plus", title: "We review and reply", text: "Chris looks it over and comes back with a free quote and a recommendation." },
  { n: "03", icon: "car-check", title: "We book it in", text: "At the Thornton studio or at your home or office, whichever suits you." },
];

/**
 * TODO(client): real, attributed quotes (first name + last initial). While this
 * list is empty the quotes section is not rendered, so nothing is invented.
 */
export const reviewQuotes: { name: string; vehicle?: string; text: string; source: string }[] = [];

export const reviewThemesLong: { icon: IconName; title: string; text: string }[] = [
  { icon: "chat", title: "Clear communication", text: "Customers mention being kept in the loop and getting straight answers from Chris." },
  { icon: "polish", title: "Careful paint correction", text: "Swirls and scratches removed, leaving a deep and even gloss." },
  { icon: "diamond", title: "Beautiful ceramic finishes", text: "Coatings that stay glossy, repel water and wash off easily." },
];

export type ComparePair = { before: string; after: string; label: string; position: string };

/**
 * Every before/after pair for the results page: the three from the home page plus
 * nine more, one per service. All are generated from stock photos
 * (scripts/make-before-after.py and scripts/make-before-after-more.py) and are
 * illustrative. TODO(client): replace with Chris's real pairs (same camera angle
 * in both files) by editing the file names here.
 */
export const resultsCompare: ComparePair[] = [
  ...homeCompare.map((c) => ({ before: c.before, after: c.after, label: c.label, position: c.position })),
  { before: "ba-scratch-before.jpg", after: "ba-scratch-after.jpg", label: "Scratch and swirl removal", position: "center 50%" },
  { before: "ba-grime-before.jpg", after: "ba-grime-after.jpg", label: "Exterior detailing: road film removed", position: "center 60%" },
  { before: "ba-transfer-before.jpg", after: "ba-transfer-after.jpg", label: "Paint transfer removal", position: "center 55%" },
  { before: "ba-dent-before.jpg", after: "ba-dent-after.jpg", label: "Dent removal", position: "center 96%" },
  { before: "ba-seat-before.jpg", after: "ba-seat-after.jpg", label: "Interior detailing: leather restored", position: "center 40%" },
  { before: "ba-dust-before.jpg", after: "ba-dust-after.jpg", label: "Interior detailing: dust and film removed", position: "center 55%" },
  { before: "ba-tint-before.jpg", after: "ba-tint-after.jpg", label: "Window tint", position: "center 45%" },
  { before: "ba-headliner-before.jpg", after: "ba-headliner-after.jpg", label: "Headliner cleaning", position: "center 32%" },
  { before: "ba-oxid-before.jpg", after: "ba-oxid-after.jpg", label: "Paint correction: oxidation removed", position: "center 40%" },
];
