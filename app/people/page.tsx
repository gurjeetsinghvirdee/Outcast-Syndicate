import type { Metadata } from "next";
import { TrackRoster } from "@/components/TrackRoster";
import styles from "../shared.module.css";

export const metadata: Metadata = {
  title: "People",
  description: "The four people of The Outcast Syndicate, their disciplines, and a folio for each.",
};

export default function PeoplePage() {
  return (
    <div className="wrap">
      <header className={styles.pageHead}>
        <span className="label">Directory</span>
        <h1 className={styles.title}>
          Four tracks. <span>Four folios.</span>
        </h1>
        <p className={styles.lede}>
          Each folio is built around its owner&rsquo;s discipline: an edit list for film, a ledger for research, live
          windows for code.
        </p>
      </header>
      <TrackRoster />
    </div>
  );
}
