import Link from "next/link";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Credits } from "@/components/Credits";
import { EditSuite } from "@/components/edit-suite/EditSuite";
import type { SuiteClip, SuiteLane } from "@/components/edit-suite/types";
import { SlugLine } from "@/components/SlugLine";
import { TrackRoster } from "@/components/TrackRoster";
import { VideoFacade } from "@/components/VideoFacade";
import {
  getProject,
  homeCut,
  kindLabel,
  measureLabel,
  people,
  personFor,
  posterAlt,
  posterUrl,
  primaryRole,
  projects,
  projectsBy,
  type FilmProject,
  type Project,
  type ProductProject,
} from "@/content";
import { site } from "@/content/site";
import styles from "./page.module.css";

const LEAD_IN = 3;

// Clip length on the cut, in seconds: long films hold longer than shorts.
function clipLength(p: Project): number {
  if (p.kind === "product") return 11;
  if (p.strand === "Documentary") return 14;
  if (p.strand === "Explainer" || p.strand === "Long-form vlog") return 11;
  return 8;
}

function buildCut() {
  let at = LEAD_IN;
  const clips: SuiteClip[] = homeCut().map((p) => {
    const person = personFor(p);
    const length = clipLength(p);
    const clip: SuiteClip = {
      slug: p.slug,
      title: p.title,
      href: `/work/${p.slug}`,
      track: person.track,
      person: person.name,
      personHref: `/people/${person.slug}`,
      role: primaryRole(p),
      kind: p.kind,
      kindLabel: kindLabel(p),
      measure: measureLabel(p),
      poster: posterUrl(p.cover),
      posterAlt: posterAlt(p),
      start: at,
      length,
    };
    at += length;
    return clip;
  });
  const lanes: SuiteLane[] = people.map((person) => ({
    track: person.track,
    name: person.name,
    href: `/people/${person.slug}`,
    armed: projectsBy(person.slug).length === 0,
  }));
  return { clips, lanes, total: at + LEAD_IN };
}

export default function Home() {
  const { clips, lanes, total } = buildCut();
  const films = projects.filter((p) => p.kind === "film").length;
  const builds = projects.filter((p) => p.kind === "product").length;
  const badlaav = getProject("badlaav-campaign") as FilmProject;
  const meridian = getProject("meridian") as ProductProject;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    member: people.map((p) => ({ "@type": "Person", name: p.name, knowsAbout: p.disciplines })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EditSuite
        clips={clips}
        lanes={lanes}
        total={total}
        intro={
          <>
            <h1 className={styles.hero}>
              <span className="visually-hidden">The Outcast Syndicate. </span>
              Separate tracks.
              <span className={styles.heroWide}>One cut.</span>
            </h1>
            <div className={styles.introText}>
              <p>
                Four people working across research, writing, video editing, interface design and code. Each keeps
                their own track. Every piece of work here names the person who made it.
              </p>
              <dl className={styles.counts}>
                <div>
                  <dt className="label">Tracks</dt>
                  <dd>{people.length}</dd>
                </div>
                <div>
                  <dt className="label">Films</dt>
                  <dd>{films}</dd>
                </div>
                <div>
                  <dt className="label">Builds</dt>
                  <dd>{builds}</dd>
                </div>
              </dl>
              <div className={styles.ctas}>
                <Link href="/work" className={styles.primary}>
                  See all work
                </Link>
                <Link href="/contact" className={styles.secondary}>
                  Start a brief
                </Link>
              </div>
            </div>
          </>
        }
      />

      <section className={`wrap ${styles.section}`} aria-labelledby="tracks-h">
        <header className={styles.sectionHead}>
          <span className="label">The tracks</span>
          <h2 id="tracks-h" className={styles.h2}>
            Four people. <span>Four folios.</span>
          </h2>
          <p className={styles.lede}>
            Each person has a folio built around their own discipline. Two tracks are armed and waiting for their
            first pieces.
          </p>
        </header>
        <TrackRoster headingLevel={3} />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="cuts-h">
        <header className={styles.sectionHead}>
          <span className="label">From the cut</span>
          <h2 id="cuts-h" className={styles.h2}>
            One film. <span>One build.</span>
          </h2>
        </header>

        <article className={styles.featureFilm}>
          <div className={styles.featureMedia}>
            <VideoFacade
              id={badlaav.cover.id}
              title={badlaav.title}
              poster={posterUrl(badlaav.cover)}
              aspect="16:9"
              runtime={badlaav.runtime}
              sizes="(min-width: 900px) 64vw, 100vw"
            />
          </div>
          <div className={styles.featureText}>
            <SlugLine items={["UK", "Film", badlaav.strand, badlaav.runtime]} />
            <h3 className={styles.featureTitle}>
              <Link href={`/work/${badlaav.slug}`}>{badlaav.title}</Link>
            </h3>
            {badlaav.subtitle && <p className={styles.featureSub}>{badlaav.subtitle}</p>}
            <p className={styles.featureNote}>Published on YouTube by {badlaav.channel.label}.</p>
            <Credits project={badlaav} />
          </div>
        </article>

        <article className={styles.featureBuild}>
          <div className={styles.featureText}>
            <SlugLine items={["GS", "Build", meridian.category, String(meridian.year)]} />
            <h3 className={styles.featureTitle}>
              <Link href={`/work/${meridian.slug}`}>{meridian.title}</Link>
            </h3>
            <p className={styles.featureSub}>{meridian.strapline}</p>
            <p className={styles.featureNote}>{meridian.summary}</p>
            <Credits project={meridian} />
          </div>
          <div className={styles.buildStack}>
            <BrowserFrame
              image={meridian.cover}
              url={meridian.links[0].href}
              status={meridian.status}
              sizes="(min-width: 900px) 50vw, 100vw"
            />
            {meridian.gallery && (
              <div className={styles.buildShots}>
                {meridian.gallery.slice(1, 3).map((g) => (
                  <BrowserFrame key={g.src} image={g} sizes="(min-width: 900px) 22vw, 50vw" />
                ))}
              </div>
            )}
          </div>
        </article>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="brief-h">
        <div className={styles.brief}>
          <h2 id="brief-h" className={styles.h2}>
            Bring us <span>the raw footage.</span>
          </h2>
          <p className={styles.lede}>
            A research question, a script, an edit or a product. Tell us what you have and which tracks you need.
          </p>
          <Link href="/contact" className={styles.primary}>
            Start a brief
          </Link>
        </div>
      </section>
    </>
  );
}
