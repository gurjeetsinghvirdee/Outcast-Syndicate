import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { people, type Discipline } from "@/content";
import { site } from "@/content/site";
import shared from "../shared.module.css";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send The Outcast Syndicate a brief: what you are making, which tracks you need, and when.",
};

// Tracks a client can ask for, and who covers each one today.
const offer: { label: string; covers: Discipline[] }[] = [
  { label: "Research", covers: ["Research"] },
  { label: "Writing", covers: ["Copywriting", "Technical writing", "Content creation"] },
  { label: "Video editing", covers: ["Video editing"] },
  { label: "Design", covers: ["UI/UX", "Visual design"] },
  { label: "Code", covers: ["Code"] },
];

export default function ContactPage() {
  const tracks = offer.map((o) => ({
    label: o.label,
    who: people
      .filter((p) => p.disciplines.some((d) => o.covers.includes(d)))
      .map((p) => p.name.split(" ")[0])
      .join(", "),
  }));

  return (
    <div className="wrap">
      <header className={shared.pageHead}>
        <span className="label">Contact</span>
        <h1 className={shared.title}>
          Start a <span>brief.</span>
        </h1>
        <p className={shared.lede}>
          Tell us what you are making and which tracks you need. Briefs go to {site.contactEmail}.
        </p>
      </header>
      <div className={styles.layout}>
        <EnquiryForm email={site.contactEmail} tracks={tracks} />
        <aside className={styles.aside}>
          <span className="label">Write directly</span>
          <p className={styles.email}>{site.contactEmail}</p>
          <p className={styles.small}>
            Include what you already have (footage, drafts, data, a product), who it is for, and any date it has to
            meet.
          </p>
        </aside>
      </div>
    </div>
  );
}
