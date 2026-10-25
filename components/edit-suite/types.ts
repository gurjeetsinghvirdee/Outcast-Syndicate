export type SuiteClip = {
  slug: string;
  title: string;
  href: string;
  track: string;
  person: string;
  personHref: string;
  role: string;
  kind: "film" | "product";
  kindLabel: string;
  measure: string;
  poster: string;
  posterAlt: string;
  /** Position on the sequence, in seconds of the cut. */
  start: number;
  length: number;
};

export type SuiteLane = {
  track: string;
  name: string;
  href: string;
  armed: boolean;
};
