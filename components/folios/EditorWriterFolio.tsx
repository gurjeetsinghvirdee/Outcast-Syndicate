import Image from "next/image";
import Link from "next/link";
import { posterUrl, type FilmProject, type Person, type WritingSample } from "@/content";
import { VideoFacade } from "../VideoFacade";
import { EdlList } from "./EdlList";
import { FolioHead } from "./FolioHead";
import styles from "./EditorWriterFolio.module.css";

const toSeconds = (rt: string) => {
  const [m, s] = rt.split(":").map(Number);
  return m * 60 + s;
};

const formatTotal = (secs: number) => `${Math.floor(secs / 3600)}h ${String(Math.floor((secs % 3600) / 60)).padStart(2, "0")}m`;

type Props = { person: Person; films: FilmProject[]; writing: WritingSample[] };

export function EditorWriterFolio({ person, films, writing }: Props) {
  const lead = films.find((f) => f.strand === "Documentary") ?? films[0];
  const verticals = films.filter((f) => f.cover.aspect === "9:16");
  const total = films.reduce((sum, f) => sum + toSeconds(f.runtime), 0);
  const channelFilms = films.filter((f) => f.channel.label === "Experience with Uttam");
  const channelHref = person.links.find((l) => l.label.includes("Experience with Uttam"))?.href;

  return (
    <div className="wrap">
      <FolioHead
        person={person}
        variant="stacked"
        aside={
          <dl className={styles.totals}>
            <div>
              <dt className="label">Films</dt>
              <dd>{films.length}</dd>
            </div>
            <div>
              <dt className="label">Total cut</dt>
              <dd>{formatTotal(total)}</dd>
            </div>
            <div>
              <dt className="label">Strands</dt>
              <dd>{new Set(films.map((f) => f.strand)).size}</dd>
            </div>
          </dl>
        }
      />

      {lead && (
        <section className={styles.program} aria-labelledby="program-h">
          <div className={styles.programMedia}>
            <VideoFacade
              id={lead.cover.id}
              title={lead.title}
              poster={posterUrl(lead.cover)}
              aspect={lead.cover.aspect}
              runtime={lead.runtime}
              priority
              sizes="(min-width: 900px) 66vw, 100vw"
            />
          </div>
          <div className={styles.programText}>
            <span className="label">Program monitor</span>
            <h2 id="program-h" className={styles.programTitle}>
              <Link href={`/work/${lead.slug}`}>{lead.title}</Link>
            </h2>
            {lead.subtitle && <p>{lead.subtitle}</p>}
            <p className="label">
              {lead.strand} · {lead.runtime} · Published by {lead.channel.label}
            </p>
          </div>
        </section>
      )}

      <section className={styles.section} aria-labelledby="edl-h">
        <h2 id="edl-h" className={styles.h2}>
          Edit decision list
        </h2>
        <EdlList
          title={person.name}
          reel={person.track}
          rows={films.map((f) => ({
            slug: f.slug,
            title: f.title,
            strand: f.strand,
            runtime: f.runtime,
            aspect: f.cover.aspect,
          }))}
        />
      </section>

      {verticals.length > 0 && (
        <section className={styles.section} aria-labelledby="sheet-h">
          <h2 id="sheet-h" className={styles.h2}>
            Contact sheet <span>9:16</span>
          </h2>
          <ul className={styles.sheet}>
            {verticals.map((f, i) => (
              <li key={f.slug}>
                <Link href={`/work/${f.slug}`} className={styles.frame}>
                  <span className={styles.frameImg}>
                    <Image src={posterUrl(f.cover)} alt={`Poster frame from ${f.title}`} fill sizes="(min-width: 900px) 18vw, 45vw" />
                  </span>
                  <span className={styles.frameNo}>A{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.frameCap}>
                    {f.title} <span className="tabular">{f.runtime}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.section} aria-labelledby="desk-h">
        <h2 id="desk-h" className={styles.h2}>
          Writing desk
        </h2>
        <div className={styles.desk}>
          <article>
            <span className="label">Content creation</span>
            <p className={styles.deskCount}>{channelFilms.length}</p>
            <p>
              Films published on the YouTube channel{" "}
              {channelHref ? <a href={channelHref}>Experience with Uttam</a> : "Experience with Uttam"}: explainers,
              vlogs and channel shorts.
            </p>
          </article>
          {(["Copywriting", "Technical writing"] as const).map((kind) => {
            const pieces = writing.filter((w) => w.kind === kind);
            return (
              <article key={kind} data-empty={pieces.length === 0 || undefined}>
                <span className="label">{kind}</span>
                <p className={styles.deskCount}>{pieces.length}</p>
                {pieces.length === 0 ? (
                  <p>Samples arriving.</p>
                ) : (
                  <ul className={styles.pieces}>
                    {pieces.map((w) => (
                      <li key={w.slug}>
                        <a href={w.link.href} rel="noopener">
                          {w.title} ↗
                        </a>
                        {w.publication && <span className="label"> {w.publication}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
