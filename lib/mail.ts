import nodemailer from "nodemailer";

export interface LeadMail {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  services: string[];
  mobileService: boolean;
  message: string;
}

export type MailResult = { ok: true } | { ok: false; reason: "not-configured" | "send-failed" };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** True when the SMTP settings needed to deliver quote requests are present. */
export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.LEAD_NOTIFY_TO);
}

/**
 * Emails a quote request to the business owner. This is currently the ONLY
 * place a lead goes (the database is switched off), so the caller must treat
 * `ok: false` as a failed submission. Never throws.
 */
export async function sendLeadEmail(lead: LeadMail): Promise<MailResult> {
  const { SMTP_HOST, SMTP_PORT = "587", SMTP_USER, SMTP_PASS, MAIL_FROM, LEAD_NOTIFY_TO } = process.env;
  if (!SMTP_HOST || !LEAD_NOTIFY_TO) return { ok: false, reason: "not-configured" };

  try {
    const port = Number(SMTP_PORT);
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      // Fail fast so the visitor is not left staring at a spinner.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    const services = lead.services.length ? lead.services.join(", ") : "Not specified";
    const rows: [string, string][] = [
      ["Name", lead.name],
      ["Phone", lead.phone],
      ["Email", lead.email],
      ["Vehicle", lead.vehicle],
      ["Service needed", services],
      ["Mobile service", lead.mobileService ? "Yes" : "No"],
      ["Message", lead.message || "-"],
    ];

    await transport.sendMail({
      // Gmail only sends as the authenticated account, so SMTP_USER wins when MAIL_FROM is unset.
      from: MAIL_FROM || SMTP_USER,
      to: LEAD_NOTIFY_TO,
      replyTo: `${lead.name} <${lead.email}>`,
      subject: `New quote request: ${lead.name} (${lead.vehicle})`,
      text: ["New quote request from the website", "", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n"),
      html:
        `<h2 style="margin:0 0 12px">New quote request</h2>` +
        `<table cellpadding="6" style="border-collapse:collapse">` +
        rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("") +
        `</table><p style="color:#666">Reply to this email to answer ${esc(lead.name)} directly.</p>`,
    });
    return { ok: true };
  } catch (err) {
    console.error("[mail] failed to send lead email", err);
    return { ok: false, reason: "send-failed" };
  }
}
