"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./WorkIndex.module.css";

export type IndexRow = {
  slug: string;
  title: string;
  track: string;
  person: string;
  kind: "film" | "product";
  kindLabel: string;
  measure: string;
  poster: string;
};

type Props = {
  rows: IndexRow[];
  tracks: { track: string; name: string }[];
};

type KindFilter = "all" | "film" | "product";

export function WorkIndex({ rows, tracks }: Props) {
  const [track, setTrack] = useState<string>("all");
  const [kind, setKind] = useState<KindFilter>("all");
  const [hover, setHover] = useState<string | null>(null);

  const visible = useMemo(
    () => rows.filter((r) => (track === "all" || r.track === track) && (kind === "all" || r.kind === kind)),
    [rows, track, kind],
  );
  const preview = visible.find((r) => r.slug === hover) ?? visible[0];
  const emptyTrack = tracks.find((t) => t.track === track);

  return (
    <div className={styles.index}>
      <div className={styles.filters}>
        <fieldset className={styles.group}>
          <legend className="label">Track</legend>
          <button type="button" aria-pressed={track === "all"} onClick={() => setTrack("all")}>
            All
          </button>
          {tracks.map((t) => (
            <button key={t.track} type="button" aria-pressed={track === t.track} onClick={() => setTrack(t.track)}>
              <span className={styles.code}>{t.track}</span> {t.name.split(" ")[0]}
            </button>
          ))}
        </fieldset>
        <fieldset className={styles.group}>
          <legend className="label">Kind</legend>
          {(["all", "film", "product"] as const).map((k) => (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
              {k === "all" ? "All" : k === "film" ? "Films" : "Builds"}
            </button>
          ))}
        </fieldset>
        <p className={`label ${styles.total}`} aria-live="polite">
          {visible.length} of {rows.length}
        </p>
      </div>

      <div className={styles.body}>
        {visible.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>Nothing on this track yet.</p>
            <p>
              {emptyTrack
                ? `${emptyTrack.name}'s first pieces are being prepared for the folio.`
                : "No work matches these filters."}
            </p>
          </div>
        ) : (
          <ol className={styles.rows}>
            {visible.map((r, i) => (
              <li key={r.slug}>
                <Link
                  href={`/work/${r.slug}`}
                  className={styles.row}
                  data-active={preview?.slug === r.slug || undefined}
                  onMouseEnter={() => setHover(r.slug)}
                  onFocus={() => setHover(r.slug)}
                >
                  <span className={styles.no}>{String(i + 1).padStart(3, "0")}</span>
                  <span className={styles.thumb} aria-hidden="true">
                    <Image src={r.poster} alt="" fill sizes="96px" />
                  </span>
                  <span className={styles.title}>{r.title}</span>
                  <span className={styles.meta}>
                    <span className={styles.code}>{r.track}</span>
                    <span className={styles.person}>{r.person}</span>
                  </span>
                  <span className={styles.kind}>{r.kindLabel}</span>
                  <span className={`${styles.measure} tabular`}>{r.measure}</span>
                </Link>
              </li>
            ))}
          </ol>
        )}

        {preview && (
          <aside className={styles.preview} aria-hidden="true">
            <div className={styles.previewFrame} data-kind={preview.kind}>
              <Image key={preview.slug} src={preview.poster} alt="" fill sizes="36vw" />
            </div>
            <p className={styles.previewCap}>
              <span className={styles.code}>{preview.track}</span> {preview.title}
            </p>
          </aside>
        )}
      </div>
    </div>
  );
}
