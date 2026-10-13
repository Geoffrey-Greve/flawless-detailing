"use client";

import { useState, type FormEvent } from "react";
import Icon from "@/components/shared/Icon";
import { allServices } from "@/lib/data/content";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [bad, setBad] = useState<Record<string, boolean>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const value = (k: string) => String(fd.get(k) ?? "").trim();

    const invalid = {
      name: !value("name"),
      phone: value("phone").replace(/\D/g, "").length < 7,
      email: !EMAIL_RE.test(value("email")),
      vehicle: !value("vehicle"),
      service: !value("service"),
    };
    setBad(invalid);
    if (Object.values(invalid).some(Boolean)) {
      setError("Please fill in the highlighted fields.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          phone: value("phone"),
          email: value("email"),
          vehicle: value("vehicle"),
          services: [value("service")],
          message: value("message"),
          botcheck: value("botcheck"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please call us or try again."
      );
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="hv-form hv-ok">
        <div className="hv-okic">✓</div>
        <h3>Request received.</h3>
        <p>
          Thanks, we will get back to you shortly with your free quote. For anything urgent, call{" "}
          <a href={site.phoneHref}>{site.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="hv-form" noValidate onSubmit={onSubmit}>
      <div className="hv-fgrid">
        <div className="hv-field">
          <label htmlFor="q-name">
            Name <i>*</i>
          </label>
          <input id="q-name" name="name" autoComplete="name" placeholder="Your name" className={bad.name ? "bad" : ""} />
        </div>
        <div className="hv-field">
          <label htmlFor="q-phone">
            Phone <i>*</i>
          </label>
          <input id="q-phone" name="phone" type="tel" autoComplete="tel" placeholder="(720) 123-4567" className={bad.phone ? "bad" : ""} />
        </div>
        <div className="hv-field">
          <label htmlFor="q-email">
            Email <i>*</i>
          </label>
          <input id="q-email" name="email" type="email" autoComplete="email" placeholder="your@email.com" className={bad.email ? "bad" : ""} />
        </div>

        <div className="hv-field span2">
          <label htmlFor="q-veh">
            Vehicle make / model <i>*</i>
          </label>
          <input id="q-veh" name="vehicle" placeholder="e.g. BMW M4" className={bad.vehicle ? "bad" : ""} />
        </div>
        <div className="hv-field span1">
          <label htmlFor="q-svc">
            Service needed <i>*</i>
          </label>
          <div className="hv-select">
            <select id="q-svc" name="service" defaultValue="" className={bad.service ? "bad" : ""}>
              <option value="" disabled>
                Select a service
              </option>
              {allServices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Icon name="chevron" strokeWidth={2} />
          </div>
        </div>

        <div className="hv-field span3">
          <label htmlFor="q-msg">Message</label>
          <textarea id="q-msg" name="message" maxLength={2000} placeholder="Tell us about your vehicle and what you're looking for..." />
        </div>

        {/* Honeypot: real visitors never see or fill this. */}
        <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

        <div className="hv-field span3">
          <button className="hbtn p block" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : <>Get a Free Quote <Icon name="arrow" strokeWidth={2.2} /></>}
          </button>
          <p className="hv-err" role="alert">
            {error}
          </p>
        </div>
      </div>
    </form>
  );
}
