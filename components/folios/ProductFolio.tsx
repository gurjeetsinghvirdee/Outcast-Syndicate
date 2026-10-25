import Link from "next/link";
import type { Person, ProductProject } from "@/content";
import { BrowserFrame } from "../BrowserFrame";
import { FolioHead } from "./FolioHead";
import styles from "./ProductFolio.module.css";

/** A product folio: every build in its own live window, then the log. */
export function ProductFolio({ person, builds }: { person: Person; builds: ProductProject[] }) {
  const [lead, ...rest] = builds;
  const live = builds.filter((b) => b.status === "live").length;

  return (
    <div className="wrap">
      <FolioHead
        person={person}
        variant="build"
        aside={
          <p>
            {builds.length} builds, {live} still live. Each one opens at the address it runs at.
          </p>
        }
      />

      {lead && <Build build={lead} lead />}

      <div className={styles.grid}>
        {rest.map((b) => (
          <Build key={b.slug} build={b} />
        ))}
      </div>

      <section className={styles.section} aria-labelledby="log-h">
        <h2 id="log-h" className={styles.h2}>
          Build log
        </h2>
        <div className={styles.scroll}>
          <table className={styles.log}>
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Build</th>
                <th scope="col">Kind</th>
                <th scope="col">Stack</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {builds.map((b) => (
                <tr key={b.slug}>
                  <td className="tabular">{b.year}</td>
                  <td>
                    <Link href={`/work/${b.slug}`}>{b.title}</Link>
                  </td>
                  <td>{b.category}</td>
                  <td>{b.stack.join(" · ")}</td>
                  <td>
                    <span className={styles.status} data-status={b.status}>
                      {b.status === "live" ? "Live" : "Archived"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {person.background && (
        <section className={styles.section} aria-labelledby="bg-h">
          <h2 id="bg-h" className={styles.h2}>
            Before the syndicate
          </h2>
          <ul className={styles.background}>
            {person.background.map((b) => (
              <li key={b.org}>
                <span className="label">{b.period}</span>
                <span className={styles.bgRole}>{b.role}</span>
                <span className={styles.bgOrg}>{b.org}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function Build({ build, lead }: { build: ProductProject; lead?: boolean }) {
  return (
    <article className={lead ? styles.lead : styles.build}>
      <div className={styles.window}>
        <BrowserFrame
          image={build.cover}
          url={build.links[0]?.href}
          status={build.status}
          priority={lead}
          sizes={lead ? "(min-width: 900px) 62vw, 100vw" : "(min-width: 900px) 46vw, 100vw"}
        />
      </div>
      <div className={styles.text}>
        <span className="label">
          {build.category} · {build.year}
        </span>
        <h2 className={lead ? styles.leadTitle : styles.title}>
          <Link href={`/work/${build.slug}`}>{build.title}</Link>
        </h2>
        <p className={styles.strap}>{build.strapline}</p>
        {lead && <p className={styles.summary}>{build.summary}</p>}
        <p className={styles.stack}>{build.stack.join(" · ")}</p>
        <div className={styles.actions}>
          <Link href={`/work/${build.slug}`} className={styles.case}>
            Case
          </Link>
          {build.links[0] && (
            <a href={build.links[0].href} rel="noopener" className={styles.liveLink}>
              {build.links[0].label} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
