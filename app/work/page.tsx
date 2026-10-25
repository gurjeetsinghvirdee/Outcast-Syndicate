import type { Metadata } from "next";
import { WorkIndex, type IndexRow } from "@/components/work-index/WorkIndex";
import { kindLabel, measureLabel, people, personFor, posterUrl, projects } from "@/content";
import styles from "../shared.module.css";

export const metadata: Metadata = {
  title: "Work",
  description: "Every film and build by The Outcast Syndicate, filterable by track, each credited to the person who made it.",
};

export default function WorkPage() {
  const rows: IndexRow[] = projects.map((p) => {
    const person = personFor(p);
    return {
      slug: p.slug,
      title: p.title,
      track: person.track,
      person: person.name,
      kind: p.kind,
      kindLabel: kindLabel(p),
      measure: measureLabel(p),
      poster: posterUrl(p.cover),
    };
  });

  return (
    <div className="wrap">
      <header className={styles.pageHead}>
        <span className="label">Index</span>
        <h1 className={styles.title}>
          All work. <span>Every credit.</span>
        </h1>
        <p className={styles.lede}>
          Films and builds from every track. Pick a track to see one person&rsquo;s work, or a kind to compare like
          with like.
        </p>
      </header>
      <WorkIndex rows={rows} tracks={people.map((p) => ({ track: p.track, name: p.name }))} />
    </div>
  );
}
