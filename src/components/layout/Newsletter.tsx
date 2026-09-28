"use client";

import { useState, type FormEvent } from "react";
import { brand, footer } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

export function Newsletter() {
  const { newsletter } = footer;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!newsletter.endpoint) {
      const email = String(data.get("email") ?? "");
      const subject = encodeURIComponent("Newsletter signup");
      const body = encodeURIComponent(`Please add ${email} to the newsletter.`);
      window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(newsletter.endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      setStatus(response.ok ? "success" : "error");
      if (response.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="footer_newsletter w-form">
      {status === "success" ? (
        <div className="form_success-message-2 w-form-done is-visible" role="status">
          <div>{newsletter.success}</div>
        </div>
      ) : (
        <form className="footer_newsletter-form" aria-label="Newsletter form" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="field-label">
            {newsletter.label}
          </label>
          <div className="footer_field-wrap">
            <input
              id="newsletter-email"
              className="footer_field w-input"
              type="email"
              name="email"
              maxLength={256}
              placeholder={newsletter.placeholder}
              autoComplete="email"
              required
            />
            <input
              type="submit"
              className="footer_newsletter-button w-button"
              value={status === "sending" ? "Please wait..." : newsletter.button}
              disabled={status === "sending"}
            />
          </div>
        </form>
      )}
      {status === "error" && (
        <div className="form_error-message w-form-fail is-visible" role="alert">
          <div>{newsletter.error}</div>
        </div>
      )}
    </div>
  );
}
