import Image from "next/image";
import Link from "next/link";
import type { SuiteClip } from "./types";
import styles from "./EditSuite.module.css";

type Props = {
  clip: SuiteClip;
  timecodeRef: React.Ref<HTMLSpanElement>;
  initialTimecode: string;
  priority?: boolean;
};

/** Program monitor: shows whatever clip is under the playhead, with a hard cut between clips. */
export function Monitor({ clip, timecodeRef, initialTimecode, priority }: Props) {
  return (
    <figure className={styles.monitorWrap}>
      <div className={styles.monitor}>
        <Image
          key={clip.slug}
          src={clip.poster}
          alt={clip.posterAlt}
          fill
          priority={priority}
          sizes="(min-width: 900px) 58vw, 100vw"
          className={clip.kind === "product" ? styles.posterProduct : styles.poster}
        />
        <div className={styles.monitorShade} aria-hidden="true" />
        <div className={styles.monitorTop}>
          <span>
            {clip.track} · {clip.kind === "film" ? "Film" : "Build"} · {clip.kindLabel}
          </span>
          <span ref={timecodeRef} className="tabular" aria-hidden="true">
            {initialTimecode}
          </span>
        </div>
        <figcaption className={styles.monitorBottom} aria-live="polite">
          <span className={styles.monitorTitle}>{clip.title}</span>
          <span className={styles.monitorMeta}>
            {clip.person} · {clip.role}
            {clip.measure ? ` · ${clip.measure}` : ""}
          </span>
        </figcaption>
      </div>
      <div className={styles.monitorLinks}>
        <Link href={clip.href} className={styles.open}>
          Open {clip.kind === "film" ? "film" : "build"}: {clip.title}
        </Link>
        <Link href={clip.personHref} className={styles.folio}>
          {clip.person}&rsquo;s folio
        </Link>
      </div>
    </figure>
  );
}
