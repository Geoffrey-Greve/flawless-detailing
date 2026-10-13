import { NextResponse } from "next/server";
import { allow } from "@/lib/rateLimit";
import { sendLeadEmail } from "@/lib/mail";
import { allServices } from "@/lib/data/content";

/**
 * Quote-request intake for the public contact forms.
 *
 * Public by necessity. Protected by: a honeypot field, a per-IP rate limit,
 * strict length/format validation, and an allow-list for the service names.
 *
 * DELIVERY: the lead is EMAILED to LEAD_NOTIFY_TO. The database is switched
 * off for now (see the commented-out block below), so the email is the only
 * copy of the lead. If the email cannot be sent the visitor is told so, and
 * the lead is written to the server log as a last-resort fallback.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_SERVICES = new Set<string>(allServices);

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success and drop it.
  if (typeof body.botcheck === "string" && body.botcheck.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(`lead:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes or call us." },
      { status: 429 }
    );
  }

  const name = str(body.name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 255).toLowerCase();
  const vehicle = str(body.vehicle, 160);
  const message = str(body.message, 2000);
  const mobileService = body.mobileService === true;
  const services = (Array.isArray(body.services) ? body.services : [])
    .filter((s): s is string => typeof s === "string" && ALLOWED_SERVICES.has(s))
    .slice(0, allServices.length);

  const digits = phone.replace(/\D/g, "");
  if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (digits.length < 7 || digits.length > 15)
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!vehicle)
    return NextResponse.json({ error: "Please tell us your vehicle make and model." }, { status: 400 });

  /* ---------------------------------------------------------------------------
   * DATABASE (disabled for now). To switch it back on:
   *   1. uncomment this block and the `emailSent` update further down
   *   2. set DB_* in .env.local and run `npm run db:migrate`
   * The model, migration and connection code are untouched in lib/db and migrations/.
   *
   * let leadId: number | null = null;
   * try {
   *   const { Lead } = await import("@/lib/db/models");
   *   const lead = await Lead.create({
   *     name,
   *     phone,
   *     email,
   *     vehicle,
   *     services,
   *     mobileService,
   *     message: message || null,
   *     ip: ip.slice(0, 64),
   *     userAgent: (request.headers.get("user-agent") ?? "").slice(0, 255) || null,
   *   });
   *   leadId = lead.id;
   * } catch (err) {
   *   console.error("[leads] failed to store lead", err);
   * }
   * ------------------------------------------------------------------------- */

  const result = await sendLeadEmail({ name, phone, email, vehicle, services, mobileService, message });

  // SMTP is not set up yet (staging / demo): behave as if the request was received, so the
  // visitor sees the thank-you message instead of an error. The lead is only written to the
  // server log. Remove this block once SMTP_* are configured.
  if (!result.ok && result.reason === "not-configured") {
    console.warn(
      "[leads] SMTP not configured, lead logged only:",
      JSON.stringify({ name, phone, email, vehicle, services, mobileService, message })
    );
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (!result.ok) {
    // SMTP is configured but sending failed: tell the visitor, and log the lead as a last resort.
    console.error(
      `[leads] EMAIL NOT SENT (${result.reason}). Lead was:`,
      JSON.stringify({ name, phone, email, vehicle, services, mobileService, message })
    );
    return NextResponse.json(
      { error: "We could not send your request right now. Please call us instead." },
      { status: 500 }
    );
  }

  /* DATABASE (disabled): mark the stored lead as emailed.
   * if (leadId) {
   *   try {
   *     const { Lead } = await import("@/lib/db/models");
   *     await Lead.update({ emailSent: true }, { where: { id: leadId } });
   *   } catch {
   *     // non-critical
   *   }
   * }
   */

  return NextResponse.json({ ok: true }, { status: 201 });
}
