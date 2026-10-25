import type { MetadataRoute } from "next";
import { people, projects, publishedServices } from "@/content";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/people", "/about", "/contact", ...(publishedServices().length ? ["/services"] : [])];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...people.map((p) => ({ url: `${site.url}/people/${p.slug}` })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}` })),
  ];
}
