import Link from "next/link";
import { people, projectsBy } from "@/content";
import styles from "./TrackRoster.module.css";

/**
 * One row per person, drawn like a lane: code, name, disciplines, and a strip
 * with a tick for each published piece. Empty lanes say so.
 */
export function TrackRoster({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ol className={styles.roster}>
      {people.map((person) => {
        const work = projectsBy(person.slug);
        return (
          <li key={person.slug}>
            <Link href={`/people/${person.slug}`} className={styles.row}>
              <span className={styles.code}>{person.track}</span>
              <span className={styles.who}>
                <H className={styles.name}>{person.name}</H>
                <span className={styles.disc}>{person.disciplines.join(" · ")}</span>
              </span>
              <span className={styles.strip} aria-hidden="true" data-empty={work.length === 0 || undefined}>
                {work.map((w) => (
                  <i key={w.slug} data-kind={w.kind} />
                ))}
              </span>
              <span className={styles.count}>
                {work.length === 0
                  ? "Armed · work arriving"
                  : `${work.length} ${work[0].kind === "film" ? "films" : "builds"}`}
              </span>
              <span className={styles.go} aria-hidden="true">
                Folio →
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
