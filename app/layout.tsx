import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { people, publishedServices } from "@/content";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const martian = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--font-martian", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f5f2eb",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: "/work", label: "Work" },
    { href: "/people", label: "People" },
    ...(publishedServices().length ? [{ href: "/services", label: "Services" }] : []),
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <html lang="en" className={`${archivo.variable} ${martian.variable}`}>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <SiteNav items={items} trackCount={people.length} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter items={items} />
      </body>
    </html>
  );
}
