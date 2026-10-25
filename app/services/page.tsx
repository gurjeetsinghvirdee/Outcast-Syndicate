import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedServices } from "@/content";
import shared from "../shared.module.css";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "What The Outcast Syndicate offers.",
};

// Hidden until services are published in content/services.ts.
export default function ServicesPage() {
  const services = publishedServices();
  if (services.length === 0) notFound();

  return (
    <div className="wrap">
      <header className={shared.pageHead}>
        <span className="label">Services</span>
        <h1 className={shared.title}>
          What we <span>make.</span>
        </h1>
      </header>
      <ol className={styles.list}>
        {services.map((s, i) => (
          <li key={s.slug} className={styles.item}>
            <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
            <div className={styles.body}>
              <h2 className={shared.h2}>{s.name}</h2>
              <p>{s.summary}</p>
              <ul className={styles.deliverables}>
                {s.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
