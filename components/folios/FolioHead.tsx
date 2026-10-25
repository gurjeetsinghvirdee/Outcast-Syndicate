import type { Person } from "@/content";
import styles from "./FolioHead.module.css";

type Props = {
  person: Person;
  /** Each folio sets its own name treatment; this keeps the shared parts aligned. */
  variant: "stacked" | "slate" | "ledger" | "build";
  aside?: React.ReactNode;
};

export function FolioHead({ person, variant, aside }: Props) {
  const [first, ...rest] = person.name.split(" ");
  return (
    <header className={styles.head} data-variant={variant}>
      <div className={styles.top}>
        <span className={styles.code}>{person.track}</span>
        <span className="label">Folio · {person.disciplines.join(" · ")}</span>
      </div>
      <h1 className={styles.name}>
        <span>{first}</span> <span className={styles.rest}>{rest.join(" ")}</span>
      </h1>
      {aside && <div className={styles.aside}>{aside}</div>}
      {person.links.length > 0 && (
        <ul className={styles.links}>
          {person.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} rel="noopener">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
