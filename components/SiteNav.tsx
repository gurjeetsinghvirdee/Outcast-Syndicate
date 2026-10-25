"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "./Mark";
import styles from "./SiteNav.module.css";

type Item = { href: string; label: string };

export function SiteNav({ items, trackCount }: { items: Item[]; trackCount: number }) {
  const pathname = usePathname();
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={styles.bar}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="The Outcast Syndicate, home">
          <Mark size={20} />
          <span className={styles.word}>
            The Outcast <span>Syndicate</span>
          </span>
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className={`label ${styles.count}`} aria-hidden="true">
          {trackCount} tracks armed
        </span>
      </div>
    </header>
  );
}
