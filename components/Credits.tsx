import Link from "next/link";
import { getPerson, relationshipLabel, type Project } from "@/content";
import styles from "./Credits.module.css";

/** Roles on a project: who did what, always shown. */
export function Credits({ project }: { project: Project }) {
  return (
    <section className={styles.credits} aria-labelledby={`roles-${project.slug}`}>
      <h2 id={`roles-${project.slug}`} className="label">
        Roles
      </h2>
      <ul>
        {project.credits.map((c) => {
          const person = getPerson(c.person)!;
          return (
            <li key={c.person + c.role}>
              <span className={styles.code}>{person.track}</span>
              <Link href={`/people/${person.slug}`} className={styles.name}>
                {person.name}
              </Link>
              <span className={styles.role}>{c.role}</span>
            </li>
          );
        })}
      </ul>
      <p className={styles.relation}>{relationshipLabel[project.relationship]}</p>
    </section>
  );
}
