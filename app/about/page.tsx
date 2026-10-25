import type { Metadata } from "next";
import Link from "next/link";
import { people, type Discipline } from "@/content";
import shared from "../shared.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Who is in The Outcast Syndicate, what each person does, and how work is credited.",
};

const disciplines: Discipline[] = [
  "Research",
  "Video editing",
  "Content creation",
  "Copywriting",
  "Technical writing",
  "UI/UX",
  "Visual design",
  "Code",
];

export default function AboutPage() {
  const names = people.map((p) => p.name);
  const list = `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;

  return (
    <div className="wrap">
      <header className={shared.pageHead}>
        <span className="label">About</span>
        <h1 className={shared.title}>
          Four people. <span>One syndicate.</span>
        </h1>
        <p className={shared.lede}>
          The Outcast Syndicate is {list}. Between us we cover research, writing, video editing, interface design
          and code.
        </p>
      </header>

      <section className={styles.matrixSection} aria-labelledby="matrix-h">
        <h2 id="matrix-h" className={shared.h2}>
          Who does what
        </h2>
        <div className={styles.scroll}>
          <table className={styles.matrix}>
            <caption className="visually-hidden">Disciplines covered by each person in the syndicate</caption>
            <thead>
              <tr>
                <th scope="col">Track</th>
                {disciplines.map((d) => (
                  <th key={d} scope="col">
                    <span>{d}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.slug}>
                  <th scope="row">
                    <Link href={`/people/${p.slug}`}>
                      <span className={styles.code}>{p.track}</span> {p.name}
                    </Link>
                  </th>
                  {disciplines.map((d) => (
                    <td key={d}>
                      {p.disciplines.includes(d) ? (
                        <span className={styles.on} role="img" aria-label="Yes" />
                      ) : (
                        <span className="visually-hidden">No</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.rules} aria-labelledby="rules-h">
        <h2 id="rules-h" className={shared.h2}>
          How work is credited
        </h2>
        <ol className={styles.ruleList}>
          <li>
            <span className={styles.ruleNo}>01</span>
            <p>
              <strong>Every project names its people.</strong> Each piece lists who worked on it and what they did.
            </p>
          </li>
          <li>
            <span className={styles.ruleNo}>02</span>
            <p>
              <strong>Folios hold individual work.</strong> Each person&rsquo;s folio shows their own projects, in a
              layout built for their discipline.
            </p>
          </li>
          <li>
            <span className={styles.ruleNo}>03</span>
            <p>
              <strong>Joint work is linked.</strong> When more than one track works on a project, it is marked as
              linked and credits each person&rsquo;s part.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
