import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorWriterFolio } from "@/components/folios/EditorWriterFolio";
import { ProductFolio } from "@/components/folios/ProductFolio";
import { ReelFolio } from "@/components/folios/ReelFolio";
import { ResearchFolio } from "@/components/folios/ResearchFolio";
import {
  getPerson,
  people,
  projectsBy,
  studiesBy,
  writingBy,
  type FilmProject,
  type ProductProject,
} from "@/content";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const person = getPerson((await params).slug);
  if (!person) return {};
  const description = `${person.name}: ${person.disciplines.join(", ")}. Folio at ${site.name}.`;
  return { title: person.name, description, openGraph: { title: person.name, description } };
}

export default async function FolioPage({ params }: Params) {
  const person = getPerson((await params).slug);
  if (!person) notFound();
  const work = projectsBy(person.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    knowsAbout: person.disciplines,
    memberOf: { "@type": "Organization", name: site.name },
    sameAs: person.links.map((l) => l.href),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {person.layout === "editor-writer" && (
        <EditorWriterFolio
          person={person}
          films={work.filter((w): w is FilmProject => w.kind === "film")}
          writing={writingBy(person.slug)}
        />
      )}
      {person.layout === "product" && (
        <ProductFolio person={person} builds={work.filter((w): w is ProductProject => w.kind === "product")} />
      )}
      {person.layout === "reel" && (
        <ReelFolio person={person} films={work.filter((w): w is FilmProject => w.kind === "film")} />
      )}
      {person.layout === "research" && <ResearchFolio person={person} studies={studiesBy(person.slug)} />}
    </>
  );
}
