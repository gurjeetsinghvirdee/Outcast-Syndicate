import styles from "./SlugLine.module.css";

/** A row of metadata, like the slug on a clip: code, discipline, kind, measure. */
export function SlugLine({ items }: { items: (string | undefined | false)[] }) {
  const parts = items.filter(Boolean) as string[];
  return (
    <p className={styles.slug}>
      {parts.map((p, i) => (
        <span key={i}>{p}</span>
      ))}
    </p>
  );
}
