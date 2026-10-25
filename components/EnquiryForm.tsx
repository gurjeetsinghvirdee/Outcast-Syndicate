"use client";

import { useId, useState } from "react";
import styles from "./EnquiryForm.module.css";

type Props = { email: string; tracks: { label: string; who: string }[] };

const timings = ["No fixed date", "Within a month", "In one to three months", "Later this year"];

/**
 * Builds a structured brief and hands it to the visitor's email app. There is no
 * server: nothing is sent from this page, and the page says so.
 */
export function EnquiryForm({ email, tracks }: Props) {
  const id = useId();
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [timing, setTiming] = useState(timings[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const header = [
    `Name: ${name}`,
    org ? `Organisation: ${org}` : null,
    `Tracks needed: ${needs.length ? needs.join(", ") : "Not sure yet"}`,
    `Timing: ${timing}`,
  ]
    .filter(Boolean)
    .join("\n");
  const brief = `${header}\n\n${message}`;

  const subject = `Brief from ${name || "a new client"}${org ? `, ${org}` : ""}`;
  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief)}`;

  function toggle(label: string) {
    setNeeds((n) => (n.includes(label) ? n.filter((x) => x !== label) : [...n, label]));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Add your name so we know who to reply to.");
    if (message.trim().length < 20) return setError("Tell us a little more about the project, at least a sentence or two.");
    setError("");
    setReady(true);
    window.location.href = mailto;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`To: ${email}\nSubject: ${subject}\n\n${brief}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <label htmlFor={`${id}-name`} className={styles.field}>
          <span className="label">Your name</span>
          <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        </label>
        <label htmlFor={`${id}-org`} className={styles.field}>
          <span className="label">Organisation (optional)</span>
          <input id={`${id}-org`} value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" />
        </label>
      </div>

      <fieldset className={styles.tracks}>
        <legend className="label">Which tracks do you need?</legend>
        {tracks.map((t) => (
          <label key={t.label} className={styles.track} htmlFor={`${id}-${t.label}`}>
            <input
              id={`${id}-${t.label}`}
              type="checkbox"
              checked={needs.includes(t.label)}
              onChange={() => toggle(t.label)}
            />
            <span className={styles.trackName}>{t.label}</span>
            <span className={styles.trackWho}>{t.who}</span>
          </label>
        ))}
      </fieldset>

      <label htmlFor={`${id}-timing`} className={styles.field}>
        <span className="label">Timing</span>
        <select id={`${id}-timing`} value={timing} onChange={(e) => setTiming(e.target.value)}>
          {timings.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label htmlFor={`${id}-message`} className={styles.field}>
        <span className="label">What are you making?</span>
        <textarea
          id={`${id}-message`}
          rows={7}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What you have, what you need, and anything we should know about the audience or deadline."
          required
        />
      </label>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Open in my email app
        </button>
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? "Brief copied" : "Copy the brief instead"}
        </button>
      </div>

      <details className={styles.preview}>
        <summary>Preview the brief</summary>
        <pre>{`To: ${email}\nSubject: ${subject}\n\n${brief}`}</pre>
      </details>

      <p className={styles.note} aria-live="polite">
        {ready
          ? `Your email app should now be open with the brief filled in. If it didn't open, copy the brief and send it to ${email}.`
          : `Nothing is sent from this page. The brief opens in your own email app, addressed to ${email}.`}
      </p>
    </form>
  );
}
