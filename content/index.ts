import { people } from "./people";
import { gurjeetBuilds } from "./projects/gurjeet";
import { uttamFilms } from "./projects/uttam";
import { services } from "./services";
import { studies, writing } from "./writing";
import type { Media, Person, Project, Relationship } from "./types";

export { people, services, studies, writing };
export * from "./types";

export const projects: Project[] = [...uttamFilms, ...gurjeetBuilds];

/**
 * The home page sequence. One clip plays at a time and the cut moves between
 * tracks, like A/B roll. Slugs must exist in `projects`.
 */
const cut = [
  "badlaav-campaign",
  "verdixt",
  "watershed-rain-water-harvesting",
  "meridian",
  "abhyaz-social-enterprise",
  "latency-topology-visualizer",
  "drone-views-university-of-reading",
  "quoteforge",
  "harsh-likhari-inspiration-reel",
  "mediakit",
];

// Content checks run at build time, so a broken reference fails the build
// instead of shipping a page that credits nobody.
function validate() {
  const personSlugs = new Set(people.map((p) => p.slug));
  const seen = new Set<string>();
  for (const p of projects) {
    if (seen.has(p.slug)) throw new Error(`Duplicate project slug: ${p.slug}`);
    seen.add(p.slug);
    if (!personSlugs.has(p.owner)) throw new Error(`${p.slug}: unknown owner ${p.owner}`);
    if (p.credits.length === 0) throw new Error(`${p.slug}: every project needs at least one credit`);
    for (const c of p.credits) {
      if (!personSlugs.has(c.person)) throw new Error(`${p.slug}: unknown credited person ${c.person}`);
    }
    for (const o of p.outcomes ?? []) {
      if (!o.source.trim()) throw new Error(`${p.slug}: outcome "${o.claim}" has no source`);
    }
  }
  for (const item of [...studies, ...writing]) {
    if (!personSlugs.has(item.owner)) throw new Error(`${item.slug}: unknown owner ${item.owner}`);
  }
  for (const slug of cut) {
    if (!seen.has(slug)) throw new Error(`Home cut references missing project ${slug}`);
  }
  const tracks = new Set<string>();
  for (const person of people) {
    if (tracks.has(person.track)) throw new Error(`Duplicate track code ${person.track}`);
    tracks.add(person.track);
  }
}
validate();

export const getPerson = (slug: string) => people.find((p) => p.slug === slug);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectsBy = (personSlug: string) => projects.filter((p) => p.owner === personSlug);
export const studiesBy = (personSlug: string) => studies.filter((s) => s.owner === personSlug);
export const writingBy = (personSlug: string) => writing.filter((w) => w.owner === personSlug);
export const homeCut = () => cut.map((slug) => getProject(slug)!);
export const publishedServices = () => services.filter((s) => s.published);

export function posterUrl(media: Media): string {
  if (media.kind === "image") return media.src;
  return `https://i.ytimg.com/vi/${media.id}/${media.poster === "maxres" ? "maxresdefault" : "hqdefault"}.jpg`;
}

export function posterAlt(project: Project): string {
  if (project.cover.kind === "image") return project.cover.alt;
  return `Poster frame from ${project.title}`;
}

export const relationshipLabel: Record<Relationship, string> = {
  agency: "Agency project",
  collaborative: "Linked across tracks",
  individual: "Individual work",
  employer: "Built for an employer",
  spec: "Spec piece",
};

/** Short label for the kind of work, used on clips and index rows. */
export function kindLabel(project: Project): string {
  return project.kind === "film" ? project.strand : project.category;
}

/** Runtime for films, year for builds. */
export function measureLabel(project: Project): string {
  if (project.kind === "film") return project.runtime;
  return project.year ? String(project.year) : "";
}

export function primaryRole(project: Project): string {
  return project.credits.find((c) => c.person === project.owner)?.role ?? project.credits[0].role;
}

export const personFor = (project: Project): Person => getPerson(project.owner)!;
