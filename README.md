# Flawless Detailing: website

Next.js 14 (App Router) + TypeScript + Tailwind. One repo, one deploy: the only server code is
`app/api/leads/route.ts`.

**Quote requests are emailed.** The MySQL/Sequelize layer is built but switched off for now
(commented out, not removed), see "Database" below.

## Run it

```bash
npm install
cp .env.example .env.local      # then fill in the SMTP_* lines (see below)
npm run dev                     # http://localhost:3002
```

`npm run build && npm start` for production. Every page is static; only `/api/leads` runs on the server.

## Email setup (required for the quote form)

The contact forms POST to `/api/leads`, which emails the request to `LEAD_NOTIFY_TO`
(default `flawlessdetailing303@gmail.com`). If SMTP is not configured the visitor sees
"We could not send your request right now. Please call us instead." (HTTP 503) and the lead is
written to the server log as a last-resort fallback.

Gmail: turn on 2-Step Verification, create an **App password**, then in `.env.local`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourname@gmail.com
SMTP_PASS=the-16-character-app-password
LEAD_NOTIFY_TO=flawlessdetailing303@gmail.com
```

The email's Reply-To is the customer, so Chris can answer straight from his inbox.
Protections on the endpoint: honeypot field, per-IP rate limit (5 per 10 min, in memory, so run a
single instance), strict validation, allow-listed service names.

## Pages

| Route | In header | Notes |
|---|---|---|
| `/` | Home | Hero, trust bar, signature services, service list, before/after slider, why us, reviews, about, quote form |
| `/services` | Services | Paint correction + process, ceramic (nano vs graphene), all 14 services, area, FAQ |
| `/results` | Before & After | Slider, filterable photo gallery with lightbox, social, CTA |
| `/why-us` | footer only | Six pillars, craft vs car wash, process, area |
| `/reviews` | footer only | Rating + themes; a real-quotes section that appears once quotes are added |
| `/about` | About | Story, facts, values, tagline |
| `/contact` | Contact | Form, details, map, what happens next, FAQ |

The header has the designer's five items; `/why-us` and `/reviews` are reachable from the footer,
the home page and the sitemap. To add them to the header, edit `navLinks` in `lib/data/content.ts`.

## Structure

```
app/
  layout.tsx                  fonts, global metadata, JSON-LD, scroll-reveal effects
  (site)/layout.tsx           Header + Footer + MobileBar for every page
  (site)/page.tsx             home;  (site)/<route>/page.tsx  the six inner pages (own title/description)
  api/leads/route.ts          quote intake -> email (database block commented out)
  globals.css                 base styles (legacy, from the first static design)
  home.css                    header, footer, buttons and the home design (hv- classes)
  pages.css                   inner pages (ip- classes)
  robots.ts, sitemap.ts       SEO (robots blocks everything while NEXT_PUBLIC_NOINDEX=true)
components/
  layout/                     Header, Footer, MobileBar
  home-v2/                    home sections
  inner/                      PageHero, Bits (SectionHead, CardGrid, ProcessSteps, Faq, AreaBand, CtaBand),
                              ServicesSections, MoreSections, Gallery (client)
  shared/                     Icon, Img (next/image wrapper), SiteEffects (scroll reveal), JsonLd
lib/
  site.ts                     business details + SEO strings   <- client facts live here
  data/content.ts             home content, nav links, quote-form service list
  data/inner.ts               inner-page content (services, FAQ, gallery, pillars, ...)
  mail.ts, rateLimit.ts
  db/, migrations/, scripts/migrate.ts   MySQL layer (currently unused, see below)
scripts/make-before-after.py       generates the 3 home before/after pairs from stock photos
scripts/make-before-after-more.py  generates 9 more pairs (scratches, grime, paint transfer, dent, seat, dust, tint,
                                   headliner, oxidation) from scripts/ba-src/*.jpg for the results page
```

## Database (switched off)

Left in place so it can be re-enabled: `lib/db/` (Sequelize + `Lead` model), `migrations/0001-leads.ts`,
`scripts/migrate.ts`. To turn it back on:

1. Uncomment the `DB_*` lines in `.env.local` / `.env.example`.
2. Uncomment the two `DATABASE` blocks in `app/api/leads/route.ts`.
3. Create the database and run `npm run db:migrate`.

## Before launch (`TODO(client)` markers in the code)

- Real phone number (`lib/site.ts`; (720) 123-4567 is a placeholder) and confirm the address is a public studio.
- Real before/after photos: the 3 pairs in `homeCompare` (`lib/data/content.ts`) and the 12 in `resultsCompare` (`lib/data/inner.ts`) are generated from stock
  photos and labelled "Illustrative comparison — client photos pending". Real work for the `gallery` (`lib/data/inner.ts`).
- Real review quotes in `reviewQuotes` (`lib/data/inner.ts`); a real photo of Chris (About).
- Stock photos include third-party brand names (About photo, ceramic coating bay): swap them.
- The design's staging notes ("verification pending", "client photos pending") should come out once verified.
- Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_NOINDEX=false`, and the `SMTP_*` settings.
- Hosting: any Node host works now (no database needed). Run a single instance because of the in-memory rate limit.
