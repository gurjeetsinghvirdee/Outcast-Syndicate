export type Discipline =
  | "Research"
  | "Video editing"
  | "Content creation"
  | "Copywriting"
  | "Technical writing"
  | "Code"
  | "UI/UX"
  | "Visual design";

/** Each person's folio has its own structure, chosen by discipline. */
export type FolioLayout = "editor-writer" | "reel" | "research" | "product";

export type Link = { label: string; href: string };

export type Person = {
  slug: string;
  name: string;
  /** Two-letter track code used on the timeline. */
  track: string;
  disciplines: Discipline[];
  layout: FolioLayout;
  links: Link[];
  /** Earlier roles the person has published themselves. */
  background?: { role: string; org: string; period: string }[];
};

export type Relationship = "agency" | "collaborative" | "individual" | "employer" | "spec";

export type YouTubeMedia = {
  kind: "youtube";
  id: string;
  aspect: "16:9" | "9:16";
  /** maxres exists for most uploads; a few only have hq. */
  poster: "maxres" | "hq";
};

export type ImageMedia = {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Media = YouTubeMedia | ImageMedia;

export type Credit = { person: string; role: string };

/** An outcome is only published with what it measured and where the number came from. */
export type Outcome = { claim: string; measure: string; source: string };

type ProjectBase = {
  slug: string;
  title: string;
  subtitle?: string;
  owner: string;
  relationship: Relationship;
  year?: number;
  credits: Credit[];
  outcomes?: Outcome[];
  note?: string;
};

export type FilmProject = ProjectBase & {
  kind: "film";
  cover: YouTubeMedia;
  strand: FilmStrand;
  runtime: string;
  channel: Link;
  tools?: string[];
  footage?: string;
};

export type ProductProject = ProjectBase & {
  kind: "product";
  cover: ImageMedia;
  category: string;
  strapline: string;
  summary: string;
  stack: string[];
  status: "live" | "archived";
  links: Link[];
  gallery?: ImageMedia[];
};

export type Project = FilmProject | ProductProject;

export type FilmStrand =
  | "Documentary"
  | "Commercial"
  | "Explainer"
  | "Long-form vlog"
  | "Short vlog"
  | "Channel short";

export type Service = {
  slug: string;
  name: string;
  summary: string;
  deliverables: string[];
  published: boolean;
};

/** One research study, shown as a ledger entry in a research folio. */
export type Study = {
  slug: string;
  owner: string;
  title: string;
  year?: number;
  question: string;
  method: string;
  sources: string[];
  findings: string;
  link?: Link;
};

/** A published piece of writing, shown on the writing desk of a folio. */
export type WritingSample = {
  slug: string;
  owner: string;
  title: string;
  kind: "Copywriting" | "Technical writing";
  publication?: string;
  year?: number;
  link: Link;
};
