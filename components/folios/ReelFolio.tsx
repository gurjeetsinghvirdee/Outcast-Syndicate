import Image from "next/image";
import Link from "next/link";
import { posterUrl, type FilmProject, type Person } from "@/content";
import { FolioHead } from "./FolioHead";
import styles from "./ReelFolio.module.css";

/** A reel-first folio: opens on a slate, then a wall of frames, verticals first. */
export function ReelFolio({ person, films }: { person: Person; films: FilmProject[] }) {
  const ordered = [...films].sort((a, b) => (a.cover.aspect === "9:16" ? -1 : 0) - (b.cover.aspect === "9:16" ? -1 : 0));
  const year = new Date().getFullYear();

  return (
    <div className="wrap">
      <FolioHead person={person} variant="slate" />

      <section className={styles.slateRow} aria-label="Slate">
        <div className={styles.slate}>
          <div className={styles.clapper} aria-hidden="true" />
          <dl className={styles.board}>
            <div className={styles.wide}>
              <dt>Prod.</dt>
              <dd>{person.name} · Folio</dd>
            </div>
            <div>
              <dt>Roll</dt>
              <dd>{person.track}</dd>
            </div>
            <div>
              <dt>Scene</dt>
              <dd>Reel</dd>
            </div>
            <div>
              <dt>Take</dt>
              <dd className="tabular">{String(films.length).padStart(2, "0")}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd className="tabular">{year}</dd>
            </div>
            <div className={styles.wide}>
              <dt>Discipline</dt>
              <dd>{person.disciplines.join(" · ")}</dd>
            </div>
          </dl>
        </div>
        <div className={styles.slateText}>
          {films.length === 0 ? (
            <>
              <p className={styles.status}>Awaiting footage</p>
              <p>
                {person.name}&rsquo;s reel is being cut for this folio. The first pieces will appear on this wall as they
                are added.
              </p>
              <Link href="/contact" className={styles.cta}>
                Brief this track →
              </Link>
            </>
          ) : (
            <p className={styles.status}>
              {films.length} {films.length === 1 ? "piece" : "pieces"} on the wall
            </p>
          )}
        </div>
      </section>

      <section className={styles.wallSection} aria-labelledby="wall-h">
        <h2 id="wall-h" className={styles.h2}>
          The wall
        </h2>
        {films.length === 0 ? (
          <ul className={styles.wall} aria-label="Empty slots">
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i} className={styles.slot} data-tall={i % 2 === 0 || undefined}>
                <span className="label">Slot {String(i + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.wall}>
            {ordered.map((f) => (
              <li key={f.slug} data-tall={f.cover.aspect === "9:16" || undefined} className={styles.piece}>
                <Link href={`/work/${f.slug}`}>
                  <span className={styles.pieceImg}>
                    <Image src={posterUrl(f.cover)} alt={`Poster frame from ${f.title}`} fill sizes="(min-width: 900px) 20vw, 45vw" />
                  </span>
                  <span className={styles.pieceCap}>
                    {f.title} <span className="tabular">{f.runtime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
