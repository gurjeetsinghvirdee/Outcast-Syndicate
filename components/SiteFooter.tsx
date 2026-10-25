import Link from "next/link";
import { people } from "@/content";
import { site } from "@/content/site";
import { Mark } from "./Mark";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ items }: { items: { href: string; label: string }[] }) {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.sign}>
          <Mark size={28} />
          <p className={styles.word}>
            The Outcast
            <br />
            <span>Syndicate</span>
          </p>
        </div>
        <nav aria-label="Footer" className={styles.col}>
          <span className="label">Site</span>
          {items.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
        </nav>
        <div className={styles.col}>
          <span className="label">Tracks</span>
          {people.map((p) => (
            <Link key={p.slug} href={`/people/${p.slug}`}>
              <span className={styles.code}>{p.track}</span> {p.name}
            </Link>
          ))}
        </div>
        <div className={styles.col}>
          <span className="label">Write to us</span>
          <span className={styles.email}>{site.contactEmail}</span>
          <Link href="/contact">Start a brief</Link>
        </div>
      </div>
      <div className={`wrap ${styles.base}`}>
        <span className="label">© {new Date().getFullYear()} The Outcast Syndicate</span>
        <span className="label">Every project is credited to the people who made it.</span>
      </div>
    </footer>
  );
}
