import Link from "next/link";
import type { Person, Study } from "@/content";
import { FolioHead } from "./FolioHead";
import styles from "./ResearchFolio.module.css";

/**
 * A research folio set as a ledger: each study is one entry with its question,
 * method, sources and findings.
 */
export function ResearchFolio({ person, studies }: { person: Person; studies: Study[] }) {
  return (
    <div className="wrap">
      <FolioHead person={person} variant="ledger" />

      <section className={styles.ledger} aria-labelledby="ledger-h">
        <div className={styles.ledgerHead}>
          <h2 id="ledger-h" className={styles.h2}>
            Research log
          </h2>
          <p className={styles.count}>
            <span className="tabular">{String(studies.length).padStart(2, "0")}</span>{" "}
            {studies.length === 1 ? "study" : "studies"}
          </p>
        </div>

        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Question</th>
                <th scope="col">Method</th>
                <th scope="col">Sources</th>
                <th scope="col">Findings</th>
              </tr>
            </thead>
            <tbody>
              {studies.length === 0 ? (
                <tr className={styles.emptyRow}>
                  <td className="tabular">001</td>
                  <td colSpan={4}>
                    <p className={styles.emptyTitle}>The first study is being written up.</p>
                    <p>
                      Each study {person.name} publishes will be logged here with the question asked, how it was
                      answered, what it drew on, and what it found.
                    </p>
                  </td>
                </tr>
              ) : (
                studies.map((s, i) => (
                  <tr key={s.slug}>
                    <td className="tabular">{String(i + 1).padStart(3, "0")}</td>
                    <td data-label="Question">
                      <p className={styles.studyTitle}>{s.title}</p>
                      <p>{s.question}</p>
                    </td>
                    <td data-label="Method">{s.method}</td>
                    <td data-label="Sources">
                      <ul className={styles.sources}>
                        {s.sources.map((src) => (
                          <li key={src}>{src}</li>
                        ))}
                      </ul>
                    </td>
                    <td data-label="Findings">
                      <p>{s.findings}</p>
                      {s.link && (
                        <a href={s.link.href} rel="noopener">
                          {s.link.label} ↗
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <aside className={styles.margin}>
          <span className="label">Commission research</span>
          <p>
            Need a question answered before you design, write or build? <Link href="/contact">Start a brief</Link> and
            choose the research track.
          </p>
        </aside>
      </section>
    </div>
  );
}
