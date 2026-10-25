import type { Person } from "./types";

// Order here is the order of tracks on the timeline and in the directory.
export const people: Person[] = [
  {
    slug: "uttam-kumar-tamboli",
    name: "Uttam Kumar Tamboli",
    track: "UK",
    disciplines: ["Video editing", "Content creation", "Copywriting", "Technical writing"],
    layout: "editor-writer",
    links: [
      { label: "YouTube: Experience with Uttam", href: "https://www.youtube.com/@EXPERIENCEWITHUTTAM" },
      { label: "YouTube: Uttam Kumar Tamboli", href: "https://www.youtube.com/@uttamkumartamboli" },
      {
        label: "Notion portfolio",
        href: "https://accurate-gazelle-cfd.notion.site/1754bda220d2802d832df8e3c45bd5b6?v=ea5ba10c02b744129d8e85f40b4dc8dc",
      },
    ],
  },
  {
    slug: "himanshu-rajak",
    name: "Himanshu Rajak",
    track: "HR",
    disciplines: ["Research"],
    layout: "research",
    links: [],
  },
  {
    slug: "mayank-sharma",
    name: "Mayank Sharma",
    track: "MS",
    disciplines: ["Video editing"],
    layout: "reel",
    links: [],
  },
  {
    slug: "gurjeet-singh-virdee",
    name: "Gurjeet Singh Virdee",
    track: "GS",
    disciplines: ["Code", "UI/UX", "Visual design", "Technical writing"],
    layout: "product",
    links: [
      { label: "gurjeet.dev", href: "https://gurjeet.dev" },
      { label: "GitHub", href: "https://github.com/gurjeetsinghvirdee" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/gurjeet-singh-virdee-25a476199/" },
    ],
    background: [
      { role: "Open-source frontend maintainer", org: "Appwrite console", period: "2025" },
      { role: "Frontend code review and QA", org: "Outlier", period: "2024 to 2025" },
      { role: "Frontend developer intern", org: "NullClass", period: "2023" },
      { role: "Technical content writer", org: "GeeksforGeeks", period: "2021 to 2022" },
    ],
  },
];
