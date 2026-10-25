"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./EditorWriterFolio.module.css";

export type EdlRow = { slug: string; title: string; strand: string; runtime: string; aspect: string };

/** The filmography set as an edit decision list: event, reel, track, transition, strand, duration. */
export function EdlList({ rows, reel, title }: { rows: EdlRow[]; reel: string; title: string }) {
  const strands = Array.from(new Set(rows.map((r) => r.strand)));
  const [strand, setStrand] = useState<string | null>(null);
  const shown = strand ? rows.filter((r) => r.strand === strand) : rows;

  return (
    <div className={styles.edl}>
      <div className={styles.edlTop}>
        <p className={styles.edlHeader}>
          <span>TITLE: {title.toUpperCase()}</span>
          <span>FCM: NON-DROP FRAME</span>
        </p>
        <div className={styles.strands} role="group" aria-label="Filter by strand">
          <button type="button" aria-pressed={strand === null} onClick={() => setStrand(null)}>
            All {rows.length}
          </button>
          {strands.map((s) => (
            <button key={s} type="button" aria-pressed={strand === s} onClick={() => setStrand(s)}>
              {s} {rows.filter((r) => r.strand === s).length}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.edlScroll}>
        <table className={styles.edlTable}>
          <thead>
            <tr>
              <th scope="col">Event</th>
              <th scope="col">Reel</th>
              <th scope="col">Trk</th>
              <th scope="col">Tr</th>
              <th scope="col">Title</th>
              <th scope="col">Strand</th>
              <th scope="col">Frame</th>
              <th scope="col">Dur</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.slug}>
                <td className="tabular">{String(rows.indexOf(r) + 1).padStart(3, "0")}</td>
                <td>{reel}</td>
                <td>V</td>
                <td>C</td>
                <td className={styles.edlTitle}>
                  <Link href={`/work/${r.slug}`}>{r.title}</Link>
                </td>
                <td>{r.strand}</td>
                <td>{r.aspect}</td>
                <td className="tabular">{r.runtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
