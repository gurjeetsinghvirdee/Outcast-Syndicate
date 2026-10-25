"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import Image from "next/image";



function FloatingShapes() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return (
    <div className="floats" aria-hidden="true">
      <div className="float float-circle-lg" />
      <div className="float float-dot" />
      <div className="float float-ring" />
      <div className="float float-square" />
      <div className="float float-cross" />
      <div className="float float-pill" />
      <div className="float float-tri" />
      <div className="float float-dot-sm-1" />
      <div className="float float-dot-sm-2" />
      <div className="float float-dot-sm-3" />
      <div className="float float-ring-lg" />
      <div className="float float-diamond" />
      <svg className="float float-wave" viewBox="0 0 200 40" fill="none" stroke="#f9b318" strokeWidth="2.5" strokeLinecap="round">
        <path d="M0 20 Q25 0 50 20 T100 20 T150 20 T200 20" />
      </svg>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.05, rootMargin: "0px 0px 80px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "revealed" : ""} ${className}`}>{children}</div>;
}

const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "4", label: "Team members" },
  { value: "12+", label: "Services offered" },
  { value: "24h", label: "Avg. response time" },
];

const services = [
  { name: "Website Development", desc: "Responsive websites, landing pages, e-commerce stores and web apps.", icon: "M10 4h4v4h-4zM4 10h4v4H4zM16 10h4v4h-4zM10 16h4v4h-4zM10 10h4v4h-4z" },
  { name: "Video Editing", desc: "YouTube videos, reels, promos, documentaries - raw footage to final cut.", icon: "M4 4h16v12H4zM9 8l6 4-6 4z" },
  { name: "Copywriting", desc: "Ad copy, scripts, social media captions and brand messaging.", icon: "M6 4h12v16H6zM9 8h6M9 11h6M9 14h4" },
  { name: "Data Entry & Processing", desc: "Accurate data entry, spreadsheet cleanup, survey and records processing.", icon: "M4 4h16v16H4zM4 10h16M12 4v16" },
  { name: "Technical Writing", desc: "Documentation, tutorials, developer articles and how-to guides.", icon: "M8 2l-4 4v14h16V6l-4-4H8zM8 2v4H4M12 10v6M9 13h6" },
  { name: "UI / UX Design", desc: "Interface design, prototyping and user experience for digital products.", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 6l2 4h4l-3 3 1 5-4-2.5L8 18l1-5-3-3h4z" },
  { name: "SEO & Digital Marketing", desc: "Search optimisation, keyword research, analytics and growth strategy.", icon: "M10 2a8 8 0 105.29 14.29l4.71 4.71 2-2-4.71-4.71A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" },
  { name: "Social Media Management", desc: "Content calendars, scheduling, engagement and channel growth.", icon: "M18 2H6a2 2 0 00-2 2v16l4-3h10a2 2 0 002-2V4a2 2 0 00-2-2zM8 9h8M8 13h5" },
  { name: "App Development", desc: "Mobile and desktop apps - React Native, Flutter or PWA.", icon: "M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zM10 18h4" },
  { name: "Graphic Design", desc: "Logos, thumbnails, banners, social media creatives and brand identity.", icon: "M12 2L2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { name: "Research & Analysis", desc: "Market research, competitor analysis, data collection and reporting.", icon: "M4 20h16M6 16V10M10 16V6M14 16V8M18 16V4" },
  { name: "Automation & Scripting", desc: "Workflow automation, bots, scrapers and custom scripts.", icon: "M12 2a4 4 0 014 4v2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2H6a2 2 0 01-2-2v-6a2 2 0 012-2h2V6a4 4 0 014-4zM10 12h1M13 12h1" },
];

const capabilities = [
  "Full-stack web development",
  "Video editing & post-production",
  "Copywriting & content creation",
  "UI / UX design & prototyping",
  "Technical writing & documentation",
  "Research & data processing",
  "SEO & digital marketing",
  "Graphic design & branding",
  "Automation & scripting",
  "App development",
];

type WorkItem = {
  title: string;
  desc: string;
  category: string;

  image?: string;
  youtube?: string;
  url?: string;
};

const work: WorkItem[] = [
  {
    title: "Verdixt",
    desc: "Multi-agent AI debate that argues both sides, then commits to a recommendation.",
    category: "AI Product",
    image: "/work/gurjeet/verdixt.webp",
    url: "https://debate-ai-eta.vercel.app",
  },
  {
    title: "Meridian",
    desc: "Turns a Google Sheet of logged work into a client-ready monthly report with charts and PDF export.",
    category: "Client Reporting",
    image: "/work/gurjeet/meridian.webp",
    url: "https://meridian-dashboard-zeta.vercel.app",
  },
  {
    title: "QuoteForge",
    desc: "GST-aware quotation builder with back-solve pricing and branded PDF export.",
    category: "Internal Tool",
    image: "/work/gurjeet/quoteforge.webp",
    url: "https://quoteforge-cyan.vercel.app",
  },
  {
    title: "Latency Topology Visualizer",
    desc: "Real-time 3D globe showing latency between 15+ global exchange nodes.",
    category: "Data Visualisation",
    image: "/work/gurjeet/latency.webp",
    url: "https://latency-topology-visualizer-steel.vercel.app/",
  },
  {
    title: "MediaKit",
    desc: "Browser-based media compression and format conversion - files never leave the device.",
    category: "Media Tool",
    image: "/work/gurjeet/mediakit.webp",
    url: "https://media-toolkit-three.vercel.app/",
  },
  {
    title: "Badlaav Campaign",
    desc: "Documentary for a joint initiative of CEE, NDMC & HDFC Bank, with Nature Bodies' performance.",
    category: "Documentary",
    youtube: "1w2Vn1S_Xl8",
    url: "https://www.youtube.com/watch?v=1w2Vn1S_Xl8",
  },
  {
    title: "Watershed & Rain Water Harvesting",
    desc: "Training documentary on watershed and rain water harvesting system construction.",
    category: "Documentary",
    youtube: "yuVEpRHUVAA",
    url: "https://www.youtube.com/watch?v=yuVEpRHUVAA",
  },
  {
    title: "Abhyaz Social Enterprise",
    desc: "Promotional video for Abhyaz social enterprise.",
    category: "Commercial",
    youtube: "M9ECfj4VfoU",
    url: "https://www.youtube.com/watch?v=M9ECfj4VfoU",
  },
  {
    title: "All About Felix Scholarship",
    desc: "Explainer video covering the Felix Scholarship for studying in the UK.",
    category: "Explainer",
    youtube: "lxwVp2SgAV0",
    url: "https://www.youtube.com/watch?v=lxwVp2SgAV0",
  },
  {
    title: "Finding the Best University",
    desc: "The only video you need to find the best university in India and abroad.",
    category: "Explainer",
    youtube: "72AxsWy45z0",
    url: "https://www.youtube.com/watch?v=72AxsWy45z0",
  },
  {
    title: "Drone Views of University of Reading",
    desc: "Drone footage of the University of Reading campus.",
    category: "Short Vlog",
    youtube: "Rujwj0hmEBI",
    url: "https://www.youtube.com/watch?v=Rujwj0hmEBI",
  },
  {
    title: "How to Become a Pharmacist in Dubai",
    desc: "Step by step process, eligibility and salary breakdown for pharmacy careers in Dubai.",
    category: "Explainer",
    youtube: "1A5yd7HvEuA",
    url: "https://www.youtube.com/watch?v=1A5yd7HvEuA",
  },
  {
    title: "Pharmacy Career for Girls",
    desc: "Safety, jobs and future scope - a career guide for women in pharmacy.",
    category: "Explainer",
    youtube: "E-606wTEpg0",
    url: "https://www.youtube.com/watch?v=E-606wTEpg0",
  },
  {
    title: "Life as a Railway Pharmacist",
    desc: "Job profile, work nature, lifestyle, salary, facilities and promotion pathways.",
    category: "Explainer",
    youtube: "qhn8Mde6KUI",
    url: "https://www.youtube.com/watch?v=qhn8Mde6KUI",
  },
  {
    title: "AIIMS CRE Pharmacist Vacancy 2025",
    desc: "Step-by-step application form filling guide for AIIMS pharmacist recruitment.",
    category: "Tutorial",
    youtube: "he_xhiL_3s4",
    url: "https://www.youtube.com/watch?v=he_xhiL_3s4",
  },
  {
    title: "Pharma Industry Ka Dark Reality",
    desc: "Why freshers leave the pharma industry so quickly - an honest look at the reality.",
    category: "Commentary",
    youtube: "DNBpZn0ryPE",
    url: "https://www.youtube.com/watch?v=DNBpZn0ryPE",
  },
  {
    title: "University Admission Deposit with Felix Scholarship",
    desc: "Part 1 - walking through the university admission deposit process with Felix Scholarship.",
    category: "Vlog",
    youtube: "bmIqW8T6fuY",
    url: "https://www.youtube.com/shorts/bmIqW8T6fuY",
  },
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div style={{ padding: 24, background: "var(--paper)", borderRadius: 8, border: "1px solid var(--rule)" }}>
        <p><strong>Sent!</strong> We have received your enquiry and will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="c-name">Your name</label>
        <input id="c-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="c-service">Service needed</label>
        <select id="c-service" required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Tell us about your project</label>
        <textarea id="c-msg" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ justifySelf: "start" }} disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send enquiry"}
      </button>
      {status === "error" && <p style={{ color: "#c00", fontSize: "0.85rem" }}>Failed to send. Please try again.</p>}
    </form>
  );
}


