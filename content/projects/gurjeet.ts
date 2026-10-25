import type { ProductProject } from "../types";

const owner = "gurjeet-singh-virdee";
const build = [{ person: owner, role: "Design and development" }];

const shot = (src: string, alt: string, width = 1600, height = 1000) => ({
  kind: "image" as const,
  src,
  alt,
  width,
  height,
});

// Copy follows what Gurjeet published on gurjeet.dev; unsourced figures are left out.
export const gurjeetBuilds: ProductProject[] = [
  {
    kind: "product",
    slug: "verdixt",
    title: "Verdixt",
    owner,
    relationship: "individual",
    year: 2026,
    category: "AI product",
    strapline: "An answer you can argue with.",
    summary:
      "Structured multi-agent debate that argues both sides of a decision, then commits to a recommendation. Two months rebuilding the core logic and prompt architecture to make outputs consistent.",
    stack: ["Next.js", "Anthropic API", "Supabase", "Tailwind"],
    status: "live",
    links: [{ label: "Open live build", href: "https://debate-ai-eta.vercel.app" }],
    credits: [{ person: owner, role: "Core logic and prompt architecture" }],
    cover: shot("/work/gurjeet/verdixt.webp", "Verdixt interface showing a structured debate"),
  },
  {
    kind: "product",
    slug: "meridian",
    title: "Meridian",
    owner,
    relationship: "individual",
    year: 2026,
    category: "Client reporting",
    strapline: "A spreadsheet the client never has to see.",
    summary:
      "Turns a Google Sheet of logged work into a client-ready monthly report with charts, AI summaries and PDF export. Runs entirely in the browser, no account required.",
    stack: ["JavaScript", "Chart.js", "Google Sheets API", "Vercel Functions"],
    status: "live",
    links: [
      { label: "Open live build", href: "https://meridian-dashboard-zeta.vercel.app" },
      { label: "Repository", href: "https://github.com/gurjeetsinghvirdee/meridian" },
    ],
    credits: build,
    cover: shot("/work/gurjeet/meridian.webp", "Meridian dashboard overview"),
    gallery: [
      shot("/work/gurjeet/meridian-dashboard.webp", "Meridian dashboard with weekly charts", 1200, 1886),
      shot("/work/gurjeet/meridian-analytics.webp", "Meridian analytics view", 1200, 1983),
      shot("/work/gurjeet/meridian-ai-summary.webp", "Meridian AI summary of the month", 1200, 1983),
      shot("/work/gurjeet/meridian-monthly-report.webp", "Meridian printable monthly report", 1200, 1983),
    ],
  },
  {
    kind: "product",
    slug: "quoteforge",
    title: "QuoteForge",
    owner,
    relationship: "employer",
    year: 2026,
    category: "Internal tool",
    strapline: "Start from the number the customer agreed to.",
    summary:
      "GST-aware quotation builder used daily by a STEM-equipment supplier. Enter one final amount and it back-solves per-item pricing, picks CGST/SGST or IGST from the GSTIN state code, and exports a branded PDF.",
    stack: ["JavaScript", "PDF export", "XLSX import", "localStorage"],
    status: "live",
    links: [{ label: "Open live build", href: "https://quoteforge-cyan.vercel.app" }],
    credits: build,
    cover: shot("/work/gurjeet/quoteforge.webp", "QuoteForge quotation editor"),
  },
  {
    kind: "product",
    slug: "latency-topology-visualizer",
    title: "Latency Topology Visualizer",
    owner,
    relationship: "individual",
    year: 2025,
    category: "Data visualisation",
    strapline: "Exchange latency on a globe you can turn.",
    summary:
      "Real-time 3D globe rendering latency between 15+ global exchange nodes, with historical charts and filtering.",
    stack: ["Three.js", "WebGL", "Recharts", "Next.js", "TypeScript"],
    status: "live",
    links: [
      { label: "Open live build", href: "https://latency-topology-visualizer-steel.vercel.app/" },
      { label: "Repository", href: "https://github.com/gurjeetsinghvirdee/latency-topology-visualizer" },
    ],
    credits: build,
    cover: shot("/work/gurjeet/latency.webp", "3D globe with latency arcs between exchanges", 1600, 670),
  },
  {
    kind: "product",
    slug: "mediakit",
    title: "MediaKit",
    owner,
    relationship: "individual",
    year: 2024,
    category: "Local-first media tool",
    strapline: "Files never leave the device.",
    summary:
      "Compression and format conversion running entirely in the browser via Web Workers, so files never leave the device. Shipped, found no audience.",
    stack: ["Next.js", "Web Workers", "Appwrite"],
    status: "archived",
    links: [{ label: "Open archived build", href: "https://media-toolkit-three.vercel.app/" }],
    credits: build,
    cover: shot("/work/gurjeet/mediakit.webp", "MediaKit compression interface"),
  },
];
