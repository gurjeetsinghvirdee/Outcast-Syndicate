import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Credits } from "@/components/Credits";
import { SlugLine } from "@/components/SlugLine";
import { VideoFacade } from "@/components/VideoFacade";
import {
  getProject,
  kindLabel,
  measureLabel,
  personFor,
  posterUrl,
  projects,
  projectsBy,
  type FilmProject,
  type ProductProject,
  type Project,
} from "@/content";
import styles from "./case.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const person = personFor(project);
  const description =
    project.kind === "film"
      ? `${project.title}: ${project.strand.toLowerCase()}, ${project.runtime}. Video editing by ${person.name}.`
      : `${project.title}: ${project.strapline} Built by ${person.name}.`;
  return {
    title: project.title,
    description,
    openGraph: { title: project.title, description, images: [{ url: posterUrl(project.cover) }] },
  };
}

export default async function CasePage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const person = personFor(project);
  const more = projectsBy(person.slug).filter((p) => p.slug !== project.slug).slice(0, 4);

  return (
    <article className={styles.case}>
      <div className="wrap">
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <Link href="/work">Work</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/people/${person.slug}`}>{person.name}</Link>
        </nav>
        {project.kind === "film" ? <FilmCase film={project} /> : <BuildCase build={project} />}
      </div>

      {more.length > 0 && (
        <section className={`wrap ${styles.more}`} aria-labelledby="more-h">
          <h2 id="more-h" className={styles.moreHead}>
            More on track <span className={styles.code}>{person.track}</span>
          </h2>
          <ul className={styles.moreList}>
            {more.map((p) => (
              <MoreItem key={p.slug} project={p} />
            ))}
          </ul>
          <Link href={`/people/${person.slug}`} className={styles.folioLink}>
            {person.name}&rsquo;s folio →
          </Link>
        </section>
      )}
    </article>
  );
}

function FilmCase({ film }: { film: FilmProject }) {
  const vertical = film.cover.aspect === "9:16";
  return (
    <div className={styles.film} data-vertical={vertical || undefined}>
      <header className={styles.head}>
        <SlugLine items={[personFor(film).track, "Film", film.strand, film.runtime]} />
        <h1 className={styles.title}>{film.title}</h1>
        {film.subtitle && <p className={styles.sub}>{film.subtitle}</p>}
      </header>
      <div className={styles.player}>
        <VideoFacade
          id={film.cover.id}
          title={film.title}
          poster={posterUrl(film.cover)}
          aspect={film.cover.aspect}
          runtime={film.runtime}
          priority
          sizes={vertical ? "(min-width: 900px) 30vw, 90vw" : "(min-width: 900px) 70vw, 100vw"}
        />
      </div>
      <div className={styles.side}>
        <dl className={styles.facts}>
          <Fact term="Runtime" value={film.runtime} mono />
          <Fact term="Strand" value={film.strand} />
          <Fact term="Frame" value={film.cover.aspect} mono />
          <Fact term="Published by" value={film.channel.label} />
          {film.tools && <Fact term="Edited in" value={film.tools.join(", ")} />}
          {film.footage && <Fact term="Footage" value={film.footage} />}
        </dl>
        {film.note && <p className={styles.note}>{film.note}</p>}
        <Credits project={film} />
        <a className={styles.out} href={`https://www.youtube.com/watch?v=${film.cover.id}`} rel="noopener">
          Watch on YouTube ↗
        </a>
      </div>
    </div>
  );
}

function BuildCase({ build }: { build: ProductProject }) {
  const live = build.links[0];
  return (
    <div className={styles.build}>
      <header className={styles.head}>
        <SlugLine items={[personFor(build).track, "Build", build.category, build.year ? String(build.year) : undefined]} />
        <h1 className={styles.title}>{build.title}</h1>
        <p className={styles.sub}>{build.strapline}</p>
      </header>
      <div className={styles.window}>
        <BrowserFrame image={build.cover} url={live?.href} status={build.status} priority sizes="(min-width: 900px) 68vw, 100vw" />
      </div>
      <div className={styles.side}>
        <p className={styles.summary}>{build.summary}</p>
        <dl className={styles.facts}>
          {build.year && <Fact term="Year" value={String(build.year)} mono />}
          <Fact term="Kind" value={build.category} />
          <Fact term="Status" value={build.status === "live" ? "Live" : "Archived"} />
          <Fact term="Stack" value={build.stack.join(", ")} />
        </dl>
        <Credits project={build} />
        <ul className={styles.links}>
          {build.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} rel="noopener" className={styles.out}>
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
      {build.gallery && (
        <section className={styles.gallery} aria-label={`${build.title} screens`}>
          {build.gallery.map((g) => (
            <BrowserFrame key={g.src} image={g} sizes="(min-width: 900px) 24vw, 50vw" />
          ))}
        </section>
      )}
    </div>
  );
}

function Fact({ term, value, mono }: { term: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="label">{term}</dt>
      <dd className={mono ? "mono tabular" : undefined}>{value}</dd>
    </div>
  );
}

function MoreItem({ project }: { project: Project }) {
  return (
    <li>
      <Link href={`/work/${project.slug}`} className={styles.moreItem}>
        <span className={styles.moreTitle}>{project.title}</span>
        <span className="label">
          {kindLabel(project)} · {measureLabel(project)}
        </span>
      </Link>
    </li>
  );
}