export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllWork, setShowAllWork] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <FloatingShapes />

      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <svg className="nav-logo" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#1546d9"/>
              <path d="M16 6a10 10 0 0 1 0 20a10 10 0 0 1 0-20" stroke="#edece6" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="54 9" />
              <circle cx="24" cy="8" r="2.5" fill="#f9b318" />
            </svg>
            The Outcast Syndicate
          </a>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
          <div className={`nav-links${menuOpen ? " open" : ""}`}>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="#team" onClick={closeMenu}>Team</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </div>
        </div>
      </nav>

      <div className="wrap">
        {/* Hero */}
        <section className="hero">
          <span className="hero-badge hero-stagger" style={{ animationDelay: "0.2s" }}>Freelance studio for makers</span>
          <h1 className="hero-stagger" style={{ animationDelay: "0.45s" }}>We build.</h1>
          <h1 className="hero-stagger hero-h1-yellow" style={{ animationDelay: "0.7s" }}>You ship.</h1>
          <div className="hero-line hero-stagger" style={{ animationDelay: "0.9s" }} aria-hidden="true" />
          <p className="hero-sub hero-stagger" style={{ animationDelay: "1.1s" }}>
            A freelance team for websites, video editing, copywriting, data entry, technical writing and more.
            Tell us what you need - we handle the rest.
          </p>
          <div className="hero-ctas hero-stagger" style={{ animationDelay: "1.35s" }}>
            <a href="#contact" className="btn btn-primary">Get in touch ↗</a>
            <a href="#work" className="btn btn-secondary">See our work</a>
          </div>
        </section>

        {/* Stats */}
        <Reveal>
          <div className="stats-bar">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="watermark" aria-hidden="true">BUILD / SHIP / CREATE / REPEAT</div>

        {/* Services */}
        <Reveal>
        <section id="services" className="section">
          <p className="section-label">What we do</p>
          <h2 className="section-title">Services</h2>
          <p className="section-desc">
            Everything from a landing page to a documentary edit. Pick what you need, or tell us and we will figure it out.
          </p>
          <div className={`services-grid${showAllServices ? "" : " collapsed"}`}>
            {services.map((s) => (
              <div key={s.name} className="service-card">
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="show-more-btn" onClick={() => setShowAllServices(!showAllServices)}>
            {showAllServices ? "Show less" : `Show all ${services.length} services`}
          </button>
        </section>
        </Reveal>

        <div className="watermark" aria-hidden="true">CODE / EDIT / DESIGN / LAUNCH</div>

        {/* Work */}
        <Reveal>
        <section id="work" className="section">
          <p className="section-label">Our work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-desc">
            Web apps, tools, documentaries, explainers and more - all made by us.
          </p>
          <div className={`work-grid${showAllWork ? "" : " collapsed"}`}>
            {work.map((w) => (
              <a
                key={w.title}
                className="work-card"
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {w.image && (
                  <Image src={w.image} alt={w.title} width={600} height={375} />
                )}
                {w.youtube && !w.image && (
                  <img
                    src={`https://i.ytimg.com/vi/${w.youtube}/maxresdefault.jpg`}
                    alt={w.title}
                    width={600}
                    height={375}
                    loading="lazy"
                  />
                )}
                <div className="work-card-body">
                  <p className="work-card-meta">{w.category}</p>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </a>
            ))}
          </div>
          <button className="show-more-btn" onClick={() => setShowAllWork(!showAllWork)}>
            {showAllWork ? "Show less" : `Show all ${work.length} projects`}
          </button>
        </section>
        </Reveal>

        <div className="watermark" aria-hidden="true">PIXEL / FRAME / SCRIPT / DEPLOY</div>

        {/* Team */}
        <Reveal>
        <section id="team" className="section">
          <p className="section-label">Who we are</p>
          <h2 className="section-title">The Outcast Syndicate</h2>
          <p className="section-desc">
            A four-person freelance agency. We cover everything from code to cameras. No middlemen - the people who take the brief are the people who do the work.
          </p>
          <div className="capabilities-list">
            {capabilities.map((c) => (
              <span key={c} className="capability-tag">{c}</span>
            ))}
          </div>
        </section>
        </Reveal>

        {/* Marquee */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-inner">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i}>WEBSITES &bull; VIDEO &bull; COPY &bull; DESIGN &bull; CODE &bull; SEO &bull; APPS &bull; RESEARCH &bull;&nbsp;</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <Reveal>
        <section id="contact" className="section">
          <p className="section-label">Get started</p>
          <h2 className="section-title">Contact us</h2>
          <p className="section-desc">
            We usually reply within a day.
          </p>
          <ContactForm />
        </section>
        </Reveal>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/dpa">Data Processing</a>
            <a href="/refund">Refund Policy</a>
            <a href="/support">Contact & Support</a>
            <a href="/faq">FAQ</a>
          </div>
          <p>© {new Date().getFullYear()} The Outcast Syndicate</p>
          <p className="easter-egg-line">
            Curious who made this?{" "}
            <a
              href="https://gurjeet.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="easter-egg-link"
            >
              My site is way better than this one.
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
